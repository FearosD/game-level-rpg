import gameMenu from '../components/menu/game-menu';
import EventEmitter from './EventEmitter';

export default class Menu extends EventEmitter {
  constructor() {
    super();
    this.gameMenu = gameMenu();

    this.startBtn = this.gameMenu.querySelector('#btn-start');
    this.loadBtn = this.gameMenu.querySelector('#btn-load');
    this.optionsBtn = this.gameMenu.querySelector('#btn-options');
  }
  createMenu() {
    this.startBtn.addEventListener('click', () => {
      this.emit('game start');
    });
    this.loadBtn.addEventListener('click', () => {
      this.emit('game load');
    });
    this.optionsBtn.addEventListener('click', () => {
      this.emit('game options');
    });

    return this.gameMenu;
  }
}
