import React from 'react';

const ImageCard = ({id, url, alt, name, profileUrl}) => {
    return (
      <>
        <a href={`${url}`}>
          <img src={`${url}`} alt={`${alt}`} id={id}/>
        </a>
        <p className="photo-credit">Photo by <a href={`${profileUrl}`}>{name}</a></p>
      </>
    )

  }

  export default ImageCard;