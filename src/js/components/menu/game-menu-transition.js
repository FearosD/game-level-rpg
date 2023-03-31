import createElement from '../../helpers/createElement';

export default function gameTransition() {
  const acceptButton = createElement({
    classElem: 'game__button',
    innerElem: 'Yes',
    id: 'btn-accept',
  });
  const cancelButton = createElement({
    classElem: 'game__button',
    innerElem: 'No',
    id: 'btn-cancel',
  });
  const gameButtons = createElement({ classElem: 'game__buttons' });
  const leftChain = createElement({ classElem: 'left-chain' });
  const rightChain = createElement({ classElem: 'right-chain' });
  const transitionContent = createElement({
    classElem: 'game__transition-content',
    innerElem: '<span></span>',
  });
  const gameTransition = createElement({ classElem: 'game__transition' });

  gameButtons.append(acceptButton, cancelButton);
  transitionContent.append(gameButtons);
  gameTransition.append(leftChain, rightChain, transitionContent);

  return gameTransition;
}
