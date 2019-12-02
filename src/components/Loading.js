import React, { Fragment } from 'react';

const Loading = () => {
    return(
        // Loading animations from LOADING.IO
        <Fragment>
            <div className="lds-ellipsis">
            <h2>Loading</h2>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Fragment>
    )
}

export default Loading;