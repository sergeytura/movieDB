import React from "react";
import Card from "../Card/Card";

import './CardList.css'


function CardList ({loading,error,movieData,genresDB, setRating}){
        const elements = movieData.map((item) => {
            const {id, ...movieProps} = item
            // console.log(movieData.length)
            return (
                    <Card key={id}
                    {...movieProps}
                    genresDB={genresDB}
                    loading={loading}
                    error={error}
                    // setRating={() => setRating(id)}
                    setRating={ setRating }
                    />
            )
        })
        return (
            <ul className="card-list">{elements}</ul>    
        )

}

export default CardList