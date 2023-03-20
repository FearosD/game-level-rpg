export default function createElement(options) {
  const defaultOptions = {
    typeElem: 'div',
    classElem: 'class',
    innerElem: '',
  };

  const { typeElem, classElem, innerElem } = { ...defaultOptions, ...options };
  const element = document.createElement(typeElem);
  element.className = classElem;
  element.innerHTML = innerElem;
  return element;
}
