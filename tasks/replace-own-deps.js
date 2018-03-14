#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

// Replaces internal dependencies in package.json with local package paths.

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '../packages');
const pkgFilename = path.join(packagesDir, 'react-scripts/package.json');
const data = require(pkgFilename);

fs.readdirSync(packagesDir).forEach(name => {
  const dependencyName = data.dependencies[`@jetbrains/${name}`]
    ? `@jetbrains/${name}`
    : name;

  if (data.dependencies[dependencyName]) {
    data.dependencies[dependencyName] = 'file:' + path.join(packagesDir, name);
    console.log(
      'Local dependency replaced:',
      dependencyName,
      data.dependencies[dependencyName]
    );
  }
});

fs.writeFile(pkgFilename, JSON.stringify(data, null, 2), 'utf8', err => {
  if (err) {
    throw err;
  }
  console.log('Replaced local dependencies.');
});
