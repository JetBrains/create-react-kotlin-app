'use strict';
const KotlinWebpackPlugin = require('../plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'kotlinApp', // kotlinApp is the default module name

  resolve: {
    modules: ['kotlin_build', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../kotlin_build'),
        exclude: [
          /kotlin\.js$/, // Kotlin runtime doesn't have sourcemaps at the moment
        ],
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },

  output: {
    path: __dirname + '/build',
    filename: 'build.js',
  },

  plugins: [
    new KotlinWebpackPlugin({
      src: __dirname,
      verbose: true,
      optimize: true,
      librariesAutoLookup: true,
      packagesContents: [require('../../react-scripts/package.json')],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
};
