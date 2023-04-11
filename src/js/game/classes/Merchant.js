import Npc from './Npc';
import Shop from './Shop';

export default class Merchant extends Npc {
  constructor({
    position,
    imageName,
    canvas,
    scale,
    maxFrame = 1,
    holdFrame = 1,
    animations,
    name,
    shopItems,
  }) {
    super({
      position,
      imageName,
      canvas,
      scale,
      maxFrame,
      holdFrame,
      animations,
      name,
    });
    this.shopItems = shopItems;
    this.shop = null;
    window.merchant = this;
  }
  createShop() {
    if (this.shop === null) {
      this.shop = new Shop(this.shopItems);
      window.shop = this.shop;
    }
  }
  get saveOptions() {
    return {
      posX: this.posX,
      posY: this.posY,
      canInterraction: this.canInterraction,
      shopItems: this.shop.idItemsStore,
    };
  }
}
