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
    '/': divide,
    '*': multiply,
}

//chatgpt helped with "return operations[operator](a, b)"
function operate(a, operator, b){
    if (operator in operations) return operations[operator](a, b);
    else return "invalid operator";
}

console.log(operate(num1, operator, num2));