import AnimatedSprite from '../classes/AnimatedSprite';
import Player from '../classes/Player';
import Sprite from '../classes/Sprite';
import { gsap } from 'gsap';
import Pathfinding from 'pathfinding';
import { parsedDungeonCollisions } from './dungeon-collisions';

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

    this.canvas.addEventListener('click', (event) => {
      if (!this.canMove) return;
      this.canMove = false;
      const posX = event.clientX - this.canvasRect.left;
      const posY = event.clientY - this.canvasRect.top;

      const gridBackup = grid.clone();
      const [startX, startY] = this.player.currentPosition;
      const endX = Math.floor((Math.abs(this.map.posX) + posX) / 48);
      const endY = Math.floor((Math.abs(this.map.posY) + posY) / 48);

      const finder = new Pathfinding.BestFirstFinder({
        allowDiagonal: true,
        dontCrossCorners: true,
        heuristic: function (dx, dy) {
          return Math.min(dx, dy);
        },
      });

      const path = finder.findPath(startX, startY, endX, endY, gridBackup);
      if (path.length === 0) {
        canMove = true;
        return;
      }

      const keyFramesArray = path.slice(1);
      const arrayTemp = [];
      for (let i = 0; i < keyFramesArray.length; i += 1) {
        arrayTemp.push([
          keyFramesArray[i][0] - path[i][0],
          keyFramesArray[i][1] - path[i][1],
        ]);
      }

      const keyFrames = arrayTemp.map((points) => {
        const [x, y] = points;
        return {
          posX: `-=${x * 48}`,
          posY: `-=${y * 48}`,
          duration: 0.3,
          onStart: () => {
            if (x > 0 && y == 0) {
              this.player.switchState('moveRight');
            } else if (x < 0 && y == 0) {
              this.player.switchState('moveLeft');
            } else if (y < 0) {
              this.player.switchState('moveUp');
            } else if (y > 0) {
              this.player.switchState('moveDown');
            }
            // console.log(currentPosition);
          },
        };
      });

      this.moveMap(keyFrames, endX, endY);
    });
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
          // console.log(currentPosition);
        },
      });
    });
  }
}
