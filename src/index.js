import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker.js';

import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import isDev from 'isdev';

/*  Basename doc from React Training: 
    The base URL for all locations. If your app is served from a sub-directory on your server, 
    you’ll want to set this to the sub-directory. A properly formatted basename should have \
    a leading slash, but no trailing slash.
*/
let baseName = isDev ? '' : '/build'; 

ReactDOM.render(
    <Router basename={baseName}>
        <App />
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
