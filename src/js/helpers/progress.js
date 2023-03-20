import { Progress } from 'rsup-progress';

function preloadImage(url, assetData) {
  return new Promise(function (resolve, reject) {
    var result = new Image();
    result.src = url;
    // result.name = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    result.onload = () => resolve(result);
    result.onerror = reject;
  }).then((image) => assetData.push(image));
}

function preloadAllImages(imageUrls, assetData) {
  var loadPromises = [];
  for (var i = 0; i < imageUrls.length; ++i) {
    loadPromises.push(preloadImage(imageUrls[i], assetData));
  }
  return Promise.all(loadPromises);
}

// const response = await progress.promise(Promise.all([fetch('https://jsonplaceholder.typicode.com/comments'), fetch('https://jsonplaceholder.typicode.com/photos')]))

export default function startProgress(data, assetData) {
  const progress = new Progress({
    container: document.querySelector('.game__loader-bar'),
    className: 'game__loader-progress',
    position: 'none',
    color: 'white',
    height: '12px',
  });

  return progress.promise(preloadAllImages(data, assetData)).then(() => {});
}
