import createElement from '../../helpers/createElement';

export default function closeButton() {
  const closeButton = createElement({
    classElem: 'button-close',
    id: 'close-shop',
  });

  return closeButton;
}
