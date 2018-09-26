'use strict';
const kotlinCompiler = require('@jetbrains/kotlinc-js-api');
const globby = require('globby');
const fs = require('fs-extra');
const path = require('path');
const DCEPlugin = require('./dce-plugin');
const librariesLookup = require('./libraries-lookup');

function getDefaultPackagesContents() {
  try {
    return [require(path.resolve(process.cwd(), 'package.json'))];
  } catch (e) {
    return [];
  }
}

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

function prepareLibraries(opts) {
  if (opts.librariesAutoLookup) {
    if (opts.libraries.length > 0) {
      console.warn(
        'KotlinWebpackPlugin: "libraries" option is ignored because "librariesAutoLookup" option is enabled'
      );
    }

    opts.libraries = librariesLookup.lookupKotlinLibraries(
      opts.packagesContents
    );
    if (opts.verbose) {
      console.info(
        `>>> Kotlin Plugin: >>> autolookup found the following Kotlin libs:
         ${opts.libraries.join('\n')}`
      );
    }
  }

  return Object.assign({}, opts, {
    libraries: opts.libraries.map(main =>
      main.replace(/(?:\.js)?$/, '.meta.js')
    ),
    librariesMainFiles: opts.libraries,
  });
}

class KotlinWebpackPlugin {
  constructor(options) {
    const opts = Object.assign({}, DEFAULT_OPTIONS, options);

    this.options = prepareLibraries(opts);

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
    this.prevTimestamps = {};
    this.initialRun = true;
    this.sources = [].concat(this.options.src);
  }

  log(...args) {
    if (this.options.verbose) {
      console.info('>>> Kotlin Plugin: >>>', ...args);
    }
  }

  apply(compiler) {
    compiler.plugin('before-compile', this.compileIfFirstRun);
    compiler.plugin('compilation', this.reportFirstCompilationError);
    compiler.plugin('make', this.compileIfKotlinFilesChanged);
    compiler.plugin('emit', this.watchKotlinSources);
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

  compileIfKotlinFilesChanged(compilation, done) {
    const changedFiles = Object.keys(compilation.fileTimestamps).filter(
      watchfile =>
        (this.prevTimestamps[watchfile] || this.startTime) <
        (compilation.fileTimestamps[watchfile] || Infinity)
    );

    this.prevTimestamps = compilation.fileTimestamps;

    if (!changedFiles.some(it => /\.kt$/.test(it))) {
      done();
      return;
    }

    this.log(
      `Compiling Kotlin sources because the following files were changed: ${changedFiles.join(
        ', '
      )}`
    );
    this.compileKotlinSources()
      .then(done)
      .catch(err => {
        compilation.errors.push(err);
        done();
      });
  }

  compileKotlinSources() {
    return kotlinCompiler
      .compile(
        Object.assign({}, this.options, {
          output: this.outputPath,
          sources: this.sources,
          moduleKind: 'commonjs',
          noWarn: true,
          verbose: false,
        })
      )
      .then(() => {
        if (this.options.optimize) {
          return this.optimizeDeadCode();
        }
      });
  }

  watchKotlinSources(compilation, done) {
    const patterns = this.sources.map(it => it + '/**/*.kt');
    globby(patterns, {
      absolute: true,
    }).then(paths => {
      const normalizedPaths = paths.map(it => path.normalize(it));
      if (compilation.fileDependencies.add) {
        for (const path of normalizedPaths) {
          compilation.fileDependencies.add(path);
        }
      } else {
        // Before Webpack 4 - fileDepenencies was an array
        compilation.fileDependencies.push(...normalizedPaths);
      }
      done();
    });
  }

  compileIfFirstRun(compilationParams, done) {
    if (!this.initialRun) {
      done();
      return;
    }

    this.initialRun = false;

    this.log('Initial compilation of Kotlin sources...');
    this.compileKotlinSources()
      .then(() => {
        if (!this.options.optimize) {
          return this.copyLibraries();
        }
      })
      .then(this.setPastDate)
      .then(done)
      .catch(err => {
        this.generateErrorBundle(err.toString());
        this.firstCompilationError = err;
        done();
      });
  }

  reportFirstCompilationError(compilation) {
    if (this.firstCompilationError) {
      compilation.errors.push(this.firstCompilationError);
      this.firstCompilationError = null;
    }
  }

  optimizeDeadCode() {
    this.log(
      `Optimizing Kotlin runtime... \nLibraries:`,
      this.options.librariesMainFiles.join('\n')
    );
    return DCEPlugin.optimize({
      outputDir: this.options.output,
      outputPath: this.outputPath,
      librariesPaths: [].concat(this.options.librariesMainFiles),
    });
  }

  setPastDate() {
    //Hack around multiple recompilations on start: set past modify date
    const timestamp = 100;
    const output = this.options.output;

    return (
      fs
        .readdir(output)
        .then(files =>
          Promise.all(
            files.map(file => {
              return fs.utimes(
                path.resolve(output, file),
                timestamp,
                timestamp
              );
            })
          )
        )
        // discard the value
        .then(() => {})
    );
  }

  generateErrorBundle(errorMessage) {
    const file = path.join(
      this.options.output,
      `${this.options.moduleName}.js`
    );

    if (this.options.verbose) {
      console.log('>>> Kotlin Plugin: >>> generating error entry', file);
    }

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
