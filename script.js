let currentNumber = 0;
let shouldClearDisplay = false;
let currentOperationsKey;
let currentCalculationValue = "";
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
  currentOperationsKey = value;
}

function removeCurrentOperationsKey() {
  currentOperationsKey = undefined;
}

function clearTheDisplayIfNecessary() {
  if (shouldClearDisplay) {
    currentNumber = 0;
    shouldClearDisplay = false;
  }
}

function updateCurrentNumber(value) {
  currentNumber = (currentNumber * 10) + value;
}

function updateCurrentCalculationValue() {
  debugger;
  if (currentOperationsKey) { // check if the LAST key is not undefined
    currentCalculationValue = currentCalculationValue.substring(0,currentCalculationValue.length - 3);
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
      updateCurrentCalculationValue();        // Change state
      setCurrentOperationsKey(key);           // Change state
      updateCurrentCalculation();             // Update view
      logState();
    });
}


/* ON PAGE LOAD */
updateDisplay();
