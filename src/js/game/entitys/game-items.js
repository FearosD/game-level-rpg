const gameItems = {
  1: {
    id: 1,
    name: 'Battle axe',
    type: 'weapon',
    price: 20,
    inventory: 'hand',
    slot: 1,
    get 'sell price'() {
      return Math.floor(this.price * 0.3);
    },
    icon: 'axe',
    actions: ['slashing blow'],
    skills: ['close cuts', 'furious throw'],
    stats: {
      attack: 5,
      deffense: -5,
    },
    description:
      'An axe is a powerful weapon that can cause serious damage to enemies. Due to its shape, the axe has a high penetration ability and can easily pass through the armor and protection of the enemy.',
  },
  2: {
    id: 2,
    name: "Mercenary's spear",
    type: 'weapon',
    inventory: 'hand',
    slot: 2,
    price: 15,
    get 'sell price'() {
      return Math.floor(this.price * 0.3);
    },
    icon: 'spear',
    actions: ['impaling spear'],
    skills: ['wounding spearhead', 'piercing strike'],
    stats: {
      attack: 3,
    },
    description:
      'Due to its shape, the spear allows the fighter to keep a distance from the enemy, which makes it an indispensable weapon for fighting crowds of enemies. In the hands of an experienced fighter, the spear becomes a formidable weapon.',
  },
  3: {
    id: 3,
    name: 'Branch of Wisdom',
    type: 'magic staff',
    price: 25,
    inventory: 'hand',
    slot: 2,
    get 'sell price'() {
      return Math.floor(this.price * 0.3);
    },
    icon: 'staff',
    actions: ['fast strike'],
    skills: ['ring of fire', 'scorch', 'fire barrage'],
    stats: {
      attack: 2,
      deffense: -2,
    },
    description:
      'The Fire Staff is a weapon capable of turning even the most experienced warriors into ashes. Made of wood covered with magical runes, it is able to create powerful fire flashes that cause damage to all enemies in the affected area. Only the strongest and most experienced magicians can master this powerful weapon and use it on the battlefield.',
  },
  4: {
    id: 4,
    name: 'Plate Cuirass',
    type: 'armor',
    inventory: 'body',
    slot: 1,
    price: 30,
    get 'sell price'() {
      return Math.floor(this.price * 0.3);
    },
    icon: 'armor',
    actions: [],
    skills: [],
    stats: {
      health: 10,
      deffense: 10,
    },
    description:
      'This armor is the perfect combination of power and agility. It consists of thick plates reinforced with leather and metal rivets, which provide reliable protection in combat. At the same time, the armor does not restrict movement and allows you to maneuver freely on the battlefield. It has a silver color with engravings symbolizing strength and protection.',
  },
  5: {
    id: 5,
    name: 'Oaken Shield',
    type: 'shield',
    inventory: 'hand',
    slot: 1,
    price: 100,
    get 'sell price'() {
      return Math.floor(this.price * 0.3);
    },
    icon: 'shield',
    actions: [],
    skills: ['raise shield'],
    stats: {
      health: 5,
      deffense: 8,
    },
    description:
      'A shield is a reliable piece of equipment that can save a life during a fight. This makes it indispensable for protection, as well as for blocking blows of swords and spears.',
  },
  6: {
    id: 6,
    name: 'Health potion',
    type: 'potion',
    inventory: 'consumables',
    slot: 1,
    price: 18,
    get 'sell price'() {
      return Math.floor(this.price * 0.3);
    },
    icon: 'potion',
    actions: [],
    skills: ['restore health'],
    stats: null,
    description:
      'An infusion of rare herbs and roots that have healing properties. The combination of these ingredients creates a powerful drink that can quickly restore health and strength. After consuming the potion, it is instantly absorbed into the blood and begins to act, eliminating fatigue and illness. The healing potion can be used in any situation where rapid regeneration of health is needed.',
  },
};

export { gameItems };
