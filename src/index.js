/* 

    Add the following polyfill for support in 
    the Microsoft Edge browser:
    
    https://reactjs.org/docs/javascript-environment-requirements.html

*/
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import 'core-js';

import { polyfill as promisePolyfill } from 'es6-promise'; //Import this package for use of promises in IE11

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import isDev from "isdev";

import { CookiesProvider } from 'react-cookie';

import App from "./components/App/App.js";

import * as serviceWorker from './serviceWorker.js';

import path from "path";

import dotenv from "dotenv";
dotenv.config(  {   path    : path.join( __dirname, "./.env" ), 
                    debug   : false
                }); //Load environmental variables

promisePolyfill();

/*  Basename doc from React Training: 
    The base URL for all locations. If your app is served from a sub-directory on your server, 
    you’ll want to set this to the sub-directory. A properly formatted basename should have \
    a leading slash, but no trailing slash.
*/
const subDirectory = false;
const baseName = isDev ? "" : (subDirectory ? "/build" : ""); 
//basename={baseName}

/*
    Turns out if using create-react-app, you just need to set the home page to the subdirectory you are deploying to:
    https://muffinman.io/blog/react-router-subfolder-on-server/
*/

const CVUHSD_PORTAL_APP_ELEM = document.getElementById("cvuhsd-sso-portal");
// document.body;

let WrappedApp = () => {
    return (
        <Router >
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Router>
    ); //end return statement
}; //end AppWithWrappedRouter

render( <WrappedApp/>, CVUHSD_PORTAL_APP_ELEM ); //end ReactDOM.render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
