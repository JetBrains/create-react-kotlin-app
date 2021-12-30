package example

import kotlinx.browser.document
import react.dom.*

fun main(args: Array<String>) {
    render(document.getElementById("app")) {
        span {
            key = "hello"
            +"Hello"
        }
        +" World!"
    }
}

