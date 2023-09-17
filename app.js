const digits = Array.from(document.querySelectorAll('.digit'));
const displayScreen = document.querySelector('.display');

//operate function-------------------------------------------------------------------
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
//---------------------------------------------------------------------------------------




//calculator display --------------------------------------------------------------------
let currentInput = "";
let num1 = "";
let operator = "";
let num2 = "";

function evalEquation(){
    // let eqn = displayScreen.textContent.split(operator)
    // currentInput = operate(eqn[0], operator, eqn[1]);
    currentInput = operate(num1, operator, num2);
    displayScreen.textContent = currentInput;
}

function clearScreen(){
    currentInput = "";
    displayScreen.textContent = "";
}

putNumbersOnScreen = function(e){
    const buttonText = e.srcElement.textContent;    
    if(buttonText === "CLR"){
        clearScreen();

    } else if(['+','-','÷','x'].includes(buttonText)){
        if (num1 == ""){
            num1 = displayScreen.textContent;
            clearScreen();
        } 
        operator = buttonText;
        currentInput += buttonText;
        displayScreen.textContent = currentInput;
    
    } else if (buttonText === "="){
        if(num2 == ""){
            num2 = displayScreen.textContent;
        }
        evalEquation();
        num1 = "";
        num2 = "";
    } else {
        if(['+','-','÷','x'].includes(displayScreen.textContent)){
            clearScreen();
        }
        currentInput += buttonText;
        displayScreen.textContent = currentInput;
    }  
}

digit = document.querySelector('.buttons')
digit.addEventListener('click', putNumbersOnScreen);
// -----------------------------------------------------------------------------------------


