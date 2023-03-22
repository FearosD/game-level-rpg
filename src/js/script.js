import Controller from './app/Controller';
import Game from './app/Game';
import Loader from './app/Loader';
import Menu from './app/Menu';
import Setting from './app/Setting';
import Dungeon from './game/levels/Dungeon';

const gameContainer = document.querySelector('#game');
const menu = new Menu();
const setting = new Setting();
const loader = new Loader();
const dungeonLevel = new Dungeon();
const game = new Game({ firstLevel: dungeonLevel, levels: [dungeonLevel] });
const controller = new Controller({
  menu,
  gameContainer,
  loader,
  game,
  setting,
});

document.addEventListener('DOMContentLoaded', function () {
  controller.initGame();
});
