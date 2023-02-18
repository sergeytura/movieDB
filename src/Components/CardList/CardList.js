import React from "react";
import Card from "../Card/Card";
import './CardList.css'


function CardList ({movieData}){

        const elements = movieData.map((item) => {
            const {id, ...movieProps} = item
            console.log(id)
            return (
                <Card key={id}
                {...movieProps}
                />
            )
        })
        return (
            <ul className="card-list">{elements}</ul>    
        )

}

export default CardList