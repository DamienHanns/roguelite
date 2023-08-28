//Setup basic element required for running the game

//game canvas setup
import CanvasManager from "./canvasManager.js";
const canvasManager = new CanvasManager();

//get necessary canvas properties.
const context2d = canvasManager.getContext2d();

import LevelConstructor from "./levelConstructor.js";
const levelConstructor = new LevelConstructor();

import LevelSetup from "./levelSetup.js";
const levelSetup = new LevelSetup();

import EntityManager from "./entityManager.js"
const entityManager = new EntityManager(context2d);


//Setup game entities.

//get level data from the levelConstructor and spawn it into the game.
//TODO this only and directly spawns in level 1. Implement a better solution.
await entityManager.spawnEntity(await levelConstructor.getLevel());
entityManager.spawnEntity(levelSetup.level1());

console.log(entityManager.entites);

//todo ensure the player can get the goal.
//todo success or failure message.