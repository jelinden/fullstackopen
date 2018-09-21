import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const kurssit = [
        {
            nimi: "Half Stack -sovelluskehitys",
            id: 1,
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
        },
        {
            nimi: "Node.js",
            id: 2,
            osat: [
                {
                    nimi: "Routing",
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: "Middlewaret",
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            {kurssit.map(kurssi => {
                return <Kurssi kurssi={kurssi} />;
            })}
        </div>
    );
};

const Kurssi = props => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto kurssi={props.kurssi} />
            <Yhteensa kurssi={props.kurssi} />
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

const Yhteensa = props => {
    return (
        <p>
            yhteensä{" "}
            {props.kurssi.osat
                .map(item => {
                    return item.tehtavia;
                })
                .reduce((acc, curr) => {
                    return acc + curr;
                })}{" "}
            tehtävää
        </p>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
