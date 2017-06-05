'use strict';
const KotlinWebpackPlugin = require('../plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'kotlinApp', // this is the default value for moduleName option

  resolve: {
    modules: ['node_modules', 'kotlin_build'],
    alias: {
      'kotlinx-html-js': '@hypnosphi/kotlinx-html-js',
      'kotlin-extensions': '@hypnosphi/kotlin-extensions',
      'kotlin-react': '@hypnosphi/kotlin-react',
      'kotlin-react-dom': '@hypnosphi/kotlin-react-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../kotlin_build'),
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
      libraries: [
        '@hypnosphi/kotlin-extensions',
        '@hypnosphi/kotlin-react',
        '@hypnosphi/kotlin-react-dom',
        '@hypnosphi/kotlinx-html-js',
      ].map(pkg => require.resolve(pkg)),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
};
