import React from "react";
import Genres from "../Genres";
import './Card.css'

export default class Card extends React.Component {
    render () {
        return (
            <div className="card">
                <header className="card-title">Header</header>
                <div className="card-release_date">Date</div>
                <Genres />
                <div className="card-overview">Info</div>
                <div className="card-poster_path">Image</div>
                {/* <div className="card-vote_average">Stars</div>
                <div>Rating</div> */}
                
            </div>
        )
    }
}