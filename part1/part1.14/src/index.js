import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            votes: Array.from(Array(this.props.anecdotes.length), () => 0)
        };
        this.next = this.next.bind(this);
        this.vote = this.vote.bind(this);
        this.mostVoted = this.mostVoted.bind(this);
    }

    next() {
        this.setState({
            selected: Math.floor(Math.random() * anecdotes.length)
        });
    }

    mostVoted() {
        return (
            this.state.votes
                // map into objects so that we can get the index too
                .map((val, index) => {
                    return { value: val, index: index };
                })
                .reverse() // reverse the order
                // get the biggest value and the index
                .reduce((a, b) => {
                    return a.value > b.value ? a : b;
                })
        );
    }

    vote() {
        const voteNumber = this.state.selected;
        var votes = [...this.state.votes];
        votes[voteNumber] += 1;
        this.setState({
            votes: votes
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.vote}>Vote</button>
                <button onClick={this.next}>Next anecdote</button>

                <div id="anecdote">{this.props.anecdotes[this.state.selected]}</div>
                <div>Has {this.state.votes[this.state.selected]} votes.</div>
                <div>
                    <h4>Anecdote with most votes</h4>
                    <div>"{this.props.anecdotes[this.mostVoted().index]}"</div>
                    <div>has {this.mostVoted().value} votes</div>
                </div>
            </div>
        );
    }
}

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
