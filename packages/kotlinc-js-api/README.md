# kotlinc-js

A node wrapper for kotlinc-js compiler.

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
    ],
  })
  .then(() => console.log('Compiled!'));
```