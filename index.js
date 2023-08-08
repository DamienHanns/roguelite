//game canvas setup
import CanvasManager from "./canvasManager.js";
const canvasManager = new CanvasManager();

//get necessary canvas properties.
const context2d = canvasManager.getContext2d();

import LevelConstructor from "./levelConstructor.js";
const levelConstructor = new LevelConstructor(context2d);

