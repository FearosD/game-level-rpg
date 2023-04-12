import ShopModel from '../game/classes/ShopModel';

export default class ShopController {
  constructor() {
    this.shop = null;
    this.player = null;
  }

  createShop({ shopItems, player }) {
    this.shop = new ShopModel(shopItems);
    this.player = player;
  }

  get playerGold() {
    return this.player.gold;
  }

  get playerInventory() {
    return this.player.inventory;
  }

  sellPlayerItem(id) {
    const [item] = this.player.inventory.filter((item) => item.id === id);
    this.player.inventory = this.player.inventory.filter(
      (item) => item.id !== id
    );
    return item;
  }

  buyPlayerItem(item) {
    this.player.inventory.push(item);
  }

  buyItem(id) {
    const item = this.shop.buyItem(id);
    const price = item.price;
    this.player.gold -= price;
    this.buyPlayerItem(item);
  }

  sellItem(id) {
    const item = this.sellPlayerItem(id);
    const price = item.sellPrice;
    this.player.gold += price;
    this.shop.sellItem(item);
  }
}
