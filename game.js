"use strict";

const ContainerEl = document.querySelector('.container');
const playerTxt = document.querySelector('.message');
const restartBtn = document.getElementById('restartbtn');
const boxes = document.querySelectorAll('.box');

const O_TXT = "O";
const X_TXT = "X";

let currentPlayer = X_TXT;
let spaces = Array(9).fill(null);

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerTxt.innerText = `Congratulations! Player ${currentPlayer} has won!`;
            const winningBoxes = playerHasWon();
            winningBoxes.forEach((box) => {
                boxes[box].style.backgroundColor = "purple";
            });
            ContainerEl.classList.add('success');
            return;
        }

        currentPlayer = currentPlayer === X_TXT ? O_TXT : X_TXT;
    }
}

function playerHasWon() {
    for (const condition of winningCombination) {
        const [a, b, c] = condition;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    spaces.fill(null);
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.backgroundColor = "";
    });
    playerTxt.innerText = "Tic Tac Toe";
    currentPlayer = X_TXT;
    ContainerEl.classList.remove('success');
}

startGame();
