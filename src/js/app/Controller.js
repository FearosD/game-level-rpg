import {
  assetsImages,
  takeImage,
  assetsSounds,
  takeSound,
} from '../helpers/assets-list';

export default class Controller {
  constructor({ menu, gameContainer, loader, game }) {
    this.gameContainer = gameContainer;
    this.menu = menu;
    this.loader = loader;
    this.game = game;
  }

  initGame() {
    this.gameContainer.append(this.menu.createMenu());
    this.gameContainer.append(this.loader.createLoader());
    this.menu.subscribe('game start', this.gameStart.bind(this));
    this.menu.subscribe('game load', this.gameLoad.bind(this));
    this.menu.subscribe('game options', this.gameOptions.bind(this));
  }

  async gameStart() {
    console.warn('Game Start');
    this.menu.gameMenu.classList.add('game__menu--slideout');
    this.loader.gameLoader.style.display = 'block';
    await this.loader.start();
    console.warn('Load Assets End');
    // console.log(takeImage('dungeon-map'));
    // console.log(takeSound('Block'));
    this.loader.gameLoader.remove();
    this.gameContainer.append(this.game.createGame());
    this.game.startGame();
  }

  gameLoad() {
    console.warn('Game Load');
    this.menu.gameMenu.classList.add('game__menu--slideout');
  }

  gameOptions() {
    console.warn('Game Options');
  }
}
