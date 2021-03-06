import React from "react";

const error = {
    border: "1px solid red",
    padding: "5px",
    width: "150px",
    marginBottom: "7px"
};

const name = {
    width: "120px",
    display: "inline-block"
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [{ name: "Arto Hellas", number: "050-123456" }],
            newName: "",
            newNumber: "",
            error: undefined
        };
        this.addContact = this.addContact.bind(this);
        this.nameExists = this.nameExists.bind(this);
    }

    addContact(event) {
        event.preventDefault();

        if (this.nameExists(event.target.name.value)) {
            this.setState({ error: "Nimi löytyy listalta jo" });
            return;
        }

        var newContact = { name: event.target.name.value, number: event.target.number.value };
        var contacts = this.state.persons;
        contacts.push(newContact);
        this.setState({
            persons: contacts,
            newName: newContact.name,
            newNumber: newContact.number,
            error: undefined
        });
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
                <form onSubmit={this.addContact}>
                    {this.state.error ? <div style={error}>{this.state.error}</div> : ""}
                    <div>
                        nimi: <input name="name" />
                    </div>
                    <div>
                        numero: <input name="number" />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                {this.state.persons.map((p, i) => {
                    return (
                        <div key={i}>
                            <div style={name}>{p.name}</div>
                            <div style={name}>{p.number}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default App;
