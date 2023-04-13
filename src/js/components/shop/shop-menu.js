import createElement from '../../helpers/createElement';

export default function shopMenu() {
  const shopMenu = createElement({
    classElem: 'menu',
    innerElem: `<div class="menu__label menu__label--active" id="label-shop">Shop</div>
                <div class="menu__label" id="label-inventory">Inventory</div>
                <div class="menu__items"></div>`,
  });

  return shopMenu;
}
