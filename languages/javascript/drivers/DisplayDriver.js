export class DisplayDriver {
  constructor() {
    this.container = null
    this.scoreContainer = null
    this.gameOverContainer = null
  }
  reset() {}
  clear() {}
  updateScore(score) {}
  draw(grid) {}
  showGameOver(isWinner) {}
}