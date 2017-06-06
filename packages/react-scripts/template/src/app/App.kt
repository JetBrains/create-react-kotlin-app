package app

import react.*
import react.dom.*
import kotlinext.js.*
import logo.*
import ticker.*

val appStyles = require("src/app/App.css")

class App: RComponent<RProps, RState>() {
  override fun RBuilder.render(): ReactElement? {
    return div("App") {
      div("App-header") {
        logo()
        h2 {
          +"Welcome to React with Kotlin"
        }
      }
      p("App-intro") {
        +"To get started, edit "
        code { +"app/App.kt" }
        +" and save to reload."
      }
      p("App-ticker.ticker") {
        +"This app has been running for "
        ticker()
        +" seconds."
      }
    }
  }
}

fun RBuilder.app() = child(App::class) {}
