import React from "react";

const name = {
    width: "120px",
    display: "inline-block"
};

const ListNumbers = props => {
    var deleteFunc = props.delete;
    return (
        <div>
            <h2>Numerot</h2>
            {props.persons.filter(item => item.name.toLowerCase().includes(props.filter)).map((p, i) => {
                return (
                    <div key={i}>
                        <div style={name}>{p.name}</div>
                        <div style={name}>{p.number}</div>
                        <div style={name}>
                            <button onClick={deleteFunc} value={p.id}>
                                delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListNumbers;
