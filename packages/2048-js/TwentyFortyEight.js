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

    this.draw();
    this.start();
  }

  start() {
    this.controlDriver.register({
      move: (direction) => this.move(direction)
    });
  }

  initializeGrid() {
    this.grid = new Array(this.rows).fill([]).map(() => new Array(this.cols).fill(null));
    this.generateRandomCell();
    this.generateRandomCell();

    return this.grid;
  }

  gameOver() {
    console.log('Game Over');
    // disable controls
    // update display
  }

  generateRandomCell() {
    const cell = this.getRandomCell();
    if (!cell) {
      gameOver();
    }
    this.grid[cell.row][cell.col] = 2;
  }

  move(direction) {
    const { isVertical, isReversed } = GRID_LINE_META_MAP[direction];
    const movesLength = isVertical ? this.cols : this.rows;

    for(let i = 0; i < movesLength; i++) {
      const list = fetchValues(this.grid, i, isVertical, isReversed);
      const result = stretch(combine(reduceList(list)), list.length);
      replaceValues(result, this.grid, i, isVertical, isReversed);
    }

    this.generateRandomCell();
    this.draw();
  }

  draw() {
    this.displayDriver.draw(this.grid);
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