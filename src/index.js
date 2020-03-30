import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import isDev from "isdev";

import App from "./components/App/App.js";

import * as serviceWorker from './serviceWorker.js';

import "bootstrap/dist/css/bootstrap.min.css";

import { AzureAD } from 'react-aad-msal';
import { authProvider } from './authProvider.js';

/*  Basename doc from React Training: 
    The base URL for all locations. If your app is served from a sub-directory on your server, 
    you’ll want to set this to the sub-directory. A properly formatted basename should have \
    a leading slash, but no trailing slash.
*/
let subDirectory = false;
let baseName = isDev ? "" : (subDirectory ? "/build" : ""); 

ReactDOM.render(
    <AzureAD provider={authProvider} forceLogin={true}>
        <Router basename={baseName}>
            <App />
        </Router>
    </AzureAD>
  
    , document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
