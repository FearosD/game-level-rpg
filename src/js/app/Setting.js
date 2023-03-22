import gameSetting from '../components/menu/game-setting';
import EventEmitter from './EventEmitter';

export default class Setting extends EventEmitter {
  constructor() {
    super();
    this.gameSetting = gameSetting();

    this.soundBtn = this.gameSetting.querySelector('#btn-sound');
    this.settingBtn = this.gameSetting.querySelector('#btn-setting');
  }
  createSetting() {
    this.soundBtn.addEventListener('click', () => {
      this.emit('toggle sound');
    });
    this.settingBtn.addEventListener('click', () => {
      this.emit('toggle setting');
    });
    return this.gameSetting;
  }
}
