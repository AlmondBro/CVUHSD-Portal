require("dotenv")
                .config({ path: __dirname + "./../.env", 
                          debug: false
                        }); //Load environmental variables

const isDev = require("isDev"); //Load environmental variables

const cookieSession = require("cookie-session");
const express = require("express"); 

const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");

const helmet = require("helmet");

const sslRootCAs = require("ssl-root-cas/latest");

const requestIp = require("request-ip"); 

const uuidv1 = require("uuid/v1"); //uuID based of timestamp
const uuidv4 = require("uuid/v4"); //Random uuID

const AD = require("ad");

const app = express(); 

//TODO: Change all requires() to imports
//TODO: Add script if possible to add firefox certificate? 
//TODO: Use SSL and password encryption: https://github.com/gheeres/node-activedirectory/issues/155  ,/ 
//TODO: Get user's profile pic: https://github.com/gheeres/node-activedirectory/issues/152
//TODO: Add footer link to change password
//TODO: Have helpdesk call link

const port = process.env.PORT || 3001; 

let ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: process.env.ADFS_USER_NAME,
  pass: process.env.ADFS_USER_PASSWORD
};

const activeDirectory = new AD(ad_config);

require("./config/passport.js"); //require passport configuration

app.use(helmet());
//app.use(csp()); 
//Content Security Policy helps prevent unwanted content being injected into your webpages; 
//this can mitigate cross-site scripting (XSS) vulnerabilities,
// malicious frames, unwanted trackers, and more

app.use(cors());
app.options('*', cors()) // include before other routes


const CVUHSD_CertificatePath = ("./../certificates/ssl-cvuhsd.cer");
const ADFS_CertificatePath = ("./../certificates/ssl-cvuhsd.cer");

//Inject certificates
sslRootCAs.inject()
          .addFile(__dirname + CVUHSD_CertificatePath)
          .addFile(__dirname + ADFS_CertificatePath);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; //Override certificate authorization check
  
//app.use(rateLimiterRedisMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO: Use cookieSession to use as a client-side memory store since connect.session() MemoryStore is not designed for production
//Cookie-ssession stores data on the client while expression-session stores on the server. 

//Source: https://stackoverflow.com/questions/10760620/using-memorystore-in-production/37022764#37022764
//https://stackoverflow.com/questions/44882535/warning-connect-session-memorystore-is-not-designed-for-a-production-environm/44884800#44884800
//https://stackoverflow.com/questions/44882535/warning-connect-session-memorystore-is-not-designed-for-a-production-environm/44884800#44884800


let cookieSession_config = {
  name: "cvuhsd-portal-" + uuidv1(),
  keys: [ uuidv1() + uuidv4(), uuidv1() + uuidv4() ],
  secret: uuidv4(),
  // Cookie Options
  maxAge: 604800000, // 7 days
  secure: isDev ? false : true
};

app.use(cookieSession(cookieSession_config));


app.use(requestIp.mw())

//Need to use absolute paths relative to where the web.config file is when using Express in IISNode. 
// If not using url rewrite, specifiy extension
let aboutIISNode_URL = `${isDev ? "" : "/server"}/about-IIS-Node`;

//Routes
app.get(aboutIISNode_URL,  (req, res)  =>{
  res.send(`IISNode version:\t ${process.env.IISNODE_VERSION} 
            \n NodeJS version:\t ${process.version}
            \n isDev:\t ${isDev}`); 
}); 

const getOU_URL = `${isDev ? "" : "/server" }/getOU`;

let getOU = async (req, res, next) =>  {

  console.log("getOu()");

  let userLocation = "";

  let { user } = req.body;
  
  console.log("\nUser\t\n" + user);

  userLocation = await activeDirectory.user(user).location();

  let waitInterval = 2000; //2k milliseconds -- 2 seconds
  setTimeout(() => { 
                    res.json(userLocation); 
                    console.log("userLocation:\t" + userLocation); 
                  }, waitInterval
            ); 
}; //end getOU()

app.post(getOU_URL, getOU);

const redirectToExpoAuth_URL = `${isDev ? "" : "/server" }/mobile-app-auth`;

let redirectToExpoAuth = (req, res, next) =>  {
  let queryString = req._parsedUrl.query;
  let expoRedirectURL = process.env.EXPO_REDIRECT_URL;

  res.redirect(expoRedirectURL + queryString);
}; //end getOU()

app.get(redirectToExpoAuth_URL, redirectToExpoAuth);


/*
  In Express, 404 responses are not the result of an error, so the 
  error-handler middleware will not capture them. This behavior is 
  because a 404 response simply indicates the absence of additional 
  work to do; in other words, Express has executed all middleware 
  functions and routes, and found that none of them responded. 
  All you need to do is add a middleware function at the very bottom 
  of the stack (below all other functions) to handle a 404 response:

*/
app.use((req, res, next) => {
  //res.status(404).send("Sorry can't find that!")
  res.status(404).end("Does not exist");
});

if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the React app (only in production?)
  app.use(express.static(path.join(__dirname, './../build'))); 

  // Handles any requests that don't match the ones above,  Handle React routing, return all requests to React app
  app.get('*', (req,res, next) => {
      res.sendFile(path.join(__dirname, './../build/index.html'));
  }); 
}

//Catch errors
process.on('uncaughtException', (error) => {
  if(error.errno === 'EADDRINUSE')
       console.log("Error -- EADDR in use:\t" + error);
  else
       console.log(error);
  process.exit(1);
});  


//Listen to 
app.listen(port, () => console.log(`\nApp listening on port ${port}!\n`));
