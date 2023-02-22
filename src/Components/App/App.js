import React from 'react';
import CardList from '../CardList/CardList'
import MovieService from '../../Services'
import ErrorIndicator from '../ErrorIndicator';
import Spinner from '../Spinner';
import SearchBar from '../SearchBar';
import PaginationApp from '../PaginationApp';
import lodash from 'lodash'


import './App.css'

export default class App extends React.Component {
  
  movieService = new MovieService();

  state = {
    value: 'fight',
    genresDB: [],
    moviesData: [],
    loading: true,
    error: false
  }
  
  componentDidMount () {
    this.updateGenres()
    // this.updateData(this.state.value)
    // this.updateData(this.state.value)
    this.debounce(this.state.value)
    this.setState({
      loading: false,
      error: false
    })
    
  }
  
  debounce = lodash.debounce(this.updateData, 2000)

  onError = (err) => {
     
    this.setState({
      error: true,
      loading: false
    })
  }

   updateGenres() {
     this.movieService
    .getGenres()
    .then(res => {
      this.setState({
        genresDB: res.genres
      })
    })
  }

  updateData(searchMovie) {
    this.movieService
    .currentMovies(searchMovie)
    .then(newMovies => 
      this.setState({
      moviesData: newMovies
      })
    )
    .catch(this.onError);
    
  }
  
  render () {
    const {loading, moviesData, error, genresDB} = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage =  error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error)
    const content = hasData ? 
      <React.Fragment>
      <SearchBar />
      <CardList movieData={moviesData} genresDB={genresDB}/>
      <PaginationApp />
      </React.Fragment> 
      : null;
    
    return (
      <div className='app'>
        
        {/* <div>FilterSearchRated</div>
        <div>Search</div> */}
        {/* <CardList movieData={this.movieData}/> */}
        {/* <CardList movieData={this.state.allData}/> */}
        {content}
        {spinner}
        {errorMessage}
        
        
        {/* <div>Pagination</div> */}
      </div>
      
      
    );
  }
}