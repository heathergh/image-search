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
      searchTerm: '',
    }
  }

  getNewImages = unsplashImages => {
    this.setState({
      images: unsplashImages
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Searchbar userSearchSubmit={this.getNewImages} />
        <section>
          <ul>
            <ImageList searchResults={this.state.images}/>
          </ul>
        </section>
      </div>
    )
  }
}

export default App;