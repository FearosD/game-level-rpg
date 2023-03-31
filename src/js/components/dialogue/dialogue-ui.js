import createElement from '../../helpers/createElement';

export default function dialogueUI() {
  const diaologue = createElement({ classElem: 'dialogue' });
  const diaologueCharacterPlayer = createElement({
    classElem: 'dialogue__character dialogue__character--player',
  });
  const diaologueCharacterNpc = createElement({
    classElem: 'dialogue__character dialogue__character--npc',
  });
  const diaologueAvatarPlayer = createElement({
    classElem: 'dialogue__avatar',
  });
  const diaologueAvatarNpc = createElement({ classElem: 'dialogue__avatar' });
  const diaologueNamePlayer = createElement({
    classElem: 'dialogue__name',
    innerElem: 'Kris',
  });
  const diaologueNameNpc = createElement({
    classElem: 'dialogue__name',
    innerElem: 'Npc',
  });
  const diaologueShape = createElement({ classElem: 'dialogue__shape' });
  const diaologueBtn = createElement({ classElem: 'dialogue__btn' });
  const diaologueText = createElement({ classElem: 'dialogue__text' });

  diaologueCharacterPlayer.append(diaologueAvatarPlayer, diaologueNamePlayer);
  diaologueCharacterNpc.append(diaologueAvatarNpc, diaologueNameNpc);

  diaologueShape.append(diaologueBtn, diaologueText);

  diaologue.append(
    diaologueCharacterPlayer,
    diaologueCharacterNpc,
    diaologueShape
  );

  return diaologue;
}
