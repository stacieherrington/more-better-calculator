let currentNumber = 0;
let shouldClearDisplay = false;
let currentOperationsKey;
let currentCalculationValue = "";
let previousOperationsKey;
let isThereAPoint = false; // nihilism
let divisor = 10;
const operations = {
  plus: { view: " + ", math: "+" },
  minus: { view: " - ", math: "-" },
  times: { view: " &times; ", math: "*" },
  divide: { view: " &divide; ", math: "/" },
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
    let operatorLength = operations[previousOperationsKey].view.length;
    let valueLength = currentCalculationValue.length - operatorLength;
    currentCalculationValue = currentCalculationValue.substring(0, valueLength);
    currentCalculationValue += operations[currentOperationsKey].view;
  } else {
    // Use the currently clicked key to build a string
    currentCalculationValue += currentNumber + operations[currentOperationsKey].view;
  }
}


/* VIEW UPDATES */
function updateUI() {
  document
    .getElementById('display')
    .innerHTML = currentNumber;

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
      updateUI();                        // Update view
      logState();
    });
}

for (let key of Object.keys(operations)) {
  document
    .getElementById(key)
    .addEventListener('click', function () {  // Handle user input
      setClearDisplayOnNextNumberInput();     // Change state
      setCurrentOperationsKey(key);           // Change state
      removeThePoint()                        // Change state
      updateCurrentCalculationValue();        // Change state
      updateUI();         // Update view
      logState();
    });
}

document
  .getElementById('decimal')
  .addEventListener('click', function () {
    isThereAPoint = true;
  });

document
  .getElementById('equals')
  .addEventListener('click', function () {
    setClearDisplayOnNextNumberInput();

    // TRANSLATE CUR CAL VAL:
    // Get all of the values in operations
    // Loop over that array
    // Replace the value of the "view" property with the
    //   "math" property
    const arrayOfOperations = Object.values(operations);
    for (let i = 0; i < arrayOfOperations.length; i++ ) {
      const op = arrayOfOperations[i];
      currentCalculationValue = currentCalculationValue.replace(op.view, op.math);
    }

    // for (let op of arrayOfOperations) {
    //   currentCalculationValue = currentCalculationValue.replace(op.view, op.math);
    // }

    // arrayOfOperations.forEach(function (op) {
    //   currentCalculationValue = currentCalculationValue.replace(op.view, op.math);
    // });

    currentNumber = eval(currentCalculationValue + currentNumber);
    currentCalculationValue = ""
    updateUI();
  });

document
  .getElementById('clear')
  .addEventListener('click', function() {
    shouldClearDisplay = true;
    clearTheDisplayIfNecessary();
    removeThePoint();
    updateUI();
  });

document
  .getElementById('all-clear')
  .addEventListener('click', function() {
    currentCalculationValue = "";
    shouldClearDisplay = true;
    clearTheDisplayIfNecessary();
    removeThePoint();
    updateUI();
  });

/* ON PAGE LOAD */
updateUI();

window.addEventListener('keydown', function (e) {
  if (e.which >= 48 && e.which <= 57) {
    clearTheDisplayIfNecessary()            // Change state
    updateCurrentNumber(e.which - 48);      // Change state
    removeCurrentOperationsKey();           // Change state
    updateUI();                        // Update view
    logState();
  }
});

// make typing decimal point work
// make typing operators work
// make escape clear
// make two escapes in a row all clear
// don't worry about copying and pasting because we're
//   going to go through a really long refactoring exercise
// take state changing out of event handlers and make state changing
//   things into their own functions
