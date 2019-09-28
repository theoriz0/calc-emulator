//initial the data
let calculator = {
    result: '0',
    x: 0, //x (operator) y
    operator: null,
    y: null
}

function clearData() {
    calculator.result = '0';
    calculator.x = 0;
    calculator.operator = null;
    calculator.y = null;
    displayResult();
}

//load corrent display from page
calculator.result = document.querySelector('.result').innerText;

//add event listener on buttons, event bubbling
document.querySelector('.inputs').addEventListener('mouseup',buttonClick);

//handle clicks
function buttonClick(e) {
    //if there's error, click on any button resets the calculator
    if (calculator.result === 'error') {
        initialData();
    } else {
        //get the input
        let input = e.target.innerText;
        switch (input) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                //if the operator is null, number input fills into x. operator not null, input fills into y.
                if (calculator.operator === null) {
                    updateX(input);
                    calculator.result = calculator.x.toString();
                    displayResult();
                    break;
                } else {
                    updateY(input);
                    calculator.result = calculator.y.toString();
                    displayResult();
                    break;
                }
            //C button always clears data
            case 'C':
                clearData();
                break;
            //clicks on operator update calculator.operatior if y is null
            //if y is not null, it triggers the calulation before updates the operator
            case '+':
            case '-':
            case '*':
            case '%':
                if (calculator.y !== null) {
                    calc();
                }
                calculator.operator = input;
                break;
            case '=':
                if (calculator.y === null) {
                    calculator.y = calculator.x;
                }
                calc();
                break;
            case '<':
                backspace();
                break;
            default:
                console.log('Error: input not recognized.');
                console.log(e);
        }
    }
}

function backspace() {
    if (calculator.y !== null) {
        calculator.y = deleteLastNum(calculator.y);
        calculator.result = calculator.y.toString();
    } else {
        calculator.x = deleteLastNum(calculator.x);
        calculator.result = calculator.x.toString();
    }
    displayResult();
}

function deleteLastNum(i) {
    if ((i <= 9)&&(i >= -9)) {
        return 0;
    } else {
        return parseFloat(i.toString().slice(0,-1));
    }
}

function updateX(i) {
    if ((calculator.x === 0)||(calculator.x === null)) {
        calculator.x = parseInt(i);
    } else {
        calculator.x = parseFloat(calculator.x.toString() + i);
    }
}

function updateY(i) {
    if ((calculator.y === 0)||(calculator.y === null)) {
        calculator.y = parseInt(i);
    } else {
        calculator.y = parseFloat(calculator.y.toString() + i);
    }
}

function calc() {
    if ((calculator.y === 0)&&(calculator.operator === '%')) {
        calculator.result = 'Error';
    } else {
        switch (calculator.operator) {
            case '+':
                calculator.x = (parseFloat(calculator.x) + parseFloat(calculator.y));
                break;
            case '-':
                calculator.x = (parseFloat(calculator.x) - parseFloat(calculator.y));
                break;
            case '*':
                calculator.x = (parseFloat(calculator.x) * parseFloat(calculator.y));
                break;
            case '%':
                calculator.x = (parseFloat(calculator.x) / parseFloat(calculator.y));
                break;
        }
        calculator.result = calculator.x.toString();
    }
    calculator.operator = null;
    calculator.y = null;
    displayResult();
}

function displayResult() {
     document.querySelector('.result').innerText = calculator.result;
}