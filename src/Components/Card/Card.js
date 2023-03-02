import React, { useContext } from "react";
import Genres from "../Genres";
// import Rating from "../Rating";
import { Rate } from "antd";
import { format } from "date-fns"
import './Card.css'
import icon from './nofoto.jpg'
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";
import { GenresContext } from "../GenresContext/GenresContext";

export default class Card extends React.Component {

    state = {
        imgLoading: true
    }
 
    render () { 
        const {idRating, rating, error, setRating, header, movieDate, genres, overview, image, stars} = this.props;
        const {imgLoading} = this.state
        const sourceIMG = (image === 'https://image.tmdb.org/t/p/w200null') ?  icon : image

        let ClassNameStars = "card__stars"
        if(stars >= 0  && stars < 3) ClassNameStars += " border-сolor-red"
        if(stars >= 3  && stars < 5) ClassNameStars += " border-сolor-orange"
        if(stars >= 5  && stars < 7) ClassNameStars += " border-сolor-yellow"
        if(stars >= 7) ClassNameStars += " border-сolor-green"

        let colorRatedStars
        if(rating >= 0  && rating < 3) colorRatedStars = "сolor-green"
        if(rating >= 3  && rating < 5) colorRatedStars = "сolor-orange"
        if(rating >= 5  && rating < 7) colorRatedStars = "сolor-yellow"
        if(rating >= 7) colorRatedStars = "сolor-green"

        if(imgLoading) {
            let img = new Image();
            img.src = sourceIMG;
            img.onload = () => {
                this.setState({
                    imgLoading: false
                })
            }
        }
        const showImg = !imgLoading ? <img src={sourceIMG} alt="poster" loading={'lazy'} /> : <Spinner />;
        const errorMessage =  error ? <ErrorIndicator /> : null; 
        const content = !error ?
        <React.Fragment>
            
            <li className="card" >
                 
                <div className="card__img">{showImg}</div>
                <div className="card__info">
                    <header className="card__title">{header}</header>
                    <div className="card__release-date">{movieDate ? format(new Date(movieDate), 'MMMM d, yyyy') : movieDate}</div>
                    <GenresContext.Consumer>
                    {
                        genresDB => <Genres genres={genres} genresDB={genresDB}/>
                    }
                    </GenresContext.Consumer>
                    <div className="card__overview">{overview}</div>
                    <div className={ClassNameStars}>{stars}</div>
                   
                    <div className="card__rating"  >
                        <Rate className={colorRatedStars}
                        value={rating}
                        onChange={(value) => setRating(value, idRating)}
                         
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