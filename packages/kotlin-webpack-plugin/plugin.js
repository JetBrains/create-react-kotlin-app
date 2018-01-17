'use strict';
const kotlinCompiler = require('@jetbrains/kotlinc-js-api');
const globby = require('globby');
const fs = require('fs-extra');
const path = require('path');
const DCEPlugin = require('./dce-plugin');

const DEFAULT_OPTIONS = {
  src: null, // An array or string with sources path
  output: 'kotlin_build',
  moduleName: 'kotlinApp',
  libraries: [],
  verbose: false,
  sourceMaps: true,
  sourceMapEmbedSources: 'always',
  metaInfo: false,
  optimize: false,
};

class KotlinWebpackPlugin {
  constructor(options) {
    const opts = Object.assign({}, DEFAULT_OPTIONS, options);
    this.librariesMainFiles = opts.libraries;
    this.options = Object.assign({}, opts, {
      libraries: opts.libraries.map(main =>
        main.replace(/(?:\.js)?$/, '.meta.js')
      ),
    });
    this.outputPath = path.resolve(
      `${this.options.output}/${this.options.moduleName}.js`
    );

    this.compileIfKotlinFilesChanged = this.compileIfKotlinFilesChanged.bind(
      this
    );
    this.watchKotlinSources = this.watchKotlinSources.bind(this);
    this.compileIfFirstRun = this.compileIfFirstRun.bind(this);
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
    compiler.plugin('make', this.compileIfKotlinFilesChanged);
    compiler.plugin('emit', this.watchKotlinSources);
  }

  copyLibraries() {
    const files = this.librariesMainFiles.concat(
      this.librariesMainFiles.map(main => `${main}.map`)
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
      compilation.fileDependencies.push(...normalizedPaths);
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
      .then(done, done);
  }

  optimizeDeadCode() {
    this.log(`Optimizing Kotlin runtime...`);
    return DCEPlugin.optimize({
      outputDir: this.options.output,
      outputPath: this.outputPath,
      librariesPaths: [].concat(this.librariesMainFiles),
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
}

module.exports = KotlinWebpackPlugin;
