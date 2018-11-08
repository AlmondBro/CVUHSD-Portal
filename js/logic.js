

console.log("logic.js loaded");

const API_URL = "https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false";

let HTML5_Notification = (title, message, icon) => {
    // console.log("HTML5_Notification()");
    let monitorNotification = new window.Notification(title, { 
        body: message,
        icon: icon // optional
    });  //end new Notification()
}; //HTML5_Notification()

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
} //end conditional check for service-worker

else {
    console.log("Service worker is not supported in this browser");
}

let addToHomeScreen = () => {
    console.log("AddtoHomeScreen()");
   
    let addToHomeScreen_Button = document.getElementById("addToHomeScreenButton");
    addToHomeScreen_Button.addEventListener("click", (event) => {
        console.log("AddtoHomeScreen clicked");
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

        addToHomeScreen_Button.style.display = "none";
    });  //end  addToHomeScreen_Button.addEventListener()

    window.addEventListener('appinstalled', (event) => {
        app.logEvent('a2hs', 'installed');
    });
};

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        event.preventDefault();

        // Stash the event so it can be triggered later.
        deferredPrompt = event;

        addToHomeScreen();
    }
); //end window.addEventListener('beforeinstallprompt'




