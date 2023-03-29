import dialogues from '../levels/dialogues';
import AnimatedSprite from './AnimatedSprite';
import Sprite from './Sprite';

export default class Npc extends AnimatedSprite {
  constructor(
    position,
    imageName,
    canvas,
    scale,
    maxFrame = 1,
    holdFrame = 1,
    animations,
    name
  ) {
    super(
      position,
      imageName,
      canvas,
      scale,
      maxFrame,
      holdFrame,
      animations,
      name
    );
    this.interractionPositions = [];
    this.canInterraction = false;
    this.interractionSign = new Sprite({
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

    this.canvas.addEventListener('click', this.interractionHanlder);
  }
  draw() {
    super.draw();
    if (this.canInterraction) this.interractionSign.draw();
  }

  update() {
    super.update();
    this.interractionSign.posX = this.posX + 34;
    this.interractionSign.posY = this.posY - 12;
  }

  interractionHanlder = (event) => {
    if (!this.canInterraction) return;
    const mouseX = event.clientX - this.canvasRect.left;
    const mouseY = event.clientY - this.canvasRect.top;
    if (
      mouseX >= this.posX + 24 &&
      mouseX <= this.posX + 24 + 48 &&
      mouseY >= this.posY &&
      mouseY <= this.posY + this.height * this.scale
    ) {
      // this.emit('dialogue-npc', this.dialogue);
    }
  };
}
