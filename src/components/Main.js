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
            noResults: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', debounce(this.fetchMoreImages, 150), true);
    }

    componentWillUnmount() {
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

    setErrorStates = message => {
        this.setState({
            noResults: true,
            errorMessage: message
        })
    }

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
                console.error(`Something went wrong: ${error}`);
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
                noResultsState={this.state.noResults}
                errorState={this.setErrorStates}
            />
            <section className="image-list-wrapper" >
                {
                this.state.isLoading
                ?
                    <Loading />
                :
                    <ImageList searchResults={this.state.images} />
                }
                
                {
                    this.state.errorMessage !== ''
                ?
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                :
                    null
                }
            </section>
        </main>
        )
    }
}

export default Main;