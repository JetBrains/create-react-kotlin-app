package example

import react.dom.*
import kotlin.browser.*

fun main(args: Array<String>) {
    render(document.getElementById("app")) {
        div { +"Hello!" }
    }
}

