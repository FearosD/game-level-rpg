import AnimatedSprite from '../classes/AnimatedSprite';
import Player from '../classes/Player';
import Sprite from '../classes/Sprite';
import { gsap } from 'gsap';
import Pathfinding from 'pathfinding';
import { parsedDungeonCollisions } from './dungeon-collisions';
import pathfinding from '../../helpers/pathfinding';

export default class Dungeon {
  constructor() {
    this.name = 'Dungeon';
    this.canvas = null;
    this.ctx = null;
    this.canvasRect = null;
    this.player = null;
    this.map = null;
    this.levelObject = [];
    this.canMove = true;
    this.offset = {
      x: -864,
      y: -336,
    };
  }

  createLevel(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasRect = this.canvas.getBoundingClientRect();

    this.map = new Sprite({
      position: {
        x: this.offset.x,
        y: this.offset.y,
      },
      imageName: 'dungeon-map',
      scale: 1,
      ctx: this.ctx,
    });

    const testNpc = new AnimatedSprite({
      ctx: this.ctx,
      imageName: 'marchant-idle',
      scale: 1.5,
      position: {
        x: this.canvas.width / 2 - 42 + 48 * 4,
        y: this.canvas.height / 2 - 24 + 48 * 2,
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
      ctx: this.ctx,
      imageName: 'player-idle',
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

    this.levelObject.push(this.map, testNpc);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.levelObject.forEach((object) => object.update());
    this.player.update();
  };

  startLevel() {
    this.animate();

    const grid = new Pathfinding.Grid(parsedDungeonCollisions);
    const pathfindingFunc = pathfinding.bind(this, {
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

    this.canvas.addEventListener('click', pathfindingFunc);
  }

  moveMap(keyFrames, endX, endY) {
    this.levelObject.forEach((object) => {
      gsap.to(object, {
        keyframes: keyFrames,
        onComplete: () => {
          this.player.currentPosition[0] = endX;
          this.player.currentPosition[1] = endY;
          this.player.switchState('idle');
          this.canMove = true;
        },
      });
    });
  }
}
