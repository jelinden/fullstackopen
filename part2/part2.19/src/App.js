import React from "react";
import FilterInput from "./FilterInput";
import AddContact from "./AddContact";
import ListNumbers from "./ListNumbers";
import ContactService from "./services/persons";
import "./index.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            filter: "",
            error: undefined,
            info: undefined
        };
        this.addContact = this.addContact.bind(this);
        this.nameExists = this.nameExists.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.delete = this.delete.bind(this);
        this.addInfoMessage = this.addInfoMessage.bind(this);
    }

    componentDidMount() {
        ContactService.getAll().then(response => {
            this.setState({ persons: response.data });
        });
    }

    addContact(event) {
        event.preventDefault();
        const newName = event.target.name.value;
        if (this.nameExists(newName)) {
            var result = window.confirm(newName + " on jo luettelossa, korvataanko vanha numero uudella?");
            if (result) {
                const contacts = this.state.persons;
                var filteredContact = contacts.filter(c => c.name === newName)[0];
                filteredContact.number = event.target.number.value;
                ContactService.update(filteredContact.id, filteredContact)
                    .then(() => {
                        ContactService.getAll().then(response => {
                            this.setState({ persons: response.data });
                        });
                        this.addInfoMessage(`muokattiin ${newName}`);
                    })
                    .catch(() => {
                        ContactService.create(filteredContact).then(() => {
                            ContactService.getAll().then(response => {
                                this.setState({ persons: response.data });
                            });
                            this.addInfoMessage(`lisättiin ${newName}`);
                        });
                    });
            }
            return;
        }

        var newContact = { name: newName, number: event.target.number.value };
        ContactService.create(newContact).then(() => {
            ContactService.getAll().then(response => {
                this.setState({ persons: response.data });
            });
            this.addInfoMessage(`lisättiin ${newName}`);
        });
    }

    delete(event) {
        event.preventDefault();
        const contacts = this.state.persons;
        const id = event.target.value;
        const person = contacts.filter(c => c.id === +id)[0];
        var result = window.confirm("Poistetaanko " + person.name);
        if (result) {
            const filteredContacts = contacts.filter(c => c.id !== +id);
            ContactService.deletePerson(id).then(() => {
                this.addInfoMessage(`poistettiin ${person.name}`);
            });
            this.setState({
                persons: filteredContacts
            });
        }
    }

    addInfoMessage(message) {
        this.setState({ info: message });
        window.setTimeout(() => {
            this.setState({ info: undefined });
        }, 5000);
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
                {this.state.info ? <div id="info">{this.state.info}</div> : ""}
                <FilterInput filter={this.setFilter} />
                <AddContact addContact={this.addContact} error={this.state.error} />
                <ListNumbers persons={this.state.persons} filter={this.state.filter} delete={this.delete} />
            </div>
        );
    }
}

export default App;
