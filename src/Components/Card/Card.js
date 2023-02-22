import React from "react";
import Genres from "../Genres";
import Rating from "../Rating";
import { format } from "date-fns"
import './Card.css'
import icon from './nofoto.jpg'

export default class Card extends React.Component {

    render () {
        const {header, movieDate, genres, overview, image, stars, genresDB} = this.props;
        
        let sourceIMG = (image === 'https://image.tmdb.org/t/p/w200null') ?  icon : image
        return (
            <li className="card">
                <img className="card__img" src={sourceIMG}  alt='poster'/>
                <div className="card__info">
                    <header className="card__title">{header}</header>
                    <div className="card__release-date">{movieDate ? format(new Date(movieDate), 'MMMM d, yyyy') : movieDate}</div>
                    <Genres genres={genres} genresDB={genresDB}/>
                    <div className="card__overview">{overview}</div>
                    <div className="card__stars">{stars}</div>
                    <Rating />
                </div>
            </li>
        )
    }
}