package app

import react.*
import react.dom.*
import logo.*
import ticker.*

class App: RComponent<RProps, RState>() {
  override fun RBuilder.render() {
    div("App-header") {
      key = "header"
      logo()
      h2 {
        +"Welcome to React with Kotlin"
      }
    }
    p("App-intro") {
      key = "intro"
      +"To get started, edit "
      code { +"app/App.kt" }
      +" and save to reload."
    }
    p("App-ticker.ticker") {
      key = "ticker"
      +"This app has been running for "
      ticker()
      +" seconds."
    }
  }
}

fun RBuilder.app() = child(App::class) {}
