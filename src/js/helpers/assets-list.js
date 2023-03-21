export const assetsImagesURL = [
  'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg',
  'https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg',
  'https://wallpapercave.com/wp/wp2670841.jpg',
  './assets/images/dungeon/dungeon-map.png',
  './assets/images/characters/merchant/marchant-idle.png',
  './assets/images/characters/player/player-normal/player-idle.png',
  './assets/images/characters/player/player-normal/player-walk-down.png',
  './assets/images/characters/player/player-normal/player-walk-left.png',
  './assets/images/characters/player/player-normal/player-walk-right.png',
  './assets/images/characters/player/player-normal/player-walk-up.png',
  './assets/images/bg.png',
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
