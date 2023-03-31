import dialogueUI from '../components/dialogue/dialogue-ui';
import createElement from '../helpers/createElement';
import EventEmitter from './EventEmitter';

export default class Dialogue extends EventEmitter {
  constructor(dialogueData) {
    super();
    this.dialogueData = dialogueData;
    this.dialogue = dialogueUI();

    this.playerCharacter = this.dialogue.querySelector(
      '.dialogue__character--player'
    );
    this.npcCharacter = this.dialogue.querySelector(
      '.dialogue__character--npc'
    );
    this.npcName = this.dialogue.querySelector(
      '.dialogue__character--npc .dialogue__name'
    );
    this.dialogueShape = this.dialogue.querySelector('.dialogue__shape');
    this.dialogueMsg = this.dialogue.querySelector('.dialogue__text');
    this.nextBtn = this.dialogue.querySelector('.dialogue__btn');
  }

  createDialogue() {
    const nameNpc = this.dialogueData.npc;
    this.npcCharacter.classList.add(`dialogue__character--${nameNpc}`);
    this.npcName.textContent = nameNpc;
    this.goNextMessage('start');
    return this.dialogue;
  }

  switchPlayerAvatarOff() {
    this.playerCharacter.classList.add('disabled');
    this.npcCharacter.classList.remove('disabled');
  }

  switchPlayerAvatarOn() {
    this.npcCharacter.classList.add('disabled');
    this.playerCharacter.classList.remove('disabled');
  }

  activeNextBtn(nextMsg) {
    this.nextBtn.classList.remove('disabled');
    this.nextBtn.addEventListener('click', () => {
      this.goNextMessage(nextMsg);
    });
  }

  activeAnswers(answers) {
    this.nextBtn.classList.add('disabled');
    answers.forEach((answer) => this.createAnswer(answer));
  }

  createAnswer(answer) {
    const answerElem = createElement({
      classElem: 'dialogue__text dialogue__text--answer',
      innerElem: answer.text,
    });
    this.dialogueShape.append(answerElem);
    answerElem.addEventListener('click', () => {
      this.goNextMessage(answer.next);
    });
  }

  removeAnswers() {
    const answers = this.dialogueShape.querySelectorAll(
      '.dialogue__text--answer'
    );
    if (answers.length > 0) answers.forEach((answer) => answer.remove());
  }

  goNextMessage(messageId) {
    const message = this.dialogueData[messageId];
    const { name, next, text, answers } = message;
    name === 'player'
      ? this.switchPlayerAvatarOn()
      : this.switchPlayerAvatarOff();
    this.dialogueMsg.textContent = text;
    const hasAnswer = answers.length > 0;
    this.removeAnswers();
    if (messageId === 'final') {
      this.endDialogue();
      return;
    }
    if (hasAnswer) {
      this.activeAnswers(answers);
    } else {
      this.activeNextBtn(next);
    }
  }

  endDialogue() {
    this.nextBtn.classList.remove('disabled');
    this.nextBtn.addEventListener('click', () => {
      this.emit('end dialogue');
    });
  }

  remove() {
    this.dialogue.remove();
    return;
  }
}
