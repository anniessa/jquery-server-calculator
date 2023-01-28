$(document).ready(onReady);

let lastOperator = $('.operator').attr("value");
let calculationsArray = [];

function onReady() {
    console.log('jquery is loaded!');
    
    $('.operator').on('click', onOperator);
    $('.equal').on('click', onSubmit);
}

function onOperator(){
    lastOperator = $(this).attr("value");
    console.log('this is the last operator clicked', lastOperator)
} 

function onSubmit(evt) {
    evt.preventDefault();
    console.log('We are in onSubmit');
    
    let input1 = $('#number1').val();
    let input2 = $('#number2').val();
    
    let inputValues = {
        input1: input1,
        operator: lastOperator,
        input2: input2,
        result: '',
    };
    console.log('new input values in client.js', inputValues);
    
    $.ajax({
        method: 'POST',
        url:'/calculator',
        data: inputValues
    }).then(function(response){
        calculations = response;
        $('#number1').val('');
        $('#number2').val('');
        fetchCalculations();
    }).catch(function(err){
        alert('Error! Try again later.')
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
    });
}

function onRender() {
    let answer = $('#returnedAnswer');
    answer.empty();
    $('#history').empty();
    
    for (let values of calculationsArray) {
        $('#returnedAnswer').text(`${values.result}`); 
        $('#history').append (`
        <li>
        ${values.input1} ${values.operator} 
        ${values.input2} = ${values.result}
        </li> `)}
    };
    