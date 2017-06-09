'use strict';
const path = require('path');
const lib = require('../lib');
const fs = require('fs');

const dest = path.resolve(__dirname, 'build');
const DIST_FILE_PATH = path.resolve(__dirname, './build/index.kt');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

function clean() {
  if (fs.existsSync(DIST_FILE_PATH)) {
    fs.unlinkSync(DIST_FILE_PATH);
  }
}

/**
 * Testing install of latest version
 */
function testLatestVersion() {
  clean();
  const packageName = 'jquery';
  return lib
    .installTypes(packageName)
    .then(() => lib.convertTypesToKotlin(packageName, dest))
    .then(() => {
      if (fs.existsSync(DIST_FILE_PATH)) {
        console.log('"Latest version" test passed');
      } else {
        throw new Error('Result file was not found: ' + DIST_FILE_PATH);
      }
    });
}

/**
 * Testing install of specific version
 */
function testSpecificVersion() {
  clean();
  const packageName = 'jquery@1.10.29';
  return lib
    .installTypes(packageName)
    .then(() => lib.convertTypesToKotlin(packageName, dest))
    .then(() => {
      if (fs.existsSync(DIST_FILE_PATH)) {
        console.log('"Latest version" test passed');
      } else {
        throw new Error('Result file was not found: ' + DIST_FILE_PATH);
      }
    });
}

/**
 * Test package that has no typing in @type because it has types delivered with the package itself ("moment" does this)
 */
function testTypingsInPackage() {
  clean();
  const packageName = 'moment';
  return lib
    .installTypes(packageName)
    .then(() => lib.convertTypesToKotlin(packageName, dest))
    .then(() => {
      if (fs.existsSync(DIST_FILE_PATH)) {
        console.log('"Typing in package" test passed');
      } else {
        throw new Error('Result file was not found: ' + DIST_FILE_PATH);
      }
    });
}

testLatestVersion()
  .then(testSpecificVersion)
  .then(testTypingsInPackage)
  .catch(() => process.exit(1));
