# kotlin-webpack-plugin

A webpack plugin that compiles kotlin sources

## Installation

```bash
npm i kotlin-webpack-plugin --save-dev
```

## Usage

Example webpack configuration:
```js
const KotlinWebpackPlugin = require('../plugin');

module.exports = {
  entry: 'kotlinApp', // this is the default value for moduleName option

  resolve: {
    // We include 'kotlin_build" in modules because there will be compiled "kotlinApp.js" file
    modules: ['node_modules', 'kotlin_build']
  },

  // [OPTIONAL] To enable sourcemaps, source-map-loader should be configured
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../kotlin_build'),
        use: ['@princed/source-map-loader'],
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
      src: __dirname + '/src',
    })
  ]
};
```

Also see [example](./example).