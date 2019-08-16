const express = require('express'); 
const bodyParser = require('body-parser');


const app = express(); 
const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//Routes
app.get('/hello-world', (req, res) => res.send('Hello World!')); 
app.get('/ping', (req, res) => console.log("Ping pong bro"));

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
