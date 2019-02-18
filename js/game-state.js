class Player {
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
  }

  resetScore() {
    this.score = 0;
  }
}

class TurnHistory {
  constructor(turns = []) {
    this.turns = turns;
  }
  addMove(move) {
    this.turns.push(move);
  }

  undoMove() {
    this.turns.pop();
  }

  reset() {
    this.turns = [];
  }
}

// TODO: Add a timer class that can affect the turn speed.

class GameState {
  constructor(player1, player2, turnHistory, player1Turn = true) {
    this.player1 = player1;
    this.player2 = player2;
    this.turnHistory = turnHistory;
    this.player1Turn = player1Turn;
  }

  /**
   * Change the player's turn and display.
   */
  changeTurn() {
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

  resetBoard() {
    this.turnHistory.reset(); // HACK: Look at this and figure out if it works.
    this.player1Turn = true;
  }

  /**
   * Get the current score from the player.
   * @param {string} currentPlayer
   */
  getPlayerScore(currentPlayer) {
    return currentPlayer === 'player1' ? this.player1.score : this.player2.score;
  }

  /**
   * Set the new score for the player.
   * @param {string} currentPlayer Current player's class
   * @param {number} newScore The updated score
   */
  setPlayerScore(currentPlayer, newScore) {
    if (currentPlayer === 'player1') {
      this.player1.score = newScore;
      document.getElementById('player1-score').innerHTML = newScore;
    } else {
      this.player2.score = newScore;
      document.getElementById('player2-score').innerHTML = newScore;
    }
  }

  /**
   * Reset the scoreboard value and DOM text.
   */
  resetScoreBoard() {
    // Player 1
    this.player1.score = 0;
    document.getElementById('player1-score').innerText = 0;
    // Player 2
    this.player2.score = 0;
    document.getElementById('player2-score').innerText = 0;
  }
}

let gameState = new GameState(
  new Player('Player One'),
  new Player('Player Two'),
  new TurnHistory()
);

export default gameState;
