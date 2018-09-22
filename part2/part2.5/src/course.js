import React from "react";

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

export default Kurssi;
