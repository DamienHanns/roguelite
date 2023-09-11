import CollisionChecker from "./collisionChecker.js";
import collisionChecker from "./collisionChecker.js";

class Movement{
    constructor() {
    this.collisionChecker = new CollisionChecker();
    }

    //check the desired position, if the position is free then move to it.
     movePosition(id, currentPosition, velocity, entityMap= [], size = 32){

        let desiredPosition = {
            x: currentPosition.x + velocity.x,
            y: currentPosition.y + velocity.y
        };

        let bObstaclePresent = this.collisionChecker.collisionCheck(id, desiredPosition.x, desiredPosition.y, entityMap, size);

        if (bObstaclePresent){
            console.log("collision detected.")
            return;
        }

         console.log("entity map size: ", entityMap.length);

        currentPosition.x += velocity.x;
        currentPosition.y += velocity.y;
    }

}

export default Movement;