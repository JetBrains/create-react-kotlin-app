[![Build Status](https://teamcity.jetbrains.com/app/rest/builds/buildType:JetBrainsUi_CreateReactKotlinApp/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=JetBrainsUi_CreateReactKotlinApp&guest=1)
[![JetBrains team project](http://jb.gg/badges/team.svg)](https://confluence.jetbrains.com/display/ALL/JetBrains+on+GitHub)

[Japanese](https://github.com/JetBrains/create-react-kotlin-app/blob/master/README-ja.md)
[Korean](https://github.com/JetBrains/create-react-kotlin-app/blob/master/README-ko.md)
[Chinese](https://github.com/JetBrains/create-react-kotlin-app/blob/master/README-zh_cn.md)

# Create React Kotlin App

在不填加 build 配置的情况下，使用[Kotlin](https://kotlinlang.org/)创建[React](https://facebook.github.io/react/)应用。

请注意这是一个 **早期预览版本** 。

## 快速预览

**在开始之前，请确保你安装了[JDK 8](http://www.oracle.com/technetwork/java/index.html)** ，Java 9 目前是不支持的。

创建一个新的项目：

```sh
npx create-react-kotlin-app my-app
```
([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 存在于 npm 5.2+ 或更高版本，如果你使用旧的npm版本，请参见[安装](#安装))

运行这个项目

```sh
cd my-app/
npm start
```
然后打开 [http://localhost:3000/](http://localhost:3000/) 来查看你的应用。<br>
当你做好部署到生产的准备，使用 `npm run build` 创建一个 minified bundle

Create React Kotlin App 将会配置 Kotlin, webpack 和 IntelliJ IDEA ，你可以专注于你的代码。

仅仅创建一个项目，你就可以轻松开始。

## 开始

### 安装

全局安装：

```sh
npm install -g create-react-kotlin-app
```

如果你已经安装了 `create-react-app` 或者你在使用 `npx`， 你可以跳过这步。


**你需要使用 Node >= 6 的版本**. 你可以使用 [nvm](https://github.com/creationix/nvm#usage) 在不同项目间切换node版本

**This tool doesn’t assume a Node backend**. The Node installation is only required for Create React Kotlin App itself.

### 使用Kotlin编写React应用

要使用Kotlin编写React应用，你需要使用一个[Kotlin的React包装](https://www.npmjs.com/package/@jetbrains/kotlin-react)，
你可以在[这里](https://github.com/JetBrains/kotlin-wrappers/tree/master/kotlin-react)找到它的文档和示例

### 添加 Kotlin/JS

**不需要任何配置**来为基于Create React Kotlin App创建的项目添加用Kotlin编写的包，我们会为你做好这一切。
比如，你可以简单地运行 `npm install @jetbrains/kotlin-react-router-dom` 来安装 [wrapper for React Router DOM](https://www.npmjs.com/package/@jetbrains/kotlin-react-router-dom).


### 创建一个应用

要创建一个新的应用，运行：

```sh
create-react-kotlin-app my-app
cd my-app
```
如果你安装了 `create-react-app` ，你可以运行：

```sh
create-react-app my-app --scripts-version react-scripts-kotlin
cd my-app
```
它将创建一个叫 `my-app` 的文件夹在当前目录下。<br>
项目将被自动预配置为使用 [IntelliJ IDEA](https://www.jetbrains.com/idea/) 开发。如果你不想创建 `.idea` 这个被 IntelliJ IDEA 需要的文件夹，请在运行时添加 `--no-idea` 选项。<br>
以下初始的项目结构将被自动创建，依赖将会自动安装： 


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

这是一个简单的应用程序，显示了自打开应用程序以来经过的时间。<br>
安装完成后，您可以在项目文件夹中运行一些命令：

### `npm start` or `yarn start`

在开发模式下运行应用<br>
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看

当你编辑时，页面会自动刷新<br>
你将在控制台中看到构建错误和 lint 警告

如果你遇到了 `Kotlin.defineModule is not a function` 错误，尝试删除npm缓存：

	rm -rf node_modules/.cache

### `npm run build` or `yarn build`

在 `build` 目录中为生产环境构建<br>
为生产环境构建的版本位于 `build` 目录中<br>
它确保了 React 使用生产模式，并且这个构建已经过优化，可以获得最佳性能

这个构建是 minified 过的，且文件名包含了用于缓存管理的哈希

### 调试应用

你可以使用 IntelliJ IDEA 旗舰版内置的 JavaScript 调试器调试运行中的应用。IDE将会启动一个新的Chrome实力，并为此添加调试器。

使用 `npm start` 启动你的应用，并在Kotlin代码中添加断点

在右上角的 run/debug configurations 中选择 `Debug in Chrome` 并点击绿色的调式按钮，或按下 `^D`(在 Mac OS 上) / `F9` (在Windows和Linux上)来开始调试。

目前，调试器只被 IntelliJ IDEA Ultimate 2017.3 支持

你也可以使用浏览器中的开发者工具调试你的应用


## Philosophy

* **一个依赖:** 只有一个构建依赖。它使用了webpack和其他出色的项目，但是在它们之上提供了富有凝聚力的开发体验。

* **无需配置:** 你什么都不需要配置。为您处理了开发和生产版本的合理且良好配置，因此您可以专注于编写代码。

* **No Lock-In:** 你可以随时回到你的个性化设置。 运行一个命令，所有配置和构建依赖项都将直接移到您的项目中，您可以轻松回到上次停下来的地方。

## 这里边有什么?

生成的项目使用了以下 npm 模块：
* [Kotlin wrappers](https://github.com/JetBrains/kotlin-wrappers): [@jetbrains/kotlin-react](https://www.npmjs.com/package/@jetbrains/kotlin-react), [@jetbrains/kotlin-react-dom](https://www.npmjs.com/package/@jetbrains/kotlin-react-dom), [@jetbrains/kotlin-extensions](https://www.npmjs.com/package/@jetbrains/kotlin-extensions)
* [Kotlin DSL for HTML](https://www.npmjs.com/package/kotlinx-html)
* [Kotlin Compiler](https://www.npmjs.com/package/kotlin-compiler)
* [webpack](https://webpack.github.io/) with [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [@jetbrains/kotlin-webpack-plugin](https://www.npmjs.com/package/@jetbrains/kotlin-webpack-plugin), [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) and [style-loader](https://github.com/webpack/style-loader)
* and others.

## 为什么使用这个?

通过 `create-react-kotlin-app` 你可以快速开启一个使用 React 和 Kotlin 编写的应用。 你的环境将包含构建Kotlin React应用的一切：
* Kotlin和React语法支持
* 一个开发服务来自动编译你的Kotlin代码到JavaScript
* 一个build脚本，用于将JavaScript，CSS和图像用于生产，并带有 source maps

## 限制

* 当前项目暂时不支持使用单元测试，我们现在致力于 Jest Kotlin wrapper 敬请关注！

## 转换为自定义设置

你可以将项目从工具中“弹出”，并像模板生成器一样使用。

运行 `npm run eject` 复制所有配置文件和可转移的依赖 (webpack, Kotlin Compiler, etc) 到你的项目中，这使你拥有对项目的完整控制。诸如 `npm start` 和 `npm run build` 这样的命令将继续工作，但它们将指向复制出的脚本，因此你可以对其进行调整。 至此，你可以自由发挥了。

**注意：这是个单向操作，一旦你 `eject`，你将不能返回！**

## 贡献和报告问题

请在 [YouTrack](https://youtrack.jetbrains.com/issues/CRKA) 上报告问题，本项目的 Github issue 已经关闭

欢迎大家为此项目做贡献！ 请查看这个打开的 [issues](https://youtrack.jetbrains.com/issues/CRKA?q=State:%20Open) ，或者在 **#react**  [Slack](http://slack.kotlinlang.org/) 频道中与我们讨论

## 致谢

这个项目基于 Facebook 的 [Create React App](https://github.com/facebookincubator/create-react-app). 非常感谢其作者的工作和启发。

