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

//my idea
let operations = {
    '+': add,
    '-': subtract,
    '÷': divide,
    'x': multiply,
}

//chatgpt helped with "return operations[operator](a, b)"
function operate(a, operator, b){
    if (operator in operations) return operations[operator](Number(a), Number(b));
    else return "invalid operator";
}

let currentInput = "";
let operator = "";

putNumbersOnScreen = function(e){
    const buttonText = e.srcElement.textContent;
    

    if(buttonText === "CLR"){
        currentInput = "";
        displayScreen.textContent = "";

    } else if(['+','-','÷','x'].includes(buttonText)){
        operator = buttonText;
        currentInput += buttonText;
        displayScreen.textContent = currentInput;
    } else if (buttonText === "="){
        let eqn = displayScreen.textContent.split(operator)
        currentInput = operate(eqn[0], operator, eqn[1]);
        displayScreen.textContent = currentInput;
    } else {
        currentInput += buttonText;
        displayScreen.textContent = currentInput;
    }
    
    
}

digit = document.querySelector('.buttons')
digit.addEventListener('click', putNumbersOnScreen);



