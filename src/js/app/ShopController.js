import ShopModel from '../game/classes/ShopModel';
import ShopView from '../game/classes/ShopView';
import EventEmitter from './EventEmitter';

export default class ShopController extends EventEmitter {
  constructor(gameContainer) {
    super();
    this.gameContainer = gameContainer;
    this.shopModel = null;
    this.player = null;
    this.shopView = null;
    this.merchantName = null;
  }

  createShop({ merchantData, player }) {
    const { name, shopItems } = merchantData;
    this.shopModel = new ShopModel(shopItems);
    this.shopView = new ShopView(this.gameContainer);
    this.player = player;
    this.merchantName = name;
    this.shopView.createShop({ nameMerchant: name, gold: this.playerGold });
    this.shopView.createShopList(this.shopModel.shopItems);
    this.shopView.subscribe('switch label', this.switchLabel);
    this.shopView.subscribe('info item', this.showInfo);
    this.shopView.subscribe('deal trade', this.startTrade);
    this.shopView.subscribe('close shop', this.closeShop);
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
    this.shopView.updateShop(this.shopModel.shopItems, this.playerGold);
  }

  sellItem(id) {
    const item = this.sellPlayerItem(id);
    const price = item['sell price'];
    this.player.gold += price;
    this.shopModel.sellItem(item);
    this.shopView.updateShop(this.playerInventory, this.playerGold);
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

  startTrade = (tradeData) => {
    const { id, type } = tradeData;
    const [typeDeal] = type.split('-');
    return typeDeal === 'buy' ? this.buyItem(id) : this.sellItem(id);
  };

  closeShop = () => {
    this.emit('close shop', {
      merchantName: this.merchantName,
      idShopItems: this.shopModel.idItemsStore,
    });
  };

  offShop() {
    this.shopView.remove();

    this.shopView.unsubscribe('switch label', this.switchLabel);
    this.shopView.unsubscribe('info item', this.showInfo);
    this.shopView.unsubscribe('deal trade', this.startTrade);
    this.shopView.unsubscribe('close shop', this.closeShop);

    this.shopModel = null;
    this.shopView = null;
    this.player = null;
    this.merchantName = null;
  }
}
