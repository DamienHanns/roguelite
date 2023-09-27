//TODO spawn player at pos 14,1 in the level
//todo spawn goal

import Wall from "./entities/wall.js";
import Player from "./entities/player.js";
import Slime from "./entities/slime.js";
import Success from "./entities/success.js"

import CollisionChecker from "./collisionChecker.js";
import Entity from "./entities/entity.js";
import success from "./entities/success.js";


class EntityManager{

    constructor(canvasManager) {
        this.checkPosition = new CollisionChecker();

        this.entites = [];
        this.intialLevelData = [];

        this.entityCount = 0;

        this.cellSize = 32;

        this.canvasManager = canvasManager;
        this.context2d = canvasManager.getContext2d();

        this.stopRunningLogic = false;

        document.addEventListener('keydown', (event) => this.handleQuitKey(event));
    }

    //stop game logic running
    handleQuitKey(event){
        if (event.key === ' ') {
            this.stopRunningLogic = !this.stopRunningLogic;
            console.log('Spacebar was pressed');
        }
    }

    //todo make sure that important things are placed where the player can access
    // or experience them.
    spawnEntity(entitiesToSpawn, numberOfEntitiesToSpawn = 1, posX = 0, posY = 0){
        // identify if an array has been passed.
        // if array is a string handle level map objects else
        // if array is a number handle objects by ID and quantity.
        if (Array.isArray(entitiesToSpawn)){

            if (typeof entitiesToSpawn[0] === 'string') {
                console.log("level data identified");

                this.intialLevelData = entitiesToSpawn;

                for (let verticalIndex = 0; verticalIndex < entitiesToSpawn.length; verticalIndex++){
                    for (let horizontalIndex = 0; horizontalIndex < entitiesToSpawn[verticalIndex].length; horizontalIndex++){
                        if (entitiesToSpawn[verticalIndex][horizontalIndex] === "W" ||
                            entitiesToSpawn[verticalIndex][horizontalIndex] === "w"){
                            let wall = new Wall(this.entityCount++, this.context2d, horizontalIndex * this.cellSize, verticalIndex * this.cellSize);
                            wall.draw();

                            this.entites.push(wall);
                        }
                    }
                }
            }
            //if the array is of numbers, each index position of the array represents a game entity type.
            //The value found in an index position lets us know how many of that entity type it needs to spawn in.

            else if (typeof entitiesToSpawn[0] === 'number'){
                console.log("Array of character data identified");
                for (let i = 0; i < entitiesToSpawn.length; i++) {
                    if (entitiesToSpawn[i] > 0) {
                        const entityId = i;
                        const numberToSpawn = entitiesToSpawn[i];

                        for (let j = 0; j < numberToSpawn; j++){
                           this.instantiateEntity(entityId);
                        }
                    }
                }
            }


        } else {
            console.log("SINGLE ENTITY SPAWNING BRANCH");
            let spawnedEntity = new entitiesToSpawn(this.entityCount++, this.context2d);
            spawnedEntity.draw();
        }
    }

    //spawn in and increment the entity count to give each entity a unique id.l
    instantiateEntity(entityId){
        let newEntity;
        let pos = {x:0, y:0};
        switch (entityId){
            case 0:
                newEntity = new Success(this.entityCount++, this.context2d);
                pos = this.chooseSpawnPosition(newEntity);
                newEntity.position.x = pos.x;
                newEntity.position.y = pos.y;
                console.log("Success RELOCATION: " + newEntity.position.x, newEntity.position.y);
                break;
            case 1:
                newEntity = new Player(this.entityCount++,this.context2d, 5 * this.cellSize, 15 * this.cellSize);
                if (this.intialLevelData [newEntity.position.y] !== null)
                { console.log ("PLAYER POS line : " +  this.intialLevelData [newEntity.position.y] ); }
                break;
            case 2:
                pos = this.chooseSpawnPosition();
                newEntity = new Slime(this.entityCount++, this.context2d, pos.x, pos.y);
                break;
            default:
                console.log("SWITCH OUT OF RANGE in instantiateEntity() with: " + entityId + " id");
                return;
        }

        this.entites.push(newEntity);
    }

    //todo create spawner class, create spawn logic for each different entities.
    chooseSpawnPosition(entity = undefined){
        let pos = {
            x : 0,
            y : 0
        };

        //choose a random location within the map, check against other entity positions,
        // if a position is free, return it.
        if (entity === undefined){
            let positionFound = false;
            while (! positionFound){
                pos.x = this.getRandomNumber(0, (this.intialLevelData[0].length -1 ) * this.cellSize );
                pos.y = this.getRandomNumber(0, (this.intialLevelData.length - 1) * this.cellSize);

                positionFound = !this.checkPosition.collisionCheckAll(pos.x, pos.y, this.entites);

                console.log("finding spawn location");

                if (! positionFound) {console.log("while loop running and finding another position");}
            }
        }

        //todo create a entitiesToSpawn signature for this function.
        let entitiesToSpawn = [];
        entitiesToSpawn = this.intialLevelData;

        if (entity instanceof success){
            for (let verticalIndex = 0; verticalIndex < entitiesToSpawn.length; verticalIndex++){
                for (let horizontalIndex = 0; horizontalIndex < entitiesToSpawn[verticalIndex].length; horizontalIndex++){
                    if (entitiesToSpawn[verticalIndex][horizontalIndex] === "S" ||
                        entitiesToSpawn[verticalIndex][horizontalIndex] === "s"){
                        pos.x = horizontalIndex * this.cellSize;
                        pos.y = verticalIndex * this.cellSize;

                    }
                }
            }
        }

        return pos;
    }

    // main game loop. clear screen, update entities, redraw the screen
    runEntityLogic = () => {
        if (this.stopRunningLogic) { return; }

        this.canvasManager.clearContext2d();

        this.entites.forEach((entity)  => {
            entity.update(this.entites);

            entity.draw();
        });

        requestAnimationFrame(this.runEntityLogic);
    }

    getRandomNumber(min, max) {
        // Generate a random decimal number between 0 and 1
        const randomDecimal = Math.random();

        // Scale the random number to fit the desired range
        return Math.floor(randomDecimal * (max - min + 1)) + min;
    }
}


export default EntityManager;