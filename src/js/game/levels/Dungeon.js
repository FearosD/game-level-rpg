import { parsedDungeonCollisions } from './dungeon-collisions';
import Npc from '../classes/Npc';
import {
  createinteractionPosition,
  createTransitionZone,
} from '../../helpers/interaction-zone';
import Level from '../classes/Level';

export default class Dungeon extends Level {
  constructor() {
    super();
    this.name = 'Dungeon';
    this.nameMap = 'dungeon-map';
    this.collisions = parsedDungeonCollisions;
    // this.offsetMap = {
    //   x: -864,
    //   y: -336,
    // };
    this.offsetNpc = {
      x: -24,
      y: -48,
    };
    this.levelStart = false;
    this.interactionPositions = createTransitionZone([
      [31, 15],
      [32, 15],
    ]);
    // this.startPosition = [31, 15];
  }

  get offsetMap() {
    return {
      x: this.isChangeLevel ? -(18 * 48) : -(18 * 48),
      y: this.isChangeLevel ? -(9 * 48) : -(9 * 48),
    };
  }

  get startPosition() {
    return this.isChangeLevel ? [31, 17] : [31, 17];
  }

  createOjbects(player) {
    this.player = player;
    this.player.currentPosition = [...this.startPosition];

    // const testNpc = new Npc({
    //   canvas: this.canvas,
    //   imageName: 'marchant-idle',
    //   name: 'benjamin2',
    //   scale: 1.5,
    //   position: {
    //     x: 35 * 48 + this.offsetMap.x + this.offsetNpc.x,
    //     y: 17 * 48 + this.offsetMap.y + this.offsetNpc.y,
    //   },
    //   maxFrame: 4,
    //   holdFrame: 12,
    //   animations: {
    //     idle: {
    //       maxFrame: 4,
    //       holdFrame: 12,
    //       imageName: 'marchant-idle',
    //     },
    //   },
    // });

    if (!this.levelStart) {
      // testNpc.subscribe('dialogue npc', this.startDialogue);
      // this.npc.push(testNpc);
      this.levelObject.push(this.map, ...this.npc);
      this.levelObject.forEach((object) =>
        createinteractionPosition(object, this.map)
      );
    }
  }

  animate = () => {
    super.animate();
    if (this.caninteraction) this.onTransitionZone();
  };

  onTransitionZone = () => {
    console.log('can transition village');
    this.caninteraction = false;
    this.emit('transition level', 'Village');
  };

  startDialogue = (dialogue) => {
    this.emit('dialogue npc', dialogue);
  };

  offLoadLevel() {
    super.offLoadLevel();
    // this.npc.forEach((npc) => {
    //   npc.unsubscribe(`dialogue ${npc.name}`, this.startDialogue);
    //   npc.removeinteraction();
    // });
    // this.npc = [];
  }
}
