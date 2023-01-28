const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5002;

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

let calculations = [];

app.post('/calculator' , (req, res)=> {
    console.log('inside of my POST request', req.body);

    // calculations are going to go here ⬇️
    
    

    res.sendStatus(201);
});  

app.get('/calculator', (req, res) => {
    console.log('getting the input data from client js', calculations);

    res.send(calculations);
  });

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })