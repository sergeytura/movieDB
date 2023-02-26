import React from 'react';
import CardList from '../CardList/CardList'
import MovieService from '../../Services'
import ErrorIndicator from '../ErrorIndicator';
import Spinner from '../Spinner';
import SearchBar from '../SearchBar';
import PaginationApp from '../PaginationApp';
import lodash from 'lodash'
import { Tabs } from 'antd'


import './App.css'

export default class App extends React.Component {
  
  movieService = new MovieService();

  state = {
    page: 1,
    value: '',
    genresDB: [],
    moviesData: [],
    loading: true,
    error: false
  }
  
  componentDidMount () {
    this.movieService.createGuestSession()
    this.updateGenres()
    this.setState({
      loading: false,
      error: false
    })
    
  }

  componentDidUpdate (prevState) {
    if(this.state.value !== prevState.value) {
      this.debounce(this.state.value, this.state.page)
    }
  }

  
  debounce = lodash.debounce(this.updateData, 2000)

 
  // onWarning = (warn) => {
  //   console.log(warn)
  // }

  onError = (err) => {
     console.log(err)
    this.setState({
      error: false,
      loading: false
    })
  }

   updateGenres() {
    if(this.state.value === '') return
     this.movieService
    .getGenres()
    .then(res => {
      this.setState({
        genresDB: res.genres
      })
    })
  }

  updateData(searchMovie, currentPage) {
    this.movieService
    .currentMovies(searchMovie, currentPage)
    .then(newMovies => 
      this.setState({
      moviesData: newMovies
      })
    )
    .catch(this.onError);
    
  }

  onChangeInput = (event) => {
    this.setState({
      value: event.target.value,
      page: 1
    })
  }

  currentPage = (event) => {
    this.setState({
      page: event
    })
  }
  
  render () {

    const {loading, moviesData, error, genresDB, page } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage =  error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error)
    const paginatonOn = (this.state.moviesData.length) > 0 ? <PaginationApp /> : null;
    // const content = hasData ? 
    //   <React.Fragment>
    //   <SearchBar onChangeInput={this.onChangeInput}  />
    //   <CardList movieData={moviesData} genresDB={genresDB}/>
    //   {/* <PaginationApp currentPage={this.currentPage} page={page}/>*/}
    //   {paginatonOn}
    //   </React.Fragment> 
    //   : null;
    const items = [
    {
      key: '1',
      label: `Search`,
      children: <React.Fragment>
      <SearchBar onChangeInput={this.onChangeInput}  />
      <CardList movieData={moviesData} genresDB={genresDB}/>
      {/* <PaginationApp currentPage={this.currentPage} page={page}/>*/}
      {paginatonOn}
      </React.Fragment> ,
    },
    {
      key: '2',
      label: `Rated`,
      children: `Content of Tab Pane 2`,
    },
  ];
    return (
      <div className='app'>
        <Tabs defaultActiveKey="1" centered items={items}  />
        {/* {content} */}
        {spinner}
        {errorMessage}
      </div>
    );
  }
}