export const assetsImagesURL = [
  './assets/dungeon/dungeon-map.png',
  './assets/village/village-map.png',
  './assets/characters/merchant/merchant-idle.png',
  './assets/characters/benjamin/benjamin-idle.png',
  './assets/characters/eleni/eleni-idle.png',
  './assets/characters/player/player-normal/player-idle.png',
  './assets/characters/player/player-normal/player-walk-down.png',
  './assets/characters/player/player-normal/player-walk-left.png',
  './assets/characters/player/player-normal/player-walk-right.png',
  './assets/characters/player/player-normal/player-walk-up.png',
  './assets/characters/sign/talk-sign.png',
];

export const stylesInitialImagesURL = [
  './images/menu/cursor.png',
  './images/menu/left-chain.png',
  './images/menu/right-chain.png',
  './images/menu/menu.png',
  './images/menu/menu-load.png',
  './images/menu/input-field.png',
  './images/menu/btn-normal.png',
  './images/menu/btn-hover.png',
];

export const stylesImagesURL = [
  './images/setting/btn-sound-normal.png',
  './images/setting/btn-sound-hover.png',
  './images/setting/btn-setting-normal.png',
  './images/setting/btn-setting-hover.png',
  './images/setting/btn-character-normal.png',
  './images/setting/btn-character-hover.png',
  './images/menu/menu-save.png',
  './images/menu/menu-transition.png',
  './images/dialogue/avatar-bg.png',
  './images/dialogue/player-avatar.png',
  './images/dialogue/name-right.png',
  './images/dialogue/name-left.png',
  './images/dialogue/name-center.png',
  './images/dialogue/merchant-avatar.png',
  './images/dialogue/benjamin-avatar.png',
  './images/dialogue/eleni-avatar.png',
  './images/dialogue/dlg-shape-top.png',
  './images/dialogue/dlg-shape-mid.png',
  './images/dialogue/dlg-shape-bot.png',
  './images/dialogue/btn-nxt-n.png',
  './images/dialogue/btn-nxt-h.png',
  './images/shop/trade-shape.png',
  './images/items/icon-armor.png',
  './images/items/icon-attack.png',
  './images/items/icon-axe.png',
  './images/items/icon-deffense.png',
  './images/items/icon-potion.png',
  './images/items/icon-price.png',
  './images/items/icon-shield.png',
  './images/items/icon-spear.png',
  './images/items/icon-staff.png',
  './images/items/item-bg.png',
  './images/shop/menu-item-bot.png',
  './images/shop/menu-item-mid.png',
  './images/shop/menu-item-top.png',
  './images/shop/menu-shop.png',
  './images/shop/trade-shape.png',
  './images/shop/icon-gold.png',
  './images/shop/gold-bg.png',
  './images/shop/shop-bg.png',
  './images/items/icon-health.png',
  './images/shop/btn-exit-n.png',
  './images/shop/btn-exit-h.png',
];

export const assetsSoundURL = [
  './assets/sounds/39_Block_03.wav',
  './assets/sounds/55_Encounter_02.wav',
];

export const assetsImages = [];
export const assetsSounds = [];

export const takeImage = (name) => {
  const [findAsset] = assetsImages.filter((asset) => asset.src.includes(name));
  return findAsset;
};

export const takeSound = (name) => {
  const [findAsset] = assetsSounds.filter((asset) => asset._src.includes(name));
  return findAsset;
};
