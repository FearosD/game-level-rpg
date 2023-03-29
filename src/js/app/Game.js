import createElement from '../helpers/createElement';
import EventEmitter from './EventEmitter';

export default class Game extends EventEmitter {
  constructor({ levels = [], firstLevel }) {
    super();
    this.canvas = createElement({ typeElem: 'canvas', id: 'canvas' });
    this.canvas.width = 1280;
    this.canvas.height = 720;

    this.levels = levels;
    this.currentLevel = firstLevel;
    this.gameStart = false;
  }
  createGame() {
    this.gameStart = true;
    return this.canvas;
  }

  startGame() {
    this.currentLevel.createLevel(this.canvas);
    this.currentLevel.startLevel();
    this.currentLevel.subscribe('dialogue-npc', this.startDialogue);
  }

  saveGame() {
    return this.currentLevel.saveLevel();
  }

  loadGame(saveData) {
    const [level] = this.levels.filter(
      (level) => level.name === saveData.level
    );
    this.currentLevel = level;

    if (this.currentLevel.levelStart) {
      this.currentLevel.loadLevel(saveData);
      return;
    }

    this.currentLevel.createLevel(this.canvas);
    this.currentLevel.startLevel();
    this.currentLevel.loadLevel(saveData);
    if (!this.gameStart) {
      console.log('err');
      this.currentLevel.subscribe('dialogue-npc', this.startDialogue);
    }
    this.gameStart = true;
  }

  startDialogue = (diaologue) => {
    this.emit('dialogue-npc', diaologue);
  };
}
