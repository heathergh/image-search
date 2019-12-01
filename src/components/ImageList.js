import React from 'react';
import ImageCard from './ImageCard';
import DownloadLink from './DownloadLink';

const ImageList = props => {
    return (
        <>
            {props.searchResults.map((image, index) => {
                return (
                    <li key={index}>
                        <ImageCard
                            id={image.id}
                            url={image.urls.small}
                            alt={image.alt_description}
                            postUrl={image.links.html}
                            name={image.user.name}
                            profileUrl={image.user.links.html}
                        />
                        <DownloadLink downloadUrl={image.links.download}/>
                    </li>
                )
            })}
        </>
    )
}

export default ImageList;