const gameItems = {
  1: {
    id: 1,
    name: 'Battle axe',
    type: 'weapon',
    price: 20,
    get sellPrice() {
      return this.price * 0.3;
    },
    icon: null,
    actions: ['slashing blow'],
    skills: ['close cuts', 'furious throw'],
    stats: {
      attack: 5,
      deffense: -5,
    },
  },
  2: {
    id: 2,
    name: "Mercenary's spear",
    type: 'weapon',
    price: 15,
    get sellPrice() {
      return this.price * 0.3;
    },
    icon: null,
    actions: ['impaling spear'],
    skills: ['wounding spearhead', 'piercing strike'],
    stats: {
      attack: 3,
    },
  },
  3: {
    id: 3,
    name: 'Branch of Wisdom',
    type: 'weapon',
    price: 25,
    get sellPrice() {
      return this.price * 0.3;
    },
    icon: null,
    actions: ['fast strike'],
    skills: ['ring of fire', 'scorch', 'fire barrage'],
    stats: {
      attack: 2,
      deffense: -2,
    },
  },
  4: {
    id: 4,
    name: 'Plate Cuirass',
    type: 'armor',
    price: 30,
    get sellPrice() {
      return this.price * 0.3;
    },
    icon: null,
    actions: [],
    skills: [],
    stats: {
      health: 10,
      deffense: 10,
    },
  },
  5: {
    id: 5,
    name: 'Oaken Shield',
    type: 'armor',
    price: 10,
    get sellPrice() {
      return this.price * 0.3;
    },
    icon: null,
    actions: [],
    skills: ['raise shield'],
    stats: {
      health: 5,
      deffense: 8,
    },
  },
  6: {
    id: 6,
    name: 'Health potion',
    type: 'potion',
    price: 18,
    get sellPrice() {
      return this.price * 0.3;
    },
    icon: null,
    actions: [],
    skills: ['restore health'],
    stats: null,
  },
};

export { gameItems };
