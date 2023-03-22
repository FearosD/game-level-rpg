import gameMenuLoad from '../components/menu/game-menu-load';
import EventEmitter from './EventEmitter';

export default class MenuLoad extends EventEmitter {
  constructor() {
    super();
    this.gameMenuLoad = gameMenuLoad();

    this.input = this.gameMenuLoad.querySelector('#load-input');
    this.loadBtn = this.gameMenuLoad.querySelector('#btn-get-load');
  }
  createMenu() {
    this.loadBtn.addEventListener('click', () => {
      this.emit('game get save');
    });
    return this.gameMenuLoad;
  }
}
