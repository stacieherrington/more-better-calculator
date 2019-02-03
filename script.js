let currentNumber = 0;
let shouldClearDisplay = false;
const operations = {
  plus: " + ",
  minus: " - ",
  times: " &times; ",
  divide: " &divide; ",
};

for (let i = 0; i < 10; i++) {
  document
    .getElementById('number' + i)
    .addEventListener('click', function () {     // Handle user input
      if (shouldClearDisplay) {
        currentNumber = 0;
        shouldClearDisplay = false;
      }
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
      document
        .getElementById('current-calculation')
        .innerHTML = currentNumber + operations[key];
      shouldClearDisplay = true;
    });
}

document
  .getElementById('display')
  .innerHTML = currentNumber;