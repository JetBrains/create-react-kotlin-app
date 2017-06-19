'use strict';
const path = require('path');
const kotlinCompiler = require('../kotlin-compiler');
const fs = require('fs');

const DIST_FILE_PATH = path.resolve(__dirname, './build/dist.js');
const REFERENCE_PATH = path.resolve(__dirname, './reference.js.ref');

kotlinCompiler
  .compile({
    output: DIST_FILE_PATH,
    sources: [__dirname],
    sourceMaps: true,
    moduleKind: 'commonjs',
    libraries: [
      'node_modules/@hypnosphi/kotlin-extensions/build/classes/main/kotlin-extensions.meta.js',
      'node_modules/@hypnosphi/kotlin-react/build/classes/main/kotlin-react.meta.js',
    ],
  })
  .then(() => {
    return new Promise(
      resolve => fs.readFile(DIST_FILE_PATH, (error, data) => resolve(data))
    );
  })
  .then(compiledFileContent => {
    return new Promise(
      resolve => fs.readFile(REFERENCE_PATH, (error, data) => resolve(data))
    ).then(reference => ({
      compiledFileContent,
      reference,
    }));
  })
  .then(({ compiledFileContent, reference }) => {
    if (compiledFileContent.toString() !== reference.toString()) {
      console.error('Compiled:', compiledFileContent.toString());
      console.error('Reference:', reference.toString());
      throw new Error("Compiled code doesn't match reference");
    } else {
      console.info('Test passed');
    }
  });
