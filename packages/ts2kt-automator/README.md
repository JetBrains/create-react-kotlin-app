# ts2kt-automator

This package wraps [ts2kt](https://github.com/Kotlin/ts2kt), a converter of TypeScript definition files to Kotlin declarations (stubs).
It downloads the specified package typings from "@types/%packagename%" and runs ts2kt on them.

## Installation

```bash
npm i @jetbrains/ts2kt-automator --save
```

## Usage: 
```bash
ts2kt-automator --dest=types jquery
```

Where:
* **dest** is the path to the folder where generated Kotlin files should be placed. 
Directory with the name of the package will be created inside.
* **packageName** is the name of the package to download and convert. 
A version number can be specified after "@" as follows: `--packageName=jquery@2`. 
If the version is not specified, the version listed in your project's package.json will be used. 
If no such package is listed in package.json, "latest" will be used.
