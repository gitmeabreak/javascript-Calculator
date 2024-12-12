const display = document.getElementById("display");
let decimalPresent = false;
let operatorPresent = false;
let tooManyOperators = false;

function addToEnd(input) {
    display.value = display.value.replace(/^0+/, '') + input;
    operatorPresent = false;
    tooManyOperators = false;
}

function addDecimal(){
    if (!decimalPresent) {
        addToEnd('.');
    }
    decimalPresent = true;
}

function addOperator(operator){
    let lastChar = display.value[display.value.length - 1];
    decimalPresent = false;
    if (lastChar == "." || !isNaN(lastChar)) {
        addToEnd(operator);
        operatorPresent = true;
        tooManyOperators = false;
    } else if (operatorPresent && operator == "-" && !tooManyOperators) {
        addToEnd(operator);
        tooManyOperators = true;
    } else if(tooManyOperators) {
        display.value = display.value.slice(0, -2) + operator;
        tooManyOperators = false;
    } else {
        display.value = display.value.slice(0, -1) + operator;
        operatorPresent = true;
    }
}

function clearDisplay() {
    display.value = "0";
    decimalPresent = false;
    operatorPresent = false;
    tooManyOperators = false;
}

function calculate() {
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}