import React from "react";
import axios from "axios";
import FilterInput from "./FilterInput";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            filter: "",
            error: undefined
        };
        this.setFilter = this.setFilter.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.clickMessage = this.clickMessage.bind(this);
    }

    componentDidMount() {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            this.setState({ countries: response.data });
        });
    }

    clickMessage(e) {
        this.setState({ filter: e.target.innerHTML.toLowerCase() });
    }

    getMessage(filteredItems) {
        var message = "";

        if (filteredItems.length > 10) {
            message = "Too many maches, specify another filter";
        } else if (filteredItems.length > 1) {
            message = filteredItems.map((p, i) => {
                return (
                    <div key={i}>
                        <div onClick={this.clickMessage}>{p.name}</div>
                    </div>
                );
            });
        } else if (filteredItems.length === 1) {
            message = (
                <div>
                    <h1>
                        {filteredItems[0].name} {filteredItems[0].nativeName}
                    </h1>
                    <div>capital: {filteredItems[0].capital}</div>
                    <br />
                    <div>population: {filteredItems[0].population}</div>
                    <br />
                    <img alt="" src={filteredItems[0].flag} width="200" />
                </div>
            );
        } else {
            message = "No countries to show";
        }
        return message;
    }

    setFilter(event) {
        this.setState({ filter: event.target.value.toLowerCase() });
    }

    render() {
        const filteredItems = this.state.countries.filter(item => item.name.toLowerCase().includes(this.state.filter));
        const message = this.getMessage(filteredItems);

        return (
            <div>
                <FilterInput filter={this.setFilter} />
                <br />
                <div>{message}</div>
            </div>
        );
    }
}

export default App;
