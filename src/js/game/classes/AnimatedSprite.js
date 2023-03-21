import { takeImage } from '../../helpers/assets-list';
import Sprite from './Sprite';

export default class AnimatedSprite extends Sprite {
  constructor({
    position,
    imageName,
    ctx,
    scale,
    maxFrame = 1,
    holdFrame = 1,
    animations,
  }) {
    super({ position, imageName, ctx, scale });
    this.maxFrame = maxFrame;
    this.currentFrame = 0;
    this.elapseFrame = 0;
    this.holdFrame = holdFrame;
    this.animations = animations;

    if (this.animations) {
      for (let key in this.animations) {
        const imageName = this.animations[key].imageName;
        const image = takeImage(imageName);
        this.animations[key].image = image;
      }
    }
  }

  switchState(state) {
    if (this.image === this.animations[state].image) return;
    this.currentFrame = 0;
    this.elapseFrame = 0;
    this.image = this.animations[state].image;
    this.maxFrame = this.animations[state].maxFrame;
    this.holdFrame = this.animations[state].holdFrame;
    this.width = this.animations[state].image.width;
    this.height = this.animations[state].image.height;
  }

  draw() {
    const crop = {
      position: {
        x: (this.width / this.maxFrame) * this.currentFrame,
        y: 0,
      },
      width: this.width / this.maxFrame,
      height: this.height,
    };

    this.ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.posX,
      this.posY,
      (this.width / this.maxFrame) * this.scale,
      this.height * this.scale
    );
  }

  update() {
    this.draw();
    this.elapseFrame += 1;
    if (this.elapseFrame % this.holdFrame === 0) {
      if (this.currentFrame < this.maxFrame - 1) {
        this.currentFrame += 1;
      } else {
        this.currentFrame = 0;
      }
    }
    if (this.elapseFrame === 10000) this.elapseFrame = 0;
  }
}
