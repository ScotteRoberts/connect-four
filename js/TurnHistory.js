import { getSlotElement } from './helpers.js';

export default class TurnHistory {
  constructor() {
    this._turns = [];
  }

  /**
   * Adds and displays current turn to turn history
   * @param {number} col Column of the most recent slot
   * @param {number} row Row of the the most recent slot
   * @param {string} currentPlayer Current player's class
   */
  addTurn = (col, row, currentPlayer) => {
    const turn = { col, row, currentPlayer, count: this._turns.length };
    this._turns.push(turn);

    // change the DOM
    const display = document.getElementById('turn-history-display');
    display.innerHTML += `
      <h4 id="turn${turn.count}" class="${currentPlayer}" >
        <span class="${currentPlayer} game-piece"></span> (${col},${row})
      </h4>
    `;
    // Scroll to bottom of display
    display.scrollTo(0, display.scrollHeight);
  };

  /**
   * Removes most recent turn from game history and board
   */
  undoTurn = () => {
    if (this._turns.length > 0) {
      // Remove last turn from list and destructure into variables.
      const { col, row, count } = this._turns.pop();

      // Remove DOM history by 1
      const undoneTurnDisplay = document.getElementById('turn' + count);
      undoneTurnDisplay.parentElement.removeChild(undoneTurnDisplay);

      // Remove Parent class (input background)
      // HACK: This looks wierd to grab the parent element.
      const undoneSlot = getSlotElement(col, row);
      undoneSlot.parentElement.className = '';
      // Enable self
      undoneSlot.disabled = false;

      // Disable neighbor
      getSlotElement(col, row + 1).disabled = true;

      return true;
    }
    return false;
  };

  /**
   * Resets the turn history
   */
  reset = () => {
    this._turns = [];
    document.getElementById('turn-history-display').innerHTML = ``;
  };
}
