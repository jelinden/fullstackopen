import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const kurssi = {
        nimi: "Half Stack -sovelluskehitys",
        osat: [
            {
                nimi: "Reactin perusteet",
                tehtavia: 10,
                id: 1
            },
            {
                nimi: "Tiedonvälitys propseilla",
                tehtavia: 7,
                id: 2
            },
            {
                nimi: "Komponenttien tila",
                tehtavia: 14,
                id: 3
            }
        ]
    };

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    );
};

const Kurssi = props => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto kurssi={props.kurssi} />
        </div>
    );
};

const Otsikko = props => {
    return <h1>{props.kurssi.nimi}</h1>;
};

const Sisalto = props => {
    return (
        <div>
            {props.kurssi.osat.map(item => {
                return <Osa key={item.id} osa={item} />;
            })}
        </div>
    );
};

const Osa = props => {
    return (
        <p>
            {props.osa.nimi} {props.osa.tehtavia}
        </p>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
