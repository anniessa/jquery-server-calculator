const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5002;

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

let calculationsSS = [];

app.post('/calculator' , (req, res)=> {
    console.log('inside of my POST request', req.body);
    // posting the object package from client side
    let objectSS = req.body;
    
    calculationsSS.push(objectSS); // server side is receiving the object
    res.sendStatus(201);
});  

app.get('/calculator', (req, res) => { // hey server is gonna use that data you sent so we can do some calculations with it
    console.log('getting the input data from client js', calculationsSS);
    // calculations are going to go here ⬇️
    
    for (let object of calculationsSS) {
        if (object.operator === "+") {
            object.result = Number(object.input1) + Number(object.input2); 
        } else if (object.operator === "-") {
            object.result = Number(object.input1) - Number(object.input2);
        } else if (object.operator === "*") {
            object.result = Number(object.input1) * Number(object.input2); 
        } else if (object.operator === "/") {
            object.result = Number(object.input1) / Number(object.input2);
        };
    };
    res.send(calculationsSS); // sending the calculations array with allll the calculations back to client-side
    console.log('this is a calculation', calculationsSS)
});

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})