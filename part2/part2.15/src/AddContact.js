import React from "react";

const error = {
    border: "1px solid red",
    padding: "5px",
    width: "150px",
    marginBottom: "7px"
};

const AddContact = props => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={props.addContact}>
                {props.error ? <div style={error}>{props.error}</div> : ""}
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
        </div>
    );
};

export default AddContact;
