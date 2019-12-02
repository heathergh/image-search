import React, { Component } from 'react';
import ImageList from './ImageList';
import Searchbar from './Searchbar';
import Loading from './Loading';
import axios from 'axios';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            newImages: [],
            searchTerm: '',
            isLoading: false,
            pageCount: 2
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.fetchMoreImages, true);
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
                    page: this.state.pageCount
                }
            }).then(response => {
                this.setState({
                    newImages: response.data.results
                }, () => {
                    this.updateImages();
                });
            }).catch(error => {
                console.error(`Something went wrong: ${error}`);
            });
        }
    }

    render() {
        return(
        <main className="wrapper">
            <Searchbar getImages={this.getImages} getSearchTerm={this.setSearchTerm} toggleLoader={this.toggleLoader}/>
            <section className="image-list-wrapper" >
                { this.state.isLoading ? <Loading /> : <ImageList searchResults={this.state.images} /> }
            </section>
        </main>
        )
    }
}

export default Main;