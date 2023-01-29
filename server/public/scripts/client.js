$(document).ready(onReady);

let lastOperator = $('.operator').attr("value");
let number = $('.number').attr("value");
let decimal =$('.decimal').attr("value");
let calculationsArray = [];


function onReady() {
    console.log('jquery is loaded!');
    
    $('.number').on('click', inputRender);
    $('.operator').on('click', inputRender);
    $('.decimal').on('click', inputRender);
    $('.equal').on('click', onSubmit);
    // $('.clearBtn').on('click', onClear);
    // $('.clearBtn').on('click', deleteMessage);
}

// function onOperator(){
//     lastOperator = $(this).attr("value");
//     console.log('this is the last operator clicked', lastOperator);
// } 

// function onClear() {
//     $('#number1').val('');
//     $('#number2').val('');
// }

function inputRender(){
    generateValue = $(this).val();
    console.log('in inputRender', generateValue)
    calculationsArray.push(generateValue);
}

function onSubmit(evt) {
    evt.preventDefault();
    console.log('We are in onSubmit');
    console.log('I want to see calculations array', calculationsArray);
    
    let oneBigEquation = calculationsArray;
    let inputValues = {
        oneBigEquation: oneBigEquation,
        
    }
    
    // inputValues.assign({}, calculationsArray);

    
    
    console.log('new input values in client.js', inputValues);
    
    $.ajax({
        method: 'POST',
        url:'/calculator',
        data: inputValues //sending that object data riiiiight over to server 😃
    }).then(function(response){
        calculations = response;
        fetchCalculations();
    }).catch(function(err){
        alert('Unable to send the data! Try again later.')
        console.log(err);
    })
}

function fetchCalculations() {
    $.ajax({
        method:'GET',
        url:'/calculator'
    }).then(function(response) {
        calculationsArray = response;
        onRender();
    }).catch(function(err) {
        alert('Unable to get the data! Try again later.')
        console.log(err);
    })
}

// function deleteMessage() {
//     let index = $(this).data('index');
//     $.ajax({
//         method: 'DELETE',
//         url: '/calculator/' + index
//     }).then(function (response) {
//         fetchCalculations();
//     }).catch(function (err) {
//         alert('Unable to delete message! Try again.');
//         console.log(err);
//     })
// }



function onRender() {

    $('#returnedAnswer').empty();
    $('#history').empty();
    
    for (let values of calculationsArray) {
        $('#returnedAnswer').text(`${values.result}`); 
        $('#history').append (`
        <li>
        ${values.input1} ${values.operator} 
        ${values.input2} = ${values.result}
        </li> `)}
    };
    