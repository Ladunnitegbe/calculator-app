
const display = document.getElementById("maindisplay");

let currentInput = '';
let previousInput = '';
let operator = null;

const displayExpression = document.getElementById('displayExpression');
const displayResult = document.getElementById('displayResult');

const menu =document.getElementById('showMenu');
const hiddenMenu = document.getElementById('hiddenMenu');

menu.addEventListener('click', () => {
    hiddenMenu.classList.toggle("show");
    menu.classList.toggle("active");

    if(hiddenMenu.classList.contains("show")) {
        menu.innerHTML = "&#94;";
    }else{
        menu.innerHTML = "&#8964;";
    }
    
});


function updateDisplay() {
    displayResult.textContent = currentInput || '0';
    if (operator && previousInput) {
        displayExpression.textContent = `${previousInput} ${operator}`;
    }else{
        displayExpression.textContent = '';
    }
}

function appendToDisplay(number){
    if (number === '0' && currentInput === '0')
        return;
    currentInput += number;
    updateDisplay();
}

function pickOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '')  calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function clearDisplay(){
    currentInput = '';
    previousInput = '';
    operator = null;
    displayExpression.textContent = '';
    displayResult.textContent = '';

}

function deleteDisplay(){
    if (currentInput !== '') {
        currentInput = currentInput.slice(0,-1);
        updateDisplay();
    }

}

function convert(){
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function calculate(){
   let result;
   const prev = parseFloat(previousInput);
   const current = parseFloat(currentInput);
   if (isNaN(prev) || isNaN(current)) return;

   switch (operator) {
    case '+':
        result = prev + current;
        break;
    case '-':
        result = prev - current;
        break;
    case '*':
        result = prev * current;
        break;
    case '/':
        result = current !== 0 ? prev/ current : 'Error';
        break;
    case '%':
        result = (prev / 100) * current;
        break;
    default:
        return;

   }
    
   displayExpression.textContent = 
   `${previousInput} ${operator} ${currentInput} `;
   currentInput = result.toString();
   operator = null;
   previousInput = '';
   displayResult.textContent = currentInput;
}
