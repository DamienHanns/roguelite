//Setup basic element required for running the game

//game canvas setup
import CanvasManager from "./canvasManager.js";
const canvasManager = new CanvasManager();

//get necessary canvas properties.
import LevelConstructor from "./levelBlocks/levelConstructor.js";
const levelConstructor = new LevelConstructor();

import LevelSetup from "./levelBlocks/levelSetup.js";
const levelSetup = new LevelSetup();

import EntityManager from "./entityManager.js"
const entityManager = new EntityManager(canvasManager);


//Setup game entities.

//get level data from the levelConstructor and spawn it into the game.
//then populate the level environment.
//TODO this only and directly spawns in level 1. Implement a better solution.
await entityManager.spawnEntity(await levelConstructor.getLevel());
entityManager.spawnEntity(levelSetup.level1());

console.log(entityManager.entites);

requestAnimationFrame(entityManager.runEntityLogic);
//todo ensure the player can get the goal.
//todo success or failure message.