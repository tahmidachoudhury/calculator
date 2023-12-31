const digits = Array.from(document.querySelectorAll(".digit"));
const screen = document.querySelector(".display")
const displayScreen = document.querySelector(".display-screen");

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
let buttonText = "";

function evalEquation(){
    currentInput = operate(num1, operator, num2);
    displayScreen.textContent = currentInput;
    return currentInput;
}

function clearScreen(){
    currentInput = "";
    displayScreen.textContent = "";
}

//history screen --------------------------------------------------------------------------
const history = document.createElement("div");
history.classList.add('history-screen')
screen.insertBefore(history, displayScreen);
function displayHistory(){
    history.textContent = displayScreen.textContent;
    screen.insertBefore(history, displayScreen);
    clearScreen();
}
// ----------------------------------------------------------------------------------------

putNumbersOnScreen = function(e){
    if (e instanceof KeyboardEvent){
        buttonText = e.key;
        const allowedInputs = [
            '+','-','/','*','.',
            '0','1','2','3','4',
            '5','6','7','8','9',
            '=', 'Escape', 'Backspace', 'Enter',
        ]
        if (!allowedInputs.includes(buttonText)){
            return;
        }
        if (buttonText === '/'){
            buttonText = '÷';
        } else if (buttonText === '*'){
            buttonText = 'x';
        } else if (buttonText === 'Escape'){
            buttonText = 'CLR';
        } else if (buttonText === 'Backspace'){
            buttonText = 'DEL';
        } else if (buttonText === 'Enter'){
            buttonText = '=';
        }

    } else if (e instanceof PointerEvent){
        buttonText = e.srcElement.textContent;
        if (e.target.localName !== "button"){
            return
        }
    }
    
    if(buttonText === "CLR"){
        clearScreen();
        num1 = "";
        num2 = "";
        history.textContent = "";

    } else if(['+','-','÷','x'].includes(buttonText)){

        if (num1 == ""){
            num1 = displayScreen.textContent;
            if (num1 !== "") {
                operator = buttonText;
                history.textContent = `${num1} ${operator}`
                clearScreen();
            }
        } else if ((num1 !== "") && (num2 == "")){
            num2 = displayScreen.textContent;
            clearScreen();
        } if ((num1 !== "") && (num2 !== "")){
            let result = evalEquation();
            history.textContent = `${num1} ${operator} ${num2} = ${result}`;
            num1 = displayScreen.textContent;
            num2 = "";
            clearScreen();
        }
        operator = buttonText;
    
    } else if (buttonText === "="){

        if (num1 !== "") {
            num2 = displayScreen.textContent;
        } else {
            return;
        }
        let result = evalEquation();
        history.textContent = `${num1} ${operator} ${num2} = ${result}`;
        num1 = "";
        num2 = "";

    } else if(buttonText === "DEL") {

        function del(mongo){
            let array = mongo.textContent.split("");
            array.pop();
            mongo.textContent = array.join("");
        }

        if (displayScreen.textContent !== ""){
            del(displayScreen);
            currentInput = displayScreen.textContent;
        } else if (displayScreen.textContent == ""){
            currentInput = "";
             if (operator !== ""){
                 operator = "";
                 del(history);
             }
        }
    
    } else {
        currentInput += buttonText;
        displayScreen.textContent = currentInput;
    }  
}

digit = document.querySelector('.buttons')
digit.addEventListener('click', putNumbersOnScreen);
// -----------------------------------------------------------------------------------------

// button highlight ------------------------------------------------------------------------------

let hoverOperations = {
    a: document.querySelector(".divide"),
    b: document.querySelector(".multiply"),
    c: document.querySelector(".subtract"),
    d: document.querySelector(".add"),
}

let hoverProcess = {
    a: document.querySelector(".clear"),
    b: document.querySelector(".delete"),
}

for (let key in hoverOperations){
    let operator = hoverOperations[key];
    operator.addEventListener("mouseover", function(e){
        e.target.classList.add("oper-highlight");
    })
    operator.addEventListener("mouseout", function(e){
        e.target.classList.remove("oper-highlight");
    })
}

for (let key in hoverProcess){
    let process = hoverProcess[key];
    process.addEventListener("mouseover", function(e){
        e.target.classList.add("process-highlight");
    })
    process.addEventListener("mouseout", function(e){
        e.target.classList.remove("process-highlight");
    })
}

const eql = document.querySelector(".equals");
eql.addEventListener("mouseover", function(e){
    e.target.classList.add("eql-highlight");
})
eql.addEventListener("mouseout", function(e){
    e.target.classList.remove("eql-highlight");
})

//keyboard keys feature ------------------------------------
window.addEventListener("keydown", putNumbersOnScreen);