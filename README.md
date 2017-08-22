# Create React Kotlin App [![Build Status](https://teamcity.jetbrains.com/app/rest/builds/buildType:JetBrainsUi_CreateReactKotlinApp/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=JetBrainsUi_CreateReactKotlinApp&guest=1)

Create [React](https://facebook.github.io/react/) apps in [Kotlin](https://kotlinlang.org/) with no build configuration.

* [Getting Started](#getting-started) – How to create a new app.

Create React App works on macOS, Windows, and Linux.<br>
If something doesn’t work please [file an issue](https://github.com/JetBrains/create-react-kotlin-app/issues/new).

## Quick Overview

```sh
npm install -g create-react-kotlin-app

create-react-kotlin-app my-app
cd my-app/
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

<img src='https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67' width='600' alt='npm start'>

### Get Started Immediately

You **don’t** need to install or configure tools like webpack or Kotlin.<br>
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Getting Started

### Installation

Install it once globally:

```sh
npm install -g create-react-kotlin-app
```

**You’ll need to have Node >= 6 on your machine**. You can use [nvm](https://github.com/creationix/nvm#usage) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for Create React Kotlin App itself.

### Creating an App

To create a new app, run:

```sh
create-react-kotlin-app my-app
cd my-app
```

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

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

It's a simple app that shows the current time.<br>
Once the installation is done, you can run some commands inside the project folder:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will see the build errors and lint warnings in the console.

<img src='https://camo.githubusercontent.com/41678b3254cf583d3186c365528553c7ada53c6e/687474703a2f2f692e696d6775722e636f6d2f466e4c566677362e706e67' width='600' alt='Build errors'>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/JetBrains/create-react-kotlin-app/blob/master/packages/react-scripts/template/README.md#running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
By default, it also [includes a service worker](https://github.com/jetbrains/create-react-kotlin-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

Your app is ready to be deployed.

### `npm run gen-idea-libs` or `yarn gen-idea-libs`

### `npm run get-types` or `yarn get-types` 

## How to Update to New Versions?

Please refer to the [User Guide](https://github.com/jetbrains/create-react-kotlin-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases) for this and other information.

## Philosophy

* **One Dependency:** There is just one build dependency. It uses Webpack, Babel, ESLint, and other amazing projects, but provides a cohesive curated experience on top of them.

* **No Configuration Required:** You don't need to configure anything. Reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

* **No Lock-In:** You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.

## Why Use This?

With `create-react-kotlin-app` you can quickly bootstrap a new application using Kotlin and React. Your environment will have everything you need to build a new Kotlin app:
* Kotlin and React syntax support.
* A dev server that automatically compiles your Kotlin code to JavaScript.
* A `build` script to bundle JS, CSS, and images for production, with sourcemaps.

**The feature set is intentionally limited**. It doesn’t support advanced features such as server rendering or CSS modules. The tool is also **non-configurable** because it is hard to provide a cohesive experience and easy updates across a set of tools when the user can tweak anything.

### Converting to a Custom Setup

**If you’re a power user** and you aren’t happy with the default configuration, you can “eject” from the tool and use it as a boilerplate generator.

Running `npm run eject` copies all the configuration files and the transitive dependencies (webpack, Kotlin Compiler, Babel, etc) right into your project so you have full control over them. Commands like `npm start` and `npm run build` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Limitations

## What’s Inside?

The tools used by Create React Kotlin App are subject to change.
Currently it is a thin layer on top of many amazing community projects, such as:

* KotlinC-JS Compiler
* Kotlin React wrapper
* [webpack](https://webpack.github.io/) with [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) and [style-loader](https://github.com/webpack/style-loader)
* [Babel](http://babeljs.io/) with ES6 and extensions used by Facebook (JSX, [object spread](https://github.com/sebmarkbage/ecmascript-rest-spread/commits/master), [class properties](https://github.com/jeffmo/es-class-public-fields))
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Jest](http://facebook.github.io/jest)
* and others.

All of them are transitive dependencies of the provided npm package.

## Contributing

We'd love to have your helping hand on `create-react-kotlin-app`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Acknowledgements

This project is based on Facebook's [Create React App](https://github.com/facebookincubator/create-react-app). Thank you to its authors for their work and inspiration.