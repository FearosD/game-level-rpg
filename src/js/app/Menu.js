import gameMenu from '../components/menu/game-menu';
import EventEmitter from './EventEmitter';

export default class Menu extends EventEmitter {
  constructor() {
    super();
    this.gameMenu = gameMenu();

    this.startBtn = this.gameMenu.querySelector('.game__button');
  }
  createMenu() {
    this.startBtn.addEventListener('click', () => {
      this.emit('game start');
    });

    return this.gameMenu;
  }
}
