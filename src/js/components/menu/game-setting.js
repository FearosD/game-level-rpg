import createElement from '../../helpers/createElement';

export default function gameSetting() {
  const gameSetting = createElement({ classElem: 'game__setting' });
  const btnSound = createElement({
    classElem: 'game__button-setting',
    id: 'btn-sound',
  });
  const btnSetting = createElement({
    classElem: 'game__button-setting',
    id: 'btn-setting',
  });

  gameSetting.append(btnSound, btnSetting);

  return gameSetting;
}
