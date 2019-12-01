import React from 'react';

const DownloadLink = ({downloadUrl}) => {
    return (
        <a className="download-link" download href={`${downloadUrl}?force=true`}>Download Original Image</a>
    )
}

export default DownloadLink;