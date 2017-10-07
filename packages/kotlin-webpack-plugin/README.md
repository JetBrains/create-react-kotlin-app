# kotlin-webpack-plugin

A webpack plugin that compiles Kotlin sources

## Installation

```bash
npm i kotlin-webpack-plugin --save-dev
```

## Usage

Example of webpack configuration:
```js
const KotlinWebpackPlugin = require('../plugin');

module.exports = {
  entry: 'kotlinApp', // kotlinApp is the default module name

  resolve: {
    // "kotlin_build" is where the compiled Kotlin code (kotlinApp.js) is outputted
    modules: ['node_modules', 'kotlin_build']
  },

  // [OPTIONAL] To enable sourcemaps, source-map-loader should be configured
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
      src: __dirname + '/src',
    })
  ]
};
```

Also see [example](./example).