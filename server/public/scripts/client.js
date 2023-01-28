$(document).ready(onReady);

function onReady() {
    console.log('jquery is loaded!');

    $('.operator').on('click', lastOperator);
    $('.equal').on('click', onSubmit);
}
function lastOperator(evt){
    evt.preventDefault();
    lastOperator = $('.operator').val();
    console.log('this is the last operator clicked', lastOperator)
} 

function onSubmit(evt) {
    console.log('We are in onSubmit');
    evt.preventDefault();

    let input1 = $('#number1').val();
    let input2 = $('#number2').val();


    let inputValues = {
        input1: input1,
        input2: input2,
        operator: lastOperator
    };
    console.log('new input values in client.js', inputValues);

    $.ajax({
        method: 'POST',
        url:'/calculator',
        data: inputValues
    }).then(function(response){
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
        let answer = $('#returnedAnswer');
        answer.empty();
        for (let calculations of response) {
            $('#returnedAnswer').text(response.answer),
            $('#history').append (`
            `)
            
        }

});
}