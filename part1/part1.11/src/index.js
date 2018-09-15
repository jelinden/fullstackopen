import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        };
        this.addToCount = this.addToCount.bind(this);
        this.avg = this.avg.bind(this);
        this.positive = this.positive.bind(this);
    }

    addToCount(id) {
        return () => {
            var item = {};
            item[id] = this.state[id] + 1;
            this.setState(item);
        };
    }

    avg() {
        var count = this.state.good + this.state.neutral + this.state.bad;
        return ((this.state.good * 1 + this.state.neutral * 0 + this.state.bad * -1) / count).toFixed(1);
    }

    positive(good, neutral, bad) {
        return ((this.state.good / (this.state.good + this.state.neutral + this.state.bad)) * 100).toFixed(1);
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button id="good" name="hyvä" addToCount={this.addToCount} />
                <Button id="neutral" name="neutraali" addToCount={this.addToCount} />
                <Button id="bad" name="huono" addToCount={this.addToCount} />
                <Statistics counter={this.state} avg={this.avg} positive={this.positive} />
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
    if (props.counter.good === 0 && props.counter.neutral === 0 && props.counter.bad === 0) {
        return (
            <div>
                <h1>statistiikka</h1>
                ei yhtään palautetta annettu
            </div>
        );
    }
    return (
        <div>
            <h1>statistiikka</h1>
            <table>
                <tbody>
                    <Statistic name="hyvä" counter={props.counter.good} />
                    <Statistic name="neutraali" counter={props.counter.neutral} />
                    <Statistic name="huono" counter={props.counter.bad} />
                    <Statistic name="keskiarvo" counter={props.avg()} />
                    <Statistic name="positiivisia" counter={props.positive() + ` %`} />
                </tbody>
            </table>
        </div>
    );
};

const Statistic = props => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.counter}</td>
        </tr>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
