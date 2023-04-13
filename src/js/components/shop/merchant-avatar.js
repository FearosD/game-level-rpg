import createElement from '../../helpers/createElement';

export default function merchantAvatar(merchantName) {
  const merchantAvatar = createElement({
    classElem: 'character',
    innerElem: `<div class="character__avatar character__avatar--${merchantName}"></div>`,
  });

  return merchantAvatar;
}
