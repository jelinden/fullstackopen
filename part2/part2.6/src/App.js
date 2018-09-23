import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [{ name: "Arto Hellas" }],
            newName: ""
        };
        this.addName = this.addName.bind(this);
    }

    addName(event) {
        event.preventDefault();
        console.log("nappia painettu", event.target.name.value);
        var persons = this.state.persons;
        persons.push({ name: event.target.name.value });
        this.setState({ persons: persons, newName: event.target.name.value });
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input name="name" />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                {this.state.persons.map((p, i) => {
                    return <div key={i}>{p.name}</div>;
                })}
            </div>
        );
    }
}

export default App;
