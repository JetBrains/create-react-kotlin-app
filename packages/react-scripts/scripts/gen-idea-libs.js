/**
 * Created by jetbrains on 31/05/2017.
 */
'use strict';
const path = require('path');
const generate = require('@jetbrains/gen-idea-libs');
const librariesLookup = require('@jetbrains/kotlin-webpack-plugin/libraries-lookup');

const paths = require('../config/paths');

const libPaths = librariesLookup.lookupKotlinLibraries([
  require(paths.appPackageJson),
]);

const generationConfig = libPaths.reduce((config, libPath) => {
  config[path.basename(libPath, '.js')] = require.resolve(libPath);
  return config;
}, {});

generate(generationConfig, paths.projectPath);
