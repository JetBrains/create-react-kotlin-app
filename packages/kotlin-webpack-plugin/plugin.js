'use strict';
const kotlinCompiler = require('@jetbrains/kotlinc-js-api');
const globby = require('globby');
const fs = require('fs-extra');
const path = require('path');
const log = require('webpack-log');
const DCEPlugin = require('./dce-plugin');
const librariesLookup = require('./libraries-lookup');

function getDefaultPackagesContents() {
  try {
    return [require(path.resolve(process.cwd(), 'package.json'))];
  } catch (e) {
    return [];
  }
}

const pluginName = 'Kotlin Plugin';
const DEFAULT_OPTIONS = {
  src: null, // An array or string with sources path
  output: 'kotlin_build',
  moduleName: 'kotlinApp',
  libraries: [],
  librariesAutoLookup: false,
  packagesContents: getDefaultPackagesContents(),
  verbose: false,
  sourceMaps: true,
  sourceMapEmbedSources: 'always',
  metaInfo: false,
  optimize: false,
};

class KotlinWebpackPlugin {
  constructor(options) {
    const logLevel = !options.verbose ? 'silent' : 'info';
    this.log = log({ name: pluginName, level: logLevel });

    const opts = Object.assign({}, DEFAULT_OPTIONS, options);
    this.prepareLibraries = this.prepareLibraries.bind(this);
    this.options = this.prepareLibraries(opts);

    this.outputPath = path.resolve(
      `${this.options.output}/${this.options.moduleName}.js`
    );
    this.firstCompilationError = null;

    this.compileIfKotlinFilesChanged = this.compileIfKotlinFilesChanged.bind(
      this
    );
    this.watchKotlinSources = this.watchKotlinSources.bind(this);
    this.compileIfFirstRun = this.compileIfFirstRun.bind(this);
    this.reportFirstCompilationError = this.reportFirstCompilationError.bind(
      this
    );
    this.optimizeDeadCode = this.optimizeDeadCode.bind(this);
    this.setPastDate = this.setPastDate.bind(this);

    this.startTime = Date.now();
    this.prevTimestamps = new Map();
    this.initialRun = true;
    this.sources = [].concat(this.options.src);
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync(pluginName, this.compileIfFirstRun);
    compiler.hooks.compilation.tap(
      pluginName,
      this.reportFirstCompilationError
    );
    compiler.hooks.make.tapAsync(pluginName, this.compileIfKotlinFilesChanged);
    compiler.hooks.emit.tapAsync(pluginName, this.watchKotlinSources);
  }

  prepareLibraries(opts) {
    if (opts.librariesAutoLookup) {
      if (opts.libraries.length > 0) {
        this.log.warn(
          '"libraries" option is ignored because "librariesAutoLookup" option is enabled'
        );
      }

      opts.libraries = librariesLookup.lookupKotlinLibraries(
        opts.packagesContents
      );

      this.log.info(
        `Autolookup found the following Kotlin libs:
       ${opts.libraries.join('\n')}`
      );
    }

    return Object.assign({}, opts, {
      libraries: opts.libraries.map(main =>
        main.replace(/(?:\.js)?$/, '.meta.js')
      ),
      librariesMainFiles: opts.libraries,
    });
  }

  copyLibraries() {
    const files = this.options.librariesMainFiles.concat(
      this.options.librariesMainFiles.map(main => `${main}.map`)
    );
    return Promise.all(
      files.map(file =>
        fs.copy(file, path.join(this.options.output, path.basename(file)))
      )
    );
  }

  async compileIfKotlinFilesChanged(compilation, done) {
    const changedFiles = Array.from(compilation.fileTimestamps.keys()).filter(
      watchfile =>
        (this.prevTimestamps.get(watchfile) || this.startTime) <
        (compilation.fileTimestamps.get(watchfile) || Infinity)
    );

    this.prevTimestamps = compilation.fileTimestamps;

    if (!changedFiles.some(it => /\.kt$/.test(it))) {
      done();
      return;
    }

    this.log.info(
      `Compiling Kotlin sources because the following files were changed: ${changedFiles.join(
        ', '
      )}`
    );

    try {
      await this.compileKotlinSources();
    } catch (e) {
      compilation.errors.push(e);
    } finally {
      done();
    }
  }

  async compileKotlinSources() {
    await kotlinCompiler.compile(
      Object.assign({}, this.options, {
        output: this.outputPath,
        sources: this.sources,
        moduleKind: 'commonjs',
        noWarn: true,
        verbose: false,
      })
    );

    if (this.options.optimize) {
      return this.optimizeDeadCode();
    }
  }

  async watchKotlinSources(compilation, done) {
    const patterns = this.sources.map(it => `${it}/**/*.kt`);
    const paths = await globby(patterns, {
      absolute: true,
    });

    const normalizedPaths = paths.map(it => path.normalize(it));

    if (compilation.fileDependencies.add) {
      for (const path of normalizedPaths) {
        compilation.fileDependencies.add(path);
      }
    } else {
      // Before Webpack 4 - fileDepenencies was an array
      for (const path of normalizedPaths) {
        compilation.fileDependencies.push(path);
      }
    }

    done();
  }

  async compileIfFirstRun(params, done) {
    if (!this.initialRun) {
      return done();
    }

    this.initialRun = false;

    this.log.info('Initial compilation of Kotlin sources...');

    try {
      await this.compileKotlinSources();

      if (!this.options.optimize) {
        await Promise.all([
          fs.remove(path.join(this.options.output, 'kotlin.js')),
          this.copyLibraries(),
        ]);
      }

      await this.setPastDate();
    } catch (e) {
      this.generateErrorBundle(e.toString());
      this.firstCompilationError = e;
    } finally {
      done();
    }
  }

  reportFirstCompilationError(compilation) {
    if (this.firstCompilationError) {
      compilation.errors.push(this.firstCompilationError);
      this.firstCompilationError = null;
    }
  }

  optimizeDeadCode() {
    this.log.info(
      `Optimizing Kotlin runtime... \nLibraries:`,
      this.options.librariesMainFiles.join('\n')
    );

    return DCEPlugin.optimize({
      moduleName: this.options.moduleName,
      outputDir: this.options.output,
      outputPath: this.outputPath,
      librariesPaths: [].concat(this.options.librariesMainFiles),
    });
  }

  async setPastDate() {
    // Hack around multiple recompilations on start: set past modify date
    const timestamp = 100;
    const output = this.options.output;

    const files = await fs.readdir(output);
    await Promise.all(
      files.map(file =>
        fs.utimes(path.resolve(output, file), timestamp, timestamp)
      )
    );
  }

  generateErrorBundle(errorMessage) {
    const file = path.join(
      this.options.output,
      `${this.options.moduleName}.js`
    );

    this.log.info('Generating error entry', file);

    if (!fs.existsSync(this.options.output)) {
      fs.mkdirSync(this.options.output);
    }

    const message = `throw new Error("Failed to compile Kotlin code: ${(
      errorMessage || ''
    ).replace(/\n/g, ' ')}")`;
    fs.writeFileSync(file, message);
  }
}

module.exports = KotlinWebpackPlugin;
