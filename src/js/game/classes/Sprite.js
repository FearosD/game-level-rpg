import EventEmitter from '../../app/EventEmitter';
import { takeImage } from '../../helpers/assets-list';

export default class Sprite extends EventEmitter {
  constructor({ position, imageName, canvas, scale = 1, name = 'no name' }) {
    super();
    this.posX = position.x;
    this.posY = position.y;
    this.scale = scale;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.image = takeImage(imageName);
    this.width = this.image.width;
    this.height = this.image.height;
    this.name = name;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width * this.scale,
      this.height * this.scale
    );
  }

  update() {
    this.draw();
  }

  get saveOptions() {
    return {
      posX: this.posX,
      posY: this.posY,
    };
  }
}
