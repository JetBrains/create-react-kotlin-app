package test

import kotlinext.js.*
import react.*

fun main(args: Array<String>) {
    val el = createElement("test", js {}, "test")
    println(JSON.stringify(el))
}
