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
    value: null,
    genresDB: [],
    moviesRatedData: [],
    moviesData: [],
    loading: false,
    error: false
  }

  
  
  componentDidMount () {
    this.movieService.createGuestSession()
    this.updateGenres()
    // this.setState({
    //   loading: false,
    //   error: false
    // })
    
  }

  componentDidUpdate (prevState) {
    const { value, page } = this.state;
    if(value !== prevState.value) {
      if(value) {
        
        // console.log(value)
        // this.setState({loading:true})
        this.debounce(value, page)

        // this.updateData(value,page)
      }
      
    }
    // if(this.state.value) {
    //   this.setState({loading:true})
    // }
  }

  onChangeInput = (event) => {
    this.setState({
      value: event.target.value,
      page: 1,
      // loading: true
    }) 
  }
  
  debounce = lodash.debounce(this.updateData, 2000)
  // debounce = lodash.debounce(this.onChangeInput, 2000)

  
 

  currentPage = (event) => {
    this.setState({
      page: event
    })
  }
 
  // onWarning = (warn) => {
  //   console.log(warn)
  // }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
    return <ErrorIndicator message={err.message} />;
  }

   updateGenres() {
    // if(this.state.value === null) return
     this.movieService
    .getGenres()
    .then(res => {
      this.setState({
        genresDB: res.genres
      })
    })
    .catch(this.onError);
  }

  updateData(searchMovie, currentPage) {
    this.movieService
    .currentMovies(searchMovie, currentPage)
    .then(newMovies => 
      this.setState({
      moviesData: newMovies,
      loading: false
      })
    )
    .catch(this.onError);
    // this.updateRatedData()
  }

  // updateRatedData () {
    
  //   this.movieService
  //   .ratedMovies()
  //   .then(rated => 
  //     this.setState({
  //       moviesRatedData: rated,
  //       loading: false
  //     })  
  //   )
  //   .catch(this.onError);
  // }

  

  // showRated = () => {
  //   this.movieService.getRatedMovies().then(e => console.log(e))
  // }
  
  setRating = (value, idRating) => {
    console.log(value, idRating)
    this.movieService.sendRatingMovie(value, idRating)
    
    this.setState(({ moviesData }) => {
      const idx = moviesData.findIndex((el) => el.idRating === idRating)
      const oldItem = moviesData[idx]
      const newItem = { ...oldItem, rating: value }
      const newArr = [...moviesData.slice(0, idx), newItem, ...moviesData.slice(idx + 1)]
      return {
        moviesData: newArr,
      }
    })
    // this.updateRatedData()
    // this.movieService.ratedMovies()
    this.movieService
    .ratedMovies()
    .then(rated => 
      this.setState({
        moviesRatedData: rated,
        loading: false
      })  
    )
    .catch(this.onError);
  }

  // onChangeEdit = (id, event) => {
  //   this.setState(({ todoData }) => {
  //     const idx = todoData.findIndex((el) => el.id === id)
  //     const oldItem = todoData[idx]
  //     const newItem = { ...oldItem, label: event.target.value }
  //     const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
  //     return {
  //       todoData: newArr,
  //     }
  //   })
  // }

  componentDidCatch() {
    this.setState({ error: true });
  }

  
  render () {
    // console.log(this.movieService.getRatedMovies())
    // console.log(this.showRated())
    
    const {loading, moviesData, moviesRatedData, error, genresDB, page } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage =  error ? <ErrorIndicator /> : null;
    // const hasData = !(loading || error)
    const hasData = !error
    const paginatonOn = (this.state.moviesData.length) > 0 ? <PaginationApp currentPage={this.currentPage} page={page}/> : null;

    const items = [
      {
        key: '1',
        label: `Search`,
        children: 
        <React.Fragment>
        <SearchBar onChangeInput={this.onChangeInput}  />
        
        <CardList 
        movieData={moviesData} 
        genresDB={genresDB}
        setRating={this.setRating}
        loading={loading}
        error={error}
        />
        {paginatonOn}
        </React.Fragment> ,
      },
      {
        key: '2',
        label: `Rated`,
        children: 
        <React.Fragment>
        <CardList 
        movieData={moviesRatedData} 
        genresDB={genresDB}
        setRating={this.setRating}
        loading={loading}
        error={error}
        />
        {paginatonOn}
        </React.Fragment>,
      },
    ];
    // console.log(loading)
    const content = hasData ? <Tabs 
    onTabClick={() => this.updateRatedData}
    defaultActiveKey="1" centered items={items}  /> : null;
    // const content = hasData ? 
    //   <React.Fragment>
    //   <SearchBar onChangeInput={this.onChangeInput}  />
    //   <CardList movieData={moviesData} genresDB={genresDB}/>
    //   {/* <PaginationApp currentPage={this.currentPage} page={page}/>*/}
    //   {paginatonOn}
    //   </React.Fragment> 
    //   : null;
    
    return (
      <React.Fragment>
      
      <div className='app'>
          {content}
          {spinner}
          {errorMessage}
      </div>
      </React.Fragment>
      );
    }
}