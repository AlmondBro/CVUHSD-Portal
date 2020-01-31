require("dotenv")
  .config({ path: __dirname + "./../.env", 
            debug: false}); //Load environmental variables

const isDev = require("isDev"); //Load environmental variables

const cookieSession = require("cookie-session");
const express = require("express"); 

const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require("passport");

const session = require("express-session");

const helmet = require("helmet");
//const csp = require('helmet-csp');

//const rateLimiterRedisMiddleware = require('./middleware/rateLimiterRedis');

const sslRootCAs = require("ssl-root-cas/latest");

const requestIp = require("request-ip"); 

const uuidv1 = require("uuid/v1"); //uuID based of timestamp
const uuidv4 = require("uuid/v4"); //Random uuID

const undefsafe = require("undefsafe");

const app = express(); 

//TODO: Change all requires() to imports
//TODO: Add script if possible to add firefox certificate? 
//TODO: Use SSL and password encryption: https://github.com/gheeres/node-activedirectory/issues/155  ,/ 
//TODO: Get user's profile pic: https://github.com/gheeres/node-activedirectory/issues/152
//TODO: Add footer link to change password
//TODO: Have helpdesk call link


const port = process.env.PORT || 3001; 

require("./config/passport.js"); //require passport configuration

/*
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
})); */

app.use(helmet());
//app.use(csp()); 
//Content Security Policy helps prevent unwanted content being injected into your webpages; 
//this can mitigate cross-site scripting (XSS) vulnerabilities,
// malicious frames, unwanted trackers, and more

app.use(cors());
app.options('*', cors()) // include before other routes


/*
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

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

let username;

let cookieSession_config = {
  name: "cvuhsd-portal-" + uuidv1(),
  keys: [ uuidv1() + uuidv4(), uuidv1() + uuidv4() ],
  secret: uuidv4(),
  // Cookie Options
  maxAge: 604800000, // 7 days
  secure: isDev ? false : true
};

app.use(cookieSession(cookieSession_config));


/*
app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: false,
  key: uuidv1(),
  cookie: { secure: isDev ? false : true, maxAge: 604800000 }
}));
*/

app.use(requestIp.mw())

app.use(passport.initialize());
app.use(passport.session());

//Need to use absolute paths relative to where the web.config file is when using Express in IISNode. 
// If not using url rewrite, specifiy extension
let aboutIISNode_URL = `${isDev ? "" : "/server"}/about-IIS-Node`;

//Routes
app.get(aboutIISNode_URL,  (req, res)  =>{
  res.send(`IISNode version:\t ${process.env.IISNODE_VERSION} 
            \n NodeJS version:\t ${process.version}
            \n isDev:\t ${isDev}`); 
}); 

let logIn_URL = `${isDev ? "" : "/server" }/login`;
let logOut_URL = `${isDev ? "" : "/server" }/logout`;

//Routes
app.get(logIn_URL, (req, res) => { res.send({success: true}); console.log("Login"); } ); 

app.post(logOut_URL, (req, res, next) => {
  //console.log("Log Out Next:\t" + next); //TODO: See if this is really the next() function or an error

  if (req.user || req.isAuthenticated()) {
    console.log("\n\nReq-session, before logging out:\t" + JSON.stringify(req.session) );
    //Destroy cookie: https://stackoverflow.com/questions/31641884/does-passports-logout-function-remove-the-cookie-if-not-how-does-it-work
    req.logout();
    req.session = null; //Destroy session

    //res.clearCookie('express.sid', {path: '/'}).json({status: "Logout success"});
    res.status(401).send({logOutSuccess: true, message : "Logging Out...", userInfo: res.locals.userInfo}); //Send message to front-end to log out. Status 401 is logged out or unauthorized.
    /* /req.session.destroy only works when expression-session is used
    req.session.destroy(
      (err) => {
        if (!err) {
            console.log("Clear cookie...");
            //res.cookie("express.sid", "", { expires: new Date() });
           // res.clearCookie('express.sid', {path: '/'}).json({status: "Logout success"});
           //req.logOut(); Logout used to be here
           res.status(401).send({logOutSuccess: true, message : "Logging Out...", userInfo: res.locals.userInfo}); //status 401 is logged out
           console.log("Req-session, after logging out:\t" + JSON.stringify(req.session) )          
          } else {
            // handle error case
            console.log(" Destroy Cookie error");
        } //end else-statement
      } //code snippet courtesy of https://stackoverflow.com/questions/31641884/does-passports-logout-function-remove-the-cookie-if-not-how-does-it-work
    );//end req.session.code()
      */
  } //end if-statement
  
  if ( (!(req.user)) || req.isUnauthenticated()) {
    console.log("Already logged out");
    console.log("\n\nPassport.session, after logging out:\t" + JSON.stringify(passport.session) ); 
  } else {
    console.log("Neither logged in nor out");
  }
});
 
//app.options('/login', cors()); // enable pre-flight request for DELETE request

let passportAuthentication_options = {  failWithError: true, 
                                        session: true,
                                        failureFlash: true 
                                    }

