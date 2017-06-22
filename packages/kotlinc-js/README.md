# kotlinc-js

A node wrapper for kotlinc-js compiler.

## Installation

```bash
npm i kotlinc-js --save
```

## Usage

```js
const kotlinCompiler = require('../kotlin-compiler');

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