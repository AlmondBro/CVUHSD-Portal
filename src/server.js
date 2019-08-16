const express = require('express'); 
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); 
const port = process.env.PORT || 7000; 

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get('/hello-world', (req, res) => res.send('Hello World!')); 
app.get('/ping', (req, res) => console.log("Ping pong bro"));


if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the React app (only in production?)
    app.use(express.static(path.join(__dirname, '../build'))); 

    // Handles any requests that don't match the ones above,  Handle React routing, return all requests to React app
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    }); 
}

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

app.listen(port, () => console.log(`App listening on port ${port}!`));
