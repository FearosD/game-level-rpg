import gameTransition from '../components/menu/game-menu-transition';
import EventEmitter from './EventEmitter';

export default class MenuTransition extends EventEmitter {
  constructor(targetTransition) {
    super();
    this.gameTransition = gameTransition();
    this.targetTransition = targetTransition;
    this.acceptBtn = this.gameTransition.querySelector('#btn-accept');
    this.cancelBtn = this.gameTransition.querySelector('#btn-cancel');
    this.text = this.gameTransition.querySelector(
      '.game__transition-content span'
    );
  }
  createTransition() {
    this.text.textContent = `Move to the ${this.targetTransition}?`;
    this.acceptBtn.addEventListener('click', () => {
      this.emit('accept transition', this.targetTransition);
    });
    this.cancelBtn.addEventListener('click', () => {
      this.emit('cancel transition');
    });
    return this.gameTransition;
  }
  remove = async () => {
    await setTimeout(async () => {
      await this.gameTransition.remove();
    }, 1000);
    return;
  };
}
