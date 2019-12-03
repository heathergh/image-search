import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import ImageList from './ImageList';
import Searchbar from './Searchbar';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            newImages: [],
            searchTerm: '',
            isLoading: false,
            pageCount: 2,
            pages: 0,
            perPage: 20,
            results: false,
            errorMessage: undefined,
            formInputId: ''
        }
    }

    componentDidMount() {
        // event listener to detect scroll events to bottom of page
        // when user gets to bottom of page, call API to get more results
        window.addEventListener('scroll', debounce(this.fetchMoreImages, 100), true);
    }

    componentWillUnmount() {
        console.log("component will unmount called");
        window.removeEventListener('scroll', this.fetchMoreImages, true);
    }

    getImages = unsplashImages => {
        this.setState({
            images: unsplashImages
        })
    }

    getMoreImages = unsplashImages => {
        this.setState({
            newImages: unsplashImages
        })
    }

    updateImages = () => {
        const currentImages = [...this.state.images];
        const newImages = [...this.state.newImages]
        
        // reset images array to contain current images and new images
        // increase page number so we get the next page of results
        this.setState({
            images: [...currentImages, ...newImages],
            pageCount: this.state.pageCount + 1
        })
    }

    setSearchTerm = userInput => {
        this.setState({
            searchTerm: userInput
        })
    }

    toggleLoader = booleanVal => {
        this.setState({
            isLoading: booleanVal
        })
    }

    setTotalPages = totalPages => {
        this.setState({
            pages: totalPages
        })
    }

    setErrorMessage = message => {
        this.setState({
            errorMessage: message
        })
    }
    
/*** TODO: Fix the bug in this method
    // validate response by checking current page number of results we're on compared with total number of pages
    validateResponse = () => {

        if (this.state.pages === this.state.pageCount) {
            // if page number result from api is equal to total number of pages, show error message
            this.setState({
                results: false,
                errorMessage: 'Error: No more search results.',
                formInputId: 'search_error'
            });
        } else if (this.state.pages === 0) {
            this.setState({
                results: false,
                errorMessage: 'Error: There are no results for that search. Try searching for other images.',
                formInputId: 'search_error'
            })
        } else {
            this.setState({
                results: true
            })
        }
    }
****/

    fetchMoreImages = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            axios({
                method: 'get',
                url: 'https://api.unsplash.com//search/photos',
                headers: {
                    Authorization: 'Client-ID c7e460e950c6ce50f9be85a30ccb19fb6ae9997faeea7dade15fdb1f30b331a8',
                },
                params: {
                    query: this.state.searchTerm,
                    page: this.state.pageCount,
                    per_page: this.state.perPage,
                }
            }).then(response => {
                this.setState({
                    newImages: response.data.results
                }, () => {
                    if (this.state.pageCount < this.state.pages) {
                        this.updateImages();
                    } 
                });
            }).catch((error) => {
                console.error(`Something went wrong, here's the error message: ${error}`);
            });
        }
    }

    render() {
        return(
        <main className="wrapper">
            <Searchbar
                getImages={this.getImages}
                getSearchTerm={this.setSearchTerm}
                toggleLoader={this.toggleLoader}
                getPages={this.setTotalPages}
                numOfResults={this.state.perPage}
                validateResponse={this.validateResponse}
                resultsState={this.state.results}
                errorState={this.setErrorMessage}
                handleErrorMessage={this.clearErrorMessage}
            />
            <section className="image-list-wrapper" >
                { this.state.isLoading ? <Loading /> : <ImageList searchResults={this.state.images} /> }
                
                { this.state.errorMessage !== undefined ? <ErrorMessage id={this.state.formInputId}>{this.state.errorMessage}</ErrorMessage> : null}
                
               
            </section>
        </main>
        )
    }
}

export default Main;