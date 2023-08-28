//TODO spawn player at pos 14,1 in the level
//todo spawn enemies.
//todo spawn goal

import Wall from "./wall.js";
import Player from "./player.js";
import Slime from "./slime.js";

import CollisionChecker from "./collisionChecker.js";

class EntityManager{

    constructor(context2d) {
        this.checkPosition = new CollisionChecker();

        this.entites = [];
        this.intialLevelData = [];

        this.cellSize = 32;
        this.context2d = context2d;
    }

    //todo make sure that important things are placed where the player can access
    // or experience them.
    spawnEntity(entityToSpawn, numberOfEntitiesToSpawn = 1, posX = 0, posY = 0){

        //TODO add newly instantiated entities to entities list.

        // identify if an array has been passed.
        // if array is a string handle level map objects else
        // if array is a number handle objects by ID and quantity.
        if (Array.isArray(entityToSpawn)){

            if (typeof entityToSpawn[0] === 'string') {
                console.log("level data identified");

                this.intialLevelData = entityToSpawn;

                for (let verticalIndex = 0; verticalIndex < entityToSpawn.length; verticalIndex++){
                    for (let horizontalIndex = 0; horizontalIndex < entityToSpawn[verticalIndex].length; horizontalIndex++){
                        if (entityToSpawn[verticalIndex][horizontalIndex] === "W" ||
                            entityToSpawn[verticalIndex][horizontalIndex] === "w"){
                            let wall = new Wall(this.context2d, horizontalIndex * this.cellSize, verticalIndex * this.cellSize);
                            wall.draw();

                            this.entites.push(wall);
                        }
                    }
                }
            }
            //if the array is of numbers, each index position of the array represents a game entity type.
            //The value found in an index position lets us know how many of that entity type it needs to spawn in.

            else if (typeof entityToSpawn[0] === 'number'){
                console.log("Array of character data identified");
                for (let i = 0; i < entityToSpawn.length; i++) {
                    if (entityToSpawn[i] > 0) {
                        const entityId = i;
                        const numberToSpawn = entityToSpawn[i];

                        for (let j = 0; j < numberToSpawn; j++){
                           this.instantiateEntity(entityId);
                        }
                    }
                }
            }


        } else {
            console.log("SINGLE ENTITY SPAWNING BRANCH");
            let spawnedEntity = new entityToSpawn(this.context2d);
            spawnedEntity.draw();
        }
    }

    instantiateEntity(entityId){
        let newEntity;
        switch (entityId){
            case 0:
                newEntity = new Player(this.context2d, 5 * this.cellSize, 5 * this.cellSize);
                //let originalString =  this.intialLevelData[newEntity.position.y];
               if (this.intialLevelData [newEntity.position.y] !== null)
               { console.log ("PLAYER POS line : " +  this.intialLevelData [newEntity.position.y] ); }
                    //originalString.substring(0, newEntity.position.x) + 'P' + originalString.substring(newEntity.position.x + 1);


                newEntity.draw();
                break;
            case 1:
                let pos = this.chooseSpawnPosition();
                newEntity = new Slime(this.context2d, pos.x, pos.y);
                newEntity.draw();
                break;

            default:
                console.log("SWITCH OUT OF RANGE in instantiateEntity()");
        }

        this.entites.push(newEntity);
    }

    chooseSpawnPosition(){
        let pos = {
            x : 0,
            y : 0
        };

        let positionFree = false;
        while (! positionFree){
            pos.x = this.getRandomNumber(0, this.intialLevelData[0].length - 1);
            pos.y = this.getRandomNumber(0, this.intialLevelData.length -1 );

          //  console.log("position to be checked: " + pos.x, + " " + pos.y);

            positionFree = this.checkPosition.positionFree(pos.x, pos.y, this.intialLevelData);

          //  if (! positionFree) {console.log("while loop running and finding another position");}
        }

        let originalString =  this.intialLevelData[pos.y];
        this.intialLevelData [pos.y ] = originalString.substring(0, pos.x) + 'O' + originalString.substring(pos.x + 1);

        pos.x *= 32;
        pos.y *= 32;

      //  console.log(this.intialLevelData);

        return pos;
    }

    getRandomNumber(min, max) {
        // Generate a random decimal number between 0 and 1
        const randomDecimal = Math.random();

        // Scale the random number to fit the desired range
        return Math.floor(randomDecimal * (max - min + 1)) + min;
    }
}




export default EntityManager;