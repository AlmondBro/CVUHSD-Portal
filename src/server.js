require('dotenv').config({path: __dirname + '/.env', debug: true}) //Load environmental variables

const express = require('express'); 
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const activeDirectory = require('ad');
const csp = require('helmet-csp');

const xml2js = require('xml2js');
const https = require('https');
//to process WS-Trust requests
const trustClient = require('wstrust-client');
 
//dotenv.config(); //Load environmental variables

const app = express(); 

const port = process.env.PORT || 3001; 

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
app.use(csp({
  directives: {
    imgSrc: [`'self'`, `imgur.com`]
  }
}));
*/

//Routes
app.get('/login', (req, res, next) => { res.send({success: true}); console.log("Login"); } ); 

const username = process.env.ADFS_USER_NAME;
const pass = process.env.ADFS_USER_PASSWORD;

  /*
const ad = new activeDirectory({
    url: "ldaps://127.0.0.1",
    user: username,
    pass: pass
});

*/

let active_directory_config = { url: process.env.ADFS_SERVER_URL,
               baseDN: 'dc=centinela.k12.ca.us,dc=com',
               username: username,
               password: pass }

let ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: username,
  pass: pass
}
let ad = new activeDirectory(ad_config);
 
//ad.user(userName).exists() ? console.log("i exist") : console.log("i do not exist");

// ad.user(userName).isMemberOf("CV_IT"); 
 
 ad.userExists(username, function(err, exists) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  console.log(username + ' exists: ' + exists);
});

app.post('/login', async (req, res, next) => {
  console.log(req.body);
  console.log("Post request for login...");
  let userName = req.body.username || req.username;
  let password = req.body.password || req.password;
  console.log("post received: %s %s", userName, password);
 
  await ad.user(userName).exists() ? console.log(`${userName} does exist`) : console.log(`${userName} does not exist`);

  await ad.user(userName).isMemberOf("CV_IT") ? console.log(userName + "is member of CV_IT") : console.log(userName + "is not a member of CV_IT"); 

  res.json({success: true});
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
