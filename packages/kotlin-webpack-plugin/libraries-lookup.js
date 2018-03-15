'use strict';
const walk = require('walkdir');

const DEFAULT_OPTIONS = {
  maxDepth: 6,
};

function lookupInPath(rootPath, options) {
  options = Object.assign({}, options, DEFAULT_OPTIONS);
  return (
    walk
      .sync(rootPath, {
        max_depth: options.maxDepth,
      })
      // Kotlin libraries contain a <libraryname>.meta.js file
      .filter(path => path.endsWith('.meta.js'))
      // We provide the Kotlin runtime externally, so we aren't looking for it
      .filter(path => !path.endsWith('/kotlin.meta.js'))
      .map(path => path.replace('.meta.js', '.js'))
  );
}

module.exports = {
  lookupKotlinLibraries(librariesAutoLookupPaths) {
    return librariesAutoLookupPaths.reduce((acc, rootPath) => {
      return [...acc, ...lookupInPath(rootPath)];
    }, []);
  },
};
