#!/usr/bin/env node
'use strict';
const lib = require('./lib');
const minimist = require('minimist');
const mkdirp = require('mkdirp');
const fs = require('fs');

const argv = minimist(process.argv.slice(2));
const packageName = process.argv[process.argv.length - 1];

const dest = argv.dest;

if (!argv.dest) {
  throw new Error(
    'Destination folder should be specified as follows: --dest=typings'
  );
}

function installOnePackage(packageName, destFolder) {
  const [name] = packageName.split('@');
  const dest = `${destFolder}/${name}`;

  return new Promise((resolve, reject) => {
    mkdirp(dest, function() {
      lib
        .installTypes(name)
        .then(() => lib.convertTypesToKotlin(name, dest))
        .catch(reject)
        .then(resolve);
    });
  });
}

function installAllPackages() {
  console.log(
    'We\'ll download every package from "dependencies" in package.json which is not downloaded yet.'
  );
  const dependencies = lib.getPackageDependencies();

  Object.keys(dependencies)
    .reduce((promise, packageName) => {
      const [name] = packageName.split('@');
      const packageDest = `${dest}/${name}`;

      if (fs.existsSync(packageDest)) {
        console.log(
          `Path "${packageDest}" already exists and will not be overridden.`
        );
        return promise;
      }

      return promise.then(() => installOnePackage(name, dest)).catch(err => {
        try {
          fs.unlinkSync(packageDest);
        } catch (err) {
          console.error('Cannot clear folder after error', packageDest, err);
        }
        console.error(err);
      });
    }, Promise.resolve())
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

if (!packageName) {
  installAllPackages();
} else {
  installOnePackage(packageName, dest).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
