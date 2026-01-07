const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let currentInput = "";
let operator = "";
let previousInput = "";

numbers.forEach(button => {
    button.addEventListener("click", () => {
        // Prevent multiple dots
        if(button.textContent === "." && currentInput.includes(".")) return;
        currentInput += button.textContent;
        updateDisplay();
    });
});

operators.forEach(op => {
    op.addEventListener("click", () => {
        if(currentInput === "") return;
        if(previousInput !== "") calculate();
        operator = op.dataset.op;
        previousInput = currentInput;
        currentInput = "";
    });
});

equalsBtn.addEventListener("click", () => {
    if(currentInput === "" || previousInput === "" || operator === "") return;
    calculate();
});

clearBtn.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0");
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch(operator){
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": result = curr === 0 ? "Error" : prev / curr; break;
        case "%": result = (prev * curr) / 100; break;
        default: return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateDisplay();
}

function updateDisplay(val = currentInput) {
    display.textContent = val;
}
