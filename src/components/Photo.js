import React from 'react'

const Photo = (props) => {
    let url = `https://farm${props.photo_info.farm}.staticflickr.com/${props.photo_info.server}/${props.photo_info.id}_${props.photo_info.secret}_m.jpg`
    return (
        <li><img src={url} alt={props.photo_info.title} /></li>
    )
}
export default Photo