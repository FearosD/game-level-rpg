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
    this.currentLevel.subscribe('transition level', this.transition);
    this.currentLevel.subscribe('end move to dungeon', this.switcthToDungeon);
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
      this.currentLevel.unsubscribe('transition level', this.transition);
      this.currentLevel.unsubscribe(
        'end move to dungeon',
        this.switcthToDungeon
      );
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
    this.currentLevel.subscribe('transition level', this.transition);
    this.currentLevel.subscribe('end move to dungeon', this.switcthToDungeon);
    // if (!this.gameStart) {
    //   this.currentLevel.subscribe('dialogue npc', this.startDialogue);
    //   this.currentLevel.subscribe('transition level', this.transition);
    //   this.currentLevel.subscribe('end move to dungeon', this.switcthToDungeon);
    // }
    this.gameStart = true;
  }

  changeLevel(name) {
    const [level] = this.levels.filter((level) => level.name === name);
    this.currentLevel.offLoadLevel();
    this.currentLevel.unsubscribe('dialogue npc', this.startDialogue);
    this.currentLevel.unsubscribe('transition level', this.transition);
    this.currentLevel.unsubscribe('end move to dungeon', this.switcthToDungeon);
    this.currentLevel = level;
    this.currentLevel.isChangeLevel = true;
    this.currentLevel.createLevel(this.canvas, this.player);
    this.currentLevel.isChangeLevel = false;
    this.currentLevel.startLevel();
    this.currentLevel.subscribe('dialogue npc', this.startDialogue);
    this.currentLevel.subscribe('transition level', this.transition);
    this.currentLevel.subscribe('end move to dungeon', this.switcthToDungeon);
  }

  switcthToDungeon = () => {
    this.player.posX = this.player.defaultPosition.posX;
    this.player.posY = this.player.defaultPosition.posY;
    this.player.switchState('idle');
    this.changeLevel('Dungeon');
  };

  startDialogue = (diaologue) => {
    this.emit('dialogue npc', diaologue);
  };

  transition = (name) => {
    this.emit('transition level', name);
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
