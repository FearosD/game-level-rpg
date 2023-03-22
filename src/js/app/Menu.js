import gameMenu from '../components/menu/game-menu';
import EventEmitter from './EventEmitter';

export default class Menu extends EventEmitter {
  constructor() {
    super();
    this.gameMenu = gameMenu();

    this.startBtn = this.gameMenu.querySelector('#btn-start');
    this.saveBtn = this.gameMenu.querySelector('#btn-save');
    this.loadBtn = this.gameMenu.querySelector('#btn-load');
  }
  createMenu() {
    this.startBtn.addEventListener('click', () => {
      this.emit('game start');
    });
    this.saveBtn.addEventListener('click', () => {
      this.emit('game save');
    });
    this.loadBtn.addEventListener('click', () => {
      this.emit('game load');
    });

    return this.gameMenu;
  }
}
