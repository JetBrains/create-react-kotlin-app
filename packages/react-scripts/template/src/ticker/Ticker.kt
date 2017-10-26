package ticker

import react.*
import react.dom.*
import kotlin.browser.*

interface TickerProps : RProps {
    var startFrom: Int
}

interface TickerState : RState {
    var secondsElapsed: Int
}

class Ticker(props: TickerProps) : RComponent<TickerProps, TickerState>(props) {
    override fun TickerState.init(props: TickerProps) {
        secondsElapsed = props.startFrom
    }

    var timerID: Int? = null

    override fun componentDidMount() {
        timerID = window.setInterval({
            // actually, the operation is performed on a state's copy, so it stays effectively immutable
            setState { secondsElapsed += 1 }
        }, 1000)
    }

    override fun componentWillUnmount() {
        window.clearInterval(timerID!!)
    }

    override fun RBuilder.render() {
        +"This app has been running for ${state.secondsElapsed} seconds."
    }
}

fun RBuilder.ticker(startFrom: Int = 0) = child(Ticker::class) {
    attrs.startFrom = startFrom
}
