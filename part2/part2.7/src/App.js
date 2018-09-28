import React from "react";

const error = {
    border: "1px solid red",
    padding: "5px",
    width: "150px",
    marginBottom: "7px"
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [{ name: "Arto Hellas" }],
            newName: "",
            error: undefined
        };
        this.addName = this.addName.bind(this);
        this.nameExists = this.nameExists.bind(this);
    }

    addName(event) {
        event.preventDefault();
        console.log("nappia painettu", event.target.name.value);
        var persons = this.state.persons;
        if (this.nameExists(event.target.name.value)) {
            this.setState({ error: "Nimi löytyy listalta jo" });
            return;
        }
        persons.push({ name: event.target.name.value });
        this.setState({ persons: persons, newName: event.target.name.value, error: undefined });
    }

    nameExists(value) {
        var found = false;
        this.state.persons.forEach(item => {
            if (item.name === value) {
                found = true;
                return;
            }
        });
        return found;
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    {this.state.error ? <div style={error}>{this.state.error}</div> : ""}
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
