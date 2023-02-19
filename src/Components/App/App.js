import React from 'react';
import CardList from '../CardList/CardList'
import MovieService from '../../Services'
import { format } from 'date-fns/fp'
import './App.css'

export default class App extends React.Component {
  
  movieService = new MovieService();

  state = {
    allData: []
  }

  // movieData = 
  // [
  //   {
  //   id: 100, 
  //   header: 'Fight Club',
  //   movieDate: 1992,
  //   genres: ['action', 'zaction'],
  //   overview: 'boetsi',
  //   image: 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
  //   }
  // ]

  constructor() {
    super();
    this.updateData('fight club')
  }

  updateData(searchMovie) {
    this.movieService
    .getMovies(searchMovie)
    .then((movie) => {
        (movie.results).map((item) => {
          console.log(item)
          if(item.poster_path == null) item.poster_path = '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
          const newMovie = {
                id: item.id,
                header: item.title,
                movieDate: item.release_date,
                // movieDate: format(new Date(`1992,12, 12`), 'MMMM dd, yyyy'),
                // movieDate: new Date(`${item.release_date}`),
                genres: item.genre_ids,
                overview: item.overview,
                image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                stars: item.vote_average,
                popularity: item.popularity
              }
              this.setState(({ allData }) => {
                const newArr = [...allData, newMovie]
                return {
                  allData: newArr,
                }
              })
        })
      
      
    })
  }

  // fillData = (movie) => {
  //   const newMovie = {
  //     id: movie.id,
  //     header: movie.title,
  //     movieDate: movie.release_date,
  //     genres: movie.genre_ids,
  //     image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
  //     stars: movie.vote_average,
  //     popularity: movie.popularity
  //   }
  //   this.setState(({ allData }) => {
  //     const newArr = [...allData, newMovie]
  //     return {
  //       allData: newArr,
  //     }
  //   })
  // }
  
  
  render () {
    
    // this.newSearch.getMovies('Fight Club').then((i) => this.state.allData.push(i.results))
    // this.updateData('fight')
    return (
      <div className='app'>
        {/* <div>FilterSearchRated</div>
        <div>Search</div> */}
        {/* <CardList movieData={this.movieData}/> */}
        <CardList movieData={this.state.allData}/>
        
        {/* <div>Pagination</div> */}
      </div>
      
      
    );
  }
}
