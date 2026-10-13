// ========================================
// DISPLAY ELEMENTS
// ========================================

const previousDisplay =
    document.getElementById("previousDisplay");

const currentDisplay =
    document.getElementById("currentDisplay");


// ========================================
// CALCULATOR VARIABLES
// ========================================

let currentNumber = "0";
let previousNumber = "";
let selectedOperation = null;
let shouldResetDisplay = false;


// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

    currentDisplay.textContent = currentNumber;

    if (previousNumber && selectedOperation) {

        previousDisplay.textContent =
            `${previousNumber} ${selectedOperation}`;

    } else {

        previousDisplay.textContent = "0";
    }
}


// ========================================
// INPUT NUMBER
// ========================================

function inputNumber(number) {

    if (shouldResetDisplay) {

        currentNumber = "0";

        shouldResetDisplay = false;
    }


    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {
        return;
    }


    // Replace initial zero
    if (currentNumber === "0" && number !== ".") {

        currentNumber = number;

    } else {

        currentNumber += number;
    }


    updateDisplay();
}


// ========================================
// SELECT OPERATION
// ========================================

function selectOperation(operation) {

    if (selectedOperation !== null && !shouldResetDisplay) {

        calculate();
    }


    previousNumber = currentNumber;

    selectedOperation = operation;

    shouldResetDisplay = true;

    updateDisplay();
}


// ========================================
// CALCULATE RESULT
// ========================================

function calculate() {

    if (
        selectedOperation === null ||
        previousNumber === ""
    ) {
        return;
    }


    const firstNumber =
        parseFloat(previousNumber);

    const secondNumber =
        parseFloat(currentNumber);

    let result;


    switch (selectedOperation) {

        case "+":

            result =
                firstNumber + secondNumber;

            break;


        case "−":

            result =
                firstNumber - secondNumber;

            break;


        case "×":

            result =
                firstNumber * secondNumber;

            break;


        case "÷":

            if (secondNumber === 0) {

                currentNumber = "Cannot divide by 0";

                previousNumber = "";

                selectedOperation = null;

                updateDisplay();

                return;
            }

            result =
                firstNumber / secondNumber;

            break;


        case "%":

            result =
                firstNumber % secondNumber;

            break;


        default:

            return;
    }


    // Remove unnecessary decimal digits
    result =
        Math.round(result * 100000000) / 100000000;


    currentNumber =
        String(result);

    previousNumber = "";

    selectedOperation = null;

    shouldResetDisplay = true;

    updateDisplay();
}


// ========================================
// CLEAR CALCULATOR
// ========================================

function clearCalculator() {

    currentNumber = "0";

    previousNumber = "";

    selectedOperation = null;

    shouldResetDisplay = false;

    updateDisplay();
}


// ========================================
// DELETE LAST DIGIT
// ========================================

function deleteNumber() {

    if (shouldResetDisplay) {
        return;
    }


    if (
        currentNumber.length === 1 ||
        currentNumber === "Cannot divide by 0"
    ) {

        currentNumber = "0";

    } else {

        currentNumber =
            currentNumber.slice(0, -1);
    }


    updateDisplay();
}


// ========================================
// BUTTON EVENTS
// ========================================

const numberButtons =
    document.querySelectorAll("[data-number]");

numberButtons.forEach((button) => {

    button.addEventListener("click", () => {

        inputNumber(button.dataset.number);

    });

});


const operationButtons =
    document.querySelectorAll("[data-operation]");

operationButtons.forEach((button) => {

    button.addEventListener("click", () => {

        selectOperation(
            button.dataset.operation
        );

    });

});


const actionButtons =
    document.querySelectorAll("[data-action]");

actionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action =
            button.dataset.action;


        if (action === "clear") {

            clearCalculator();

        }


        if (action === "delete") {

            deleteNumber();

        }


        if (action === "calculate") {

            calculate();

        }

    });

});


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", (event) => {

    const key = event.key;


    // Numbers
    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {

        inputNumber(key);

    }


    // Addition
    if (key === "+") {

        selectOperation("+");

    }


    // Subtraction
    if (key === "-") {

        selectOperation("−");

    }


    // Multiplication
    if (key === "*") {

        selectOperation("×");

    }


    // Division
    if (key === "/") {

        event.preventDefault();

        selectOperation("÷");

    }


    // Percentage
    if (key === "%") {

        selectOperation("%");

    }


    // Enter / Equal
    if (
        key === "Enter" ||
        key === "="
    ) {

        event.preventDefault();

        calculate();

    }


    // Backspace
    if (key === "Backspace") {

        deleteNumber();

    }


    // Escape
    if (key === "Escape") {

        clearCalculator();

    }

});


// ========================================
// INITIAL DISPLAY
// ========================================

updateDisplay();