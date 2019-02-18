import { checkWin, increaseScore } from './win-logic.js';
import { getSlotElement, disableBoard, BOARDROWS } from './helpers.js';
import gameState from './game-state.js';

/**
 * REPL for placing a game piece.
 * @param {object} event Event object for slotted piece
 */
export function runTurn(event) {
  const input = event.target;
  const player = gameState.player1Turn ? 'player1' : 'player2';

  // Change color of label
  input.parentElement.className = player;

  // change what's disabled
  input.disabled = true;

  // get position of current piece
  let { col, row } = input.dataset;
  col = parseInt(col);
  row = parseInt(row);

  // enable the slot at (row + 1, col)
  if (row < BOARDROWS - 1) {
    const neighbor = getSlotElement(col, row + 1);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(col, row, player);
  if (isWin) {
    // update win text
    const turnIndicator = document.getElementById('turn-indicator');
    const winnerText = gameState.player1Turn ? 'Player 1 Wins!' : 'Player 2 Wins!';
    turnIndicator.innerHTML = `<span id="player-indicator" class="${player}">${winnerText}</span>`;

    // remove play access
    disableBoard();

    // TODO: Add points to the scoreboard
    increaseScore(player);

    return;
  }

  gameState.changeTurn();
}
