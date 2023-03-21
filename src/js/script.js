import Controller from './app/Controller';
import Game from './app/Game';
import Loader from './app/Loader';
import Menu from './app/Menu';
import Dungeon from './game/levels/Dungeon';

const gameContainer = document.querySelector('#game');
const menu = new Menu();
const loader = new Loader();
const game = new Game({ firstLevel: new Dungeon() });
const controller = new Controller({ menu, gameContainer, loader, game });

document.addEventListener('DOMContentLoaded', function () {
  controller.initGame();
});
