//import { headers } from "./headers.js";

import corsAnywhere  from "./server.js";
//const webpack = require('webpack');

console.log("logic.js loaded");
const API_URL = "https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false";

const AJAXrequest = () => {
    console.log("Ajax");
    var data = "";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("GET", "http://localhost:3002/https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false");
    xhr.setRequestHeader("Authorization", "Zoho-authtoken a12345b6c8de901f2gh3456ij78k901l");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "708164c7-a97d-4b00-a186-5c8b4a2beffb");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(data);
    console.log("Data:\t" + data);
};

const jsonFetch = () => {
    console.log("jsonFetch()");
    let port = 3002;
    let localHost_URL = `http://localhost:${port}/`;

    let initObject = {
        method: "GET",
        credentials: 'include', 
        headers : { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Zoho-authtoken a12345b6c8de901f2gh3456ij78k901l",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*"
        },
        
     };

    let isDev = false;
    let fetchURL = isDev ? (localHost_URL + API_URL) : API_URL;

    let request = new Request(fetchURL, initObject);
     
    window.fetch(fetchURL, initObject)
        .then( (response) => {
            console.log(response);
            return response.json();
        })
        .then( (myJson) => {
            console.log("JSON:\t" + JSON.stringify(myJson));
           // let randomFact = myJson.fact;
           // console.log("randomFact:\t" + randomFact);
            
            //Constant cat fact notifications for the giggles
          //  popNotification("Random Fact:", randomFact, "https://image.shutterstock.com/image-illustration/question-mark-thin-line-icon-260nw-762116929.jpg");
        })
        .catch( (error) => {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }); 
}; 

/* //
const httpFetch = () => {
    console.log("httpFetch");
var http = require("https");

var options = {
    "method": "GET",
    "hostname": [
        "www",
        "site24x7",
        "com"
    ],
    "path": [
        "api",
        "current_status"
    ],
    "headers": {
        "Authorization": "Zoho-authtoken 400ff2f59afedd60b29e0ecec31f7c26",
        "Cache-Control": "no-cache",
        "Postman-Token": "28982f83-f95f-49ee-9153-48b57fad3994"
    }
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
    });

    req.end();
};

*/

jsonFetch();
//AJAXrequest();
//httpFetch();

window.onload = () => {
    console.log("window.onload")
  /* window.fetch(request)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(JSON.stringify(myJson));
    }).catch(error => console.error('Error:', error)); */
    AJAXrequest();
};

function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

