import { gameItems } from '../entitys/game-items';

export default class Shop {
  constructor(idItems) {
    this.idItems = idItems;
    this.store = [];
    this.createStore();
  }
  createStore() {
    this.idItems.forEach((id) => {
      this.store.push(gameItems?.[id]);
    });
  }

  getStore() {
    console.log(this.store);
    return this.store;
  }

  get idItemsStore() {
    return this.store.map((item) => item.id);
  }

  buyItem(id) {
    const [item] = this.store.filter((item) => item.id === id);
    this.store = this.store.filter((item) => item.id !== id);
    return item;
  }

  sellItem(item) {
    this.store.push(item);
    return this.store;
  }
}
