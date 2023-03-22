import createElement from '../helpers/createElement';

export default class Game {
  constructor({ levels = [], firstLevel }) {
    this.canvas = createElement({ typeElem: 'canvas', id: 'canvas' });
    this.canvas.width = 1280;
    this.canvas.height = 720;

    this.levels = levels;
    this.firstLevel = firstLevel;
    this.currentLevel = this.firstLevel;
  }
  createGame() {
    return this.canvas;
  }

  startGame() {
    this.firstLevel.createLevel(this.canvas);
    this.firstLevel.startLevel();
  }

  saveGame() {
    return this.currentLevel.saveLevel();
  }

  loadGame(saveData) {
    const [level] = this.levels.filter(
      (level) => level.name === saveData.level
    );
    this.currentLevel = level;

    this.currentLevel.createLevel(this.canvas);
    this.currentLevel.startLevel();
    this.currentLevel.loadLevel(saveData);
  }
}
