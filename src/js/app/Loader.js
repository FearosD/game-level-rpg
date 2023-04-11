import gameLoader from '../components/loader/game-loader';
import startProgress from '../helpers/progress';
import {
  assetsImagesURL,
  assetsImages,
  assetsSoundURL,
  assetsSounds,
  stylesImagesURL,
} from '../helpers/assets-list';

export default class Loader {
  constructor() {
    this.gameLoader = gameLoader();
  }
  createLoader() {
    return this.gameLoader;
  }
  async start() {
    // console.log('start loading');
    await startProgress({
      dataImages: assetsImagesURL,
      assetDataImages: assetsImages,
      dataSounds: assetsSoundURL,
      assetDataSounds: assetsSounds,
      styleDataImages: stylesImagesURL,
    });
    // console.log(assetsImages);
    // console.log(assetsImages[0].attributes.name.value);
  }
}
