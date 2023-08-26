import { DisplayDriver } from './DisplayDriver.js';

export default class GridDisplayDriver extends DisplayDriver {
  constructor(gridClassName = 'grid') {
    super();
    this.container = document.querySelector(`main > .${gridClassName}`);
    if (!this.container) {
      this.container = document.createElement(gridClassName);
      this.container.className = gridClassName;
      document.querySelector('main').appendChild(this.container);
    }
  }

  clear() {
    while(this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  draw(grid) {
    this.clear();
    grid.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.setAttribute('class', 'row');

      row.forEach(cell => {
        const cellEl = document.createElement('div');
        cellEl.setAttribute('class', 'cell' + cell ? ` n${cell}`: '');

        const textEl = document.createTextNode(cell || '\u00A0');
        cellEl.appendChild(textEl);

        rowEl.appendChild(cellEl);
      });

      this.container.appendChild(rowEl);
    });
  }
}