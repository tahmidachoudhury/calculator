const digits = Array.from(document.querySelectorAll('.digit'));
const displayScreen = document.querySelector('.display');

add = function(a, b){
    return a + b;
}
subtract = function(a, b){
    return a - b;
}
divide = function(a, b){
    return a / b;
}
multiply = function(a, b){
    return a * b;
}

let num1 = 4;
let operator = '-';
let num2 = 6;

//my idea
let operations = {
    '+': add,
    '-': subtract,
    '÷': divide,
    'x': multiply,
}

//chatgpt helped with "return operations[operator](a, b)"
function operate(a, operator, b){
    if (operator in operations) return operations[operator](a, b);
    else return "invalid operator";
}

// calc display screen
//DELETE THIS ---> calcNumbers = digits.map(number => number.textContent)



putNumbersOnScreen = function(e){
    let input = e.srcElement.textContent;
    displayScreen.textContent = input;
    if(input in operations){
        let answer = operate(a, input, b);
    }
}

digit = document.querySelector('.buttons')
digit.addEventListener('click', putNumbersOnScreen);








//DELETE THIS ---> console.log(operate(num1, operator, num2));