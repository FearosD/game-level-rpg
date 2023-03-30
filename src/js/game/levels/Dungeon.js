import { parsedDungeonCollisions } from './dungeon-collisions';
import Npc from '../classes/Npc';
import { createInterractionPosition } from '../../helpers/interraction-zone';
import Level from '../classes/Level';

export default class Dungeon extends Level {
  constructor() {
    super();
    this.name = 'Dungeon';
    this.nameMap = 'dungeon-map';
    this.collisions = parsedDungeonCollisions;
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

  createOjbects(player) {
    this.player = player;

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

    if (!this.levelStart) {
      testNpc.subscribe('dialogue npc', this.startDialogue);
      this.levelObject.push(this.map, testNpc);
      this.levelObject.forEach((object) =>
        createInterractionPosition(object, this.map)
      );
    }
  }

  startDialogue = (dialogue) => {
    this.emit('dialogue npc', dialogue);
  };
}
