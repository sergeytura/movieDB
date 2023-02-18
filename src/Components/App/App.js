import React from 'react';
import CardList from '../CardList/CardList'
import MovieService from '../../Services';
import './App.css'

export default class App extends React.Component {
  newService = new MovieService()
  
  render () {
    console.log(this.newService.getSearch().then((e) => console.log(e)))
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
