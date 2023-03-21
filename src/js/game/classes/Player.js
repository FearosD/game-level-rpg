import AnimatedSprite from './AnimatedSprite';

export default class Player extends AnimatedSprite {
  constructor({
    position,
    imageName,
    ctx,
    scale,
    maxFrame = 1,
    holdFrame = 1,
    animations,
    currentPosition = [1, 1],
  }) {
    super({ position, imageName, ctx, scale, maxFrame, holdFrame, animations });

    this.collisionBox = {
      x: this.posX + 24,
      y: this.posY + 48,
      height: 48,
      width: 48,
    };

    this.currentPosition = currentPosition;
  }

  draw() {
    super.draw();

    this.ctx.fillStyle = 'rgba(0,255,0,0.3)';
    this.ctx.fillRect(
      this.collisionBox.x,
      this.collisionBox.y,
      this.collisionBox.width,
      this.collisionBox.height
    );
    this.ctx.fill();
  }
}
