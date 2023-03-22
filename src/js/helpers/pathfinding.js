import Pathfinding from 'pathfinding';

const pathfinding = ({
  event,
  canMove,
  canvasRect,
  grid,
  currentPosition,
  player,
  map,
  moveFunc,
  context,
}) => {
  if (!canMove) return;
  canMove = false;
  event = event || window.event;
  const posX = event.clientX - canvasRect.left;
  const posY = event.clientY - canvasRect.top;

  const gridBackup = grid.clone();
  const [startX, startY] = currentPosition;
  const endX = Math.floor((Math.abs(map.posX) + posX) / 48);
  const endY = Math.floor((Math.abs(map.posY) + posY) / 48);

  const finder = new Pathfinding.BestFirstFinder({
    allowDiagonal: true,
    dontCrossCorners: true,
    heuristic: function (dx, dy) {
      return Math.min(dx, dy);
    },
  });

  const path = finder.findPath(startX, startY, endX, endY, gridBackup);
  if (path.length === 0) {
    canMove = true;
    return;
  }

  const keyFramesArray = path.slice(1);
  const arrayTemp = [];
  for (let i = 0; i < keyFramesArray.length; i += 1) {
    arrayTemp.push([
      keyFramesArray[i][0] - path[i][0],
      keyFramesArray[i][1] - path[i][1],
    ]);
  }

  const keyFrames = arrayTemp.map((points) => {
    const [x, y] = points;
    return {
      posX: `-=${x * 48}`,
      posY: `-=${y * 48}`,
      duration: 0.3,
      onStart: () => {
        if (x > 0 && y == 0) {
          player.switchState('moveRight');
        } else if (x < 0 && y == 0) {
          player.switchState('moveLeft');
        } else if (y < 0) {
          player.switchState('moveUp');
        } else if (y > 0) {
          player.switchState('moveDown');
        }
      },
    };
  });
  moveFunc.call(context, keyFrames, endX, endY);
};

export default pathfinding;
