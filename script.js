const titles = [document.getElementById("p1Title"), document.getElementById("p2Title")];
const totals = [document.getElementById("p1Total"), document.getElementById("p2Total")];
const currents = [document.getElementById("p1Current"), document.getElementById("p2Current")];

const rollBtn = document.getElementById("rollDice");
const holdBtn = document.getElementById("hold");
const newGameBtn = document.getElementById("newGame");
const dice = document.getElementById("dice");

let currentPlayer = 0;

function initGame() {
    rollBtn.disabled = false;
    holdBtn.disabled = false;
    currentPlayer = Math.floor(Math.random()*2);
    changePlayer();
    totals.forEach(total => total.innerText = 0);
    currents.forEach(current => current.innerText = 0);
}

function changePlayer() {
    currentPlayer = (currentPlayer + 1) % 2;
    titles.forEach(title => title.innerText = "PLAYER "+(1+titles.indexOf(title)));
    titles[currentPlayer].innerText = "➡️ " + titles[currentPlayer].innerText + " ⬅️";
}

function rollDice() {
    const diceRoll = Math.floor(Math.random()*6) + 1;
    const currentCurrent = parseInt(currents[currentPlayer].innerText);
    dice.src = "images/dice" + diceRoll + ".png";
    if (diceRoll === 1) {
        currents[currentPlayer].innerText = 0;
        changePlayer();
        return;
    }
    currents[currentPlayer].innerText = currentCurrent + diceRoll;
}

function hold() {
    const currentTotal = parseInt(totals[currentPlayer].innerText);
    const currentCurrent = parseInt(currents[currentPlayer].innerText);
    totals[currentPlayer].innerText = currentTotal + currentCurrent;
    currents[currentPlayer].innerText = 0;

    if (currentTotal + currentCurrent >= 100) {
        alert(currentPlayer+1 + " WINS!");
        rollBtn.disabled = true;
        holdBtn.disabled = true;
        return;
    } 
    changePlayer();
}

initGame()
