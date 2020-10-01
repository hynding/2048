import { DisplayDriver } from './DisplayDriver.js';

export class BrowserDisplayDriver extends DisplayDriver {
  constructor() {
    super();
    this.table = document.querySelector('table');
  }

  clear() {
    while(this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
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
      this.table.appendChild(rowEl);
    });
  }
}