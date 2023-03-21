import { assetsImages } from '../helpers/assets-list';

export default class Controller {
  constructor({ menu, gameContainer, loader }) {
    this.gameContainer = gameContainer;
    this.menu = menu;
    this.loader = loader;
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
    console.log(assetsImages);
  }

  gameLoad() {
    console.warn('Game Load');
    this.menu.gameMenu.classList.add('game__menu--slideout');
  }

  gameOptions() {
    console.warn('Game Options');
  }
}
