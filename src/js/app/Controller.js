import {
  assetsImages,
  takeImage,
  assetsSounds,
  takeSound,
} from '../helpers/assets-list';

export default class Controller {
  constructor({ menu, gameContainer, loader, game, setting }) {
    this.gameContainer = gameContainer;
    this.menu = menu;
    this.loader = loader;
    this.game = game;
    this.setting = setting;
  }

  initGame() {
    this.gameContainer.append(this.menu.createMenu());
    this.gameContainer.append(this.setting.createSetting());
    this.gameContainer.append(this.loader.createLoader());
    this.menu.subscribe('game start', this.gameStart.bind(this));
    this.menu.subscribe('game save', this.gameSave.bind(this));
    this.menu.subscribe('game load', this.gameLoad.bind(this));
    this.setting.subscribe('toggle sound', this.gameToggleSound.bind(this));
    this.setting.subscribe('toggle setting', this.gameToggleSetting.bind(this));
  }

  async gameStart() {
    console.warn('Game Start');
    this.menu.gameMenu.classList.add('game__menu--slideout');
    this.menu.saveBtn.classList.remove('disabled');
    this.loader.gameLoader.style.display = 'block';
    await this.loader.start();
    console.warn('Load Assets End');
    // console.log(takeImage('dungeon-map'));
    // console.log(takeSound('Block'));
    this.loader.gameLoader.remove();
    this.setting.gameSetting.classList.add('game__setting--slidein');
    this.gameContainer.append(this.game.createGame());
    this.game.startGame();
  }

  gameSave() {
    console.warn('Game Save');
  }

  gameLoad() {
    console.warn('Game Load');
  }

  gameToggleSound() {
    console.warn('Toggle Sound');
  }

  gameToggleSetting() {
    console.warn('Toggle Setting');
    this.menu.gameMenu.classList.toggle('game__menu--slideout');
    this.game.canvas.classList.toggle('disabled');
  }
}
