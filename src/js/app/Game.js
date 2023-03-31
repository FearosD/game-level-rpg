import Player from '../game/classes/Player';
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
    this.player = null;

    this.gameStart = false;
  }
  createGame() {
    this.player = this.createPlayer();
    return this.canvas;
  }

  startGame() {
    this.currentLevel.createLevel(this.canvas, this.player);
    this.currentLevel.startLevel();
    this.currentLevel.subscribe('dialogue npc', this.startDialogue);
    this.gameStart = true;
  }

  saveGame() {
    return this.currentLevel.saveLevel();
  }

  loadGame(saveData) {
    const [level] = this.levels.filter(
      (level) => level.name === saveData.level
    );
    if (this.currentLevel.name !== level.name && this.currentLevel.levelStart) {
      console.log(`off ${this.currentLevel.name}`);
      this.currentLevel.offLoadLevel();
      this.currentLevel.unsubscribe('dialogue npc', this.startDialogue);
    }
    this.currentLevel = level;

    if (this.currentLevel.levelStart) {
      this.currentLevel.loadLevel(saveData);
      return;
    }

    this.currentLevel.createLevel(this.canvas, this.player);
    this.currentLevel.startLevel();
    this.currentLevel.loadLevel(saveData);
    this.currentLevel.subscribe('dialogue npc', this.startDialogue);
    if (!this.gameStart) {
      this.currentLevel.subscribe('dialogue npc', this.startDialogue);
    }
    this.gameStart = true;
  }

  startDialogue = (diaologue) => {
    this.emit('dialogue npc', diaologue);
  };

  createPlayer = () => {
    const player = new Player({
      canvas: this.canvas,
      imageName: 'player-idle',
      name: 'player',
      scale: 1.5,
      position: {
        x: this.canvas.width / 2 - 42,
        y: this.canvas.height / 2 - 24,
      },
      maxFrame: 4,
      holdFrame: 12,
      currentPosition: [0, 0],
      animations: {
        idle: {
          maxFrame: 4,
          holdFrame: 12,
          loop: true,
          imageName: 'player-idle',
        },
        moveDown: {
          maxFrame: 9,
          holdFrame: 6,
          loop: true,
          imageName: 'player-walk-down',
        },
        moveUp: {
          maxFrame: 9,
          holdFrame: 6,
          loop: true,
          imageName: 'player-walk-up',
        },
        moveLeft: {
          maxFrame: 9,
          holdFrame: 6,
          loop: true,
          imageName: 'player-walk-left',
        },
        moveRight: {
          maxFrame: 9,
          holdFrame: 6,
          loop: true,
          imageName: 'player-walk-right',
        },
      },
    });

    return player;
  };
}
