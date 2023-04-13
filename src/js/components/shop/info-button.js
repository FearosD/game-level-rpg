import createElement from '../../helpers/createElement';

export default function infoButton(type) {
  const text = type[0].toUpperCase() + type.slice(1);
  const infoButton = createElement({
    classElem: 'info__button',
    id: `${type}-button`,
    innerElem: text,
  });

  return infoButton;
}
