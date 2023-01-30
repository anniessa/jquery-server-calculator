//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');

console.log('My name is', process.env.MY_NAME);

// APP SETUP
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended:true})) // parsing out an object within an object within an object

app.use(express.static('server/public'));

let calculationsSS = [];

// HTTP ROUTE

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
            object.answer = Number(object.firstNumber) + Number(object.secondNumber); 
        } else if (object.operator === "-") {
            object.answer = Number(object.firstNumber) - Number(object.secondNumber);
        } else if (object.operator === "*") {
            object.answer = Number(object.firstNumber) * Number(object.secondNumber); 
        } else if (object.operator === "/") {
            object.answer = Number(object.firstNumber) / Number(object.secondNumber);
        };
    };

    // switch(objectSS.operator) {
        //case '+': 
        //objectSS.result = Number(objectSS.firstNumber) + Number(objectCSS.secondNumber)
    // }

    res.send(calculationsSS); // sending the calculations array with allll the calculations back to client-side
    console.log('this is a calculation', calculationsSS)
});

// app.delete('/calculator/:index', (req,res) => {
//     console.log('in /calculator delete:', req.params.index);
//     const index = req.params;
//     const deleted = calculationsSS.find(equation => equation.index === index)
//     if (deleted) {
//         calculationsSS = calculationsSS.filter(calculationsSS => calculationsSS.index != index)
//     } else {
//        res.status(404)
//     }
//     res.sendStatus(200);
// });

//LISTEN START
app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
});