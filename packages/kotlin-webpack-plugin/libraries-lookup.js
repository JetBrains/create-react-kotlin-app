'use strict';
const fs = require('fs');
const path = require('path');

function lookupInPackage(pkg) {
  return (
    [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]
      // We provide the Kotlin runtime externally, so we aren't looking for it
      .filter(dependencyName => dependencyName !== 'kotlin')
      .map(dependencyName => {
        try {
          const nodeVersion = process.versions.node.split('.');
          const major = parseInt(nodeVersion[0]);
          var main;
          if (major > 8 || (major == 8 && parseInt(nodeVersion[1]) == 9)) {
            // resolve only searches this scripts node_modules for the dependency in newer versions
            const paths = require.resolve.paths(dependencyName);
            paths.push(path.resolve(process.cwd(), 'node_modules'));
            main = require.resolve(dependencyName, { paths });
          } else {
            main = require.resolve(dependencyName);
          }
          // Kotlin libraries contain a <libraryname>.meta.js file
          const hasKotlinMetaFile = fs.existsSync(
            main.replace(/(\.js)?$/, '.meta.js')
          );
          return hasKotlinMetaFile ? main : null;
        } catch (err) {
          return null;
        }
      })
      .filter(dependencyMainFilePath => !!dependencyMainFilePath)
  );
}

function removeDuplicates(libraries) {
  return [...new Set(libraries)];
}

module.exports = {
  lookupKotlinLibraries(packages) {
    const libraries = packages.reduce((acc, pkg) => {
      return [...acc, ...lookupInPackage(pkg)];
    }, []);

    return removeDuplicates(libraries);
  },
};
