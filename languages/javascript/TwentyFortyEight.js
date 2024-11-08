import { fetchValues, replaceValues, combineList, reduceList, stretch } from './utilities.js';

const GRID_LINE_META_MAP = {
  up: {
    isVertical: true,
    isReversed: false
  },
  down: {
    isVertical: true,
    isReversed: true
  },
  left: {
    isVertical: false,
    isReversed: false
  },
  right: {
    isVertical: false,
    isReversed: true
  }
};

const combine = combineList(value => value * 2);

export class TwentyFortyEight {
  constructor({grid = null, rows = 4, cols = 4, displayDriver, controlDriver}) {
    this.rows = grid ? grid.length : rows;
    this.cols = grid ? grid[0].length : cols;
    this.displayDriver = displayDriver;
    this.controlDriver = controlDriver;

    this.grid = grid || this.initializeGrid();

    this.score = 0;
    this.highestTile = 2;

    this.start();
  }

  combine(list, addToScore) {
    return combineList(value => {
      const newValue = value * 2;
      if (addToScore) {
        if (newValue > this.highestTile) {
          this.highestTile = newValue;
        }
        this.score += value / 2;
      }
      return newValue;
    })(list);
  }

  start() {
    this.displayDriver.reset();
    this.controlDriver.register({
      move: (direction) => this.move(direction)
    });
    this.draw();
  }

  stop() {
    this.controlDriver.unregister();
  }

  initializeGrid() {
    this.grid = new Array(this.rows).fill([]).map(() => new Array(this.cols).fill(null));
    this.generateRandomCell();
    this.generateRandomCell();

    return this.grid;
  }

  gameOver() {
    console.log('Game Over');
    this.stop();
    this.displayDriver.showGameOver(this.highestTile === 2048);
  }

  generateRandomCell() {
    const cell = this.getRandomCell();
    if (!cell) {
      this.gameOver();
      return;
    }
    this.grid[cell.row][cell.col] = 2;
  }

  move(direction) {
    const { isVertical, isReversed } = GRID_LINE_META_MAP[direction];
    const movesLength = isVertical ? this.cols : this.rows;

    const currentGridHash = JSON.stringify(this.grid);
    const currentGrid = JSON.parse(currentGridHash);

    for(let i = 0; i < movesLength; i++) {
      const list = fetchValues(this.grid, i, isVertical, isReversed);
      const result = stretch(this.combine(reduceList(list), true), list.length);
      replaceValues(result, currentGrid, i, isVertical, isReversed);
    }

    if (currentGridHash !== JSON.stringify(currentGrid)) {
      this.grid = currentGrid;
      this.generateRandomCell();
      this.draw();
      if (!this.canMove() || this.highestTile === 2048) {
        this.gameOver();
      }
    }
  }

  canMove() {
    for(let row = 0; row < this.rows; row++) {
      const comboRow = combine(reduceList(fetchValues(this.grid, row)));
      if (comboRow.length < this.rows) {
        return true;
      }
    }
    for(let col = 0; col < this.cols; col++) {
      const comboCol = combine(reduceList(fetchValues(this.grid, col, true)));
      if (comboCol.length < this.cols) {
        return true;
      }
    }
    return false;
  }

  draw() {
    this.displayDriver.draw(this.grid);
    this.displayDriver.updateScore(this.score);
  }

  getRandomCell() {
    const cells = this.grid.reduce((emptyCoords, row, y) => {
      return emptyCoords.concat(row.reduce((emptyCells, cell, x) => {
        if (!cell) {
          emptyCells.push({
            row: y,
            col: x
          });
        }
        return emptyCells;
      }, []))
    }, []);
    if (!cells.length) {
      return false;
    }
    const randomCellIndex = Math.floor(Math.random() * cells.length);
    return cells[randomCellIndex];
  }
}