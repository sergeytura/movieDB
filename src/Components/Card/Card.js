import React from "react";
import Genres from "../Genres";
import './Card.css'

export default class Card extends React.Component {
    render () {
        const {header, movieDate, genres, overview, image} = this.props;
        return (
            <li className="card">
                {/* <div className="card__img"> */}
                <img className="card__img" src={image} alt='Movie Image'/>
                {/* </div> */}
                <div className="card__info">
                    <header className="card__title">{header}</header>
                    <div className="card__release-date">{movieDate}</div>
                    <Genres />
                    <div className="card__overview">{overview}</div>
                </div>
                
                
                {/* <div className="card-vote_average">Stars</div>
                <div>Rating</div> */}
                
            </li>
        )
    }
}