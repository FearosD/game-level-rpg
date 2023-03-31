import Npc from '../classes/Npc';
import { createInterractionPosition } from '../../helpers/interraction-zone';
import Level from '../classes/Level';
import { parsedVillageCollisions } from './village-collisions';

export default class Village extends Level {
  constructor() {
    super();
    this.name = 'Village';
    this.nameMap = 'village-map';
    this.collisions = parsedVillageCollisions;
    this.offsetMap = {
      x: 0,
      y: -(25 * 48),
    };
    this.offsetNpc = {
      x: -24,
      y: -48,
    };
    this.levelStart = false;
    this.startPosition = [13, 33];
  }

  createOjbects(player) {
    this.player = player;
    this.player.currentPosition = [...this.startPosition];

    const benjamin = new Npc({
      canvas: this.canvas,
      imageName: 'benjamin-idle',
      name: 'benjamin',
      scale: 1.5,
      position: {
        x: 24 * 48 + this.offsetMap.x + this.offsetNpc.x,
        y: 32 * 48 + this.offsetMap.y + this.offsetNpc.y,
      },
      maxFrame: 4,
      holdFrame: 12,
      animations: {
        idle: {
          maxFrame: 4,
          holdFrame: 12,
          imageName: 'benjamin-idle',
        },
      },
    });

    const merchant = new Npc({
      canvas: this.canvas,
      imageName: 'marchant-idle',
      name: 'merchant',
      scale: 1.5,
      position: {
        x: 14 * 48 + this.offsetMap.x + this.offsetNpc.x,
        y: 19 * 48 + this.offsetMap.y + this.offsetNpc.y,
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

    const eleni = new Npc({
      canvas: this.canvas,
      imageName: 'eleni-idle',
      name: 'eleni',
      scale: 1.5,
      position: {
        x: 25 * 48 + this.offsetMap.x + this.offsetNpc.x,
        y: 51 * 48 + this.offsetMap.y + this.offsetNpc.y,
      },
      maxFrame: 4,
      holdFrame: 12,
      animations: {
        idle: {
          maxFrame: 4,
          holdFrame: 12,
          imageName: 'eleni-idle',
        },
      },
    });

    if (!this.levelStart) {
      benjamin.subscribe('dialogue npc', this.startDialogue);
      merchant.subscribe('dialogue npc', this.startDialogue);
      eleni.subscribe('dialogue npc', this.startDialogue);
      this.levelObject.push(this.map, benjamin, merchant, eleni);
      this.levelObject.forEach((object) =>
        createInterractionPosition(object, this.map)
      );
    }
  }

  startDialogue = (dialogue) => {
    this.emit('dialogue npc', dialogue);
  };

  //
  animate = () => {
    this.gameLoop = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgba(80, 167, 232, 1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
    this.levelObject.forEach((object) => object.update());
    this.player.update();
  };
}
