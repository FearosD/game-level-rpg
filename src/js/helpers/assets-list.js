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
  './images/ui/cursor.png',
  './images/menu/left-chain.png',
  './images/menu/right-chain.png',
  './images/menu/menu.png',
  './images/menu/menu-load.png',
  './images/menu/input-field.png',
  './images/menu/btn-normal.png',
  './images/menu/btn-hover.png',
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
