// DEV: Checking the DOM before manipulation
const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');
const turnIndicator = document.getElementById('turn-indicator');
const BOARDROWS = 6;
const BOARDCOLS = 7;
console.log(board);

// DEV: Setup board
let boardHTML = '';
for (let row = BOARDROWS - 1; row >= 0; row--) {
  for (let col = 0; col < BOARDCOLS; col++) {
    boardHTML += `
    <div class="slot">
      <label for="slot${col}${row}">
        <input 
          onchange="runTurn(this)" 
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

let player1Turn = true;
function runTurn(input) {
  // Flow:

  // Change color of label
  input.parentElement.className = player1Turn ? 'player1' : 'player2';

  // change what's disabled
  input.disabled = true;

  // get position of current piece
  const { row, col } = input.dataset;
  const rowNum = parseInt(row);
  const colNum = parseInt(col);

  // enable the slot at (row + 1, col)
  if (row < BOARDROWS - 1) {
    const neighbor = document.getElementById(`slot${colNum}${rowNum + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(colNum, rowNum, player1Turn ? 'player1' : 'player2');
  if (isWin) {
    const winnerText = player1Turn ? 'Player 1 Wins!' : 'Player 2 Wins!';
    const winnerClass = player1Turn ? 'player1' : 'player2';
    turnIndicator.innerHTML = `<span id="player-indicator" class="${winnerClass}">${winnerText}</span>`;

    disableBoard();

    // TODO: Add points to the scoreboard
    // increaseScore(winnerClass);

    return;
  }

  // change whose turn it is
  player1Turn = !player1Turn;

  // update player-indicator text
  if (player1Turn) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
  }
}

function checkWin(col, row, currentPlayer) {
  // check down
  // check across
  // check diagonals
  return (
    checkDown(col, row, currentPlayer) ||
    checkAccross(col, row, currentPlayer) ||
    checkUpLeft(col, row, currentPlayer) ||
    checkUpRight(col, row, currentPlayer)
  );
}

function checkDown(col, row, currentPlayer) {
  if (row < 3) return false; // can't connect 4 if it is only stacked 3 or less

  for (let j = row - 1; j > row - 4; j--) {
    const currentSlotPlayer = document.getElementById(`slot${col}${j}`).parentElement.className;
    if (currentSlotPlayer !== currentPlayer) return false;
  }
  return true;
}

function checkAccross(col, row, currentPlayer) {
  let sameColorNeighbors = 0;

  // check to the right
  for (let i = col + 1; i < col + 4; i++) {
    // break if out of bounds
    if (i >= BOARDCOLS) break;
    const currentSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  // check to the left
  for (let i = col - 1; i > col - 4; i--) {
    // break if out of bounds
    if (i < 0) break;
    const currentSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

function checkUpLeft(col, row, currentPlayer) {
  let sameColorNeighbors = 0;

  // search up left
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col - i < 0 || row + i >= BOARDROWS) break;
    const currentSlotPlayer = document.getElementById(`slot${col - i}${row + i}`).parentElement
      .className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  // search down right
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col + i >= BOARDCOLS || row - i < 0) break;
    const currentSlotPlayer = document.getElementById(`slot${col + i}${row - i}`).parentElement
      .className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

function checkUpRight(col, row, currentPlayer) {
  let sameColorNeighbors = 0;

  // search up right
  for (let i = 1; i < 4; i++) {
    if (col + i >= BOARDCOLS || row + i >= BOARDROWS) break;
    const currentSlotPlayer = document.getElementById(`slot${col + i}${row + i}`).parentElement
      .className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  // search down left
  for (let i = 1; i < 4; i++) {
    if (col - i < 0 || row - i < 0) break;
    const currentSlotPlayer = document.getElementById(`slot${col - i}${row - i}`).parentElement
      .className;
    if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

function disableBoard() {
  for (let row = BOARDROWS - 1; row >= 0; row--) {
    for (let col = 0; col < BOARDCOLS; col++) {
      const input = document.getElementById(`slot${col}${row}`);
      input.setAttribute('disabled', '');
    }
  }
}
