import React, { Component } from 'react';
import Photo from './Photo'

import NoResults from './NoResults'

class Gallery extends Component {
    state = {
        clicked: this.props.clicked
    }
    loadingResponse() {
        return <NoResults loading={this.props.loading} />
    }
    doPhotosExist = () => {

        let photo_info = this.props.photo_info
        // console.log(`GALLERY`, photo_info)
        // Check if props exist, and if so that there are results
        if (photo_info && photo_info.length > 0) {
            let photos_result;
    
            photos_result = photo_info.map(photo => {
                 return <Photo photo_info={ photo } key={ photo.id }/>
            })

            return photos_result
        } else {
            return this.loadingResponse()
        }
    }
    componentDidMount() {
        //search from URL bar changes

        //pathname is not /, and if search isnt done via clicking links or searchForm
        if(this.props.history.location.pathname.length > 1) {
            //removes /search/ from pathname
            const searchTerm = this.props.history.location.pathname.replace(/[/]search[/]/g, '')
            this.props.displayResults(searchTerm)
        }

    }
    render() {
    
        return (
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    { this.doPhotosExist() }
                </ul>
            </div>

        )
    }


}

export default Gallery
