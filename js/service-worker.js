self.addEventListener("install", (event) => {
    // Perform install steps
    const CACHE_NAME = "staff-portal-cache";
    let urlsToCache = [
      '../',
      '../staff.html',
      '../css/font-awesome.min.css',
      '../css/grid-system.css',
      '../css/style-red.css',
      '../css/style.css'
    ];
    
    self.addEventListener("install", (event) => {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then( (cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
          })
      );
    });

    self.addEventListener('fetch', function(event) {
        event.respondWith(
          caches.match(event.request)
            .then(function(response) {
              // Cache hit - return response
              if (response) {
                return response;
              }
              return fetch(event.request);
            }
          )
        );
      });
      
}); //end self.addEventListener()


  