import { DisplayDriver } from './DisplayDriver.js';

export class BrowserDisplayDriver extends DisplayDriver {
  constructor() {
    super();
    this.container = document.querySelector('main > table');
    this.scoreContainer = document.querySelector('#score');
    this.gameOverContainer = document.querySelector('#game-over');
    if (!this.container) {
      this.container = document.createElement('table');
      document.querySelector('main').appendChild(this.container);
    }
  }

  reset() {
    this.clear();
    if (this.gameOverContainer) {
      this.gameOverContainer.textContent = '';
    }
    if (this.scoreContainer) {
      this.scoreContainer.textContent = score;
    }
  }

  clear() {
    if (this.container) {
      while(this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
  }

  updateScore(score) {
    if (this.scoreContainer) {
      this.scoreContainer.textContent = score;
    }
  }

  draw(grid) {
    this.clear();
    grid.forEach(row => {
      const rowEl = document.createElement('tr');
      row.forEach(cell => {
        const dataEl = document.createElement('td');
        const textEl = document.createTextNode(cell || '\u00A0');
        dataEl.setAttribute('class', cell ? `n${cell}`: '')
        dataEl.appendChild(textEl);
        rowEl.appendChild(dataEl);
      });
      this.container.appendChild(rowEl);
    });
  }

  showGameOver(isWinner) {
    if (this.gameOverContainer) {
      this.gameOverContainer.textContent = isWinner ? 'You win!' : 'You lose!';
    }
  }
}