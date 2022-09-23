[![Build Status](https://teamcity.jetbrains.com/app/rest/builds/buildType:JetBrainsUi_CreateReactKotlinApp/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=JetBrainsUi_CreateReactKotlinApp&guest=1)
[![JetBrains team project](http://jb.gg/badges/team.svg)](https://confluence.jetbrains.com/display/ALL/JetBrains+on+GitHub)

[English](https://github.com/JetBrains/create-react-kotlin-app/blob/master/README.md)
[Korean](https://github.com/JetBrains/create-react-kotlin-app/blob/master/README-ko.md)

# Create React Kotlin App

ビルド構成をせずに [React](https://facebook.github.io/react/) のアプリを [Kotlin](https://kotlinlang.org/) でコーディングすることができます。

これは **初期プレビュー版** です。

## 概要

**先に進む前に [JDK 8](http://www.oracle.com/technetwork/java/index.html) がインストールされていることを確認してください。** Java 9 以降はまだサポートされていません.

プロジェクトの作成:

```sh
npx create-react-kotlin-app my-app
```

([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) にはnpm 5.2以降が付属しています。より古いnpmバージョンについては[インストール](#インストール)を参照してください。）

プロジェクトを動かす:

```sh
cd my-app/
npm start
```

次に [http://localhost:3000/](http://localhost:3000/) を開いてアプリを動作させます

実際にビルドする準備が整ったら `npm run build` を使用して縮小バンドルを作成します。

Create React Kotlin App を使用するだけで、Kotlin,webpack,IntelliJ IDEAの構成が行われます。それにより、あなたはコードを書くことだけに集中することができます。

プロジェクトを作成するだけで、全てが上手くいくでしょう。

## 入門

### インストール

最初にグローバルにインストールします:

```sh
npm install -g create-react-kotlin-app
```

`create-react-app` がすでにインストールされているか、もしくは `npx` を利用している場合、この手順はスキップできます。

**Node6以上が必要です**。 [nvm](https://github.com/creationix/nvm#usage) を使用すれば、プロジェクトごとに簡単にNodeバージョンを切り替えることができます。

**このツールはサーバーサイドNode.jsを想定していません**。 Nodeのインストールは、Create React Kotlin Appを動かすためにのみ必要です。

### KotlinでReactを使う

React上でKotlinでアプリケーションを開発するには、 [React用のKotlinラッパー](https://www.npmjs.com/package/@jetbrains/kotlin-react) が必要です。
それのドキュメントと使用例は [モジュールのリポジトリ](https://github.com/JetBrains/kotlin-wrappers/tree/master/kotlin-react)にあります。

### Kotlin/JS パッケージを追加する

Create React Kotlin App をベースにしたパッケージを追加するための **設定は必要ありません**。私達は開発者のためにこのことを重要視しています。
 [https://www.npmjs.com/package/kotlinx-coroutines-core](coroutines) サポートを追加するためには `npm install kotlinx-coroutines-core` を実行するか、 [React Router DOMのラッパー](https://www.npmjs.com/package/@jetbrains/kotlin-react-router-dom) を入れるために `npm install @jetbrains/kotlin-react-router-dom` を実行してください。

### アプリを作る

新しいアプリを作るためには、次のコマンドを実行してください:

```sh
create-react-kotlin-app my-app
cd my-app
```

または `create-react-app` がすでにインストールされている場合は、次のコマンドを実行することができます:

```sh
create-react-app my-app --scripts-version react-scripts-kotlin
cd my-app
```

このコマンドは、現在のフォルダ内にmy-appというフォルダを生成します

このプロジェクトは、[IntelliJ IDEA](https://www.jetbrains.com/idea/) ですぐに開発できるように事前に設定されています。 もし、intelliJ IDEAの.ideaフォルダを作成したくないのであれば、`--no-idea` オプションをつけてください。

初期のプロジェクト構造が作成され、依存関係がインストールされます:

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

アプリを開いてから経過した時間を表示する簡単なアプリです。
インストールが完了したら、プロジェクトフォルダ内でいくつかのコマンドを実行できます:

### `npm start` または `yarn start`

開発モードでアプリを起動します。
ブラウザ上で表示するためには [http://localhost:3000](http://localhost:3000) にアクセスします。

ページを編集すると、自動的にページが更新されます。
コンソールにはビルドエラーとlintの警告が表示されます。
`Kotlin.defineModule is not a function` というエラーが出た場合、npmのキャッシュを削除してみてください。

```sh
rm -rf node_modules/.cache
```

### `npm run build` または `yarn build`

`build` フォルダにプロダクト用のアプリをビルドします。
これは、Reactが本番環境用にバンドルされていることを約束し、パフォーマンスのために最適化されたものです。

ビルドは圧縮され、ファイル名にはキャッシュを管理するためのハッシュが含まれています、これでアプリをデプロイする準備が整いました。

### アプリをデバッグする

内蔵のJavaScriptデバッガを使用して、IntelliJ IDEA Ultimateで実行中のアプリを直接デバッグできます。 IDEは新しくChromeを実行し、それにデバッガを接続します。

`npm start` でアプリを起動します。 Kotlinのコードにブレークポイントを入れます。
次に、右上の実行/デバッグ設定の一覧から `Debug in Chrome` を選択し、緑色のアイコンをクリックするか、macOSの場合は `^D` WindowsかLinuxの場合は `F9` を押してデバッグを開始します。

現在、デバッグは IntelliJ IDEA Ultimate 2017.3 のみでサポートされています。

ブラウザの開発者ツールでデバッグを行うこともできます。

## 哲学

* **依存関係は一つだけ:** ビルドの依存関係は一つだけです。これは、webpackとその他の素晴らしいプロジェクトを使っていますが、それらの上でよりまとまりのある、精巧な体験を提供します。

* **設定不要:** 何も設定する必要はありません。 開発ビルドと本番ビルドの両方の素晴らしい設定があなたのためにされているので、あなたはコードを書くことだけに集中することができます。

* **ロックインがない:** いつでもカスタム設定に「eject」できます。 1つのコマンドを実行すると、すべての設定とビルドの依存関係がプロジェクトに直接移動されるので、中断したところからすぐに再開できます。

## 何を内包しているか

生成されたプロジェクトは、以下のようなnpmモジュールを使用しています。:
* [Kotlin wrappers](https://github.com/JetBrains/kotlin-wrappers): [@jetbrains/kotlin-react](https://www.npmjs.com/package/@jetbrains/kotlin-react), [@jetbrains/kotlin-react-dom](https://www.npmjs.com/package/@jetbrains/kotlin-react-dom), [@jetbrains/kotlin-extensions](https://www.npmjs.com/package/@jetbrains/kotlin-extensions)
* [Kotlin DSL for HTML](https://www.npmjs.com/package/kotlinx-html)
* [Kotlin Compiler](https://www.npmjs.com/package/kotlin-compiler)
* [webpack](https://webpack.github.io/) with [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [@jetbrains/kotlin-webpack-plugin](https://www.npmjs.com/package/@jetbrains/kotlin-webpack-plugin), [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) and [style-loader](https://github.com/webpack/style-loader)
* その他

## 何故これを選ぶか

`create-react-kotlin-app` を使うと、KotlinとReactを使って新しいアプリケーションを素早く作成することができます。あなたの環境に、新しいKotlinアプリを構築するために必要なものがすべて揃得ることができます:

* Kotlin と React の構文サポート。
* KotlinのコードをJavaScriptに自動コンパイルするサーバー。
* ソースマップを使って、本番用のJavaScript、CSS、および画像をバンドルするためのビルドスクリプト。

## 制限

* このプロジェクトでは、単体テストは現在サポートされていません。 現在Jest Kotlinラッパーに取り組んでいます。 乞うご期待！

## カスタムセットアップへの変換

カスタムセットアップ変換ツールから「eject」してボイラーテンプレートジェネレーターとして使用することができます。

`npm run eject` を実行すると、すべてのファイルと推移的な依存関係（webpack、Kotlin Compilerなど）がプロジェクトに直接コピーされるので、それらを完全にコントロールできます。
`npm start` や `npm run build` などのコマンドはまだ機能しますが、コピーされたスクリプトで実行するので、それらを細かく調整することができます。 この時点で、あなたのプロジェクトはあなた自身のものです。

**注意:これは不可逆的な操作です、「eject」した場合、もとに戻すことはできません**

## 問題の報告と貢献

Please report issues on [YouTrack](https://youtrack.jetbrains.com/issues/CRKA) で問題を報告するようにしてください。GitHubのIssue機能は、このプロジェクトでは無効になっています。

このプロジェクトへの貢献は大歓迎です！ [issues](https://youtrack.jetbrains.com/issues/CRKA?q=State:%20Open) を確認するか、[Slack](http://slack.kotlinlang.org/) の **#react** チャンネルでチャットしてください。

## 謝辞

このプロジェクトは、Facebook社の [Create React App](https://github.com/facebookincubator/create-react-app)をベースにしています。
製作者の素晴らしいインスピレーションと仕事に感謝を述べます。
