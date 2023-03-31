import gsap from 'gsap';
import { createKeyFrames, createPath } from './pathfinding';

const moveToDungeon = (level) => {
  const [endX, endY] = [49, 8];
  const [startX, startY] = level.player.currentPosition;
  const path = createPath(startX, startY, endX, endY, level.grid);
  const keyFrames = createKeyFrames(path, level.player);
  level.canMove = false;

  const moveUp = gsap.to(level.player, {
    posY: `-=${9 * 48}`,
    paused: true,
    duration: 0.3 * 9,
    onComplete: () => {
      level.endMoveToDungeon();
      level.canMove = true;
    },
  });

  level.levelObject.forEach((object) => {
    gsap.to(object, {
      keyframes: keyFrames,
      onComplete: () => {
        level.player.switchState('moveUp');
        moveUp.play();
      },
    });
  });
};

export { moveToDungeon };
