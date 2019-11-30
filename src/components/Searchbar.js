import React, { Component } from 'react';
import axios from 'axios';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // query state for API call
            searchTerm: ''
        }
    }

    // use user input to pass a query param to API call
    searchForImages = (event) => {
        // this method is an onSubmit event handler, so must prevent default of page refresh
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
            
            // function call that will update state in App
            this.props.userSearchSubmit(result.data.results);
          }).catch(error => {
            console.error(`Something went wrong: ${error}`);
          });
    }
    
    // get the user input
    getUserInput = (event) => {
        event.preventDefault();    
    // set query state for API call
        if (event.target.value !== '') {
            this.setState({
                searchTerm: event.target.value
            })
        }
    }

    render() {
        return (
            <div className="form-wrapper">
                <form onSubmit={this.searchForImages}>
                    <label htmlFor="search" className="visuallyHidden">What images do you want to search for?</label>
                    <input id="search" onChange={this.getUserInput} placeholder="Search for an image"/>
                </form>
            </div>

        )
    }
}

export default Searchbar;