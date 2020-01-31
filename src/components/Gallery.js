import React, { Component } from 'react';
import Photo from './Photo'

import NoResults from './NoResults'

class Gallery extends Component {


    doPhotosExist = () => {
        let photo_info = this.props.photo_info
        //if typed into URL bar, will search
        // console.log(this.match)
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
      componentDidUpdate(prevProps) {
    
    // if(this.props.location.pathname !== prevProps.location.pathname){
    //     console.log(this.props.history)
    // }
    
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
