export default class MovieService {
  basePoster = 'https://image.tmdb.org/t/p/original'

  myKey = '?api_key=6db7ab44767f1de8e415a7e1e11f735a'

  baseURL = 'https://api.themoviedb.org/3'

  sessionId

  async getResource(url) {
    const res = await fetch(`${this.baseURL}${url}`)

    if (!res.ok) {
      throw new Error(`Cant fetch ${url}, received ${res.status}`)
    }
    const result = await res.json()
    return result
  }

  getMovies(movie, page) {
    return this.getResource(`/search/movie${this.myKey}&language=en-US&query=${movie}&page=${page}&include_adult=false`)
  }

  getGenres() {
    return this.getResource(`/genre/movie/list${this.myKey}&language=en-US`)
  }

  createGuestSession() {
    if (localStorage.sessionId) {
      this.sessionId = localStorage.sessionId
      return
    }
    return this.getResource(`/authentication/guest_session/new${this.myKey}`).then((e) => {
      localStorage.setItem('sessionId', e.guest_session_id)
      this.sessionId = localStorage.sessionId
    })
  }

  sendRatingMovie(value, idRating) {
    fetch(`${this.baseURL}/movie/${idRating}/rating${this.myKey}&guest_session_id=${this.sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value,
      }),
    })
  }

  async getRatedMovies() {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${this.sessionId}/rated/movies?api_key=6db7ab44767f1de8e415a7e1e11f735a&language=en-US&sort_by=created_at.asc`
    )
    return res.json()
  }

  ratedMovies() {
    return this.getRatedMovies().then((res) => {
      return res.results.map((item) => {
        const newRatedObj = {
          id: item.id,
          idRating: item.id,
          header: item.title,
          movieDate: item.release_date,
          genres: item.genre_ids,
          overview: item.overview,
          rating: item.rating,
          image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
          stars: item.vote_average.toFixed(1),
          popularity: item.popularity,
        }
        return newRatedObj
      })
    })
  }

  currentMovies(movies, currPage) {
    return this.getMovies(movies, currPage).then((res) => {
      return res.results.map((item) => {
        const newMovieObj = {
          id: item.id,
          idRating: item.id,
          header: item.title,
          movieDate: item.release_date,
          genres: item.genre_ids,
          overview: item.overview,
          rating: '',
          image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
          stars: item.vote_average.toFixed(1),
          popularity: item.popularity,
        }
        return newMovieObj
      })
    })
  }
}
