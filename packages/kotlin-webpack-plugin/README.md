# kotlin-webpack-plugin

This package allows compiling [Kotlin](https://kotlinlang.org/) files to JavaScript using webpack.

## Installation

```bash
npm i @jetbrains/kotlin-webpack-plugin --save-dev
```

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

You can find a sample configuration in the [example](./example) folder.