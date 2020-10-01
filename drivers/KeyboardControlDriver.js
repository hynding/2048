import { ControlDriver } from './ControlDriver.js';
import { fetchValues, replaceValues, combineList, reduceList, stretch } from '../utilities.js';

const ARROW_KEYCODE_MAP = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};
const ARROW_KEYCODES = Object.keys(ARROW_KEYCODE_MAP);

export class KeyboardControlDriver extends ControlDriver {

  register({ move }) {
    window.addEventListener('keydown', e => {
      if (ARROW_KEYCODES.includes(e.key)) {
        move(ARROW_KEYCODE_MAP[e.key]);
      }
    });
  }
}