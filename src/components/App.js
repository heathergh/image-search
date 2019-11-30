import React, { Component } from 'react';
import '../styles/App.css';
import Header from './Header';
import ImageList from './ImageList';
import Searchbar from './Searchbar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    }
  }

  getNewImages = unsplashImages => {
    this.setState({
      images: unsplashImages
    })
  }

  render() {
    return (
      <>
        <Header />
        <main className="wrapper">
        	<Searchbar userSearchSubmit={this.getNewImages} />
        	<section className="image-list-wrapper">
        	  <ul>
        	    <ImageList searchResults={this.state.images}/>
        	  </ul>
        	</section>
        </main>
      </>
    )
  }
}

export default App;