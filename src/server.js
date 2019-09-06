const express = require('express'); 
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const csp = require('helmet-csp')

const app = express(); 

const port = process.env.PORT || 7000; 

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
app.use(csp({
  directives: {
    imgSrc: [`'self'`, `imgur.com`]
  }
}));
*/

app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "font-src 'self' https://apis.google.com");
  res.setHeader("Content-Security-Policy", "img-src 'self' https://apis.google.com");
  return next();
});

//Routes
app.get('/hello-world', (req, res, next) => { res.send('Hello World!'); console.log("Hello world"); }); 
app.get('/ping', (req, res, next) => { res.send("Pong"); console.log("Ping pong bro");  } );
app.get('/login', (req, res, next) => { console.log("Login"); } ); 


if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the React app (only in production?)
    app.use(express.static(path.join(__dirname, './../build'))); 

    // Handles any requests that don't match the ones above,  Handle React routing, return all requests to React app
    app.get('*', (req,res, next) => {
        res.sendFile(path.join(__dirname, './../build/index.html'));
    }); 
}

//Post routes to test 
app.post('/api/world', (req, res, next) => {
    console.log(req.body);
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
  });

app.post('/login'), (req, res, next) => {
  console.log(req.body);
  console.log("Post request for login...");
  let username = req.body.username;
  let password = req.body.password;
  console.log("post received: %s %s", username, password);
};

//Catch errors
process.on('uncaughtException', (error) => {
    if(error.errno === 'EADDRINUSE')
         console.log("Error -- EADDR in use:\t" + error);
    else
         console.log(error);
    process.exit(1);
});  

//Listen to 
app.listen(port, () => console.log(`App listening on port ${port}!`));
