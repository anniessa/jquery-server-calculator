$(document).ready(onReady);

let lastOperator = $('.operator').attr("value");
let calculationsArray = [];

function onReady() {
    console.log('jquery is loaded!');
    
    $('.operator').on('click', onOperator);
    $('.equal').on('click', onSubmit);
    $('.clearBtn').on('click', onClear);
}

function onOperator(){
    lastOperator = $(this).attr("value");
    console.log('this is the last operator clicked', lastOperator);
} 

function onClear() {
    $('#number1').val('');
    $('#number2').val('');
}

function onSubmit(evt) {
    evt.preventDefault();
    console.log('We are in onSubmit');
    
    let input1 = $('#number1').val();
    let input2 = $('#number2').val();
    
    let inputValues = { //let's store these values in an object to get ready to send as data!
        input1: input1,
        operator: lastOperator,
        input2: input2,
        result: '',
    };
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

function deleteMessage() {
    let index = $(this).data('index');
    $.ajax({
        method: 'DELETE',
        url: '/calculator/' + index
    }).then(function (response) {
        fetchCalculations();
    }).catch(function (err) {
        alert('Unable to delete message! Try again.');
        console.log(err);
    })
}

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
    