const CACHE_NAME = "staff-portal-cache";

/* These resources will be downloaded and cached by the service worker
   during the installation process. If any resource fails to be downloaded,
   then the service worker won't be installed either.
*/

//Function used from:
let intervalWithWait = (func, wait, times) => {
  var interv = function(w, t){
      return function(){
          if(typeof t === "undefined" || t-- > 0){
              setTimeout(interv, w);
              try{
                  func.call(null);
              }
              catch(e){
                  t = 0;
                  throw e.toString();
              }
          }
      };
  }(wait, times);

  setTimeout(interv, wait);
};

const API_URL = "https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false";

let offlineFundamentals = [
  "staff.html",
  "student.html",
  "/css/grid-system.css",
  "/css/style.css"
];

let serviceWorker_Notification = (title, message, icon) => {
  console.log("serviceWorker_Notification()");
  self.registration.showNotification(title, { 
    body: message,
    icon: icon // optional 
  });
}; //serviceWorker_Notification()

let checkMonitorStatus = (monitors) => {
  console.log("Check monitor status");
  let downMonitors = [];

  let getMonitorImage = (monitorName) => {
      // console.log("getMonitorImage");
      let basePath = "./images/buttons/"
      let monitorImage;
      switch (monitorName) {
          
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
  
          default: 
              monitorImage = "CV-600x600.png";
      }
  
      let fullPath = basePath + monitorImage;
      return fullPath;
  }; //end getMonitorImage()

  console.log(`checkMonitorStatus():\t ${JSON.stringify(monitors)}`);
  console.log(monitors[0]);

  for (let i = 0; i < monitors.length; i++ ) {
      //console.log("checkMonitorStatus() for-loop");
      // console.dir(monitors[0]);
     
      if ( monitors[i]["name"] === "Destiny" ) {
          console.log(`${monitors[i].name} is up`);
          //downMonitors.push(monitors[i]);

          //check that browser supports HTML5 notifications and that the browser has 
          if ( self.registration && self.registration !== "undefined" ) { 
                serviceWorker_Notification(`${monitors[i].name}`, `${monitors[i].name} is up`, getMonitorImage(monitors[i].name) );
          } else  {
             console.log("Calling alert()");
             console.log("Type of self.registration:\t" + typeof(self.registration) + "\t" + self.registration );
              alert(`${monitors[i].name} is up`);
          } //end inner else-statement (check for SW notifications support)
      } //end outer if-statement

      /*Check if monitors that were previously down are now back up. */
      if ( typeof(downMonitors[i]) != "undefined") {
          if (downMonitors[i]["status"] === 1) {
            if ( self.registration ) { //check that browser supports HTML5 notifications and that the browser has 
              serviceWorker_Notification(`${monitors[i].name}`, `${monitors[i].name} is up`, getMonitorImage(monitors[i].name) );
            } else {
                  alert(`${monitors[i].name} is up`);
            } //end inner else-statement (check for SW notifications support)
  
              for (let j = o; j < downMonitors.length; j++ ) {
                  if (downMonitors[i].name === downMonitors[j].name ) {
                      downMonitors.splice( downMonitors.indexOf(downMonitors[j].name), 1 );
                  } //end inner if-statement
              } //end for-loop
          } //end inner if-statement
      } // end outer if-statement
  } //end for-loop
}; //end checkMonitorStatus();


