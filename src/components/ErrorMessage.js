import React from 'react';

const ErrorMessage = props => {
    return (
        <div className="error" role="alert" id={props.form_error_message}>
            <h2>
                {props.children}
            </h2>
        </div>
    )
}

export default ErrorMessage;