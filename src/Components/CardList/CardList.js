import React from "react";
import Card from "../Card/Card";

import './CardList.css'


function CardList ({movieData,genresDB}){
        const elements = movieData.map((item) => {
            const {id, ...movieProps} = item
             
            return (
                    <Card key={id}
                    {...movieProps}
                    genresDB={genresDB}
                    />
            )
        })
        return (
            <ul className="card-list">{elements}</ul>    
        )

}

export default CardList