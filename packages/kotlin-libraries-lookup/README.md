# kotlin-libraries-lookup

This package looks for [Kotlin](https://kotlinlang.org/) libraries in specified path

## Installation

```bash
npm i @jetbrains/kotlin-libraries-lookup --save-dev
```

## Usage

Example of webpack configuration:
```js
const librariesLookup = require('@jetbrains/kotlin-libraries-lookup');

console.log('Libraries:', librariesLookup(__dirname));
```