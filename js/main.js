import gameState from './GameState.js';
import runTurn from './runTurn.js';
import generateBoardHTML from './generateBoardHTML.js';

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

// DEV: Button listeners
document.getElementById('board-reset').addEventListener('click', initializeBoard);
document.getElementById('score-board-reset').addEventListener('click', gameState.resetScoreBoard);
document.getElementById('undo-turn').addEventListener('click', gameState.undoTurn);

initializeBoard();
