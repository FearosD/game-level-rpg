import gameMenuSave from '../components/menu/game-menu-save';
import EventEmitter from './EventEmitter';

export default class MenuSave extends EventEmitter {
  constructor() {
    super();
    this.gameMenuSave = gameMenuSave();

    this.input = this.gameMenuSave.querySelector('#save-input');
    this.saveBtn = this.gameMenuSave.querySelector('#btn-post-save');
  }
  createMenu() {
    this.saveBtn.addEventListener('click', () => {
      this.emit('game post save');
    });
    return this.gameMenuSave;
  }
}
