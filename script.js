let currentNumber = 0;

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

document
  .getElementById('display')
  .innerHTML = currentNumber;