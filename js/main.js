import runTurn from './turn-logic.js';
import { BOARDROWS, BOARDCOLS } from './helpers.js';
import gameState from './game-state.js';

/**
 * Programmatically generates the HTML for all slots on the board.
 */
function generateBoardHTML() {
  let boardHTML = '';
  for (let row = BOARDROWS - 1; row >= 0; row--) {
    for (let col = 0; col < BOARDCOLS; col++) {
      boardHTML += `
      <div class="slot">
        <label for="slot${col}${row}">
          <input 
            type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" 
            id="slot${col}${row}" 
            data-row=${row} 
            data-col=${col}/>
        </label>
      </div>
      `;
    }
  }

  return boardHTML;
}

/**
 * Starts the game board at the base state.
 */
function initializeBoard() {
  // Grab and reset the title
  document.getElementById(
    'turn-indicator'
  ).innerHTML = `<span id="player-indicator" class="player1">Player 1</span> Turn`;

  // Grab and set the board
  document.getElementById('board').innerHTML = generateBoardHTML();

  // Reset gameboard state
  gameState.resetBoard();

  // add event listeners to all slots
  document.querySelectorAll('.slot input[type=checkbox]').forEach(input => {
    input.addEventListener('change', runTurn);
  });
}

function resetScoreBoard() {
  gameState.resetScoreBoard();
  document.getElementById('player1-score').innerText = 0;
  document.getElementById('player2-score').innerText = 0;
}

initializeBoard();

document.getElementById('board-reset').addEventListener('click', initializeBoard);
document.getElementById('score-board-reset').addEventListener('click', resetScoreBoard);
