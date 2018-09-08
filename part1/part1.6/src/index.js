import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        };
        this.addToCount = this.addToCount.bind(this);
    }

    addToCount(e) {
        if (e.target.id === "good") {
            this.setState({ good: this.state.good + 1 });
        } else if (e.target.id === "neutral") {
            this.setState({ neutral: this.state.neutral + 1 });
        } else if (e.target.id === "bad") {
            this.setState({ bad: this.state.bad + 1 });
        }
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
            </div>
        </div>
    );
};

App.propTypes = {
    counter: PropTypes.object
};

// App.defaultProps = {
//     counter: {
//         good: 0,
//         neutral: 0,
//         bad: 0
//     }
// };

ReactDOM.render(<App />, document.getElementById("root"));
