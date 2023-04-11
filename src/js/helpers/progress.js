import { Progress } from 'rsup-progress';
import { Howl } from 'howler';

function preloadImage(url, assetData) {
  return new Promise(function (resolve, reject) {
    const result = new Image();
    result.src = url;
    // result.name = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    result.onload = () => resolve(result);
    result.onerror = reject;
  }).then((image) => {
    if (assetData) assetData.push(image);
  });
}

function preloadSound(url, assetData) {
  return new Promise(function (resolve, reject) {
    const result = new Howl({
      src: [url],
      html5: true,
      loop: false,
      volume: 0.5,
      onload: () => resolve(result),
      onloaderror: () => reject,
    });
  }).then((sound) => assetData.push(sound));
}

export function preloadAllImages(imageUrls, assetData) {
  const loadPromises = [];
  for (let i = 0; i < imageUrls.length; ++i) {
    loadPromises.push(preloadImage(imageUrls[i], assetData));
  }
  return Promise.all(loadPromises);
}

function preloadAllSounds(soundUrls, assetData) {
  const loadPromises = [];
  for (let i = 0; i < soundUrls.length; ++i) {
    loadPromises.push(preloadSound(soundUrls[i], assetData));
  }
  return Promise.all(loadPromises);
}

// const response = await progress.promise(Promise.all([fetch('https://jsonplaceholder.typicode.com/comments'), fetch('https://jsonplaceholder.typicode.com/photos')]))

export default function startProgress({
  dataImages,
  assetDataImages,
  dataSounds,
  assetDataSounds,
}) {
  const progress = new Progress({
    container: document.querySelector('.game__loader-bar'),
    className: 'game__loader-progress',
    position: 'none',
    color: 'white',
    height: '12px',
  });

  return progress
    .promise(
      Promise.all([
        preloadAllImages(dataImages, assetDataImages),
        preloadAllSounds(dataSounds, assetDataSounds),
      ])
    )
    .then(() => {});
}
