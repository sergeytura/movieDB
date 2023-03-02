import React from 'react'
import './Genres.css'

export default function Genres({ genres, genresDB }) {
  let genKey = 1
  const elements = []
  genresDB.forEach((item) => {
    genres.forEach((el) => {
      if (el === item.id) elements.push(item.name)
    })
  })

  const movieGenres = elements.map((item) => {
    return <li key={genKey++}>{item}</li>
  })

  return <ul className="card__genre">{movieGenres}</ul>
}
