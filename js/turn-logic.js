import { checkWin, increaseScore } from './win-logic.js';
import { getSlotElement, disableBoard, BOARDROWS } from './helpers.js';
import gameState from './game-state.js';

export default function runTurn(event) {
  //console.log(player1Turn);
  const input = event.target;
  const player = gameState.player1Turn ? 'player1' : 'player2';

  // Change color of label
  input.parentElement.className = player;

  // change what's disabled
  input.disabled = true;

  // get position of current piece
  let { row, col } = input.dataset;
  row = parseInt(row);
  col = parseInt(col);

  // enable the slot at (row + 1, col)
  if (row < BOARDROWS - 1) {
    const neighbor = getSlotElement(col, row + 1); // BUG: Tell Andrew his code still has a parseInt
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(col, row, player);
  if (isWin) {
    // update win text
    const turnIndicator = document.getElementById('turn-indicator');
    const winnerText = gameState.player1Turn ? 'Player 1 Wins!' : 'Player 2 Wins!';
    turnIndicator.innerHTML = `<span id="player-indicator" class="${player}">${winnerText}</span>`; // BUG: Andrew has a bug that makes his player 1 win only.

    // remove play access
    disableBoard();

    // TODO: Add points to the scoreboard
    increaseScore(player);

    return;
  }

  // change whose turn it is
  gameState.player1Turn = !gameState.player1Turn;

  // update player-indicator text
  const playerIndicator = document.getElementById('player-indicator');
  if (gameState.player1Turn) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
  }
}
