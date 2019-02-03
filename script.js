let currentNumber = 0;
let operator;
const operations = {
  plus: " + ",
  minus: " - ",
};

// operations.plus
// operations["plus"]

// const op = "minus";
// operations[op]

for (let i = 0; i < 10; i++) {
  document
    .getElementById('number' + i)
    .addEventListener('click', function () {     // Handle user input
      currentNumber = (currentNumber * 10) + i;  // Change state
      document                                   // Update view
        .getElementById('display')               // Update view
        .innerHTML = currentNumber;              // Update view
    });
}

for (let key of Object.keys(operations)) {
  document
    .getElementById(key)
    .addEventListener('click', function () {
      operator = key;
      document
        .getElementById('current-calculation')
        .innerHTML = currentNumber + operations[key];
    });
}

document
  .getElementById('display')
  .innerHTML = currentNumber;