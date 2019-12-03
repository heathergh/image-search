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

    updateParentImages = imagesArray => {
        this.props.renderImages();
    }

    // pass user input as a query param in API call
    searchForImages = event => {
        // this method is an onSubmit event handler, so must prevent default of page refresh
        event.preventDefault();

        /**  check user input isn't an empty string
        if it's an empty string, set the error message state in parent
        to show to user */
        if (this.state.searchTerm === '') {
            this.props.errorState("Please fill in this field");
        } else {
            //toggle loading animation in parent component while API call is happening
            this.props.toggleLoader(true);

            axios({
                method: 'get',
                url: 'https://api.unsplash.com//search/photos',
                headers: {
                Authorization: 'Client-ID c7e460e950c6ce50f9be85a30ccb19fb6ae9997faeea7dade15fdb1f30b331a8',
                },
                params: {
                query: this.state.searchTerm,
                per_page: this.props.numOfResults
                }
            }).then(response => {
                this.props.getPages(response.data.total_pages);

                this.props.validateResponse();
                // set the total number of pages
                if (!this.props.noResults) {
                    this.props.getImages(response.data.results)
                }
                
                //toggle loading animation after state has been set in parent component
                this.props.toggleLoader(false);
            }).catch(error => {
                console.error(`Something went wrong: ${error}`);
            });
        }
    }
    
    // get the user input
    getUserInput = (event) => {
        event.preventDefault(); 
        console.log(event.target.value);   
        // set state for query to use in API call
        if (event.target.value !== '') {
            this.setState({
                searchTerm: event.target.value
            }, () => {
                this.props.getSearchTerm(this.state.searchTerm);
            })
        }
    }

    render() {
        return (
            <form className="form-wrapper" onSubmit={this.searchForImages}>
                <label htmlFor="search" className="visuallyHidden">What images do you want to search for?</label>
                <input id="search" onChange={this.getUserInput} placeholder="Search for an image"/>
            </form>
        )
    }
}

export default Searchbar;