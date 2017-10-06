'use strict';
const KotlinWebpackPlugin = require('../plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'kotlinApp', // this is the default value for moduleName option

  resolve: {
    modules: ['kotlin_build', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../kotlin_build'),
        exclude: /kotlinx-html-js/, //TODO: include it back when kotlinx sourcemaps get fixed
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
      optimize: true, // Turn it off to work with sourcemaps
      libraries: [
        '@jetbrains/kotlin-extensions',
        '@jetbrains/kotlin-react',
        '@jetbrains/kotlin-react-dom',
        '@hypnosphi/kotlinx-html-js',
      ].map(pkg => require.resolve(pkg)),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
};
