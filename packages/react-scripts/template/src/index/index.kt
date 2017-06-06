package index

import app.*
import kotlinext.js.*
import react.dom.*
import kotlin.browser.*

val styles = require("src/index/index.css")

fun main(args: Array<String>) {
  render(document.getElementById("root")) {
    app()
  }
}
