import React, { Component } from 'react';
import Photo from './Photo'

import NoResults from './NoResults'

class Gallery extends Component {
    state = {
        naturalSearch: true
    }

    doPhotosExist = () => {
        let photo_info = this.props.photo_info
  
        // Check if props exist, and if so that there are results
        if (photo_info && photo_info.photos.total > 0) {
            let photos_result;
            photos_result = photo_info.photos.photo.map((photo, index) => {
                return <Photo photo_info={ photo_info.photos.photo[index] } key={ photo_info.photos.photo[index].id }/>
                
            })
            return photos_result
        } else {
            return <NoResults loading={this.props.loading} />
        }

    }
    componentWillUpdate() {
        //to get search from URL bar changes
        //POP means it wasnt pushed onto history, pathname is not /, and if search isnt done via clicking links or searchForm
        if(this.props.history.action === "POP" && this.props.history.location.pathname.length > 1 && this.state.naturalSearch) {
            //removes /search/ from pathname
            const searchTerm = this.props.history.location.pathname.replace(/[/]search[/]/g, '')
            this.props.displayResults(searchTerm)
            //prevents loop
            this.setState({
                naturalSearch: false
            })
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
