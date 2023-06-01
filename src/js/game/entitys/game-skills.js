const gameSkills = {
  'slashing blow': {
    name: 'Slashing blow',
    description: 'Deals a powerful strike on the enemy',
    cooldown: 0,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att + 2;
    },
    statusEffect: null,
  },
  'close cuts': {
    name: 'Close cuts',
    description: 'Deals two hits with the main weapon with 70% efficiency',
    cooldown: 2,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att * 2 * 0.7;
    },
    statusEffect: null,
  },
  'furious throw': {
    name: 'Furious throw',
    description: 'Stuns the enemy for 1 turn',
    cooldown: 2,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att * 0.1;
    },
    statusEffect: 'stun',
  },
  'impaling spear': {
    name: 'Impaling spear',
    description: 'A sharp lunge that can pierce through',
    cooldown: 0,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att + 4;
    },
    statusEffect: null,
  },
  'wounding spearhead': {
    name: 'Wounding spearhead',
    description: 'Causes the enemy to bleed for 2 turns',
    cooldown: 2,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att * 0.2;
    },
    statusEffect: 'bleed',
  },
  'piercing strike': {
    name: 'Piercing strike',
    description: 'Reduces target armor by 30% for 2 turns',
    cooldown: 2,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att * 0.1;
    },
    statusEffect: 'fragility',
  },
  'fast strike': {
    name: 'Fast strike',
    description: 'A weak hit with a staff',
    cooldown: 0,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att * 0.8;
    },
    statusEffect: null,
  },
  'ring of fire': {
    name: 'Ring of fire',
    description: 'Protects the owner with a fire cover for 2 turns',
    cooldown: 2,
    target: 'self',
    type: 'protect',
    attribute: 'deffense',
    total(att) {
      return att + 5;
    },
    statusEffect: null,
  },
  scorch: {
    name: 'Scorch',
    description: 'Ignite the enemy',
    cooldown: 0,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att + 5;
    },
    statusEffect: 'ignite',
  },
  'fire barrage': {
    name: 'Fire barrage',
    description: 'Launches a series firebolts at the enemy',
    cooldown: 0,
    target: 'enemy',
    type: 'damage',
    attribute: 'attack',
    total(att) {
      return att + 5;
    },
    statusEffect: null,
  },
  'raise shield': {
    name: 'Raise shield',
    description: "Increases the owner's protection by 30% for 2 turns",
    cooldown: 2,
    target: 'self',
    type: 'protect',
    attribute: 'deffense',
    total(att) {
      return att + 5;
    },
    statusEffect: null,
  },
  'restore health': {
    name: 'Restore health',
    description: 'Restores health by 20',
    cooldown: 2,
    target: 'self',
    type: 'heal',
    attribute: 'health',
    total(att) {
      return att + 20;
    },
    statusEffect: null,
  },
};

export default gameSkills;
