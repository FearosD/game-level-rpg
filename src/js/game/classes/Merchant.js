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

  interractionHanlder = (event) => {
    if (!this.canInterraction) return;
    const mouseX = event.clientX - this.canvasRect.left;
    const mouseY = event.clientY - this.canvasRect.top;
    if (
      mouseX >= this.posX + 24 &&
      mouseX <= this.posX + 24 + 48 &&
      mouseY >= this.posY &&
      mouseY <= this.posY + this.height * this.scale
    ) {
      this.emit(`trade ${this.name}`, this);
    }
  };

  get saveOptions() {
    return {
      posX: this.posX,
      posY: this.posY,
      canInterraction: this.canInterraction,
      shopItems: this.shop.idItemsStore,
    };
  }
}
