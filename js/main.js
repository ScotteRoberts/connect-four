import runTurn from './turn-logic.js';
import { BOARDROWS, BOARDCOLS } from './helpers.js';

const board = document.getElementById('board');

// DEV: Setup board
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

// DEV: Set HTML for Board
board.innerHTML = boardHTML;

// add event listeners
document.querySelectorAll('.slot input[type=checkbox]').forEach(input => {
  input.addEventListener('change', runTurn);
});
