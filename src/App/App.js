import React from 'react';
import CardList from '../CardList/CardList';
import './App.css'

export default class App extends React.Component {

  getData = async () => {
    const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=6db7ab44767f1de8e415a7e1e11f735a')
    const body = await res.json();
    return body
  }
  
  render () {
    console.log(this.getData().then((e) => console.log(e)))
    return (
      <div className='app'>
        {/* <div>FilterSearchRated</div>
        <div>Search</div> */}
        <CardList />
        
        {/* <div>Pagination</div> */}
      </div>
      
      
    );
  }
}
