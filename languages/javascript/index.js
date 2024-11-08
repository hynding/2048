import { BrowserDisplayDriver } from './drivers/BrowserDisplayDriver.js';
import { KeyboardControlDriver } from './drivers/KeyboardControlDriver.js';
import { TwentyFortyEight } from './TwentyFortyEight.js';

new TwentyFortyEight({
  rows: 5,
  cols: 10,
  controlDriver: new KeyboardControlDriver(),
  displayDriver: new BrowserDisplayDriver()
});