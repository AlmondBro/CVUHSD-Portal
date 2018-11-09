import serviceWorker_Notification  from "../service-worker.js";

console.log("logic.js loaded");

const API_URL = "https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false";

/*
let serviceWorker_Notification = (title, message, icon) => {
    console.log("serviceWorker_Notification()");
    self.registration.showNotification(title, { 
      body: message,
      icon: icon // optional 
    });
  }; //serviceWorker_Notification()
*/
let HTML5_Notification = (title, message, icon, actionsArray) => {
    // console.log("HTML5_Notification()");
    let registration = self.registration;
    
   let monitorNotification = new Notification(title, { 
        actions: actionsArray,
        body: message,
        icon: icon // optional
    });  //end new Notification()
}; //HTML5_Notification()


window.addEventListener("load", () => { //or use window.onload
    let addToHomeScreen_Button = document.getElementById("addToHomeScreenButton");
    let deferredPrompt;

    if ("serviceWorker" in navigator) {
        // window.addEventListener("load", () => {
             navigator.serviceWorker.register("service-worker.js", { scope: "/"} )
             .then( (registration) => {
                 // Registration was successful
                 console.log("SW: ServiceWorker registration successful with scope: ", registration.scope);
             }, (error) => {
                 // registration failed :(
                 console.log("SW: ServiceWorker registration failed: ", error);
             }); //end .then()
       //  }); //end load() window event
     } else {
         console.log("Service worker is not supported in this browser");
     } //end conditional check for service-worker
     
     let addToHomeScreen = () => {
         console.log("AddtoHomeScreen()");
        
         let allowHomeScreenNotific_actions = 
         [
                 {
                     action: 'yes',
                     title: 'Allow',
                     icon: '/images/icons/check.png'
                 },
                 {
                     action: 'no',
                     title: 'No',
                     icon: '/images/icons/check.png'
                 },
             ]
     
             /*
         if ('actions' in Notification.prototype) {
             // Action buttons are supported
             HTML5_Notification("Add to Home Screen", "Would you like to add this app to your home/desktop screen?", "../images/icons/warning.png", allowHomeScreenNotific_actions);
             //(title, message, icon, actionsObjectArray)
             self.addEventListener("notificationclick", (event) => {
                 if (event.action === 'yes') { 
                     deferredPrompt.prompt();
                     // Wait for the user to respond to the prompt
                     deferredPrompt.userChoice
                     .then((choiceResult) => {
                         if (choiceResult.outcome === 'accepted') {
                         console.log('User accepted the A2HS prompt');
                         } else {
                         console.log('User dismissed the A2HS prompt');
                         }
                         deferredPrompt = null;
                     }); //end .then()
                 }  //end if-statement
                 if (event.action === 'no')  {
                     return;
                 }
             });
     
         } else {
             // Action buttons are NOT supported.
             console.log("Action buttons are not supported");
         } //end if-statement
     */
         addToHomeScreen_Button.addEventListener("click", (event) => {
             console.log("AddtoHomeScreen clicked");
             deferredPrompt.prompt();
             // Wait for the user to respond to the prompt
             deferredPrompt.userChoice
               .then((choiceResult) => {
                 if (choiceResult.outcome === 'accepted') {
                   console.log('User accepted the A2HS prompt');
                   addToHomeScreen_Button.style.display = "none";
                 } else {
                   console.log('User dismissed the A2HS prompt');
                 }
                 deferredPrompt = null;
             }); //end .then()
         });  //end  addToHomeScreen_Button.addEventListener()
     };
     
     window.addEventListener("beforeinstallprompt", (event) => {
             // Prevent Chrome 67 and earlier from automatically showing the prompt
             event.preventDefault();
     
             // Stash the event so it can be triggered later.
             deferredPrompt = event;
     
             addToHomeScreen();
    }
     ); //end window.addEventListener('beforeinstallprompt')

     window.addEventListener('appinstalled', (event) => {
        if (app !== "undefined") {
            app.logEvent('a2hs', 'installed');
        } 
        console.log("App installed");
        addToHomeScreen_Button.style.display = "none";
        document.querySelector("div.tooltip #addToHomeScreenTooltip").style.display = "none;"
    });
});








