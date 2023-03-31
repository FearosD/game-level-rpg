export const assetsImagesURL = [
  './assets/images/dungeon/dungeon-map.png',
  './assets/images/village/village-map.png',
  './assets/images/characters/merchant/merchant-idle.png',
  './assets/images/characters/benjamin/benjamin-idle.png',
  './assets/images/characters/eleni/eleni-idle.png',
  './assets/images/characters/player/player-normal/player-idle.png',
  './assets/images/characters/player/player-normal/player-walk-down.png',
  './assets/images/characters/player/player-normal/player-walk-left.png',
  './assets/images/characters/player/player-normal/player-walk-right.png',
  './assets/images/characters/player/player-normal/player-walk-up.png',
  './assets/images/characters/sign/talk-sign.png',
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
