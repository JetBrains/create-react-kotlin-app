# ts2kt-automator

This package wraps [ts2kt](https://github.com/Kotlin/ts2kt) - Converter of TypeScript definition files to Kotlin declarations (stubs).
It autodownloads specified package typings from "@types/%packagename%" and runs ts2kt for it.

## Usage: 
```bash
ts2kt --dest=types --packageName=jquery
```

Where:
* **dest** is path to folder where generated Kotlin files should be placed. 
Directory with package name will be created inside.
* **packageName** is the name of package to download and convert. 
A version could be specified after "@" like `--packageName=jquery@2`. 
If version is not specified, version from your project's package.json will be used. 
If there is no such package in package.json, "latest" will be used.
