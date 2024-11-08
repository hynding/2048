import { DisplayDriver } from './DisplayDriver.js';

export class BrowserDisplayDriver extends DisplayDriver {
  constructor() {
    super();
    this.container = document.querySelector('main > table');
    if (!this.container) {
      this.container = document.createElement('table');
      document.querySelector('main').appendChild(this.container);
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
}