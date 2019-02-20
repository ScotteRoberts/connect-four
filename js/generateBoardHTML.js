import { BOARDCOLS, BOARDROWS } from './helpers.js';

/**
 * Programmatically generates the HTML for all slots on the board.
 */
export default function generateBoardHTML() {
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
