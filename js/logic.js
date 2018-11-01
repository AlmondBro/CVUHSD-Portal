import corsAnywhere from "./server.js";
//import { headers } from "./headers.js";

//const webpack = require('webpack');

console.log("logic.js loaded");
const API_URL = "https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false";

let getMonitorImage = (monitorName) => {
    console.log("getMonitorImage");
    let basePath = "./../images/"
    let monitorImage;
    switch (monitorName) {
        /*
        case "Destiny":
            monitorImage = "Destiny.png";
            break;

        case "E2020":
            monitorImage = "Edgenuity.png";
            break;
        
        case "Helpdesk":
            monitorImage = "HelpDesk.png";
            break;

        case "IlluminateEd":
            monitorImage = "Illuminate.png";
            break;  

        case "Outlook":
            monitorImage = "Outlook.png";
            break;

        case "PowerSchool":
            monitorImage = "PS.png";
            break;

        case "Print Center":
            monitorImage = "print-center.png";
            break;

        case "Read180 Hawthorne":
            monitorImage = "Read180HW-Teacher.png";
            break;

        case "Read180 Lawndale":
            monitorImage = "Read180LW-Teacher.png";
            break;

        case "Read180 Leuzinger":
            monitorImage = "Read180LZ-Teacher.png";
            break;

        case "SmarteTools":
            monitorImage = "smartetools.png";
            break;

        case "TimeClock Plus":
            monitorImage = "timeclockpluslogo.jpg";
            break;
*/
        default: 
            monitorImage = "CV-600x600.png";
    }

    let fullPath = basePath + monitorImage;
    return fullPath;
}; //end getMonitorImage()

let checkMonitorStatus = (monitors) => {
    console.log(`checkMonitorStatus():\t ${JSON.stringify(monitors)}`);
    console.log(monitors[0]);

    for (let i = 0; i <= monitors.length; i++ ) {
        console.log("checkMonitorStatus() for-loop");
        console.dir(monitors[i]);

        if ( monitors[i]["status"] === 1 ) {
            console.log(`${monitors[i].name} is up`);
            console.log("Tesssttttinnngggg");

            if ( window.Notification && Notification.permission !== "denied" ) { //check that browser supports HTML5 notifications and that the browser has 
                Notification.requestPermission( (status) => {  // status is "granted", if accepted by user
                    let monitorNotification = new Notification(`${monitors[i].name}`, { 
                        body: `${monitors[i].name} is up`,
                        icon: getMonitorImage(monitors[i].name) // optional
                    });  //end new Notification()
                });
            } else {
                alert(`${monitors[i].name} is up`);
            } //end inner else-statement
        } //end outter else-statement
    } //end for-loop
}; //end checkMonitorStatus();

const jsonFetch = () => {
    corsAnywhere();
    console.log("jsonFetch()");
    let port = 3002;
    const proxy_URL = //"https://cors-anywhere.herokuapp.com/";
   `https://localhost:${port}/`;

    let isDev = true;
    
    let initObject = {
        method: "GET", 
        headers : { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Zoho-authtoken 400ff2f59afedd60b29e0ecec31f7c26",
            "Cache-Control": "no-cache"
        },
     };

    let fetchURL = isDev ? (proxy_URL + API_URL) : API_URL;

    let request = new Request(fetchURL, initObject);
    
    let monitors = [];

    window.fetch(request) //or use window.fetch(fetchURL, initObject)
        .then( (response) => {
            console.log(response);
            return response.json();
        })
        .then( (myJson) => {
           // console.log("JSON:\t" + JSON.stringify(myJson));
           
           monitors = myJson["data"]["monitors"];
            // console.log(`Monitors: ${JSON.stringify(monitors)}`);

            return monitors;
        })
        .then( (monitors) => {
            checkMonitorStatus(monitors);
        })
        .catch( (error) => {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }); 
}; 

jsonFetch();
//AJAXrequest();
//httpFetch();

//window.onload = () => {
    /*
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("js/service-worker.js", { scope: "/"} )
            .then( (registration) => {
                // Registration was successful
                console.log("ServiceWorker registration successful with scope: ", registration.scope);
            }, (error) => {
                // registration failed :(
                console.log("ServiceWorker registration failed: ", error);
            }); //end .then()
        }); //end load() window event
      } //end conditional check for service-worker
      */
//}; //end window.onload() function

