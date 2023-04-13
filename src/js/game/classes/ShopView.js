import EventEmitter from '../../app/EventEmitter';
import closeButton from '../../components/shop/close-button';
import infoButton from '../../components/shop/info-button';
import infoItem from '../../components/shop/info-item';
import infoStats from '../../components/shop/info-stats';
import infoStatsWrapper from '../../components/shop/info-stats-wrapper';
import merchantAvatar from '../../components/shop/merchant-avatar';
import playerGold from '../../components/shop/player-gold';
import shopItem from '../../components/shop/shop-item';
import shopMenu from '../../components/shop/shop-menu';
import shopWarpper from '../../components/shop/shop-wrapper';

export default class ShopView extends EventEmitter {
  constructor(gameContainer) {
    super();
    this.gameContainer = gameContainer;
    this.shopWrapper = shopWarpper();
    this.merchantAvatar = null;
    this.infoItem = infoItem();
    this.playerGold = playerGold();
    this.goldValue = null;
    this.shopMenu = shopMenu();
    this.isShopLabel = true;
    this.labels = null;
    this.itemsWrapper = null;
    this.infoText = null;
    this.closeButton = closeButton();
  }

  createShop({ nameMerchant, gold }) {
    this.merchantAvatar = merchantAvatar(nameMerchant);
    this.goldValue = this.playerGold.querySelector('.gold__value');
    this.setPlayerGold(gold);

    this.shopWrapper.append(
      this.shopMenu,
      this.infoItem,
      this.playerGold,
      this.merchantAvatar,
      this.closeButton
    );
    this.gameContainer.append(this.shopWrapper);

    this.initSelectors();
    this.labelsHandlers();
    this.closeHandler();

    this.clearInfo();

    return this.shopWrapper;
  }

  initSelectors() {
    this.labels = this.shopMenu.querySelectorAll('.menu__label');
    this.itemsWrapper = this.shopMenu.querySelector('.menu__items');
    this.infoText = this.infoItem.querySelector('.info__text');
  }

  switchLabel() {
    this.isShopLabel = !this.isShopLabel;
    this.labels.forEach((label) =>
      label.classList.toggle('menu__label--active')
    );
    this.clearInfo();
  }

  clearInfo() {
    const text = this.isShopLabel
      ? 'What did you like?'
      : 'Do you want to sell something?';
    if (this.infoItem.childNodes.length > 1) {
      this.infoText = this.infoText.cloneNode();
      this.removeChildren(this.infoItem);
      this.infoItem.append(this.infoText);
    }
    this.infoText.textContent = text;
  }

  labelsHandlers() {
    this.labels.forEach((label) => {
      label.addEventListener('click', () => {
        this.emit(`switch label`, label.id);
      });
    });
  }

  itemsHandlers(item) {
    item.addEventListener('click', () => {
      const prevItem = this.itemsWrapper.querySelector('.menu__item--active');
      if (prevItem) {
        if (prevItem.id === item.id) return;
        prevItem.classList.remove('menu__item--active');
      }
      item.classList.add('menu__item--active');
      this.emit('info item', item.id);
    });
  }

  createShopList(items) {
    if (this.itemsWrapper.childNodes.length > 0) {
      this.removeChildren(this.itemsWrapper);
    }
    if (items.length === 0) return;
    items.forEach((item) => {
      const { id, icon, description } = item;
      const newItem = shopItem({ id, icon, description });
      this.itemsHandlers(newItem);
      this.itemsWrapper.append(newItem);
    });
  }

  showInfo(item, playerGold) {
    this.clearInfo();
    const { id, stats, name } = item;
    const statsWrapper = infoStatsWrapper();

    for (const stat in stats) {
      const newStat = infoStats(stat, stats[stat]);
      statsWrapper.append(newStat);
    }

    const typePrice = this.isShopLabel ? 'price' : 'sell price';
    const priceValue = item[typePrice];
    const price = infoStats(typePrice, priceValue);
    statsWrapper.append(price);

    const typeButton = this.isShopLabel ? 'buy' : 'sell';
    const button = infoButton(typeButton);
    if (this.isShopLabel && priceValue > playerGold) {
      button.classList.add('disabled');
    }
    button.addEventListener('click', () => {
      this.emit('deal trade', { id, type: button.id });
    });

    this.infoText.textContent = name;
    this.infoItem.append(statsWrapper, button);
  }

  removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  setPlayerGold(value) {
    this.goldValue.textContent = value;
  }

  updateShop(items, playerGold) {
    this.clearInfo();
    this.createShopList(items);
    this.setPlayerGold(playerGold);
  }

  closeHandler() {
    this.closeButton.addEventListener('click', () => {
      this.emit('close shop');
    });
  }

  async remove() {
    this.shopWrapper.classList.add('shop--out');
    await setTimeout(() => {
      this.shopWrapper.remove();
    }, 1000);
  }
}
