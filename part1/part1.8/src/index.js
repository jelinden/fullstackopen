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

    addToCount(id) {
        return () => {
            var good = this.state.good;
            var neutral = this.state.neutral;
            var bad = this.state.bad;

            if (id === "good") {
                good = good + 1;
            } else if (id === "neutral") {
                neutral = neutral + 1;
            } else if (id === "bad") {
                bad = bad + 1;
            }
            this.setState({
                good: good,
                neutral: neutral,
                bad: bad,
                avg: this.avg(good, neutral, bad),
                positive: this.positive(good, neutral, bad)
            });
        };
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
                <Button id="good" name="hyvä" addToCount={this.addToCount} />
                <Button id="neutral" name="neutraali" addToCount={this.addToCount} />
                <Button id="bad" name="huono" addToCount={this.addToCount} />
                <Statistics counter={this.state} />
            </div>
        );
    }
}

const Button = props => {
    return (
        <button id={props.id} onClick={props.addToCount(props.id)}>
            {props.name}
        </button>
    );
};

const Statistics = props => {
    return (
        <div>
            <h1>statistiikka</h1>
            <Statistic name="hyvä" counter={props.counter.good} />
            <Statistic name="neutraali" counter={props.counter.neutral} />
            <Statistic name="huono" counter={props.counter.bad} />
            <Statistic name="keskiarvo" counter={props.counter.avg} />
            <Statistic name="positiivisia" counter={props.counter.positive + ` %`} />
        </div>
    );
};

const Statistic = props => {
    return (
        <div>
            {props.name} {props.counter}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
