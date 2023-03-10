import React from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import Genres from '../Genres'
import './Card.css'
import Spinner from '../Spinner'
import ErrorIndicator from '../ErrorIndicator'
import { GenresContext } from '../GenresContext/GenresContext'

import icon from './nofoto.jpg'

export default class Card extends React.Component {
  state = {
    imgLoading: true,
  }

  // componentDidUpdate (prevProps, prevState) {
  //   if(this.props.stars !== prevProps.stars) {
  //     this.props.setRating(this.props.value, this.props.idRating)
  //   }
  // }

  render() {
    const { idRating, error, setRating, header, movieDate, genres, overview, image, stars, userRating } = this.props
    const { imgLoading } = this.state
    const sourceIMG = image === 'https://image.tmdb.org/t/p/w200null' ? icon : image

    let ClassNameStars = 'card__stars'
    if (stars >= 0 && stars < 3) ClassNameStars += ' border-сolor-red'
    if (stars >= 3 && stars < 5) ClassNameStars += ' border-сolor-orange'
    if (stars >= 5 && stars < 7) ClassNameStars += ' border-сolor-yellow'
    if (stars >= 7) ClassNameStars += ' border-сolor-green'

    let colorRatedStars
    if (userRating >= 0 && userRating < 3) colorRatedStars = 'сolor-green'
    if (userRating >= 3 && userRating < 5) colorRatedStars = 'сolor-orange'
    if (userRating >= 5 && userRating < 7) colorRatedStars = 'сolor-yellow'
    if (userRating >= 7) colorRatedStars = 'сolor-green'

    if (imgLoading) {
      const img = new Image()
      img.src = sourceIMG
      img.onload = () => {
        this.setState({
          imgLoading: false,
        })
      }
    }
    const showImg = !imgLoading ? <img src={sourceIMG} alt="poster" loading="lazy" /> : <Spinner />
    const errorMessage = error ? <ErrorIndicator /> : null
    const content = !error ? (
      <li className="card">
        <div className="card__img">{showImg}</div>
        <div className="card__info">
          <header className="card__title">{header}</header>
          <div className="card__release-date">
            {movieDate ? format(new Date(movieDate), 'MMMM d, yyyy') : movieDate}
          </div>
          <GenresContext.Consumer>
            {(genresDB) => <Genres genres={genres} genresDB={genresDB} />}
          </GenresContext.Consumer>
          <div className="card__overview">{overview}</div>
          <div className={ClassNameStars}>{stars}</div>

          <div className="card__rating">
            <Rate
              className={colorRatedStars}
              value={userRating}
              onChange={(value) => setRating(value, idRating)}
              style={{
                fontSize: '14px',
              }}
              count="10"
            />
          </div>
        </div>
      </li>
    ) : null

    return (
      <>
        {content}
        {errorMessage}
      </>
    )
  }
}
