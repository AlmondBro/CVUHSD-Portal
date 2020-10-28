/* 

    Add the following polyfill for support in 
    the Microsoft Edge browser:
    
    https://reactjs.org/docs/javascript-environment-requirements.html

*/
import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';

import { polyfill as promisePolyfill } from 'es6-promise'; //Import this package for use of promises in IE11

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from "react";
import ReactDOM, { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import isDev from "isdev";

import App from "./components/App/App.js";

import * as serviceWorker from './serviceWorker.js';

// import "bootstrap/dist/css/bootstrap.min.css";

import path from "path";

import dotenv from "dotenv";
dotenv.config(  {   path    : path.join( __dirname, "./.env" ), 
                    debug   : true
                }); //Load environmental variables

promisePolyfill();

/*  Basename doc from React Training: 
    The base URL for all locations. If your app is served from a sub-directory on your server, 
    you’ll want to set this to the sub-directory. A properly formatted basename should have \
    a leading slash, but no trailing slash.
*/
const subDirectory = true;
const baseName = isDev ? "" : (subDirectory ? "/build" : ""); 

const CVUHSD_PORTAL_APP_ELEM = document.getElementById("cvuhsd-sso-portal");
// document.body;

let AppWithWrappedRouter = () => {
    return (
        <Router basename={baseName}>
            <App />
        </Router>
    ); //end return statement
}; //end AppWithWrappedRouter

render( <AppWithWrappedRouter/>, CVUHSD_PORTAL_APP_ELEM ); //end ReactDOM.render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
