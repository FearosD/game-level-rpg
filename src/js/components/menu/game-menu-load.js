import createElement from '../../helpers/createElement';

export default function gameMenuLoad() {
  const loadButton = createElement({
    classElem: 'game__button',
    innerElem: 'Load',
    id: 'btn-get-load',
  });
  const loadText = createElement({
    typeElem: 'span',
    innerElem: 'Enter the save ID',
  });
  const loadInput = createElement({
    typeElem: 'input',
    classElem: 'game__input',
    id: 'load-input',
  });
  const loadContent = createElement({ classElem: 'game__load-content' });
  const leftChain = createElement({ classElem: 'left-chain' });
  const rightChain = createElement({ classElem: 'right-chain' });
  const gameLoad = createElement({ classElem: 'game__load' });

  loadInput.type = 'text';
  loadInput.name = 'load-input';
  loadInput.autocomplete = 'off';
  loadInput.setAttribute('maxlength', '8');

  loadContent.append(loadText, loadInput, loadButton);
  gameLoad.append(leftChain, rightChain, loadContent);

  return gameLoad;
}
