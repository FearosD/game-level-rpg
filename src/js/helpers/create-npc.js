import Merchant from '../game/classes/Merchant';
import Npc from '../game/classes/Npc';

const createNpc = ({ canvas, name, position }) => {
  return new Npc({
    canvas,
    imageName: `${name}-idle`,
    name,
    scale: 1.5,
    position,
    maxFrame: 4,
    holdFrame: 12,
    animations: {
      idle: {
        maxFrame: 4,
        holdFrame: 12,
        imageName: `${name}-idle`,
      },
    },
  });
};

const createMerchant = ({ canvas, name, position, shopItems }) => {
  return new Merchant({
    canvas,
    imageName: `${name}-idle`,
    name,
    shopItems,
    scale: 1.5,
    position,
    maxFrame: 4,
    holdFrame: 12,
    animations: {
      idle: {
        maxFrame: 4,
        holdFrame: 12,
        imageName: `${name}-idle`,
      },
    },
  });
};

export { createNpc, createMerchant };
