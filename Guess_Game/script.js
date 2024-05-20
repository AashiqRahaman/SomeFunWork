const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit-guess');
const messageElement = document.getElementById('message');
// Removed scoreElement reference

let randomNumber = Math.floor(Math.random() * 20) + 1; // Generate random number
let remainingAttempts = 10; // Total chances
let score = remainingAttempts; // Initial score equals remaining attempts

submitButton.addEventListener('click', function() {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess)) {
    messageElement.textContent = 'Please enter a valid number.';
    return;
  }

  remainingAttempts--;

  if (guess === randomNumber) {
    score = remainingAttempts + 1; // Score is remaining attempts + 1 (bonus)
    messageElement.textContent = `Congratulations! You guessed the number in ${10 - remainingAttempts} attempts. Your final score is ${score}!`;
    submitButton.disabled = true; // Disable button after correct guess
  } else if (remainingAttempts === 0) {
    messageElement.textContent = `Sorry, you ran out of guesses. The number was ${randomNumber}.`;
    submitButton.disabled = true;
  } else {
    messageElement.textContent = 'Try Again.';
    if (guess < randomNumber) {
      messageElement.textContent += ' Your guess is too low.';
    } else {
      messageElement.textContent += ' Your guess is too high.';
    }
  }

  guessInput.value = ''; // Clear guess input after each attempt
  // Removed score display update
});
