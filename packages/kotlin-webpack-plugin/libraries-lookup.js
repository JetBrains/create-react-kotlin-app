'use strict';
const fs = require('fs');

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
          const main = require.resolve(dependencyName);
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
