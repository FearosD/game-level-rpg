import Sprite from '../classes/Sprite';
import { gsap } from 'gsap';
import Pathfinding from 'pathfinding';
import pathfinding from '../../helpers/pathfinding';
import {
  checkInterraction,
  createInterractionPosition,
} from '../../helpers/interraction-zone';
import EventEmitter from '../../app/EventEmitter';
import { parsedDungeonCollisions } from '../levels/dungeon-collisions';

export default class Level extends EventEmitter {
  constructor() {
    super();
    this.name = 'Test level';
    this.nameMap = 'dungeon-map';
    this.canvas = null;
    this.ctx = null;
    this.canvasRect = null;
    this.player = null;
    this.map = null;
    this.levelObject = [];
    this.canMove = true;
    this.collisions = parsedDungeonCollisions;
    this.levelStart = false;
    this.gameLoop = null;
    this.isChangeLevel = false;
    this.npc = [];
    this.canInterraction = false;
    this.interractionPositions = [];
  }

  get offsetMap() {
    return {
      x: -864,
      y: -336,
    };
  }

  createLevel(canvas, player) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasRect = this.canvas.getBoundingClientRect();

    this.map = new Sprite({
      position: {
        x: this.offsetMap.x,
        y: this.offsetMap.y,
      },
      imageName: this.nameMap,
      scale: 1,
      canvas: this.canvas,
      name: this.nameMap,
    });

    this.createOjbects(player);
  }

  createOjbects(player) {
    this.player = player;

    if (!this.levelStart) {
      this.levelObject.push(this.map);
      this.levelObject.forEach((object) =>
        createInterractionPosition(object, this.map)
      );
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.levelObject.forEach((object) => object.update());
    this.player.update();
    this.gameLoop = requestAnimationFrame(this.animate);
  }

  pathfindingFunc = () => {
    const grid = new Pathfinding.Grid(this.collisions);
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
          checkInterraction(this.player, this);
        },
      });
    });
  }

  saveLevel() {
    const saveData = {
      level: this.name,
      player: {},
    };

    for (let option in this.player.saveOptions) {
      saveData.player[option] = this.player.saveOptions[option];
    }

    this.levelObject.forEach((object) => {
      saveData[object.name] = {};
      for (let option in object.saveOptions) {
        saveData[object.name][option] = object.saveOptions[option];
      }
    });
    return saveData;
  }

  loadLevel(saveData) {
    for (let option in saveData.player) {
      this.player[option] = saveData.player[option];
    }

    for (let option in saveData[this.map.name]) {
      this.map[option] = saveData[this.map.name][option];
    }

    this.levelObject.forEach((object) => {
      for (let option in saveData[object.name]) {
        object[option] = saveData[object.name][option];
      }
    });
  }

  offLoadLevel() {
    cancelAnimationFrame(this.gameLoop);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.levelStart = false;
    this.player = null;
    this.map = null;
    this.levelObject = [];
    this.canvas.removeEventListener('click', this.pathfindingFunc);
  }
}
