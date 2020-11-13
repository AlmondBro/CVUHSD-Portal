import path from 'path';
import dotenv from 'dotenv';

import isDev from 'isdev';

import express from 'express';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import cors from 'cors';
import helmet from 'helmet';
import sslRootCAs from 'ssl-root-cas/latest';

import requestIp from  'request-ip';

import passport from 'passport';

import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';  //uuID based of timestamp

dotenv.config({    
  path    : path.join( __dirname, "./../.env" ), 
  debug   : false      
}); //Load environmental variables

const authRoutes            = require('./routes/auth/auth-routes.js');
const mainRoutes            = require('./routes/main/main-routes.js');
const helpdeskRoutes        = require('./routes/helpdesk/helpdesk-routes.js');
const userOperationsRoutes  = require('./routes/user-operations/user-operations-routes.js');

const app = express(); 

//TODO: Change all requires() to imports
//TODO: Add script if possible to add firefox certificate? 
//TODO: Use SSL and password encryption: https://github.com/gheeres/node-activedirectory/issues/155  ,/ 
//TODO: Get user's profile pic: https://github.com/gheeres/node-activedirectory/issues/152
//TODO: Add footer link to change password
//TODO: Have helpdesk call link

const port = process.env.PORT || 3001; 

app.use(helmet());
//app.use(csp()); 
//Content Security Policy helps prevent unwanted content being injected into your webpages; 
//this can mitigate cross-site scripting (XSS) vulnerabilities,
// malicious frames, unwanted trackers, and more

app.use(cors());
app.options('*', cors()) // include before other routes

const CVUHSD_CertificatePath  = ("./../certificates/ssl-cvuhsd.cer");
const ADFS_CertificatePath    = ("./../certificates/ssl-cvuhsd.cer");

//Inject certificates
sslRootCAs.inject()
          .addFile(__dirname + CVUHSD_CertificatePath)
          .addFile(__dirname + ADFS_CertificatePath);

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; //Override certificate authorization check
  
//app.use(rateLimiterRedisMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO: Use cookieSession to use as a client-side memory store since connect.session() MemoryStore is not designed for production
//Cookie-session stores data on the client while expression-session stores on the server. 

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

require("./config/ad-setup.js"); //require passport configuration
require("./config/passport.js"); //require passport configuration

app.use(passport.initialize());
app.use(passport.session());

app.use(requestIp.mw());

const mainRoutesURL             =  `/`;
const authRoutesURL             = `${isDev ? "" : "/server"}/auth`;
const helpdeskRoutesURL         = `${isDev ? "" : "/server"}/helpdesk`;
const userOperationsRoutesURL   = `${isDev ? "" : "/server"}/user-ops`;

app.use(mainRoutesURL, mainRoutes); //Middleware to route to all the main requests
app.use(authRoutesURL, authRoutes); //Middleware to route to all authorization requests
app.use(helpdeskRoutesURL, helpdeskRoutes); //Middleware to route to all helpdesk requests
app.use(userOperationsRoutesURL, userOperationsRoutes); //Middleware to route to all requests involving user profile audits, such as a password update.

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

//Listen to this server.
app.listen(port, () => console.log(`\nApp listening on port ${port}!\n`));