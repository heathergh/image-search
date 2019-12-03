import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div>
            <h2>
                {props.children}
            </h2>
        </div>
    )
}
export default ErrorMessage;