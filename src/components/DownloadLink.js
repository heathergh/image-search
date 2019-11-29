import React from 'react';

const DownloadLink = ({downloadUrl}) => {
    return (
        <p><a href={`${downloadUrl}`}>Download Image</a></p>
    )
}

export default DownloadLink;