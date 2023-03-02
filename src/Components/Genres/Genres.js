import React from 'react'
import './Genres.css'

export default function Genres({ genres, genresDB }) {
  const elements = []
  genresDB.map((item) => {
    genres.forEach((el) => {
      if (el === item.id) elements.push(item.name)
    })
  })

  const movieGenres = elements.map((item, index) => {
    return <li key={index}>{item}</li>
  })

  return <ul className="card__genre">{movieGenres}</ul>
}
