#!/usr/bin/env node
'use strict';
const fs = require('fs');
const lib = require('./lib');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const packageName = argv.packageName;
const dest = `${argv.dest}/${packageName}`;

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

lib
  .installTypes(packageName)
  .then(() => lib.convertTypesToKotlin(packageName, dest));
