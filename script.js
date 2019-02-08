let currentNumber = 0;
let shouldClearDisplay = false;
let currentOperationsKey;
let currentCalculationValue = "";
let previousOperationsKey;
let isThereAPoint = false; // nihilism
let divisor = 10;
const operations = {
  plus: " + ",
  minus: " - ",
  times: " &times; ",
  divide: " &divide; ",
};

/* STATE CHANGES */
function setClearDisplayOnNextNumberInput() {
  shouldClearDisplay = true;
}

function setCurrentOperationsKey(value) {
  previousOperationsKey = currentOperationsKey;
  currentOperationsKey = value;
}

function removeCurrentOperationsKey() {
  currentOperationsKey = undefined;
}

function removeThePoint() {
  isThereAPoint = false;
  divisor = 10;
  console.log("There is no point.")
}

function clearTheDisplayIfNecessary() {
  if (shouldClearDisplay) {
    currentNumber = 0;
    shouldClearDisplay = false;
  }
}

function updateCurrentNumber(value) {
  if (isThereAPoint) {
    currentNumber = currentNumber + (value / divisor);
    divisor *= 10;
  } else {
    currentNumber = (currentNumber * 10) + value;
  }
}

function updateCurrentCalculationValue() {
  if (previousOperationsKey) { // check if the LAST key is not undefined
    let operatorLength = operations[previousOperationsKey].length;
    let valueLength = currentCalculationValue.length - operatorLength;
    currentCalculationValue = currentCalculationValue.substring(0, valueLength);
    currentCalculationValue += operations[currentOperationsKey];
  } else {
    // Use the currently clicked key to build a string
    currentCalculationValue += currentNumber + operations[currentOperationsKey];
  }
}


/* VIEW UPDATES */
function updateDisplay() {
  document
    .getElementById('display')
    .innerHTML = currentNumber;
}

function updateCurrentCalculation() {
  document
    .getElementById('current-calculation')
    .innerHTML = currentCalculationValue;
}

function logState() {
  console.log("current number", currentNumber);
  console.log("should clear", shouldClearDisplay);
  console.log("cur op key", currentOperationsKey);
  console.log("cur calc value", currentCalculationValue);
}


/* EVENT HANDLERS */
for (let i = 0; i < 10; i++) {
  document
    .getElementById('number' + i)
    .addEventListener('click', function () {  // Handle user input
      clearTheDisplayIfNecessary()            // Change state
      updateCurrentNumber(i);                 // Change state
      removeCurrentOperationsKey();           // Change state
      updateDisplay();                        // Update view
      logState();
    });
}

for (let key of Object.keys(operations)) {
  document
    .getElementById(key)
    .addEventListener('click', function () {  // Handle user input
      setClearDisplayOnNextNumberInput()      // Change state
      setCurrentOperationsKey(key);           // Change state
      removeThePoint()                        // Change state
      updateCurrentCalculationValue();        // Change state
      updateCurrentCalculation();             // Update view
      logState();
    });
}

document
  .getElementById('decimal')
  .addEventListener('click', function () {
    isThereAPoint = true;
  });

/* ON PAGE LOAD */
updateDisplay();
