export default class Player {
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
  }

  /**
   * Resets the current score.
   */
  resetScore = () => {
    this.score = 0;
  };
}
