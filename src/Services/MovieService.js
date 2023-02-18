import React from "react";

export default class MovieService extends React.Component {
    _basePoster = `https://image.tmdb.org/t/p/original`
    _myKey = `?api_key=6db7ab44767f1de8e415a7e1e11f735a`
    _baseURL = `https://api.themoviedb.org/3`
    
    
    getSearch = async () => {
        const res = await fetch(`${this._baseURL}/search/movie${this._myKey}&language=en-US&query=return&page=1&include_adult=false`)
        const body = await res.json();
        return body
    }

}

