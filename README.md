[![Build Status](https://teamcity.jetbrains.com/app/rest/builds/buildType:JetBrainsUi_CreateReactKotlinApp/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=JetBrainsUi_CreateReactKotlinApp&guest=1)
[![JetBrains incubator project](http://jb.gg/badges/incubator.svg)](https://confluence.jetbrains.com/display/ALL/JetBrains+on+GitHub)

# Create React Kotlin App 

Create [React](https://facebook.github.io/react/) apps in [Kotlin](https://kotlinlang.org/) with no build configuration.

## Quick Overview
Install `create-react-kotlin-app` using npm:
```sh
npm install -g create-react-kotlin-app
```
Create a new project:
```sh
create-react-kotlin-app my-app
````
Run the project:
```sh
cd my-app/
npm start
```
Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

Create React Kotlin App will configure Kotlin, webpack, and IntelliJ IDEA so that you can focus on the code instead.

Just create a project, and you’re good to go.

## Getting Started

### Installation

Install it once globally:

```sh
npm install -g create-react-kotlin-app
```

You can skip this step if you have `create-react-app` already installed.

**You’ll need to have Node >= 6 on your machine**. You can use [nvm](https://github.com/creationix/nvm#usage) to easily switch between Node versions for different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for Create React Kotlin App itself.

### Creating an App

To create a new app, run:

```sh
create-react-kotlin-app my-app
cd my-app
```

Or if you have `create-react-app` installed, you can run:

```sh
create-react-app my-app --scripts-version react-scripts-kotlin
cd my-app
```

It will create a folder called `my-app` inside the current folder.<br>
The project will be preconfigured for working with it in [IntelliJ IDEA](https://www.jetbrains.com/idea/). If you don't want to create the `.idea` folder that is required for IntelliJ IDEA, add `--no-idea` option.<br>
The initial project structure will be created and dependencies will be installed:

```
my-app/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
    manifest.json
  src/
    app/
      App.css
      App.kt
    index/
      index.css
      index.kt
    logo/
      kotlin.svg
      Logo.css
      Logo.kt
      react.svg
    ticker/
      Ticker.kt
```

It's a simple app that shows the time that passed since the app was opened.<br>
Once the installation is done, you can run some commands inside the project folder:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload automatically when you make edits.<br>
You will see build errors and lint warnings in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It ensures that React is bundled in production mode and the build is optimized for best performance.

The build is minified and the filenames include hashes for cache management. Your app is ready to be deployed.

## Philosophy

* **One Dependency:** There is just one build dependency. It uses webpack and other amazing projects, but provides a cohesive curated experience on top of them.

* **No Configuration Required:** You don't need to configure anything. Reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

* **No Lock-In:** You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.

## What’s Inside?

The generated project uses the following npm modules:
* [Kotlin wrappers](https://github.com/JetBrains/kotlin-wrappers): [@jetbrains/kotlin-react](https://www.npmjs.com/package/@jetbrains/kotlin-react), [@jetbrains/kotlin-react-dom](https://www.npmjs.com/package/@jetbrains/kotlin-react-dom), [@jetbrains/kotlin-extensions](https://www.npmjs.com/package/@jetbrains/kotlin-extensions)
* [Kotlin DSL for HTML](https://www.npmjs.com/package/kotlinx-html)
* [Kotlin Compiler](https://www.npmjs.com/package/kotlin-compiler)
* [webpack](https://webpack.github.io/) with [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [@jetbrains/kotlin-webpack-plugin](https://www.npmjs.com/package/@jetbrains/kotlin-webpack-plugin), [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) and [style-loader](https://github.com/webpack/style-loader)
* and others.

## Why Use This?

With `create-react-kotlin-app` you can quickly bootstrap a new application using Kotlin and React. Your environment will have everything you need to build a new Kotlin app:
* Kotlin and React syntax support.
* A dev server that automatically compiles your Kotlin code to JavaScript.
* A `build` script to bundle JavaScript, CSS, and images for production, with sourcemaps.

## Limitations

* The current build configuration does not support Kotlin [dead code elimination](https://kotlinlang.org/docs/reference/javascript-dce.html) for JavaScript.
* Unit testing is currently not supported in this project. We're now working on the Jest Kotlin wrapper. Stay tuned!

### Converting to a Custom Setup

You can “eject” from the tool and use it as a boilerplate generator.

Running `npm run eject` copies all configuration files and transitive dependencies (webpack, Kotlin Compiler, etc) right into your project so you have full control over them. Commands like `npm start` and `npm run build` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Contributing and reporting issues

Please report the issues on [YouTrack](https://youtrack.jetbrains.com/issues/CRKA).

The contributing guide is coming soon.

## Acknowledgements

This project is based on Facebook's [Create React App](https://github.com/facebookincubator/create-react-app). Many thanks to its authors for their work and inspiration.
