import * as  cors_proxy from "cors-anywhere";

let corsAnywhere = () => {
    console.log("CORS Anywhere()");
    // Listen on a specific host via the HOST environment variable
    var host = '0.0.0.0'; //process.env.HOST || 
    // Listen on a specific port via the PORT environment variable
    var port = 3002; // process.env.PORT ||
  
   // var cors_proxy = require('cors-anywhere');
    cors_proxy.createServer({
        originWhitelist: [], // Allow all origins
        requireHeader: ['origin', 'x-requested-with'],
        removeHeaders: ['cookie', 'cookie2']
    }).listen(port, host, () => {
        console.log('Running CORS Anywhere on ' + host + ':' + port);
    });
}; // end corsAnywhere()
  
  export default corsAnywhere;