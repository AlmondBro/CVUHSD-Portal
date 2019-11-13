require('dotenv').config({path: __dirname + './../.env', debug: false}) //Load environmental variables

const isDev = require("isDev"); //Load environmental variables

const express = require('express'); 
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require("passport");

const session = require("express-session");

const helmet = require('helmet');
//const csp = require('helmet-csp');

//const rateLimiterRedisMiddleware = require('./middleware/rateLimiterRedis');

const sslRootCAs = require('ssl-root-cas/latest');

const requestIp = require('request-ip'); 

const app = express(); 

//TODO: Change all requires() to imports
//TODO: Add script if possible to add firefox certificate? 
//TODO: Use SSL and password encryption: https://github.com/gheeres/node-activedirectory/issues/155  ,/ 
//TODO: Get user's profile pic: https://github.com/gheeres/node-activedirectory/issues/152
//TODO: Add footer link to change password
//TODO: Have helpdesk call link
//TODO: Create protected routes
//TODO: Create student portal

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
//app.use(csp()); //Content Security Policy helps prevent unwanted content being injected into your webpages; this can mitigate cross-site scripting (XSS) vulnerabilities, malicious frames, unwanted trackers, and more

app.use(cors());
app.options('*', cors()) // include before other routes


app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const CVUHSD_CertificatePath = ('./../certificates/ssl-cvuhsd.cer');
const ADFS_CertificatePath = ('./../certificates/ssl-cvuhsd.cer');

//Inject certificates
sslRootCAs.inject() 
          .addFile(__dirname + CVUHSD_CertificatePath)
          .addFile(__dirname + ADFS_CertificatePath)
          ;
  
//app.use(rateLimiterRedisMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  key: 'express.sid',
  cookie: { secure: false, maxAge: 600000 }
}));

app.use(requestIp.mw())

app.use(passport.initialize());
app.use(passport.session());

//Need to use absolute paths relative to where the web.config file is when using Express in IISNode. 
// If not using url rewrite, specifiy extension
let aboutIISNode_URL = `${isDev ? "" : "/server"}/about-IIS-Node`

//Routes
app.get(aboutIISNode_URL,  (req, res)  =>{
  res.send(`IISNode version:\t ${process.env.IISNODE_VERSION || "Not on IIS"} 
            \n NodeJS version:\t ${process.version}
            \n isDev:\t ${isDev}`); 
}); 

let logIn_URL = `${isDev ? "" : "/server" }/login`
let logOut_URL = `${isDev ? "" : "/server" }/logout`

//Routes
app.get(logIn_URL, (req, res, next) => { res.send({success: true}); console.log("Login"); } ); 

app.get(logOut_URL, (req, res, err) => {
  console.log("Error:\t" + err);

  if (req.user || req.isAuthenticated()) {
    req.session.destroy(
      (err) => {
        if (!err) {
            console.log("Clear cookie...");
            //res.cookie("express.sid", "", { expires: new Date() });
           // res.clearCookie('express.sid', {path: '/'}).json({status: "Logout success"});
        } else {
            // handle error case
            console.log(" Destroy Cookie error");
        } //end else-statement
      } //code snippet courtesy of https://stackoverflow.com/questions/31641884/does-passports-logout-function-remove-the-cookie-if-not-how-does-it-work
    );//end req.session.code()
    req.logOut();
    res.status(401).send({logOutSuccess: true, message : "Logging Out...", userInfo: res.locals.userInfo}); //status 401 is logged out
  } //end if-statement
  
  if ( (!(req.user)) || req.isUnauthenticated()) {
    console.log("Already logged out");
  } 
  
  console.log("Neither logged in nor out");
  
});
 
//app.options('/login', cors()); // enable pre-flight request for DELETE request

let passportAuthentication_options = {  failWithError: true, 
                                        session: true,
                                        failureFlash: true 
                                    }

//TODO: Find a way so that if users input with the domain "@cvuhsd.org", they are also authenticated
app.post(logIn_URL,
  // wrap passport.authenticate call in a middleware function
   (req, res, next) => {
    // call passport authentication passing the "local" strategy name and a callback function
    ////Can use ActiveDirectory, saml, wsfed-saml2 all as authentication strategies 
    passport.authenticate('ActiveDirectory', passportAuthentication_options,  (error, user, info) => {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to 
      
     // let userInfo = {...user["_json"], ...user["name"]};
     // res.locals.userInfo = userInfo; //To 'pass a variable' to a middleware, attach it to the response.locals object
      //console.log("User:\t" + JSON.stringify(userInfo) );
      console.log("\n------------------");
      console.log("Error:\t" + error);
    
      console.log("Info:\t" + info);

      console.log(`\nUser password:\t ${req.body.password} \n Username:\t ${req.body.username}`);
     // let statusCode = /InvalidCredentialsError/.test(error.stack) || "";
      // || ( (statusCode == "401") || (statusCode == "500") )
      if (error) {
        console.log("invalid credentials error:\t" + error);
        //res.status(401).send(error);
        res.json({"success" : false, "message" : "Invalid password", "user": user});
      } else if (!user) {
        console.log("else if !user");        
       // res.status(401).send(info);
        
        res.status(401).json({"success" : false, "message" : "User does not exist"});
      } 
        
      // "Note that when using a custom callback, it becomes the application's responsibility to establish a session (by calling req.login()) and send a response."
      req.logIn(user, (err) => {
          if (err) { return next(err); }
          
          let userInfo = {...user["_json"], ...user["name"]};
          res.locals.userInfo = userInfo; //To 'pass a variable' to a middleware, attach it to the response.locals object
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
    res.status(200).send({success: true, message : "Logging in...", userInfo: res.locals.userInfo});
  });

// Test endpoint to check whether user is authenticated
let isAuth_URL = `${isDev ? "" : "/server" }/isloggedin`
app.get(isAuth_URL, (req, res) => {
  if (req.user) {
      console.log("Currently Authenticated");
      res.json({"Authenticated": true});
  } else {
    console.log("Currently Not Authenticated");
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
