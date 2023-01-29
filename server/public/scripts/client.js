$(document).ready(onReady);

let lastOperator = $('.operator').attr("value");4
// let number = $('.number').attr("value");
// let decimal =$('.decimal').attr("value");
let calculationsArray = [];
// let generateValue = '';
let totalInput = '';



function onReady() {
    console.log('jquery is loaded!');
    
    $('.number').on('click', addInputField);
    $('.operator').on('click', onOperator);
    $('.decimal').on('click', addInputField);
    $('.equal').on('click', onSubmit);
    $('.clearBtn').on('click', onClear);
    // $('.clearBtn').on('click', deleteMessage);
}

function addInputField(){
    let buttonNumber = $(this).val();
    let currentInput = $('#fullEquation').val();
    let totalInput = currentInput + buttonNumber
    
    $('#fullEquation').val(totalInput);
    console.log('total input', totalInput);
    calculationsArray.push(totalInput);

   }

function onOperator(){
    lastOperator = $(this).attr("value");
    console.log('this is the last operator clicked', lastOperator);
    addInputField();
} 

function onClear() {
    $('#fullEquation').val('');
} 

function onSubmit(evt) {
    evt.preventDefault();
    console.log('We are in onSubmit');
    console.log('I want to see calculations array', calculationsArray);
    
    let equation = $('#fullEquation').val();
    let firstNumber = 0;
    let operator;
    let secondNumber = 0;
    let completedFirstNumber = false;

    for (i in equation) {
        if (equation[i] === "+" || "-" || "*" || "/") {
        operator += equation[i];
        completedFirstNumber = true;
        }
        else if (equation[i]) === 
    }

    let inputValues = {
        firstNumber: firstNumber,
        operator: 
        secondNumber:
    }

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
        $('#returnedAnswer').text(`${values.answer}`); 
        $('#history').append (`
        <li>
        ${values.stringOfButtons} = ${values.answer}
        </li> `)}
    };
    