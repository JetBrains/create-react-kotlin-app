package index

import app.*
import kotlinext.js.*
import react.dom.*
import kotlin.browser.*

@JsModule("src/registerServiceWorker")
external object registerServiceWorker {
  fun default()
}
val styles = require("src/index/index.css")

fun main(args: Array<String>) {
  render(document.getElementById("root")) {
    app()
  }
  registerServiceWorker.default()
}
