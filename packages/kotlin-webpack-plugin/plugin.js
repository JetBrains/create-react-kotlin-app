'use strict';
const kotlinCompiler = require('kotlinc-js');
const globby = require('globby');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  output: 'kotlin_build',
  moduleName: 'kotlinApp',
  libraries: [],
  verbose: false,
  sourceMaps: true
};

class KotlinWebpackPlugin {
  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options, {
      libraries: options.libraries.map(main =>
        main.replace(/(?:\.js)?$/, '.meta.js'))
    });
    this.outputPath = `${this.options.output}/${this.options.moduleName}.js`;

    this.compileIfKotlinFilesChanged = this.compileIfKotlinFilesChanged.bind(this);
    this.watchKotlinSources = this.watchKotlinSources.bind(this);
    this.compileIfFirstRun = this.compileIfFirstRun.bind(this);

    this.startTime = Date.now();
    this.prevTimestamps = {};
    this.initialRun = true;
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

    this.log(`Compiling Kotlin sources because of changes in files: ${changedFiles.join(', ')}`);
    this.compileKotlinSources()
      .then(done)
      .catch(err => {
        compilation.errors.push(err);
        done();
      });
  }

  compileKotlinSources() {
    return kotlinCompiler.compile({
      output: this.outputPath,
      sources: [this.options.src],
      sourceMaps: this.options.sourceMaps,
      moduleKind: 'commonjs',
      noWarn: 'true',
      libraries: this.options.libraries
    });
  }

  watchKotlinSources(compilation, done) {
    globby(['**/*.kt'], {
      cwd: this.options.src,
      absolute: true
    }).then(paths => {
      compilation.fileDependencies.push(...paths);
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
        //Hack around multiple recompilations on start: set past modify date
        const timestamp = 100;
        fs.utimesSync(this.outputPath, timestamp, timestamp);
        fs.utimesSync(`${this.outputPath}.map`, timestamp, timestamp);
      })
      .then(done, done);
  }
}

module.exports = KotlinWebpackPlugin;