const jsonFetch = () => {
  console.log("jsonFetch()");
  let isDev = true;
  if (!isDev) {
      corsAnywhere();
  }

  let monitors = [];
  let port = 3002;
  const proxy_URL =  isDev ? "https://cors-anywhere.herokuapp.com/" : `https://localhost:${port}/`;

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
  
  fetch(request) //or use window.fetch(fetchURL, initObject)
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

console.log('WORKER: executing.');

/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v1::';

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", (event) => {
  console.log('WORKER: install event in progress.');
  /* Using event.waitUntil(p) blocks the installation process on the provided
     promise. If the promise is rejected, the service worker won't be installed.
  */
  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(CACHE_NAME)
      .then( (cache) => {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources in `offlineFundamentals` to the
           cache, after making requests for them.
        */
        return cache.addAll(offlineFundamentals);
      })
      .then(() => {
        console.log('WORKER: install completed');
      })
  ); //end event.waitUntil()
});

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener("activate", (event) => {
  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
  console.log('WORKER: activate event in progress.');

  event.waitUntil(
    caches
      /* This method returns a promise which will resolve to an array of available
         cache keys.
      */
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              /* Return a promise that's fulfilled
                 when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log('WORKER: activate completed.');
      })
  );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener("fetch", (event) => {
  console.log('WORKER: fetch event in progress.');

  /* We should only cache GET requests, and deal with the rest of method in the
     client-side, by handling failed POST,PUT,PATCH,etc. requests.
  */
  if (event.request.method !== 'GET') {
    /* If we don't block the event as shown below, then the request will go to
       the network as usual.
    */
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  } //end if-statement

  /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
     Fulfillment result will be used as the response, and rejection will end in a
     HTTP response indicating failure.
  */ //event.request.url.startsWith(self.location.origin)
  if (true) {
    console.log("Enter if-statement");
    event.respondWith(
      caches
        /* This method returns a promise that resolves to a cache entry matching
          the request. Once the promise is settled, we can then provide a response
          to the fetch request.
        */
        .match(event.request)
        .then( (cached) => {
          /* Even if the response is in our cache, we go to the network as well.
            This pattern is known for producing "eventually fresh" responses,
            where we return cached responses immediately, and meanwhile pull
            a network response and store that in the cache.
            Read more:
            https://ponyfoo.com/articles/progressive-networking-serviceworker
          */
        /*
          var networked = fetch(event.request)
            // We handle the network request with success and failure scenarios.
            .then(fetchedFromNetwork, unableToResolve)
            // We should catch errors on the fetchedFromNetwork handler as well.
            .catch(unableToResolve);
        */

        ///////

        console.log("jsonFetch()");

        let monitors = [];
        let port = 3002;
        const proxy_URL = "https://cors-anywhere.herokuapp.com/";
      //`https://localhost:${port}/`;
      
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
        
        /////

        var networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);
    
        var testing = fetch(request) //or use window.fetch(fetchURL, initObject)
        .then( (response) => {
            console.log("Response:\t " + JSON.stringify(response) );
            return response.json();
        })
        /*.then( (myJson) => {
          // console.log("JSON:\t" + JSON.stringify(myJson));
          
          monitors = myJson["data"]["monitors"];
            // console.log(`Monitors: ${JSON.stringify(monitors)}`);

          return monitors;
        }) */
        /*.then( (monitors) => {
            checkMonitorStatus(monitors);
        }) */
        .catch( (error) => {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }); 

          /* We return the cached response immediately if there is one, and fall
            back to waiting on the network as usual.
          */
          console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
         // self.registration.showNotification("Hi", { "body": "Testttinngg"} );
          return cached || networked;

          function fetchedFromNetwork(response) {
            /* We copy the response before replying to the network request.
              This is the response that will be stored on the ServiceWorker cache.
            */
            var cacheCopy = response.clone();

            console.log('WORKER: fetch response from network.', event.request.url);

            caches
              // We open a cache to store the response for this request.
              .open(CACHE_NAME + 'pages')
              .then( add = (cache) => {
                /* We store the response for this request. It'll later become
                  available to caches.match(event.request) calls, when looking
                  for cached responses.
                */
                return cache.put(event.request, cacheCopy);
              })
              .then(() => {
                console.log('WORKER: fetch response stored in cache.', event.request.url);
              });

            // Return the response so that the promise is settled in fulfillment.
            return response;
          } //end fetchedFromNetwork()

          /* When this method is called, it means we were unable to produce a response
            from either the cache or the network. This is our opportunity to produce
            a meaningful response even when all else fails. It's the last chance, so
            you probably want to display a "Service Unavailable" view or a generic
            error response.
          */
          function unableToResolve () {
            /* There's a couple of things we can do here.
              - Test the Accept header and then return one of the `offlineFundamentals`
                e.g: `return caches.match('/some/cached/image.png')`
              - You should also consider the origin. It's easier to decide what
                "unavailable" means for requests against your origins than for requests
                against a third party, such as an ad provider.
              - Generate a Response programmaticaly, as shown below, and return that.
            */

            console.log('WORKER: fetch request failed in both cache and network.');

            /* Here we're creating a response programmatically. The first parameter is the
              response body, and the second one defines the options for the response.
            */
            return new Response('<h1>Portal Unavailable: Nothing in cache and unable to fetch from network.</h1>', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            });
          } //end unableToResolve
        })
    ); //end event.respondWith()
 } //end if-statement
 else {
   console.log("Enter else-statement");
 }
  
}); //end self.addEventListener()

jsonFetch();

const MINUTES = 15;
const CHECK_TIME =  1000*60*MINUTES; //Time to check (convert milliseconds to minutes): milliseconds*seconds*minutes

let runInterval = () => {
  console.log("runInterval");
  // setInterval(jsonFetch, CHECK_TIME);
  intervalWithWait(jsonFetch, CHECK_TIME);
};

runInterval();

self.addEventListener("push", (event) => {
  let title="Test"; 
  
  var options = {
      body: "Testing push notifications"
  };


  if (event) {
    console.log("Push event:\t" + event);
    event.waitUntil(
      self.registration.showNotification(title,options)
    );
  }
});
