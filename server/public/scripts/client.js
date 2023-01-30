$(document).ready(onReady);


let calculationsArray = [];

function onReady() {
    console.log('jquery is loaded!');
    
    $('.row button').on('click', addInputField);
    $('.operator').on('click', addOperator);
    $('.decimal').on('click', addInputField);
    $('.equal').on('click', onSubmit);
    $('.clearBtn').on('click', onClear);
    $('.clearAllBtn').on('click', deleteMessage);
    $('#history li').click( function(){
        $('.fullEquation').text($(this));
    });

    onRender();
} 

function addInputField(){
    let buttonValue = $(this).val();
    let currentInput = $('#fullEquation').val();
    let totalInput = currentInput + buttonValue 
    
    $('#fullEquation').val(totalInput);
    console.log('total input', totalInput);
}

function addOperator(){
    $('.operator').prop('disabled', true);
}

function onClear() {
    $('.operator').prop('disabled', false);
    $('#fullEquation').val('');
} 

function onSubmit() {
    console.log('We are in onSubmit');
    
    let equation = $('#fullEquation').val();
    
    let firstNumber = '';
    let operator = '';
    let secondNumber = '';
    let completedFirstNumber = false;
    
    for (i in equation) {
        if (equation[i] === "+" || equation[i] === "-" || equation[i] === "*" || equation[i] === "/") {
            operator = equation[i];
            completedFirstNumber = true;
        }
        else if (completedFirstNumber === true) {
            secondNumber += equation[i];
        }  else if (equation[i] === '.') {
            firstNumber += '.';
        } else if (isNaN(equation[i]) === false) {
            firstNumber += equation[i];
        }
    }
    
    let inputValues = {
        firstNumber: firstNumber,
        operator: operator,
        secondNumber: secondNumber,
    }
    
    console.log('new input values in client.js', inputValues);
    
    if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
        $.ajax({
            method: 'POST',
            url:'/calculator',
            data: inputValues //sending that object data riiiiight over to server 😃
        }).then(function(response){
            fetchCalculations();
        }).catch(function(err){
            alert('Unable to send the data! Try again later.')
            console.log(err);
        })} else {
            $('#history').empty();
            $('#history').text('Error: Invalid Input');
        }
    }
    
    function fetchCalculations() {
        $.ajax({
            method:'GET',
            url:'/calculator'
        }).then(function(response) {
            calculationsArray = response;
            onRender(); // on ready, call get you could also do onRender(response)
        }).catch(function(err) {
            alert('Unable to get the data! Try again later.')
            console.log(err);
        })
    }
    
    // function deleteMessage() {
    //     let index = $(this).data('.appendThingsHere');
    //     $.ajax({
    //         method: 'DELETE',
    //         url: '/calculator/' + index
    //     }).then(function (response) {
    //         calculationsArray = response;
    //     }).catch(function (err) {
    //         alert('Unable to delete message! Try again.');
    //         console.log(err);
    //     })
    // }
    
    
    function onRender() {
        console.log('in on render');
        
        $('#returnedAnswer').empty();
        $('#history').empty();
        
        for (let value of calculationsArray) {
            $('#returnedAnswer').text(`${value.answer}`); 
            $('#history').append (`
            <li>
            ${value.firstNumber} ${value.operator} ${value.secondNumber} = ${value.answer}
            </li> `)}
        };
        