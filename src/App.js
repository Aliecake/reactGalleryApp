import React, { Component, Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Flickr from 'flickr-sdk';
import config from './config';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

import '../src/index.css';

class App extends Component {
  state = {
    photo_id: [],
    loading: true
  }

  searchForPhotos = (query = 'cute animals') => {
    //API key from config
    const flickr = new Flickr(config.API_KEY)

    //search photos for text query from SearchForm
    flickr.photos.search({
      text: query,
      page: 1,
      per_page: 24
    })
      .then(res => {
        const newArray = []
        newArray.push(res.body)
        this.setState({
          photo_id: newArray,
          loading: false
        })
      })
      .catch(err => console.log(`There was an error fetching`, err))
    
  }
  //load photos on first arrival
  componentDidMount(){
    this.searchForPhotos()

  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
          
          
          <Switch>
            {/* HOME PATH */}
            <Route exact path="/"  render={(props) => 
            <Fragment>
              <SearchForm { ...props } searchFor={this.searchForPhotos}/>
              <Nav displayResults={this.searchForPhotos} />
              <Gallery { ...props } photo_info={this.state.photo_id[0]} displayResults={this.searchForPhotos} loading={ this.state.loading } /> 
            </Fragment>

            } />
            {/* QUERY PATH */}
            <Route path="/search/:query" render={(props) =>
              <Fragment>
                <SearchForm { ...props } searchFor={this.searchForPhotos}/>
                <Nav displayResults={this.searchForPhotos} />
                <Gallery { ...props } displayResults={this.searchForPhotos} photo_info={ this.state.photo_id[0] } loading={ this.state.loading } /> 
              </Fragment>
            }/>
            {/* 404 PATH */}
            <Route path="*" component= { NotFound }/>
          </Switch>
        </div>
      </BrowserRouter>
  
    );
  }
}

export default App;
