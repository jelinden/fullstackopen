import React from "react";

const FilterInput = props => {
    return (
        <div>
            <label htmlFor="filterContacts">find countries:</label>
            <input id="filterContacts" onChange={props.filter} />
        </div>
    );
};

export default FilterInput;
