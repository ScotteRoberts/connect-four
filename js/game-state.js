class Player {
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
  }

  /*
  Ask Andrew about:

  get name() {
    return this._name;
  }

  and learn the difference between the different models of inheritance.

  VERSUS..............................

  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
  getScore() {
    return this._score;
  }
  setScore(score) {
    this._score = score;
  }
  */
}

let player1 = new Player('Scott');
let player2 = new Player('April');

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

  reset() {
    this.turnHistory.reset(); // HACK: Look at this and figure out if it works.
    this.player1Turn = true;
  }
}

let instance = new GameState(player1, player2, new TurnHistory());

export default instance;
