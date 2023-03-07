import React from 'react'

import Card from '../Card/Card'

import './CardList.css'

function CardList({ loading, error, movieData, moviesRatedData, setRating }) {
  const elements = movieData.map((item) => {
    const { id, rating, ...movieProps } = item
    let userRating
    if (rating === 0) {
      const check = moviesRatedData.find((el) => el.id === id)
      check ? (userRating = check.rating) : null
    }
    return (
      <Card
        key={id}
        {...movieProps}
        userRating={rating || userRating}
        loading={loading}
        error={error}
        setRating={setRating}
      />
    )
  })
  return <ul className="card-list">{elements}</ul>
}

export default CardList
