import { takeImage } from '../../helpers/assets-list';

export default class Sprite {
  constructor({ position, imageName, ctx, scale = 1 }) {
    this.posX = position.x;
    this.posY = position.y;
    this.scale = scale;
    this.ctx = ctx;
    this.image = takeImage(imageName);
    this.width = this.image.width;
    this.height = this.image.height;
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
}
