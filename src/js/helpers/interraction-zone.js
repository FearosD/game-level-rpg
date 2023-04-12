const createInterractionPosition = (object, map) => {
  if (!object.hasOwnProperty('canInterraction')) return;
  let arrayPositions = [];
  for (let x = 0; x <= 2; x += 1) {
    const row = [];
    for (let y = 0; y <= 1; y += 1) {
      if ((x === 1) & (y === 0)) continue;
      const posX = object.posX + x * 48;
      const posY = object.posY + 48 + y * 48;
      const endX = Math.floor(
        (map.posX <= 0
          ? Math.abs(map.posX) + posX
          : posX - Math.abs(map.posX)) / 48
      );
      const endY = Math.floor(
        (map.posY <= 0
          ? Math.abs(map.posY) + posY
          : posY - Math.abs(map.posY)) / 48
      );
      const position = [endX, endY];
      row.push(position);
    }
    arrayPositions.push(row);
  }
  arrayPositions = arrayPositions.flat(1);
  object.interractionPositions = [...arrayPositions];
};

const checkInterraction = (player, object) => {
  if (!object.hasOwnProperty('canInterraction')) return;
  const [playerPosX, playerPosY] = player.currentPosition;
  for (let position of object.interractionPositions) {
    const [objectPosX, objectPosY] = position;
    if (playerPosX === objectPosX && playerPosY === objectPosY) {
      object.canInterraction = true;
      break;
    }
    object.canInterraction = false;
  }
};

const createTransitionZone = ([beginPosition, endPosition]) => {
  const [beginX, beginY] = beginPosition;
  const [endX, endY] = endPosition;
  let arrayPositions = [];
  for (let x = beginX; x <= endX; x += 1) {
    const row = [];
    for (let y = beginY; y <= endY; y += 1) {
      const position = [x, y];
      row.push(position);
    }
    arrayPositions.push(row);
  }
  arrayPositions = arrayPositions.flat(1);
  return arrayPositions;
};

export { checkInterraction, createInterractionPosition, createTransitionZone };
