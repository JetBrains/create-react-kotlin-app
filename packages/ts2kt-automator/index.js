#!/usr/bin/env node
'use strict';
const fs = require('fs');
const lib = require('./lib');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const packageName = argv.packageName;
const dest = `${argv.dest}/${packageName}`;

if (!packageName) {
  throw new Error('Package name should be specified like: packageName=jquery');
}

if (!argv.dest) {
  throw new Error('Destination folder should be specified like: dest=typings');
}

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

lib
  .installTypes(packageName)
  .then(() => lib.convertTypesToKotlin(packageName, dest));
