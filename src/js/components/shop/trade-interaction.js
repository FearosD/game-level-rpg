import createElement from '../../helpers/createElement';

export default function tradeInteraction() {
  const talkButton = createElement({
    classElem: 'trade-interaction__button',
    innerElem: 'Talk',
    id: 'talk',
  });

  const tradeButton = createElement({
    classElem: 'trade-interaction__button',
    innerElem: 'Trade',
    id: 'trade',
  });

  const tradeInteraction = createElement({ classElem: 'trade-interaction' });

  tradeInteraction.append(talkButton, tradeButton);

  return tradeInteraction;
}
