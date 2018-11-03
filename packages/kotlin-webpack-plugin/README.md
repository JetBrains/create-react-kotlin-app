# kotlin-webpack-plugin

This package allows compiling [Kotlin](https://kotlinlang.org/) files to JavaScript using webpack.

## Installation

```bash
npm i @jetbrains/kotlin-webpack-plugin --save-dev
```

## Requirements
This plugin requires a minimum of Node v8.6.0 and Webpack v4.0.0. To use this plugin with Webpack v3.0.0, you need to use v1.2.11 of this plugin.

## Usage

Example of webpack configuration:
```js
const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');

module.exports = {
  entry: 'kotlinApp', // kotlinApp is the default module name

  resolve: {
    // "kotlin_build" is the build output directory
    modules: ['kotlin_build', 'node_modules']
  },

  // [OPTIONAL] To enable sourcemaps, source-map-loader should be configured
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../kotlin_build'),
        exclude: [
          /kotlin\.js$/, // Kotlin runtime doesn't have sourcemaps at the moment
        ],
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },

  output: {
    path: __dirname + '/build',
    filename: 'build.js'
  },

  plugins: [
    new KotlinWebpackPlugin({
      src: __dirname + '/src'
    })
  ]
};
```

You can find a sample configuration in the [example](https://github.com/JetBrains/create-react-kotlin-app/tree/master/packages/kotlin-webpack-plugin/example) folder.
