import React from "react";
import FilterInput from "./FilterInput";
import AddContact from "./AddContact";
import ListNumbers from "./ListNumbers";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [
                { name: "Arto Hellas", number: "040-123456" },
                { name: "Martti Tienari", number: "040-123456" },
                { name: "Arto Järvinen", number: "040-123456" },
                { name: "Lea Kutvonen", number: "040-123456" }
            ],
            filter: "",
            newName: "",
            newNumber: "",
            error: undefined
        };
        this.addContact = this.addContact.bind(this);
        this.nameExists = this.nameExists.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    addContact(event) {
        event.preventDefault();
        console.log("adding contact", event);
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

    setFilter(event) {
        this.setState({ filter: event.target.value.toLowerCase() });
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

                <FilterInput filter={this.setFilter} />
                <AddContact addContact={this.addContact} error={this.state.error} />
                <ListNumbers persons={this.state.persons} filter={this.state.filter} />
            </div>
        );
    }
}

export default App;
