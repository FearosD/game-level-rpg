import gameLoader from '../components/loader/game-loader';
import startProgress from '../helpers/progress';
import { assetsImagesURL, assetsImages } from '../helpers/assets-list';

export default class Loader {
  constructor() {
    this.gameLoader = gameLoader();
  }
  createLoader() {
    return this.gameLoader;
  }
  async start() {
    // console.log('start loading');
    await startProgress(assetsImagesURL, assetsImages);
    // console.log(assetsImages);
    // console.log(assetsImages[0].attributes.name.value);
  }
}
