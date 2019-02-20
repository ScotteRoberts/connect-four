import { enableUndoTurn } from './helpers.js';

import Player from './Player.js';
import TurnHistory from './TurnHistory.js';

class GameState {
  constructor(player1, player2, turnHistory, player1Turn = true) {
    this.player1 = player1;
    this.player2 = player2;
    this.turnHistory = turnHistory;
    this.player1Turn = player1Turn;

    //binding
    this.changeTurn = this.changeTurn.bind(this);
    this.undoTurn = this.undoTurn.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  /**
   * Change the player's turn and display.
   */
  changeTurn() {
    // change whose turn it is
    this.player1Turn = !this.player1Turn;

    // update player-indicator text
    const playerIndicator = document.getElementById('player-indicator');
    if (this.player1Turn) {
      playerIndicator.innerText = 'Player 1';
      playerIndicator.className = 'player1';
    } else {
      playerIndicator.innerText = 'Player 2';
      playerIndicator.className = 'player2';
    }
  }

  /**
   * Handles the undo event.
   */
  undoTurn() {
    if (this.turnHistory.undoTurn()) {
      this.changeTurn();
    }
  }

  /**
   * Resets the playable board and turn history.
   */
  resetBoard() {
    this.turnHistory.reset(); // HACK: Look at this and figure out if it works.
    this.player1Turn = true;
    enableUndoTurn();
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
   * Adds a point onto the winner's score count.
   * @param {string} currentPlayer Current player's class
   */
  increaseScore(currentPlayer) {
    let winnerScore = this.getPlayerScore(currentPlayer);

    winnerScore = parseInt(winnerScore);
    winnerScore++;

    this.setPlayerScore(currentPlayer, winnerScore);
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
