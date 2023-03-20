import createElement from '../../helpers/createElement';

export default function gameLoader() {
  const loaderContainer = createElement({
    classElem: 'game__loader-container',
  });
  const loaderText = createElement({
    classElem: 'game__loader-text',
    innerElem: 'Loading...',
  });
  const loaderBar = createElement({ classElem: 'game__loader-bar' });
  //   const loaderProgress = createElement({ classElem: 'game__loader-progress' });
  //   loaderBar.append(loaderProgress);
  loaderContainer.append(loaderText, loaderBar);

  return loaderContainer;
}
