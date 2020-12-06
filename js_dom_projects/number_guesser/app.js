/*
Game function
- Player must guess a number between a max and min
- Player gets a ceertain amount of guesses
- Notify  player of guesses remaining
- Notify  player of the correct answer if loose
- Let player choose to play again
*/

// Game values]
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // validate
    if (isNaN(guess) | guess < min | guess > max) {
        setMessage(`Please enter a number betweeen ${min} and ${max}`, 'red')
    }

    // check if won
    if (guess === winningNum) {
        // game over - won
        gameOver(true, `${winningNum} is correct! YOU WIN!`)
    } else {
        // substract guesses left
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            // game over - lost
            gameOver(false, `Game over. You lost. The winning number was ${winningNum}`)
        } else {
            // game continues
            // change border to red
            guessInput.style.borderColor = 'red';
            message.style.color = 'red';
            // clear input
            guessInput.value = '';
            // tell user it's the wrong number
            setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left`, 'red');
        }
    }
})

// set message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

// game over
function gameOver(won, msg) {
    // code colors
    let color;
    won === true ? color = 'green' : color = 'red';
    // disable input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;
    // set winning message
    setMessage(msg, color);
    // play again
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}