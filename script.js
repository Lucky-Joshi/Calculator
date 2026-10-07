let currentInput = '0';
let previousInput = '';
let operator = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
}

function inputNumber(num) {
    if (waitingForSecondOperand) {
        currentInput = num;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForSecondOperand) {
        currentInput = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);
    
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    
    if (previousInput === '') {
        previousInput = currentInput;
    } else if (operator) {
        const result = performCalculation();
        currentInput = String(result);
        previousInput = currentInput;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function performCalculation() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) {
        return current;
    }
    
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
            if (current === 0) {
                return 'Error';
            }
            result = prev / current;
            break;
        default:
            return current;
    }
    
    return result;
}

function handleEquals() {
    if (operator && !waitingForSecondOperand) {
        const result = performCalculation();
        currentInput = String(result);
        previousInput = '';
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('equals').addEventListener('click', handleEquals);

document.getElementById('decimal').addEventListener('click', inputDecimal);

document.getElementById('zero').addEventListener('click', () => inputNumber('0'));
document.getElementById('one').addEventListener('click', () => inputNumber('1'));
document.getElementById('two').addEventListener('click', () => inputNumber('2'));
document.getElementById('three').addEventListener('click', () => inputNumber('3'));
document.getElementById('four').addEventListener('click', () => inputNumber('4'));
document.getElementById('five').addEventListener('click', () => inputNumber('5'));
document.getElementById('six').addEventListener('click', () => inputNumber('6'));
document.getElementById('seven').addEventListener('click', () => inputNumber('7'));
document.getElementById('eight').addEventListener('click', () => inputNumber('8'));
document.getElementById('nine').addEventListener('click', () => inputNumber('9'));

document.getElementById('add').addEventListener('click', () => handleOperator('+'));
document.getElementById('subtract').addEventListener('click', () => handleOperator('-'));
document.getElementById('multiply').addEventListener('click', () => handleOperator('*'));
document.getElementById('divide').addEventListener('click', () => handleOperator('/'));

updateDisplay();