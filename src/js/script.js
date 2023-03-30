import Controller from './app/Controller';
import Game from './app/Game';
import Loader from './app/Loader';
import Menu from './app/Menu';
import MenuLoad from './app/MenuLoad';
import MenuSave from './app/MenuSave';
import SaveModel from './app/SaveModel';
import Setting from './app/Setting';
import Level from './game/classes/Level';
import Dungeon from './game/levels/Dungeon';

const gameContainer = document.querySelector('#game');
const menu = new Menu();
const setting = new Setting();
const menuSave = new MenuSave();
const menuLoad = new MenuLoad();
const loader = new Loader();
const dungeonLevel = new Dungeon();
const testLevel = new Level();
const game = new Game({
  firstLevel: dungeonLevel,
  levels: [dungeonLevel, testLevel],
});
const saveModel = new SaveModel();

const controller = new Controller({
  menu,
  menuSave,
  menuLoad,
  gameContainer,
  loader,
  game,
  setting,
  saveModel,
});

document.addEventListener('DOMContentLoaded', function () {
  controller.initGame();
});
