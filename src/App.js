import React, { Component, Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import axios from 'axios';
import config from './config';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

import '../src/index.css';

class App extends Component {
  state = {
    photos: [],
    cats: [],
    memes: [],
    dogs: [],
    loading: true
  }

  navSearch = (navTerm) => {

    const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.API_KEY}&text=${navTerm}&per_page=24&page=1&format=json&nojsoncallback=1`

    //switched from flickr-sdk to axios
      axios.get(flickrURL)
        .then(res => {
          const newArray = []

          if(res.data.photos){
            newArray.push(res.data.photos.photo)
          }
          

          if (newArray[0].length === 0){
            this.setState({
              [`${navTerm}`]: newArray,
              loading: false
            })  
          } else {
            console.log(this.state.cats)
            //reset to true
            this.setState({
              [`${navTerm}`]: newArray,
              loading: true
            })
          }
        })
        .catch(err => console.log(err))
  }

  searchForPhotos = (query = 'pelican') => {

    const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.API_KEY}&text=${query}&per_page=24&page=1&format=json&nojsoncallback=1`

    //reset state so loading will show in between search
    this.setState({
      photos: [],
      loading: true
    })

    //switched from flickr-sdk to axios
      axios.get(flickrURL)
        .then(res => {
          const newArray = []

          console.log('App.js 36', res.data)

          if(res.data.photos){
            newArray.push(res.data.photos.photo)
          }
          

          if (newArray[0].length === 0){
            this.setState({
              photos: newArray,
              loading: false
            })  
          } else {
            //reset to true
            this.setState({
              photos: newArray,
              loading: true
            })
          }
        })
        .catch(err => console.log(err))
  }
  //load photos on first arrival
  componentDidMount() {

    this.searchForPhotos()

  }

  render() {
    
    return (
      <Fragment>
      <BrowserRouter>
       
       <Nav />
           <Switch>
             {/* HOME PATH */}
             <Route exact path="/"  render={(props) => 
             <Fragment>
               <SearchForm { ...props } searchFor={this.searchForPhotos}/>
               <Gallery { ...props } photo_info={this.state.photos[0]} displayResults={this.searchForPhotos} loading={ this.state.loading } navSearch={`NONE`}/> 
             </Fragment>
 
             } />
             
            {/* NAV PATHS */}
             <Route path="/search/cats" render={(props) =>
               <Fragment>
                 <SearchForm { ...props } searchFor={this.searchForPhotos}/>
                 <Gallery { ...props } displayResults={this.searchForPhotos} photo_info={ this.state.cats } loading={ this.state.loading } navSearch={`cats`} /> 
               </Fragment>
             }/>
             
             {/* QUERY PATH */}
             <Route path="/search/:query" render={(props) =>
               <Fragment>
                 <SearchForm { ...props } searchFor={this.searchForPhotos}/>
                 <Gallery { ...props } displayResults={this.searchForPhotos} photo_info={ this.state.photos[0] } loading={ this.state.loading } /> 
               </Fragment>
             }/>


             {/* 404 PATH */}
             <Route path="*" component= { NotFound }/>
           </Switch>
        
       </BrowserRouter>
      </Fragment>

 
  
    );
  }
}

export default App;
