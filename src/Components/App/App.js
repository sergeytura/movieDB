import React from 'react'
import lodash from 'lodash'
import { Tabs } from 'antd'

import CardList from '../CardList/CardList'
import MovieService from '../../Services'
import ErrorIndicator from '../ErrorIndicator'
import SearchBar from '../SearchBar'
import PaginationApp from '../PaginationApp'
import { GenresContext } from '../GenresContext/GenresContext'

import './App.css'

export default class App extends React.Component {
  movieService = new MovieService()

  state = {
    page: 1,
    value: '',
    genresDB: [],
    moviesRatedData: [],
    moviesData: [],
    loading: false,
    error: false,
  }

  debounce = lodash.debounce(this.updateData, 2000)

  componentDidMount() {
    this.setState({
      loading: true,
      error: false,
    })

    this.updateGenres()
    this.movieService.createGuestSession()

    this.movieService.ratedMovies().then((rated) =>
      this.setState({
        moviesRatedData: rated,
        loading: false,
        error: false,
      })
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state
    if (value !== prevState.value || page !== prevState.page) {
      this.debounce(value, page)
    }
  }

  componentDidCatch() {
    this.setState({ error: true })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
    return <ErrorIndicator message={err.message} />
  }

  onChangeInput = (event) => {
    this.setState({
      value: event.target.value,
      page: 1,
    })
  }

  setRating = (value, idRating) => {
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
    this.movieService
      .ratedMovies()
      .then((rated) =>
        this.setState({
          moviesRatedData: rated,
          loading: false,
        })
      )
      .catch(this.onError)
  }

  currentPage = (event) => {
    this.setState({
      page: event,
    })
  }

  updateData(searchMovie, currentPage) {
    this.setState({
      loading: true,
    })

    this.movieService
      .currentMovies(searchMovie, currentPage)
      .then((newMovies) =>
        this.setState({
          moviesData: newMovies,
          loading: false,
        })
      )
      .catch(this.onError)
  }

  updateGenres() {
    this.movieService
      .getGenres()
      .then((res) => {
        this.setState({
          genresDB: res.genres,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { loading, moviesData, moviesRatedData, error, genresDB, page } = this.state
    const errorMessage = error ? <ErrorIndicator /> : null
    const paginatonOn =
      this.state.moviesData.length > 0 ? <PaginationApp currentPage={this.currentPage} page={page} /> : null
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <GenresContext.Provider value={genresDB}>
            <>
              <SearchBar onChangeInput={this.onChangeInput} />
              <CardList movieData={moviesData} setRating={this.setRating} loading={loading} error={error} />
              {paginatonOn}
            </>
          </GenresContext.Provider>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <GenresContext.Provider value={genresDB}>
            <>
              <CardList movieData={moviesRatedData} setRating={this.setRating} loading={loading} error={error} />
              {paginatonOn}
            </>
          </GenresContext.Provider>
        ),
      },
    ]
    const content = !error ? (
      <Tabs onTabClick={() => this.updateRatedData} defaultActiveKey="1" centered items={items} />
    ) : null
    return (
      <div className="app">
        {content}
        {errorMessage}
      </div>
    )
  }
}
