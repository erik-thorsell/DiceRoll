// element-references
const titles = [document.getElementById("p1Title"), document.getElementById("p2Title")];
const totals = [document.getElementById("p1Total"), document.getElementById("p2Total")];
const currents = [document.getElementById("p1Current"), document.getElementById("p2Current")];

const rollBtn = document.getElementById("rollDice");
const holdBtn = document.getElementById("hold");
const newGameBtn = document.getElementById("newGame");
const dice = document.getElementById("dice");

// 0 = player 1, 1 = player 2
let currentPlayer = 0;

function initGame() {
    // reset all values
    rollBtn.disabled = false;
    holdBtn.disabled = false;
    currentPlayer = Math.floor(Math.random()*2);
    changePlayer();
    totals.forEach(total => total.innerText = 0);
    currents.forEach(current => current.innerText = 0);
}

function changePlayer() {
    // change the current player and update the UI
    currentPlayer = (currentPlayer + 1) % 2;
    titles.forEach(title => title.innerText = "PLAYER "+(1+titles.indexOf(title)));
    titles[currentPlayer].innerText = "➡️ " + titles[currentPlayer].innerText + " ⬅️";
}

function rollDice() {
    // randomly generate a number between 1 and 6
    const diceRoll = Math.floor(Math.random()*6) + 1;
    const currentCurrent = parseInt(currents[currentPlayer].innerText);
    // update dice image and current score
    dice.src = "images/dice" + diceRoll + ".png";
    if (diceRoll === 1) {
        currents[currentPlayer].innerText = 0;
        changePlayer();
        return;
    }
    currents[currentPlayer].innerText = currentCurrent + diceRoll;
}

// save the current score to the total score
function hold() {
    // parsing from text to int
    const currentTotal = parseInt(totals[currentPlayer].innerText);
    const currentCurrent = parseInt(currents[currentPlayer].innerText);

    totals[currentPlayer].innerText = currentTotal + currentCurrent; // update total score
    currents[currentPlayer].innerText = 0; // reset current score

    // check if the current player has won
    if (currentTotal + currentCurrent >= 100) {
        alert(currentPlayer+1 + " WINS!");
        rollBtn.disabled = true;
        holdBtn.disabled = true;
        return;
    } 
    changePlayer();
}

// initialize the game
initGame()
