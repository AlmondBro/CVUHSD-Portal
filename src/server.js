const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');

const app = express(); 
const port = process.env.PORT || 7000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files from the React app (only in production?)
app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//Routes
app.get('/hello-world', (req, res) => res.send('Hello World!')); 
app.get('/ping', (req, res) => console.log("Ping pong bro"));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../build/index.html'));
});


//Post routes to test 
app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
  });

process.on('uncaughtException', (error) => {
    if(error.errno === 'EADDRINUSE')
         console.log("Error -- EADDR in use:\t" + error);
    else
         console.log(error);
    process.exit(1);
});  
