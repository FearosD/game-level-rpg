import createElement from '../../helpers/createElement';

export default function gameMenu() {
  const startButton = createElement({
    classElem: 'game__button',
    innerElem: 'Start',
    id: 'btn-start',
  });
  const loadButton = createElement({
    classElem: 'game__button',
    innerElem: 'Load',
    id: 'btn-load',
  });
  const saveButton = createElement({
    classElem: 'game__button disabled',
    innerElem: 'Save',
    id: 'btn-save',
  });
  const gameButtons = createElement({ classElem: 'game__buttons' });
  const leftChain = createElement({ classElem: 'left-chain' });
  const rightChain = createElement({ classElem: 'right-chain' });
  const gameMenu = createElement({ classElem: 'game__menu' });

  gameButtons.append(startButton, saveButton, loadButton);
  gameMenu.append(leftChain, rightChain, gameButtons);

  return gameMenu;
}
