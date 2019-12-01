import React from 'react';

const ImageCard = ({id, url, alt, name, profileUrl}) => {
    return (
        <div className="card-wrapper">
            <img src={`${url}`} alt={`${alt}`} id={id}/>
            <p className="photo-credit"><a href={`${profileUrl}`} target="_blank" rel="noopener noreferrer">{name}</a></p>
        </div>
    )
}

export default ImageCard;