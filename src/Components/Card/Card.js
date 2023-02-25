import React from "react";
import Genres from "../Genres";
import Rating from "../Rating";
import { format } from "date-fns"
import './Card.css'
import icon from './nofoto.jpg'
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

export default class Card extends React.Component {

    state = {
        loading: true,
        error: false
    }

    componentDidMount () {
        this.setState({
            loading: false,
            error: false
        })
    }

    componentDidCatch () {
        this.setState({
            loading: false,
            error: true
        })
    }

    render () {
        const {header, movieDate, genres, overview, image, stars, genresDB} = this.props;
        const {loading,error} = this.state;
        const sourceIMG = (image === 'https://image.tmdb.org/t/p/w200null') ?  icon : image
        const spinner = loading ? <Spinner /> : null;
        const errorMessage =  error ? <ErrorIndicator /> : null;
        const hasData = !(loading || error)
        const content = hasData ? 
        <React.Fragment>
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
        </React.Fragment>
        :null
        
        return (
            <React.Fragment>
                {content}
                {errorMessage}
                {spinner}
            </React.Fragment>
        )
    }
}