import createElement from '../../helpers/createElement';

export default function gameMenu() {
  const startButton = createElement({
    classElem: 'game__button',
    innerElem: 'Start',
  });
  const gameMenu = createElement({ classElem: 'game__menu' });

  gameMenu.append(startButton);

  return gameMenu;
}
