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
    value: '',
    genresDB: [],
    moviesData: [],
    loading: true,
    error: false
  }
  
  componentDidMount () {
    this.updateGenres()
    this.setState({
      loading: false,
      error: false
    })
    
  }

  componentDidUpdate (prevState) {
    if(this.state.value !== prevState.value) {
      this.debounce(this.state.value)
    }
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

  onChangeInput = (event) => {
    console.log(event.target.value)
    this.setState({
      value: event.target.value
    })
  }
  
  render () {
    const {loading, moviesData, error, genresDB, value} = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage =  error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error)
    const content = hasData ? 
      <React.Fragment>
      <SearchBar onChangeInput={this.onChangeInput} value={value}/>
      <CardList movieData={moviesData} genresDB={genresDB}/>
      <PaginationApp />
      </React.Fragment> 
      : null;
    
    return (
      <div className='app'>
        {content}
        {spinner}
        {errorMessage}
      </div>
    );
  }
}