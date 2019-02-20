export const BOARDCOLS = 7;
export const BOARDROWS = 6;

/**
 * Gets the HTML element for a slot located at (col, row)
 * @param {number} col Column of the slot
 * @param {number} row Row of the slot
 * @returns {HTMLElement}
 */
export function getSlotElement(col, row) {
  return document.getElementById(`slot${col}${row}`);
}

/**
 * Disables all slot HTML elements
 */
export function disableBoard() {
  // get all checkboxs
  const checkboxes = document.querySelectorAll('.slot input[type=checkbox]');
  // disable all of them
  checkboxes.forEach(checkbox => {
    checkbox.disabled = true; // Can we remove the curly braces on these?
  });
}

export function disableUndoTurn() {
  document.getElementById('undo-turn').disabled = true;
}

export function enableUndoTurn() {
  document.getElementById('undo-turn').disabled = false;
}
