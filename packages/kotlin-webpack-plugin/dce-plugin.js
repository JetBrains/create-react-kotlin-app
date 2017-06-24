'use strict';
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');
const readDirFiles = require('read-dir-files');

function eliminateDeadCode(options) {
  return new Promise((resolve, reject) => {
    const compilation = spawn(
      require.resolve('kotlin-compiler/bin/kotlin-dce-js'),
      options.files,
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

    compilation.on('close', () => hasErrors ? reject(errors) : resolve());
  });
}

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function optimize(options) {
  const files = [
    options.ouputPath,
    options.runtimePath || require.resolve('kotlin'),
  ].concat(options.librariesPaths);

  eliminateDeadCode({ files })
    .then(() => {
      return new Promise((resolve, reject) => {
        readDirFiles.read(path.resolve('.', './min'), (err, files) => {
          if (err) {
            return reject(err);
          }
          deleteFolderRecursive(path.resolve('.', './min'));
          resolve(files);
        });
      });
    })
    .then(optimizedFiles => {
      options.modules.forEach(module => {
        if (
          files.indexOf(module.resource) !== -1 &&
          module.resource !== options.ouputPath
        ) {
          const filename = path.basename(module.resource);

          module._source = new module._source.constructor(
            optimizedFiles[filename].toString(),
            module._source.name
          );
        }
      });

      options.callback();
    })
    .catch(err => {
      options.compilation.errors.push(err);
      options.callback();
    });
}

module.exports = {
  eliminateDeadCode: eliminateDeadCode,
  optimize: optimize,
};
