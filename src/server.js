require('dotenv').config({path: __dirname + '/.env', debug: true}) //Load environmental variables

const express = require('express'); 
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

//const ActiveDirectory = require('activedirectory');

const passport = require("passport");
const ActiveDirectoryStrategy = require("passport-activedirectory");

const session = require("express-session");
const csp = require('helmet-csp');

const app = express(); 

//TODO: Use SSL and password encryption: https://github.com/gheeres/node-activedirectory/issues/155  ,/ 
//TODO: Get user's profile pic: https://github.com/gheeres/node-activedirectory/issues/152

const port = process.env.PORT || 3001; 

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
  
});

/*
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
})); */
app.use(cors());
app.options('*', cors()) // include before other routes

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*
passport.use(new wsfedsaml2(
  {
    path: '/login',
    realm: 'http://localhost:3000',
    homeRealm: '', // optionally specify an identity provider to avoid showing the idp selector
    identityProviderUrl: 'https://sso.centinela.k12.ca.us/adfs/ls/',
    thumbprints: ["207fed2bcc4c22cbc6fddae071d90a18580d0fed"]
  },
  function(profile, done) {
      if (err) {
        return done(err);
      }
      return done(null, profile);
  })
);
*/

const username = process.env.ADFS_USER_NAME;
const pass = process.env.ADFS_USER_PASSWORD;

let active_directory_config = { url: process.env.ADFS_SERVER_URL,
  baseDN: process.env.LDAP_BASEDN,
  username: username,
  password: pass 
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 600000 }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new ActiveDirectoryStrategy({
  integrated: false,
  ldap: active_directory_config
}, function (profile, ad, done) {
  //This function is a verify callback -- strategies require this and the purpose is to find the user that possesses this set of credentials
  ad.isUserMemberOf(profile._json.dn, 'Domain Users', function (err, isMember) {
    if (err) return done(err);
    return done(null, profile);
  });
}));

/*
app.use(csp({
  directives: {
    imgSrc: [`'self'`, `imgur.com`]
  }
}));
*/

//Routes
app.get('/login', (req, res, next) => { res.send({success: true}); console.log("Login"); } ); 
 
 
//app.options('/login', cors()); // enable pre-flight request for DELETE request

let passportAuthentication_options = {  failWithError: true, 
                                        session: true,
                                        failureFlash: true 
       
                                 }

//TODO: Find a way so that if users input with the domain "@cvuhsd.org", they are also authenticated
app.post('/login',
  // wrap passport.authenticate call in a middleware function
  function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('ActiveDirectory', passportAuthentication_options, function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to 
      
      console.log("\n------------------");
      console.log("Error:\t" + error);
      console.log("User:\t" + JSON.stringify(user) );
      console.log("Info:\t" + info);

     // let statusCode = /InvalidCredentialsError/.test(error.stack) || "";
      // || ( (statusCode == "401") || (statusCode == "500") )
      if (error) {
        console.log("invalid credentials error:\t" + error);
        //res.status(401).send(error);
        res.json({"success" : false, "message" : "Invalid password"});
      } else if (!user) {
        console.log("else if !user");        
       // res.status(401).send(info);
        
        res.status(401).json({"success" : false, "message" : "User does not exist"});
      } 
        
      // "Note that when using a custom callback, it becomes the application's responsibility to establish a session (by calling req.login()) and send a response."
      req.logIn(user, function(err) {
          if (err) { return next(err); }
          
          res.locals.userInfo = user; //To 'pass a variable' to a middleware, attach it to the response.locals object
          console.log("Logged in successfully -- Calling next() -- go to next middleware");
          
         // return done(null, user); //causes error
          next(); //pass to next function in middleware
      });

      //res.status(401).send(info); this was causing a headers already set error
    })(req, res, next);
  },

  // function to call once successfully authenticated
  function (req, res) {
    console.log("Login success");
    res.status(200).send({success: true, message : "Logging in...", userInfo: res.locals.userInfo});
  });

// Test endpoint to check whether user is authenticated
app.get('/isauthenticated', function(req, res) {
  if (req.isAuthenticated()) {
      res.send('Authenticated!')
  } else {
      res.send('Not authenticated!')
  }
});

app.get('/get-ip-address', function(req, res) {
  //https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
  let IP = request.headers['x-forwarded-for']  || req.connection.remoteAddress;
  console.log("IP:\t" + IP);
  res.send(IP);
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
