import React, { Component } from 'react';
import axios from 'axios';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // query state for API call
            searchTerm: '',
            results: false
        }
    }

    searchForImages = event => {
        // this method is an onSubmit event handler, so must prevent default of page refresh
        event.preventDefault();

        // // check if there is an error message
        if (this.props.currentErrorMessage !== undefined) {
            // reset error message to empty string, so new error message will show on the page
            alert('cleared error state from handle submit 1');

            this.props.errorState(undefined);
        }

        // reset search term from previous search
        // clear search term in parent component after API call
        this.setState({
            searchTerm: ''
        }, () => {
            this.props.getSearchTerm(this.state.searchTerm);
        })

        //toggle loading animation in parent component while API call is happening
        this.props.toggleLoader(true);

        /**  check user input isn't an empty string
        if it's an empty string, set the error message state in parent
        to show to user */
        if (this.state.searchTerm === '') {
            // toggle loading animation if there is no user input
            this.props.toggleLoader(false);
            // show error message if there is no user input
            this.props.errorState('Error: Please fill in this field');
        } else {
            // call Unsplash API if user input is not an empty string
            this.getImages();
        }

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
            })

    }
    /*** TODO: Fix this buggy axios call
    // API call to get images from Unsplash
    // getImages = () => {
    //     axios({
    //         method: 'get',
    //         url: 'https://api.unsplash.com//search/photos',
    //         headers: {
    //             Authorization: 'Client-ID c7e460e950c6ce50f9be85a30ccb19fb6ae9997faeea7dade15fdb1f30b331a8',
    //         },
    //         params: {
    //             // pass user input as a query param in API call
    //             // default 20 results per page so infinite scroll works on desktop
    //             query: this.state.searchTerm,
    //             per_page: this.props.numOfResults
    //         }
    //     }).then(response => {            
    //         // check if there are results from API call
    //         // if there are results

    //         if (response.data.results.length !== 0) {
    //             this.setState({
    //                 results: true
    //             })
    //         }
            
    //         if (this.state.results) {
    //             // set the total number of pages
    //             this.props.getPages(response.data.total_pages);
                
    //             // push images array to parent component
    //             this.props.getImages(response.data.results);
    //         } else {
    //             // validate response 
    //             // (check current page count against pages of result)
    //             // this.props.validateResponse();
    //         }
            
    //         //toggle loading animation after API call completes
    //         this.props.toggleLoader(false);

    //     }).catch(error => {
    //         console.error(`Something went wrong, here's the error message: ${error}`);
    //     });
    // }
   ***/ 
    // get the user input

    getUserInput = (event) => {
        event.preventDefault(); 

        // if input field is not empty
        // set state for query to use in API call
        if (event.target.value !== '') {
            this.setState({
                searchTerm: event.target.value
            }, () => {
                // set searchTerm in parent so API call in the infinite scroll method has access to search term
                this.props.getSearchTerm(this.state.searchTerm);
            })
        } else {
            // if event.target.value is empty
            // reset value
            this.setState({
                searchTerm: event.target.value
            });
        }
    }

    render() {
        return (
            <form className='form-wrapper' onSubmit={this.handleSubmit}>
                <label htmlFor='search' className='visuallyHidden'>Search for images</label>

                { this.props.currentErrorMessage !== '' ?
                    <input 
                        id='search'
                        aria-invalid='true'
                        aria-label='type of image to search for'
                        aria-required='true'
                        aria-describedby='search_error'
                        className="error-input"
                        value={this.state.searchTerm}
                        onChange={this.getUserInput}
                        placeholder='Search for an image'
                    />
                :
                    <input 
                        id='search'
                        aria-label='type of image to search for'
                        aria-required='true'
                        value={event => event.target.value }
                        onChange={this.getUserInput}
                        placeholder='Search for an image'
                    />
                }

            </form>
        )
    }
}

export default Searchbar;