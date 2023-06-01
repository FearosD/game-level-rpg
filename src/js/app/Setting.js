import gameSetting from '../components/menu/game-setting';
import EventEmitter from './EventEmitter';

export default class Setting extends EventEmitter {
  constructor() {
    super();
    this.gameSetting = gameSetting();

    this.soundBtn = this.gameSetting.querySelector('#btn-sound');
    this.settingBtn = this.gameSetting.querySelector('#btn-setting');
    this.characterBtn = this.gameSetting.querySelector('#btn-character');
  }
  createSetting() {
    this.soundBtn.addEventListener('click', () => {
      this.emit('toggle sound');
    });
    this.characterBtn.addEventListener('click', () => {
      this.emit('open character menu');
    });
    this.settingBtn.addEventListener('click', () => {
      this.emit('toggle setting');
      this.soundBtn.classList.toggle('disabled');
      this.characterBtn.classList.toggle('disabled');
    });
    return this.gameSetting;
  }
}
