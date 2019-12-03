import React, { Fragment } from 'react';
import '../styles/App.css';
import Header from './Header';
import Main from './Main';

const App = () => {
    return (
        <Fragment>
            <Header />
            <Main />
        </Fragment>
    )
}

export default App;