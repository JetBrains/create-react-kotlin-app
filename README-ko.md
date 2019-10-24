[![Build Status](https://teamcity.jetbrains.com/app/rest/builds/buildType:JetBrainsUi_CreateReactKotlinApp/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=JetBrainsUi_CreateReactKotlinApp&guest=1)
[![JetBrains team project](http://jb.gg/badges/team.svg)](https://confluence.jetbrains.com/display/ALL/JetBrains+on+GitHub)

[English](https://github.com/JetBrains/create-react-kotlin-app/blob/master/README.md)
[Japanese](https://github.com/JetBrains/create-react-kotlin-app/blob/master/README-ja.md)

# Create React Kotlin App

코틀린 안에서 별도의 빌드 설정 없이 React 앱을 만들어보세요. 이 프로젝트는 `초기의 프리뷰 버전`임을 유의하세요.

## 훑어보기

**프로젝트를 진행하기 전 [JDK 8 버전](http://www.oracle.com/technetwork/java/index.html)이 설치되어 있는지 확인하세요.** Java 9는 아직 지원하지 않습니다.

새 프로젝트를 작성하기:

```sh
npx create-react-kotlin-app my-app
```

([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) npm 5.2+ 버전 이상에서 사용할 수 있습니다. 그 이전의 npm 버전은 [여기](#installation) 를 참고하세요.

프로젝트 시작하기:

```sh
cd my-app/
npm start
```

다음으로 [http://localhost:3000/](http://localhost:3000/)을 열어 앱을 확인할 수 있습니다.<br> 
프로덕션에 배포할 준비가 되었다면, `npm run build` 명령어를 통해 미니파이된(minified) 결과물을 만들 수 있습니다. 

Create React Kotlin App은 코드에 집중할 수 있도록 코틀린, 웹팩 그리고 IntelliJ IDEA를 알아서 설정하기 때문에 간단하게 프로젝트만 생성하면 됩니다.

## 시작하기

### 설치

create-react-kotlin-app 모듈을 전역적으로 설치합니다.

```sh
npm install -g create-react-kotlin-app
```

만약 이미 `create-react-app`가 설치되어 있거나 혹은 `npx`를 사용한다면 설치 단계는 넘어가도 됩니다. 


**6 버전 이상의 Node가 설치되어 있어야 합니다**. [nvm](https://github.com/creationix/nvm#usage)을 사용하여 서로 다른 프로젝트의 Node 버전으로 쉽게 전환할 수 있습니다.  

**이 도구는 Node 백엔드 역할을 하지 않습니다.** Node의 설치는 Create React Kotlin App 작성시에만 필요합니다.

### 코틀린과 리액트 같이 사용하기

코틀린에서 리액트를 이용하여 애플리케이션을 개발하려면 [Kotlin wrapper for React](https://www.npmjs.com/package/@jetbrains/kotlin-react)이 필요합니다. [module's repository](https://github.com/JetBrains/kotlin-wrappers/tree/master/kotlin-react)에서 이에 대한 문서와 예제에 대해 살펴볼수 있습니다.

### 코틀린/자바스크립트 패키지 추가하기

Create React Kotlin App 기반의 코틀린으로 작성된 프로젝트에서는 **별도의 설정이 필요하지 않습니다.** 이러한 설정은 Create React Kotlin App에서 구성합니다. 예를 들어 [wrapper for React Router DOM](https://www.npmjs.com/package/@jetbrains/kotlin-react-router-dom)를 설치하기 위해 간단하게 `npm install @jetbrains/kotlin-react-router-dom` 명령어를 실행시키면 됩니다. 

### 앱 생성하기

새로운 앱을 실행하기 위해 다음의 명령어를 실행하세요:

```sh
create-react-kotlin-app my-app
cd my-app
```

혹은 `create-react-app`가 설치 되어 있다면 다음의 명령어를 사용할 수 있습니다:

```sh
create-react-app my-app --scripts-version react-scripts-kotlin
cd my-app
```

명령어를 실행시킨 경로 안에 `my-app` 폴더가 생성됩니다. <br>
프로젝트는 [IntelliJ IDEA](https://www.jetbrains.com/idea/)안에서 작업할 수 있도록 사전 구성됩니다. 만약 IntelliJ IDEA에 필요한 `.idea` 폴더가 생성되는 것을 원하지 않으면, `--no-idea` 옵션을 추가하세요. <br>
초기의 프로젝트의 구조가 생성되며, 각각의 모듈이 설치됩니다.

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

이 프로젝트는 앱이 실행된 후 얼마의 시간이 지났는지를 보여주는 간단한 앱입니다.<br>
설치가 완료되면 프로젝트 폴더 안에서 몇가지의 명령어를 실행할 수 있습니다.


### `npm start` 혹은 `yarn start`

개발 모드의 앱을 실행합니다.<br>
[http://localhost:3000](http://localhost:3000)을 통해 앱을 브라우저에서 볼 수 있습니다.

앱의 코드 내에 새로운 수정이 생기면 페이지가 자동으로 새로고침 됩니다.<br>
경고 혹은 에러가 있을 경우, 콘솔창을 통해 볼 수 있습니다. 

만약 `Kotlin.defineModule is not a function` 와 같은 에러가 발생한다면, npm cache를 삭제하세요:

	rm -rf node_modules/.cache

### `npm run build` 혹은 `yarn build`

`build` 폴더에 프로덕션용 앱을 빌드합니다.<br>
리액트는 프로덕션 모드로 번들링되며, 번들된 결과물은 성능 최적화가 됩니다.

빌드된 결과물은 압축되어 캐시 관리를 위해 각각의 파일 이름은 해쉬를 포함합니다. 이제 앱은 배포될 준비가 되었습니다.

### 앱 디버깅

IntelliJ IDEA Ultimate에서 실행 중인 앱을 내장된 Javascript 디버거를 통해 디버깅할 수 있습니다. IDE는 새로운 인스턴스의 크롬을 실행하여 그 안에 디버거를 연결합니다.

`npm start` 명령어를 통해 앱을 시작하여 코틀린 코드 내에 브레이크 포인트를 추가합니다. 그 다음 오른쪽 상단의 실행/디버깅 설정에서 `크롬에서 디버깅하기(Debug in Chrome)`을 선택합니다. 그리고 초록색 디버그 아이콘을 클릭하거나 맥북의 `^D` 혹은 윈도우와 리눅스에서는 `F9`를 통해 디버깅을 실행시킬 수 있습니다.

현재는 IntelliJ IDEA Ultimate 2017.3에서만 디버깅을 지원합니다.

또한 브라우저의 개발자 도구를 통해 애플리케이션을 디버깅할 수 있습니다.

## 철학

* **하나의 의존성:** 하나의 빌드 의존성을 가집니다. 웹팩과 다른 훌륭한 프로젝트를 사용하고 있지만, 응집력 있는 정교한 경험을 제공합니다. 

* **별도의 설정이 필요하지 않습니다:** 별도의 설정을 구성할 필요가 없습니다. 개발 모드 및 프로덕션 모드의 효율적인 설정이 구성되어있기 때문에 코드를 작성하는 것에만 집중할 수 있습니다.

* **별도의 잠금(Lock-In)제한이 없습니다:** 언제든 사용자가 스스로 설정을 할 수 있도록 "eject" 할 수 있습니다. 이 명령어를 통해 모든 설정과 빌드 의존성 모듈이 프로젝트 안으로 이동되며 eject된 설정 파일들을 자유롭게 설정할 수 있다.

## 내부의 구성 요소

생성된 프로젝트는 다음의 npm 모듈을 사용합니다.:
* [Kotlin wrappers](https://github.com/JetBrains/kotlin-wrappers): [@jetbrains/kotlin-react](https://www.npmjs.com/package/@jetbrains/kotlin-react), [@jetbrains/kotlin-react-dom](https://www.npmjs.com/package/@jetbrains/kotlin-react-dom), [@jetbrains/kotlin-extensions](https://www.npmjs.com/package/@jetbrains/kotlin-extensions)
* [Kotlin DSL for HTML](https://www.npmjs.com/package/kotlinx-html)
* [Kotlin Compiler](https://www.npmjs.com/package/kotlin-compiler)
* [webpack](https://webpack.github.io/) with [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [@jetbrains/kotlin-webpack-plugin](https://www.npmjs.com/package/@jetbrains/kotlin-webpack-plugin), [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) and [style-loader](https://github.com/webpack/style-loader)
* 기타 등등.

## 왜 사용하나

`create-react-kotlin-app`을 이용하여 코틀린과 리액트를 이용할 수 있는 새로운 애플리케이션을 빠르게 구축할 수 있습니다. 새로운 코틀린 앱을 구축하는데 필요한 모든 환경을 제공합니다:
* 코틀린과 리액트 문법 지원합니다.
* 개발 서버는 코틀린 코드를 자바스크립트 코드로 자동으로 컴파일합니다. 
* `build` 스크립트는 소스맵과 함께 자바스크립트, CSS 그리고 이미지를 프로덕션 용으로 빌드합니다.

## 한계

* 현재 이 프로젝트는 단위 테스트를 지원하지 않습니다. 현재 Jest Kotlin wrapper를 만들고 있으니 앞으로 지켜봐주세요.

## 사용자 설정 변환

툴을 이용하여 "eject" 할 수 있으며, 보일러플레이트 생성기로서 사용할 수 있습니다.

`npm run eject`를 사용하면 모든 설정 파일과 변환 모듈(웹팩, 코틀린 컴파일러, 기타 등등)들이 프로젝트에 바로 복사되며 이를 통해 모든 설정을 자유롭게 구성할 수 있습니다. `npm start`와 `npm run build` 명령어는 기존과 같이 동작하되, 복사된 설정 파일에 따라 동작하기 때문에 자유롭게 구성하면 됩니다. 

**주의: 실행은 단방향이며, 한번 `eject`되면 다시 복구할 수 없습니다.**

## 프로젝트 기여하기와 이슈 리포팅하기

[YouTrack](https://youtrack.jetbrains.com/issues/CRKA)에 이슈를 등록해주세요. 이 프로젝트는 GitHub의 이슈를 사용하지 않습니다. 

이 프로젝트에 대한 기여를 환영합니다! 현재 생성된 [issues](https://youtrack.jetbrains.com/issues/CRKA?q=State:%20Open)를 보거나 [Slack](http://slack.kotlinlang.org/)의 **#react** 채널에서 우리와 함께 이야기할 수 있습니다.  

## 감사의 말

이 프로젝트는 페이스북의 [Create React App](https://github.com/facebookincubator/create-react-app)를 기반으로 합니다. 프로젝트 작성자의 작업과 영감에 대하여 감사드립니다.