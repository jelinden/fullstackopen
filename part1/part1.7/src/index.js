import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
            avg: 0,
            positive: 0
        };
        this.addToCount = this.addToCount.bind(this);
        this.avg = this.avg.bind(this);
        this.positive = this.positive.bind(this);
    }

    addToCount(e) {
        var good = this.state.good;
        var neutral = this.state.neutral;
        var bad = this.state.bad;

        if (e.target.id === "good") {
            good = good + 1;
        } else if (e.target.id === "neutral") {
            neutral = neutral + 1;
        } else if (e.target.id === "bad") {
            bad = bad + 1;
        }
        this.setState({
            good: good,
            neutral: neutral,
            bad: bad,
            avg: this.avg(good, neutral, bad),
            positive: this.positive(good, neutral, bad)
        });
    }

    avg(good, neutral, bad) {
        var count = good + neutral + bad;
        return ((good * 1 + neutral * 0 + bad * -1) / count).toFixed(1);
    }

    positive(good, neutral, bad) {
        return ((good / (good + neutral + bad)) * 100).toFixed(1);
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <button id="good" onClick={this.addToCount}>
                        hyvä
                    </button>
                    <button id="neutral" onClick={this.addToCount}>
                        neutraali
                    </button>
                    <button id="bad" onClick={this.addToCount}>
                        huono
                    </button>
                </div>
                <Statistiikka counter={this.state} />
            </div>
        );
    }
}

const Statistiikka = props => {
    return (
        <div>
            <h1>statistiikka</h1>
            <div>
                <div>hyvä {props.counter.good}</div>
                <div>neutraali {props.counter.neutral}</div>
                <div>huono {props.counter.bad}</div>
                <div>keskiarvo {props.counter.avg}</div>
                <div>positiivisia {props.counter.positive} %</div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
