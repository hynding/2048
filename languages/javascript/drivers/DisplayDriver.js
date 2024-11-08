export class DisplayDriver {
  constructor() {
    this.container = null
  }
  clear() {
    if (this.container) {
      while(this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
  }
  draw(grid) {}
}