require('dotenv').config({path: __dirname + '/.env', debug: true}) //Load environmental variables

const express = require('express'); 
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const activeDirectory = require('ad');
const ActiveDirectory = require('activedirectory');

const passport = require("passport");
const wsfedsaml2 = require("passport-wsfed-saml2").Strategy;
const ActiveDirectoryStrategy = require("passport-activedirectory");

const session = require("express-session");
const csp = require('helmet-csp');

const https = require('https');

 
//dotenv.config(); //Load environmental variables

const app = express(); 

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
    done(err, user);
  
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
  password: pass }

let ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: username,
  pass: pass
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

passport.serializeUser( (user, done) => {
  console.log("Serialized:\t" + user);
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  console.log("Deserialized:\t" + user);
  done(null, user);
});

passport.use(new ActiveDirectoryStrategy({
  integrated: false,
  ldap: active_directory_config
}, function (profile, ad, done) {
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

let ad = new ActiveDirectory(active_directory_config);
 
//ad.user(userName).exists() ? console.log("i exist") : console.log("i do not exist");

// ad.user(userName).isMemberOf("CV_IT"); 
 
/*
 ad.userExists(username, function(err, exists) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  console.log(username + ' exists: ' + exists);
}); */

//app.options('/login', cors()); // enable pre-flight request for DELETE request

let passportAuthentication_options = {  failWithError: true, 
                                        session: false,
                                        failureFlash: true 
       
                                 }

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
        console.log("if error");
        res.status(401).send(error);
      } else if (!user) {
        console.log("else if !user");        
        res.status(401).send(info);
      } else {
        console.log("next");
        next();
      }

      res.status(401).send(info);
    })(req, res);
  },

  // function to call once successfully authenticated
  function (req, res) {
    console.log("Login success");
    res.status(200).send({success: true});
  });

// Test endpoint to check whether user is authenticated
app.get('/test', function(req, res) {
  if (req.isAuthenticated()) {
      res.send('Authenticated!')
  } else {
      res.send('Not authenticated!')
  }
})

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
