import AnimatedSprite from '../classes/AnimatedSprite';
import Player from '../classes/Player';
import Sprite from '../classes/Sprite';
import { gsap } from 'gsap';
import Pathfinding from 'pathfinding';
import { parsedDungeonCollisions } from './dungeon-collisions';
import pathfinding from '../../helpers/pathfinding';
import Npc from '../classes/Npc';
import {
  checkInterraction,
  createInterractionPosition,
} from '../../helpers/interraction-zone';
import EventEmitter from '../../app/EventEmitter';

export default class Dungeon extends EventEmitter {
  constructor() {
    super();
    this.name = 'Dungeon';
    this.canvas = null;
    this.ctx = null;
    this.canvasRect = null;
    this.player = null;
    this.map = null;
    this.levelObject = [];
    this.canMove = true;
    this.offsetMap = {
      x: -864,
      y: -336,
    };
    this.offsetNpc = {
      x: -24,
      y: -48,
    };
    this.levelStart = false;
  }

  createLevel(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasRect = this.canvas.getBoundingClientRect();

    this.map = new Sprite({
      position: {
        x: this.offsetMap.x,
        y: this.offsetMap.y,
      },
      imageName: 'dungeon-map',
      scale: 1,
      canvas: this.canvas,
      name: 'dungeon-map',
    });

    const testNpc = new Npc({
      canvas: this.canvas,
      imageName: 'marchant-idle',
      name: 'benjamin',
      scale: 1.5,
      position: {
        x: 35 * 48 + this.offsetMap.x + this.offsetNpc.x,
        y: 17 * 48 + this.offsetMap.y + this.offsetNpc.y,
      },
      maxFrame: 4,
      holdFrame: 12,
      animations: {
        idle: {
          maxFrame: 4,
          holdFrame: 12,
          imageName: 'marchant-idle',
        },
      },
    });

    this.player = new Player({
      canvas: this.canvas,
      imageName: 'player-idle',
      name: 'player',
      scale: 1.5,
      position: { x: canvas.width / 2 - 42, y: canvas.height / 2 - 24 },
      maxFrame: 4,
      holdFrame: 12,
      currentPosition: [31, 15],
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

    if (!this.levelStart) {
      testNpc.subscribe('dialogue-npc', this.startDialogue);
      this.levelObject.push(this.map, testNpc);
      this.levelObject.forEach((object) =>
        createInterractionPosition(object, this.map)
      );
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.levelObject.forEach((object) => object.update());
    this.player.update();
  };

  pathfindingFunc = () => {
    const grid = new Pathfinding.Grid(parsedDungeonCollisions);
    return pathfinding({
      event,
      canMove: this.canMove,
      canvasRect: this.canvasRect,
      grid,
      currentPosition: this.player.currentPosition,
      player: this.player,
      map: this.map,
      moveFunc: this.moveMap,
      context: this,
    });
  };

  startLevel() {
    if (!this.levelStart) {
      this.animate();
      this.canvas.addEventListener('click', this.pathfindingFunc);

      this.levelStart = true;
    }
  }

  moveMap(keyFrames, endX, endY) {
    this.canMove = false;
    this.levelObject.forEach((object) => {
      gsap.to(object, {
        keyframes: keyFrames,
        onComplete: () => {
          this.player.currentPosition[0] = endX;
          this.player.currentPosition[1] = endY;
          this.player.switchState('idle');
          this.canMove = true;
          checkInterraction(this.player, object);
        },
      });
    });
  }

  saveLevel() {
    const saveData = {
      position: { player: { posX: this.player.posX, posY: this.player.posY } },
      currentPlayerPosition: [...this.player.currentPosition],
      level: this.name,
    };

    this.levelObject.forEach((object) => {
      saveData.position[object.name] = {
        posX: object.posX,
        posY: object.posY,
      };
    });
    return saveData;
  }

  loadLevel(saveData) {
    this.player.currentPosition = [...saveData.currentPlayerPosition];
    this.player.posX = saveData.position.player.posX;
    this.player.posY = saveData.position.player.posY;

    this.map.posX = saveData.position[this.map.name].posX;
    this.map.posY = saveData.position[this.map.name].posY;

    this.levelObject.forEach((object) => {
      object.posX = saveData.position[object.name].posX;
      object.posY = saveData.position[object.name].posY;
    });
  }

  startDialogue = (dialogue) => {
    this.emit('dialogue-npc', dialogue);
  };
}
