import createElement from '../../helpers/createElement';

export default function playerGold() {
  const playerGold = createElement({
    classElem: 'gold',
    innerElem: `<div class="gold__icon"></div>
                <div class="gold__value">0</div>`,
  });

  return playerGold;
}
