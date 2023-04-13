import createElement from '../../helpers/createElement';

export default function shopItem({ id, type, description }) {
  const shopItem = createElement({
    classElem: 'menu__item',
    innerElem: `<div class="menu__icon menu__icon--${type}"></div>
                <div class="menu__description">${description}</div>`,
    id: `item-${id}`,
  });

  return shopItem;
}
