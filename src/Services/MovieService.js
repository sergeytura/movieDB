
export default class MovieService {
    _basePoster = `https://image.tmdb.org/t/p/original`
    _myKey = `?api_key=6db7ab44767f1de8e415a7e1e11f735a`
    _baseURL = `https://api.themoviedb.org/3`
    fake = `https://api.themoviedb.org/3/movie/500?api_key=6db7ab44767f1de8e415a7e1e11f735a&language=en-US`
    
    // getResource = async () => {
    //     const res = await fetch(`${this._baseURL}/search/movie${this._myKey}&language=en-US&query=return&page=1&include_adult=false`)
    //     const body = await res.json();
    //     return body
    // }
    async getResource(url) {
        const res = await fetch(`${this._baseURL}${url}`);

        if(!res.ok) {
            throw new Error(`Cant fetch ${url}, received ${res.status}`)
        }
        return await res.json()
    }

    getMovies (movie) {
        const res = this.getResource(`/search/movie${this._myKey}&language=en-US&query=${movie}&page=1&include_adult=false`)
        return res
    }

    async getImage (imageUrl) {
        const res = await fetch(`${this._basePoster}${imageUrl}`)
        return res
    }
}

const movies = new MovieService();

// movies.getMovies('fight club').then((b) => console.log(b.results))

// movies.getPoster(`/lBENxZ1nmHXkTKV0AJu1agnW8Mg.jpg`).then((b) => console.log(b))