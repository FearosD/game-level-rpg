import {
  assetsImages,
  takeImage,
  assetsSounds,
  takeSound,
} from '../helpers/assets-list';
import Dialogue from './Dialogue';

export default class Controller {
  constructor({
    menu,
    gameContainer,
    loader,
    game,
    setting,
    saveModel,
    menuSave,
    menuLoad,
  }) {
    this.gameContainer = gameContainer;
    this.menu = menu;
    this.loader = loader;
    this.game = game;
    this.setting = setting;
    this.menuSave = menuSave;
    this.menuLoad = menuLoad;
    this.saveModel = saveModel;
    this.dialogue = null;
    // this.tempSave = null;
  }

  initGame() {
    this.gameContainer.append(this.menu.createMenu());
    this.gameContainer.append(this.setting.createSetting());
    this.gameContainer.append(this.loader.createLoader());

    this.menu.subscribe('game start', this.gameStart);
    this.menu.subscribe('game save', this.gameSave);
    this.menu.subscribe('game load', this.gameLoad);

    this.setting.subscribe('toggle sound', this.gameToggleSound);
    this.setting.subscribe('toggle setting', this.gameToggleSetting);

    this.menuSave.createMenu();
    this.menuLoad.createMenu();

    this.menuSave.subscribe('game post save', this.gamePostSave);
    this.menuLoad.subscribe('game get save', this.gameGetSave);

    this.game.subscribe('dialogue npc', this.startDialogue);
  }

  gameStart = async () => {
    console.warn('Game Start');
    this.menu.gameMenu.classList.toggle('game__menu--slideout');
    this.menu.saveBtn.classList.remove('disabled');
    this.loader.gameLoader.style.display = 'block';
    await this.loader.start();
    console.warn('Load Assets End');
    // console.log(takeImage('dungeon-map'));
    // console.log(takeSound('Block'));
    this.loader.gameLoader.remove();
    this.setting.gameSetting.classList.toggle('game__setting--slidein');
    this.menu.startBtn.classList.toggle('disabled');
    this.gameContainer.append(this.game.createGame());
    this.game.startGame();
  };

  gameSave = () => {
    console.warn('Open save menu');
    this.menu.gameMenu.classList.toggle('game__menu--slideout');
    this.setting.gameSetting.classList.toggle('disabled');
    this.menuSave.gameMenuSave.classList.remove('game__save--slideout');
    this.gameContainer.append(this.menuSave.gameMenuSave);
  };

  gamePostSave = async () => {
    const saveName = this.menuSave.input.value;
    if (saveName !== '') {
      const saveData = this.game.saveGame();
      await this.saveModel.postSave(saveData, saveName);
      this.menuSave.gameMenuSave.classList.toggle('game__save--slideout');
      this.setting.gameSetting.classList.toggle('disabled');
      this.game.canvas.classList.toggle('disabled');
      await setTimeout(() => {
        this.menuSave.gameMenuSave.remove();
      }, 1000);
      console.error('Game Saved');
    }
  };

  gameLoad = () => {
    console.warn('Game Load');
    console.warn('Open load menu');
    this.menu.gameMenu.classList.toggle('game__menu--slideout');
    this.setting.gameSetting.classList.toggle('disabled');
    this.menuLoad.gameMenuLoad.classList.remove('game__load--slideout');
    this.gameContainer.append(this.menuLoad.gameMenuLoad);
  };

  gameGetSave = async () => {
    const saveName = this.menuLoad.input.value;
    if (saveName !== '') {
      const save = await this.saveModel.getSave(saveName);
      if (save !== undefined) {
        if (!this.game.gameStart) {
          this.menuLoad.gameMenuLoad.classList.toggle('game__load--slideout');
          this.loader.gameLoader.style.display = 'block';
          await this.loader.start();
          this.loader.gameLoader.remove();
          this.menu.startBtn.classList.toggle('disabled');
          this.menu.saveBtn.classList.toggle('disabled');
          this.gameContainer.append(this.game.createGame());
          this.game.loadGame(save.saveData);
          this.setting.gameSetting.classList.toggle('game__setting--slidein');
          this.setting.gameSetting.classList.toggle('disabled');
          await setTimeout(() => {
            this.menuLoad.gameMenuLoad.remove();
          }, 1000);
          console.error('Game Loading');
          return;
        }
        this.game.loadGame(save.saveData);
      }
      this.menuLoad.gameMenuLoad.classList.toggle('game__load--slideout');
      this.setting.gameSetting.classList.toggle('disabled');
      this.game.canvas.classList.toggle('disabled');
      await setTimeout(() => {
        this.menuLoad.gameMenuLoad.remove();
      }, 1000);
      console.error('Game Loading');
    }
  };

  gameToggleSound = () => {
    console.warn('Toggle Sound');
    this.game.currentLevel.offLoadLevel();
  };

  gameToggleSetting = () => {
    console.warn('Toggle Setting');
    this.menu.gameMenu.classList.toggle('game__menu--slideout');
    this.game.canvas.classList.toggle('disabled');
  };

  startDialogue = (dialogueData) => {
    console.log('start dialogue');
    const dialogue = new Dialogue(dialogueData);
    this.dialogue = dialogue;
    this.dialogue.subscribe('end dialogue', this.endDialogue);
    this.setting.gameSetting.classList.toggle('disabled');
    this.game.canvas.classList.toggle('disabled');
    this.gameContainer.append(this.dialogue.createDialogue());
  };

  endDialogue = () => {
    console.log('end dialogue');
    this.dialogue.remove();
    this.dialogue = null;
    this.setting.gameSetting.classList.toggle('disabled');
    this.game.canvas.classList.toggle('disabled');
  };
}
