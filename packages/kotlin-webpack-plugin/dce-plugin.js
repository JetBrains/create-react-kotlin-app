'use strict';
const spawn = require('child_process').spawn;
const isWindows = /^win/.test(process.platform);

const extension = isWindows ? '.bat' : '';

function eliminateDeadCode(args) {
  return new Promise((resolve, reject) => {
    const compilation = spawn(
      require.resolve(`kotlin-compiler/bin/kotlin-dce-js${extension}`),
      args,
      { stdio: [process.stdin, process.stdout, 'pipe'] }
    );
    let hasErrors = false;
    let errors = '';

    compilation.stderr.on('data', data => {
      hasErrors = true;
      errors += data.toString();
    });

    compilation.on('error', err => {
      hasErrors = true;
      errors += 'kotlin-dce-js failed';
      errors += JSON.stringify(err);
    });

    compilation.on('close', () => (hasErrors ? reject(errors) : resolve()));
  });
}

function optimize(options) {
  const args = [
    '-output-dir',
    options.outputDir,
    options.outputPath,
    options.runtimePath || require.resolve('kotlin'),
  ].concat(options.librariesPaths);

  return eliminateDeadCode(args);
}

module.exports = {
  eliminateDeadCode: eliminateDeadCode,
  optimize: optimize,
};
