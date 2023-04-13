import createElement from '../../helpers/createElement';

export default function infoItem() {
  const infoItem = createElement({
    classElem: 'info',
    innerElem: `<div class="info__text">Info text</div>`,
  });

  return infoItem;
}
