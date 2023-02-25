

export default class MovieService {
    _basePoster = `https://image.tmdb.org/t/p/original`
    _myKey = `?api_key=6db7ab44767f1de8e415a7e1e11f735a`
    _baseURL = `https://api.themoviedb.org/3`
 
    async getResource(url) {
        const res = await fetch(`${this._baseURL}${url}`);

        if(!res.ok) {
            throw new Error(`Cant fetch ${url}, received ${res.status}`)
        }
        return await res.json()
    }

    getMovies (movie,page) {
        return this.getResource(`/search/movie${this._myKey}&language=en-US&query=${movie}&page=${page}&include_adult=false`)
    }

    getGenres () {
        return this.getResource(`/genre/movie/list${this._myKey}&language=en-US`)
    }

    getRatedMovies () {
        return this.getResource(`/guest_session/${guest_session_id}/rated/movies`)
    }
    
    createGuestSession () {
        return this.getResource(`/authentication/guest_session/new&${this._myKey}`)
    }

    currentMovies(movies, currPage) {
        return this.getMovies(movies, currPage).then(res => {
                 
                return (res.results).map((item) => {
                    console.log()
                    // if(item.poster_path == null) item.poster_path = '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
                    const newMovieObj = {
                        id: item.id,
                        header: item.title,
                        movieDate: item.release_date,
                        // movieDate: format(new Date(1992, 2, 1), 'MMMM dd, yyyy'),
                        // movieDate: new Date(`${item.release_date}`), (item.release_date).replace(/-/g,',')
                        genres: item.genre_ids,
                        overview: item.overview,
                        image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                        // image: this.getImage(item.poster_path),
                        stars: (item.vote_average).toFixed(1),
                        popularity: item.popularity
                    }
                    return newMovieObj 
            })
        })
    }

    
} 
