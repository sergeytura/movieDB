import React from 'react';

import Card from '../Card/Card';

import './CardList.css';

function CardList({ loading, error, movieData, setRating }) {
  const elements = movieData.map((item) => {
    const { id, ...movieProps } = item;
    return <Card key={id} {...movieProps} loading={loading} error={error} setRating={setRating} />;
  })
  return <ul className="card-list">{elements}</ul>;
}

export default CardList;
