import React from "react";

const FilterInput = props => {
    return (
        <div>
            <label htmlFor="filterContacts">rajaa näytettäviä</label>
            <input id="filterContacts" onChange={props.filter} />
        </div>
    );
};

export default FilterInput;
