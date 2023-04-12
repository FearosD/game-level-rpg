import {
  createinteractionPosition,
  createTransitionZone,
} from '../../helpers/interaction-zone';
import Level from '../classes/Level';
import { parsedVillageCollisions } from './village-collisions';
import { createMerchant, createNpc } from '../../helpers/create-npc';

export default class Village extends Level {
  constructor() {
    super();
    this.name = 'Village';
    this.nameMap = 'village-map';
    this.collisions = parsedVillageCollisions;
    this.offsetNpc = {
      x: -24,
      y: -48,
    };
    this.levelStart = false;
    // this.interactionPositions = createTransitionZone([
    //   [18, 30],
    //   [20, 33],
    // ]);
    this.interactionPositions = createTransitionZone([
      [43, 8],
      [56, 9],
    ]);
  }

  get offsetMap() {
    return {
      // x: this.isChangeLevel ? -(36 * 48) : 0,
      // y: this.isChangeLevel ? -(2 * 48) : -(25 * 48),
      x: this.isChangeLevel ? -(36 * 48) : 1 * 48,
      y: this.isChangeLevel ? -(2 * 48) : -(11 * 48),
    };
  }

  get startPosition() {
    // return this.isChangeLevel ? [49, 10] : [13, 33];
    return this.isChangeLevel ? [49, 10] : [12, 19];
  }

  createOjbects(player) {
    this.player = player;
    this.player.currentPosition = [...this.startPosition];

    const benjamin = createNpc({
      canvas: this.canvas,
      name: 'benjamin',
      position: {
        x: 24 * 48 + this.offsetMap.x + this.offsetNpc.x,
        y: 32 * 48 + this.offsetMap.y + this.offsetNpc.y,
      },
    });

    const merchant = createMerchant({
      canvas: this.canvas,
      name: 'merchant',
      shopItems: [1, 2, 3, 5, 6],
      position: {
        x: 14 * 48 + this.offsetMap.x + this.offsetNpc.x,
        y: 19 * 48 + this.offsetMap.y + this.offsetNpc.y,
      },
    });

    const eleni = createNpc({
      canvas: this.canvas,
      name: 'eleni',
      position: {
        x: 25 * 48 + this.offsetMap.x + this.offsetNpc.x,
        y: 51 * 48 + this.offsetMap.y + this.offsetNpc.y,
      },
    });

    if (!this.levelStart) {
      this.npc.push(benjamin, eleni);
      this.merchant.push(merchant);
      this.levelObject.push(this.map, ...this.npc, ...this.merchant);
      this.levelObject.forEach((object) =>
        createinteractionPosition(object, this.map)
      );
    }
    this.npc.forEach((npc) => {
      npc.subscribe(`dialogue ${npc.name}`, this.startDialogue);
    });
    this.merchant.forEach((merchant) => {
      merchant.subscribe(`trade ${merchant.name}`, this.tradeNpc);
    });
  }

  startDialogue = (dialogue) => {
    this.emit('dialogue npc', dialogue);
  };

  tradeNpc = (merchantData) => {
    this.emit('trade npc', merchantData);
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
    if (this.caninteraction) this.onTransitionZone();
  };

  onTransitionZone = () => {
    if (this.runCutScene) return;
    console.log('can transition dungeon');
    this.caninteraction = false;
    this.emit('transition level', 'Dungeon');
  };

  endMoveToDungeon = () => {
    this.emit('end move to dungeon');
  };

  offLoadLevel() {
    super.offLoadLevel();
    this.npc.forEach((npc) => {
      npc.unsubscribe(`dialogue ${npc.name}`, this.startDialogue);
      npc.removeinteraction();
    });
    this.merchant.forEach((merchant) => {
      merchant.unsubscribe(`trade ${merchant.name}`, this.tradeNpc);
      merchant.removeinteraction();
    });
    this.npc = [];
    this.merchant = [];
  }
}
