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
      // console.log(movie)
        (movie.results).map((item) => {
          // const imgRegExp = /(null)/g;
          // const {yyyy, mm, dd} = item.release_date
        //  if(item.poster_path.match(imgRegExp)) item.poster_path = `https://cdn2.hexlet.io/store/derivatives/f5ccde05d8bd5997aa2c3be3c205594f/fill_webp-70-70.webp`
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