//The following is a function that parses the string value from the 'dn' category and extracts the key value pairs
let getSite = (dnString) => {
  let site = "CVUHSD";
  let dnKeyValueObject = {}; //Initialize key-value object. Will contain the OUs

  let keyValuePairsArray = dnString.toString().split(',', 3);
  let splitPair = [];

  keyValuePairsArray.forEach((pair, index) => {
    //TODO: Try to fix below error, if possible
    let i = 0; //Mimic for loop since apparently the index variable from Array.forEach() breaks everything. 
    console.log("Pair:\t" + pair + "\nIndex:\t" + index);
    splitPair = pair.split('=');

    dnKeyValueObject[splitPair[i]] = splitPair[i+1];
    i++
  });

  console.log("\n\ndnString:\t" + dnString + "\ndnString Type of:\t" + typeof(dnString) + "\ndnStringisArray:\t" + Array.isArray(keyValuePairsArray));
  console.log("\nkeyValuePairs:\t" + keyValuePairsArray + "\nkeyValuePairs Type of:\t" + typeof(keyValuePairsArray) + "\nkeyValuePairsIsArray:\t" + Array.isArray(keyValuePairsArray)  );
  console.log("\nSplit Pair:\t" + splitPair + "\nType of:\t" + typeof(splitPair) + "\n\n");

  console.log("\ndnKeyValueObject\t" + dnKeyValueObject );
  console.dir(dnKeyValueObject);

  site = dnKeyValueObject["OU"];
  return site;
}; 

//TODO: Find a way so that if users input with the domain "@cvuhsd.org", they are also authenticated
app.post(logIn_URL,
  // wrap passport.authenticate call in a middleware function
   (req, res, next) => {
    // call passport authentication passing the "local" strategy name and a callback function
    ////Can use ActiveDirectory, saml, wsfed-saml2 all as authentication strategies 
    passport.authenticate('ActiveDirectory', passportAuthentication_options,  (error, user, info) => {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to 
      
      //let userInfo = {...user["_json"], ...user["name"]};
     // res.locals.userInfo = userInfo; //To 'pass a variable' to a middleware, attach it to the response.locals object
      //console.log("User:\t" + JSON.stringify(userInfo) );

      username = req.body.username;
      console.log("\n------------------");
      console.log("Error:\t" + error);
    
      console.log("Info:\t" + info);

      console.log(`\nUser password:\t ${req.body.password} \n Username:\t ${req.body.username}`);
     // let statusCode = /InvalidCredentialsError/.test(error.stack) || "";
      // || ( (statusCode == "401") || (statusCode == "500") )
      if (error) {
        console.log("invalid credentials error:\t" + error);
        //res.status(401).send(error);
        res.json({"success" : false, "message" : JSON.stringify(error) || "Invalid password", "user": user});
      } else if (!user) {
        console.log("else if !user");        
       // res.status(401).send(info);
        
        res.status(401).json({"success" : false, "message" : "User does not exist"});
      } 
        
      // "Note that when using a custom callback, it becomes the application's responsibility to establish a session (by calling req.login()) and send a response."
      req.logIn(user, (err) => {
          if (err) { return next(err); }
          
          let userInfo = {...user["_json"], ...user["name"]};

          let site = getSite(userInfo["dn"]);

          console.log("site:\t" + (site) );
          console.log("\n\nRaw user info:\t" + (user) );
          console.dir(user);
        
          //userInfo = {...user["_json"], ...user["name"], ...{"site": site} };

          //More condensed userInfo with only necessary attributes
          userInfo = { 
                      ...{"title" : user["_json"].title },
                      ...{"displayName" : user["_json"].displayName }, 
                      ...{"givenName" : user["name"].givenName },
                      ...{"familyName" : user["name"].familyName }, 
                      ...{"emails": user["emails"][0].value},
                      ...{"cvuhsd-email" : user["_json"].description },
                      ...{"site": site} 
                    };

          res.locals.userInfo = userInfo; //To 'pass a variable' to a middleware, attach it to the response.locals object
          req.session.userInfo = res.locals.userInfo; //Add userInfo object to the session
          
          console.log("Logged in successfully -- Calling next() -- go to next middleware");
         // return done(null, user); //causes error
          next(); //pass to next function in middleware
      });

      //res.status(401).send(info); this was causing a headers already set error
    })(req, res, next);
  },

  // function to call once successfully authenticated
   (req, res) => {
    console.log("Login success");
    res.status(200).send({success: true, message : "Success! Logging in...", userInfo: res.locals.userInfo});
  });

// Test endpoint to check whether user is authenticated
let isAuth_URL = `${isDev ? "" : "/server" }/isloggedin`
app.get(isAuth_URL, (req, res) => {
  if (req.user) {
      console.log("\nCurrently Authenticated");
      res.json({"Authenticated": true});
  } else {
    console.log("\nCurrently Not Authenticated");
    res.json({"Authenticated": false});
  }
});

let getIP_URL = `${isDev ? "" : "/server" }/getIP`
app.get(getIP_URL, (req, res) => {
  //https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
  //let IP = request.headers['x-forwarded-for']  || req.connection.remoteAddress;
  const IP = req.clientIp;
  console.log("IP:\t" + IP);
  res.end(IP);
});


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

// app.use((req, res) => {
//   res.setHeader("Content-Security-Policy", "font-src 'self' https://apis.google.com");
//   res.setHeader("Content-Security-Policy", "img-src 'self' https://apis.google.com");
// });


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
