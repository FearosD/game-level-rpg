import ShopModel from '../game/classes/ShopModel';
import ShopView from '../game/classes/ShopView';

export default class ShopController {
  constructor(gameContainer) {
    this.gameContainer = gameContainer;
    this.shopModel = null;
    this.player = null;
    this.shopView = new ShopView(this.gameContainer);
  }

  createShop({ merchantData, player }) {
    const { name, shopItems } = merchantData;
    this.shopModel = new ShopModel(shopItems);
    this.player = player;
    this.shopView.createShop({ nameMerchant: name, gold: this.playerGold });
    this.shopView.createShopList(this.shopModel.shopItems);
    this.shopView.subscribe('switch label', this.switchLabel);
    this.shopView.subscribe('info item', this.showInfo);
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
    const item = this.shopModel.buyItem(id);
    const price = item.price;
    this.player.gold -= price;
    this.buyPlayerItem(item);
  }

  sellItem(id) {
    const item = this.sellPlayerItem(id);
    const price = item.sellPrice;
    this.player.gold += price;
    this.shopModel.sellItem(item);
  }

  switchLabel = (id) => {
    const items =
      id === 'label-shop' ? this.shopModel.shopItems : this.playerInventory;
    this.shopView.switchLabel();
    this.shopView.createShopList(items);
  };

  showInfo = (id) => {
    const idItem = Number(id.slice(-1));
    const items = this.shopView.isShopLabel
      ? this.shopModel.shopItems
      : this.playerInventory;
    const [findItem] = items.filter((item) => item.id === idItem);
    this.shopView.showInfo(findItem, this.playerGold);
  };
}
