import AnimatedSprite from './AnimatedSprite';

export default class Player extends AnimatedSprite {
  constructor({
    position,
    imageName,
    canvas,
    scale,
    maxFrame = 1,
    holdFrame = 1,
    animations,
    currentPosition = [1, 1],
    name,
    gold = 100,
  }) {
    super({
      position,
      imageName,
      canvas,
      scale,
      maxFrame,
      holdFrame,
      animations,
      name,
    });
    this.defaultPosition = {
      posX: this.canvas.width / 2 - 42,
      posY: this.canvas.height / 2 - 24,
    };
    this.collisionBox = {
      x: this.posX + 24,
      y: this.posY + 48,
      height: 48,
      width: 48,
    };

    this.gold = gold;
    this.inventory = [];

    this.currentPosition = currentPosition;
    // this.saveOptions = {
    //   posX: this.posX,
    //   posY: this.posY,
    //   currentPosition: this.currentPosition,
    // };
  }

  draw() {
    super.draw();

    // this.ctx.fillStyle = 'rgba(0,255,0,0.3)';
    // this.ctx.fillRect(
    //   this.collisionBox.x,
    //   this.collisionBox.y,
    //   this.collisionBox.width,
    //   this.collisionBox.height
    // );
    // this.ctx.fill();
  }

  get saveOptions() {
    return {
      posX: this.posX,
      posY: this.posY,
      currentPosition: this.currentPosition,
      gold: this.gold,
      inventory: this.inventory,
    };
  }
}
