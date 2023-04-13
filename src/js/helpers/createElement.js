export default function createElement(options) {
  const defaultOptions = {
    typeElem: 'div',
    classElem: '',
    innerElem: '',
    id: null,
  };

  const { typeElem, classElem, innerElem, id } = {
    ...defaultOptions,
    ...options,
  };
  const element = document.createElement(typeElem);
  element.className = classElem;
  element.innerHTML = innerElem;
  if (id) element.id = id;
  return element;
}
