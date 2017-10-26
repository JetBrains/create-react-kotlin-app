# kotlinc-js-api

This package provides JavaScript APIs for calling the [Kotlin to JavaScript compiler](https://kotlinlang.org/docs/tutorials/javascript/getting-started-command-line/command-line-library-js.html).

## Installation

```bash
npm i @jetbrains/kotlinc-js-api --save
```

## Usage

```js
const kotlinCompiler = require('@jetbrains/kotlinc-js-api');

kotlinCompiler
  .compile({
    output: './build/dist.js',
    sources: [__dirname + '/src'],
    sourceMaps: true,
    moduleKind: 'commonjs',
    libraries: [
      'path/to/some.meta.js',
    ]
  })
  .then(() => console.log('Compilation successful'));
```