import dialogueUI from '../components/dialogue/dialogue-ui';
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
  }

  createDialogue() {
    console.log(this.dialogueData);
    const name = this.dialogueData.npc;
    this.npcCharacter.classList.add(`dialogue__character--${name}`);
    this.npcName.textContent = name;
    return this.dialogue;
  }
}

/*
 <div class="dialogue">
<div class="dialogue__character dialogue__character--player disabled">
    <div class="dialogue__avatar"></div>
    <div class="dialogue__name">Player</div>
</div>
<div class="dialogue__character dialogue__character--npc dialogue__character--Benjamin">
    <div class="dialogue__avatar"></div>
    <div class="dialogue__name">Benjamin</div>
</div>
<div class="dialogue__shape">
    <div class="dialogue__btn"></div>
    <div class="dialogue__text">I understand that this is not an easy decision. But here not only our
        village is in danger, but also the whole neighborhood. Please consider your decision as soon as
        possible.</div>
    <div class="dialogue__text dialogue__text--answer">Of course, I am ready to help.</div>
    <div class="dialogue__text dialogue__text--answer">I need to think.</div>
</div>
</div>

*/
