import React from 'react'
import lodash from 'lodash'
import { Tabs, Pagination } from 'antd'

import CardList from '../CardList/CardList'
import MovieService from '../../Services'
import ErrorIndicator from '../ErrorIndicator'
import SearchBar from '../SearchBar'
import { GenresContext } from '../GenresContext/GenresContext'

import './App.css'

export default class App extends React.Component {
  movieService = new MovieService()

  state = {
    page: 1,
    pageRate: 1,
    value: '',
    totalResults: 20,
    totalResultsRate: 20,
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

    this.movieService.ratedMovies().then((rated) => {
      rated.find((el) => {
        return this.setState({
          totalResultsRate: el.totalResults,
        })
      })
      this.setState({
        moviesRatedData: rated,
        loading: false,
        error: false,
      })
    })
    .catch((err) => this.onError(err))
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, page, moviesData, pageRate } = this.state
    if (value !== prevState.value || page !== prevState.page) {
      this.debounce(value, page)
    }
    if (moviesData !== prevState.moviesData) {
      this.movieService
        .ratedMovies(this.state.pageRate)
        .then((rated) => {
          rated.find((el) => {
            return this.setState({
              totalResultsRate: el.totalResults,
            })
          })
          this.setState({
            moviesRatedData: rated,
            loading: false,
          })
        })
        .catch((err) => this.onError(err))
    }
    if (pageRate !== prevState.pageRate) {
      this.movieService
        .ratedMovies(this.state.pageRate)
        .then((rated) => {
          rated.find((el) => {
            return this.setState({
              totalResultsRate: el.totalResults,
            })
          })
          this.setState({
            moviesRatedData: rated,
            loading: false,
          })
        })
        .catch((err) => this.onError(err))
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
    try {
      this.movieService.sendRatingMovie(value, idRating)
      if (this.state.moviesData.length > 0) {
        this.setState(({ moviesData }) => {
          const idx = moviesData.findIndex((el) => el.idRating === idRating)
          const oldItem = moviesData[idx]
          const newItem = { ...oldItem, rating: value }
          const newArr = [...moviesData.slice(0, idx), newItem, ...moviesData.slice(idx + 1)]
          return {
            moviesData: newArr,
          }
        })
      }
    } catch (err) {
      this.onError(err)
    }
    

    this.movieService
      .ratedMovies(this.state.pageRate)
      .then((rated) =>
        this.setState({
          moviesRatedData: rated,
          loading: false,
        })
      )
      .catch((err) => this.onError(err))
  }

  currentPage = (event) => {
    this.setState({
      page: event,
    })
  }

  currentPageRate = (event) => {
    this.setState({
      pageRate: event,
    })
  }

  updateData(searchMovie, currentPage) {
    this.setState({
      loading: true,
    })

    this.movieService
      .currentMovies(searchMovie, currentPage)
      .then((newMovies) => {
        newMovies.find((el) => {
          return this.setState({
            totalResults: el.totalResults,
          })
        })
        this.setState({
          moviesData: newMovies,
          loading: false,
        })
      })
      .catch((err) => this.onError(err))
  }

  updateGenres() {
    this.movieService
      .getGenres()
      .then((res) => {
        this.setState({
          genresDB: res.genres,
        })
      })
      .catch((err) => this.onError(err))
  }

  render() {
    const { loading, moviesData, moviesRatedData, error, genresDB, page } = this.state
    const errorMessage = error ? <ErrorIndicator /> : null
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <GenresContext.Provider value={genresDB}>
            <SearchBar onChangeInput={this.onChangeInput} />
            <CardList
              movieData={moviesData}
              moviesRatedData={moviesRatedData}
              setRating={this.setRating}
              loading={loading}
              error={error}
            />
            {this.state.moviesData.length > 0 ? (
              <Pagination
                className="app-pagination"
                pageSize={20}
                total={this.state.totalResults}
                showSizeChanger={false}
                current={this.state.page}
                onChange={this.currentPage}
                page={page}
              />
            ) : null}
          </GenresContext.Provider>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <GenresContext.Provider value={genresDB}>
            <CardList movieData={moviesRatedData} setRating={this.setRating} loading={loading} error={error} />
            {this.state.moviesRatedData.length > 0 ? (
              <Pagination
                className="app-pagination"
                pageSize={20}
                showSizeChanger={false}
                total={this.state.totalResultsRate}
                onChange={this.currentPageRate}
                current={this.state.pageRate}
                page={page}
              />
            ) : null}
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
