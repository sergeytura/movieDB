import React from "react";
import Genres from "../Genres";
// import Rating from "../Rating";
import { Rate } from "antd";
import { format } from "date-fns"
import './Card.css'
import icon from './nofoto.jpg'
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

export default class Card extends React.Component {

    // state = {
    //     loading: true,
    //     error: false
    // }

    // componentDidMount () {
    //     this.setState({
    //         loading: false,
    //         error: false
    //     })
    // }

    // componentDidUpdate () {
    //     this.setState({
    //         loading: true,
    //         error: false
    //     })
    // }

    componentDidCatch () {
        this.setState({
            loading: false,
            error: true
        })
    }

    render () {
        const {error, loading, setRating, header, movieDate, genres, overview, image, stars, genresDB} = this.props;
        // const {loading,error} = this.state;
        let ClassNameStars = "card__stars"
        const sourceIMG = (image === 'https://image.tmdb.org/t/p/w200null') ?  icon : image

        if(stars >= 0  && stars < 3) ClassNameStars += " border-сolor-red"
        if(stars >= 3  && stars < 5) ClassNameStars += " border-сolor-orange"
        if(stars >= 5  && stars < 7) ClassNameStars += " border-сolor-yellow"
        if(stars >= 7) ClassNameStars += " border-сolor-green"

        const spinner = loading ? <Spinner /> : null;
        const errorMessage =  error ? <ErrorIndicator /> : null;
        // const hasData = !(loading || error)
        const hasData = !error

        const content = hasData ? 
        <React.Fragment>
            
            <li className="card" >
                <img className="card__img" src={sourceIMG}  alt='poster'/>
                {spinner}
                <div className="card__info">
                    <header className="card__title">{header}</header>
                    <div className="card__release-date">{movieDate ? format(new Date(movieDate), 'MMMM d, yyyy') : movieDate}</div>
                    <Genres genres={genres} genresDB={genresDB}/>
                    <div className="card__overview">{overview}</div>
                    <div className={ClassNameStars}>{stars}</div>
                    {/* <Rating setRating={setRating}/> */}
                    <div className="card__rating"  >
                        <Rate
                        onChange={(value) => setRating(value, header)}
                        style={{
                            fontSize: '14px',
                        }}
                        count='10' />
                    </div>
                </div>
            </li>
        </React.Fragment>
        :null
        
        return (
            <React.Fragment>
                {content}
                {errorMessage}
                
            </React.Fragment>
        )
    }
}