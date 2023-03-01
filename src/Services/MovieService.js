export default class MovieService {
    _basePoster = `https://image.tmdb.org/t/p/original`
    _myKey = `?api_key=6db7ab44767f1de8e415a7e1e11f735a`
    _baseURL = `https://api.themoviedb.org/3`
    _sessionId
 
    async getResource(url) {
        try {
            const res = await fetch(`${this._baseURL}${url}`);

            if(!res.ok) {
                throw new Error(`Cant fetch ${url}, received ${res.status}`)
            }
            return await res.json()
        }
        catch (err) {
            console.error(err)
        }
        
    }

    getMovies (movie,page) {
        return this.getResource(`/search/movie${this._myKey}&language=en-US&query=${movie}&page=${page}&include_adult=false`)
    }

    getGenres () {
        return this.getResource(`/genre/movie/list${this._myKey}&language=en-US`)
    } 
    
    createGuestSession () { 
        if(localStorage.sessionId !== '') {
            return this._sessionId = localStorage.sessionId 
        }
        console.log('session Guest created!')
        return this.getResource(`/authentication/guest_session/new${this._myKey}`)
                .then(e => {
                    localStorage.setItem('sessionId', e.guest_session_id)
                     
                    this._sessionId = localStorage.sessionId
                    console.log(this._sessionId)
                    
                })
        
        
    } 

    sendRatingMovie (value, idRating) {
        console.log(this._sessionId)
        fetch(`${this._baseURL}/movie/${idRating}/rating${this._myKey}&guest_session_id=${this._sessionId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({
                "value": value
              })
          });
    }  

    async getRatedMovies () {
        const res = await fetch(`https://api.themoviedb.org/3/guest_session/${this._sessionId}/rated/movies?api_key=6db7ab44767f1de8e415a7e1e11f735a&language=en-US&sort_by=created_at.asc`)
            return res.json()
    }

    ratedMovies () {
        return this.getRatedMovies().then(res => { 
            return (res.results).map((item) => { 
                const newRatedObj = {
                    id: item.id,
                    idRating: item.id,
                    header: item.title,
                    movieDate: item.release_date,
                    genres: item.genre_ids,
                    overview: item.overview,
                    rating: item.rating,
                    image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                    stars: (item.vote_average).toFixed(1),
                    popularity: item.popularity
                } 
                return newRatedObj 
            })
        })
        
    } 

    currentMovies(movies, currPage) {
        return this.getMovies(movies, currPage).then(res => {
                 
                return (res.results).map((item) => { 
                    const newMovieObj = {
                        id: item.id,
                        idRating: item.id,
                        header: item.title,
                        movieDate: item.release_date,
                        genres: item.genre_ids,
                        overview: item.overview,
                        rating: '',
                        image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                        stars: (item.vote_average).toFixed(1),
                        popularity: item.popularity
                    }
                    return newMovieObj 
            })
        })
    } 
} 