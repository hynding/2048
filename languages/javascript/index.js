import { BrowserDisplayDriver } from './drivers/BrowserDisplayDriver.js';
import { KeyboardControlDriver } from './drivers/KeyboardControlDriver.js';
import { TwentyFortyEight } from './TwentyFortyEight.js';

let game = null;

document.querySelector('#new_game').addEventListener('click', startGame);

function startGame() {
  if (game) {
    game.stop();
  }
  const rows = Number(document.querySelector('#rows').value) || 4;
  const cols = Number(document.querySelector('#cols').value) || 4;
  game = new TwentyFortyEight({
    rows,
    cols,
    controlDriver: new KeyboardControlDriver(),
    displayDriver: new BrowserDisplayDriver()
  });
}

startGame();
