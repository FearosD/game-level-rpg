import createElement from '../../helpers/createElement';

export default function shopItem({ id, icon, description }) {
  const shopItem = createElement({
    classElem: 'menu__item',
    innerElem: `<div class="menu__icon menu__icon--${icon}"></div>
                <div class="menu__description">${description}</div>`,
    id: `item-${id}`,
  });

  return shopItem;
}
