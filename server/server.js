const express = require('express');
const bodyParser = require('body-parser');
const stringMath = require('string-math');
const app = express();
const PORT = 5002;

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

let calculationsSS = [];
// let numberValue = 0;
// let operatorValue = '';


app.post('/calculator' , (req, res)=> {
    console.log('inside of my POST request', req.body);
    // posting the object package from client side
    let objectSS = req.body;
    
    calculationsSS.push(objectSS); // server side is receiving the object
    res.sendStatus(200);
});  

app.get('/calculator', (req, res) => { // hey server is gonna use that data you sent so we can do some calculations with it
    console.log('getting the input data from client js', calculationsSS);
    // calculations are going to go here ⬇️

    // for (let i = 0; i < calculationsSS.length-1; i++) {
    //     if (i % 2 == 0) {
    //     numberValue = Number(calculationsSS[i]);
    //     } else if (i % 1 == 0) {
    //     operatorValue = calculationsSS[i];
    //     }
    // }
    
    // for (let object of calculationsSS) {
    //     if (object.operator === "+") {
    //         object.result = Number(object.input1) + Number(object.input2); 
    //     } else if (object.operator === "-") {
    //         object.result = Number(object.input1) - Number(object.input2);
    //     } else if (object.operator === "*") {
    //         object.result = Number(object.input1) * Number(object.input2); 
    //     } else if (object.operator === "/") {
    //         object.result = Number(object.input1) / Number(object.input2);
    //     };
    // };

    for (let object of calculationsSS) {
       if (object.operator === "+") {
        object.answer = parse(object.equation);
       }
    }

    
    res.send(calculationsSS); // sending the calculations array with allll the calculations back to client-side
    console.log('this is a calculation', calculationsSS)
});

app.delete('/calculator/:index', (req,res) => {
    console.log('in /calculator delete:', req.params.index);
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})