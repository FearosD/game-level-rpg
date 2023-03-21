export const assetsImagesURL = [
  'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg',
  'https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg',
  'https://wallpapercave.com/wp/wp2670841.jpg',
  '../assets/images/assets/dungeon/dungeon-map.png',
  '../assets/images/bg.png',
];

export const assetsImages = [];

export const takeAsset = (data, name) => {
  const [findAsset] = data.filter((asset) => asset.src.includes(name));
  return findAsset;
};
