import tradeInteraction from '../components/shop/trade-interaction';
import EventEmitter from './EventEmitter';

export default class TradeInteraction extends EventEmitter {
  constructor(merchantData) {
    super();
    this.tradeInteraction = tradeInteraction();
    this.talkBtn = this.tradeInteraction.querySelector('#talk');
    this.tradeBtn = this.tradeInteraction.querySelector('#trade');
    this.dialogue = merchantData.dialogue;
    this.merchantData = merchantData;
  }
  create() {
    this.talkBtn.addEventListener('click', () => {
      this.emit('talk merchant', this.dialogue);
    });
    this.tradeBtn.addEventListener('click', () => {
      this.emit('trade merchant', this.merchantData);
    });
    return this.tradeInteraction;
  }
  remove = () => {
    this.tradeInteraction.remove();
  };
}
