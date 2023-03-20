import Controller from './app/Controller';
import Loader from './app/Loader';
import Menu from './app/Menu';

const gameContainer = document.querySelector('#game');
const menu = new Menu();
const loader = new Loader();
const controller = new Controller({ menu, gameContainer, loader });

document.addEventListener('DOMContentLoaded', function () {
  controller.initGame();
});
