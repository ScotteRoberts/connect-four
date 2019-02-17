import { getSlotElement, BOARDROWS, BOARDCOLS } from './helpers.js';
import gameState from './game-state.js';

/**
 * Adds a point onto the winner's side of the scoreboard
 * @param {string} currentPlayer Current player's class
 */
export function increaseScore(currentPlayer) {
  let winnerScore = 0;
  // DEV: Get the current score from scoreboard
  currentPlayer === 'player1'
    ? (winnerScore = gameState.player1.score)
    : (winnerScore = gameState.player2.score);

  // DEV: Update the current score
  winnerScore = parseInt(winnerScore);
  winnerScore++;

  // DEV: Set the new score on the scoreboard
  if (currentPlayer === 'player1') {
    gameState.player1.score = winnerScore;
    document.getElementById('player1-score').innerHTML = winnerScore;
  } else {
    gameState.player2.score = winnerScore;
    document.getElementById('player2-score').innerHTML = winnerScore;
  }
}

/**
 * Checks if there is a win condition met in all any direction (up, down, diagonal)
 * @param {number} col Column of the slot to start checking at
 * @param {number} row Row of the slot to start checking at
 * @param {string} currentPlayer Current player's class
 */
export function checkWin(col, row, currentPlayer) {
  return (
    checkDown(col, row, currentPlayer) ||
    checkAccross(col, row, currentPlayer) ||
    checkDiagonal(col, row, currentPlayer)
  );
}

/**
 * Checks if there is a win condition going down
 * @param {number} col Column of the slot to start checking at
 * @param {number} row Row of the slot to start checking at
 * @param {string} currentPlayer Current player's class
 */
function checkDown(col, row, currentPlayer) {
  if (row < 3) return false; // can't connect 4 if it is only stacked 3 or less

  for (let j = row - 1; j > row - 4; j--) {
    const currentSlotPlayer = getSlotElement(col, j).parentElement.className;
    if (currentSlotPlayer !== currentPlayer) return false;
  }
  return true;
}

/**
 * Checks if there is a win condition going across (left and right)
 * @param {number} col Column of the slot to start checking at
 * @param {number} row Row of the slot to start checking at
 * @param {string} currentPlayer Current player's class
 */
function checkAccross(col, row, currentPlayer) {
  let sameColorNeighbors = 0;

  // check to the right
  for (let i = col + 1; i < col + 4; i++) {
    // break if out of bounds
    if (i >= BOARDCOLS) break;
    const currentSlotPlayer = getSlotElement(i, row).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  // check to the left
  for (let i = col - 1; i > col - 4; i--) {
    // break if out of bounds
    if (i < 0) break;
    const currentSlotPlayer = getSlotElement(i, row).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

/**
 * Checks if there is a win condition going diagonal (NW to SE) and (SW to NE)
 * @param {number} col Column of the slot to start checking at
 * @param {number} row Row of the slot to start checking at
 * @param {string} currentPlayer Current player's class
 */
function checkDiagonal(col, row, currentPlayer) {
  return checkUpLeft(col, row, currentPlayer) || checkUpRight(col, row, currentPlayer);
}

/**
 * Checks if there is a win condition going diagonally down (NW to SE)
 * @param {number} col Column of the slot to start checking at
 * @param {number} row Row of the slot to start checking at
 * @param {string} currentPlayer Current player's class
 */
function checkUpLeft(col, row, currentPlayer) {
  let sameColorNeighbors = 0;

  // search down right
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col + i >= BOARDCOLS || row - i < 0) break;
    const currentSlotPlayer = getSlotElement(col + i, row - i).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  // search up left
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col - i < 0 || row + i >= BOARDROWS) break;
    const currentSlotPlayer = getSlotElement(col - i, row + i).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

/**
 * Checks if there is a win condition going diagonally up (SW to NE)
 * @param {number} col Column of the slot to start checking at
 * @param {number} row Row of the slot to start checking at
 * @param {string} currentPlayer Current player's class
 */
function checkUpRight(col, row, currentPlayer) {
  let sameColorNeighbors = 0;

  // search down left
  for (let i = 1; i < 4; i++) {
    if (col - i < 0 || row - i < 0) break;
    const currentSlotPlayer = getSlotElement(col - i, row - i).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  // search up right
  for (let i = 1; i < 4; i++) {
    if (col + i >= BOARDCOLS || row + i >= BOARDROWS) break;
    const currentSlotPlayer = getSlotElement(col + i, row + i).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}
