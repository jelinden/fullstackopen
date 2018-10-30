import React from "react";
import FilterInput from "./FilterInput";
import AddContact from "./AddContact";
import ListNumbers from "./ListNumbers";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            filter: "",
            newName: "",
            newNumber: "",
            error: undefined
        };
        this.addContact = this.addContact.bind(this);
        this.nameExists = this.nameExists.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:3001/persons").then(response => {
            this.setState({ persons: response.data });
        });
    }

    addContact(event) {
        event.preventDefault();
        if (this.nameExists(event.target.name.value)) {
            this.setState({ error: "Nimi löytyy listalta jo" });
            return;
        }

        var newContact = { name: event.target.name.value, number: event.target.number.value };
        axios.post("http://localhost:3001/persons", newContact);
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
