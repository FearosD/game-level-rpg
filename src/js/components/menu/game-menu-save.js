import createElement from '../../helpers/createElement';

export default function gameMenuSave() {
  const saveButton = createElement({
    classElem: 'game__button',
    innerElem: 'Save',
    id: 'btn-post-save',
  });
  const saveText = createElement({
    typeElem: 'span',
    innerElem:
      'Come up with and remember the save ID<br>You will need it to load the save',
  });
  const saveInput = createElement({
    typeElem: 'input',
    classElem: 'game__input',
    id: 'save-input',
  });
  const saveContent = createElement({ classElem: 'game__save-content' });
  const leftChain = createElement({ classElem: 'left-chain' });
  const rightChain = createElement({ classElem: 'right-chain' });
  const gameSave = createElement({ classElem: 'game__save' });

  saveInput.type = 'text';
  saveInput.name = 'save-input';
  saveInput.autocomplete = 'off';
  saveInput.setAttribute('maxlength', '8');

  saveContent.append(saveText, saveInput, saveButton);
  gameSave.append(leftChain, rightChain, saveContent);

  return gameSave;
}
