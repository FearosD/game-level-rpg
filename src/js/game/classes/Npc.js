import dialogues from '../levels/dialogues';
import AnimatedSprite from './AnimatedSprite';
import Sprite from './Sprite';

export default class Npc extends AnimatedSprite {
  constructor({
    position,
    imageName,
    canvas,
    scale,
    maxFrame = 1,
    holdFrame = 1,
    animations,
    name,
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
    this.interactionPositions = [];
    this.caninteraction = false;
    this.interactionSign = new Sprite({
      position: {
        x: this.posX + 34,
        y: this.posY - 12,
      },
      imageName: 'talk-sign',
      scale: 1,
      canvas: this.canvas,
    });

    this.dialogue = dialogues[this.name];

    this.canvasRect = this.canvas.getBoundingClientRect();

    this.handler = this.interactionHanlder.bind(this);
    this.canvas.addEventListener('click', this.handler);
  }
  draw() {
    super.draw();
    if (this.caninteraction) this.interactionSign.draw();
  }

  update() {
    super.update();
    this.interactionSign.posX = this.posX + 34;
    this.interactionSign.posY = this.posY - 12;
  }

  interactionHanlder(event) {
    if (!this.caninteraction) return;
    const mouseX = event.clientX - this.canvasRect.left;
    const mouseY = event.clientY - this.canvasRect.top;
    if (
      mouseX >= this.posX + 24 &&
      mouseX <= this.posX + 24 + 48 &&
      mouseY >= this.posY &&
      mouseY <= this.posY + this.height * this.scale
    ) {
      console.log('interaction npc');
      this.emit(`dialogue ${this.name}`, this.dialogue);
    }
  }

  removeinteraction = () => {
    this.canvas.removeEventListener('click', this.handler);
  };

  get saveOptions() {
    return {
      posX: this.posX,
      posY: this.posY,
      caninteraction: this.caninteraction,
    };
  }
}
