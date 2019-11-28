import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      searchTerm: '',
    }
  }

  getImages = (event) => {
    event.preventDefault();

    axios({
      method: 'get',
      url: 'https://api.unsplash.com//search/photos',
      headers: {
        Authorization: 'Client-ID c7e460e950c6ce50f9be85a30ccb19fb6ae9997faeea7dade15fdb1f30b331a8',
      },
      params: {
        query: this.state.searchTerm
      }
    }).then(result => {
      console.log(result.data.results);
      
      this.setState({
        images: result.data.results
      });
    }).catch(error => {
      console.error(`Something went wrong: ${error}`);
    });
  }

  getUserInput = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    

    this.setState({
      searchTerm: event.target.value
    })
  }


  getImageProperties = () => {
    const imageCard = this.state.images.map((image, index) => {
      return (
        <li key={index}>
          <a href={`${image.links.html}`}><img src={`${image.urls.small}`} alt={`${image.alt_description}`} /></a>
          <p>Photo by <a href={`${image.user.links.html}`}>{image.user.name}</a></p>
          <p><a href={`${image.download}`}>Download Image</a></p>
        </li>
      )
    })
    console.log(imageCard);
    // return imageCard;
  }

  render() {
    const imageCard = this.state.images.map((image, index) => {
      return (
        <li key={index}>
          <a href={`${image.links.html}`}><img src={`${image.urls.small}`} alt={`${image.alt_description}`} /></a>
          <p>Photo by <a href={`${image.user.links.html}`}>{image.user.name}</a></p>
          <p><a href={`${image.download}`}>Download Image</a></p>
        </li>
      )
    })
    console.log(imageCard);

    return (
      <div className="App">
        <header><h1>Image Search</h1></header>
        <div>
          <form onSubmit={this.getImages}>
            <label htmlFor="search" className="visuallyHidden">What images do you want to search for?</label>
            <input id="search" value={this.state.searchTerm} onChange={this.getUserInput}/>
            <ul>
              {imageCard}
            </ul>
          </form>
        </div>

      </div>
    );
  }
}

export default App;
