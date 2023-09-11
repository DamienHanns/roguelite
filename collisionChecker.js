import entity from "./entities/entity.js";

class CollisionChecker {
    constructor() {

    }

    //check corners of the object. if anyone corner is found within the bounds of any other object return true.
    collisionCheck(id, posX, posY, entities= [], size = 32){
        //  console.log("position BEING checked: " + posX + " " + posY);

        let collisionDetected = false;

        let corners = {
            topLeft : { x: posX, y: posY },
            topRight : { x: posX + size, y: posY },
            botLeft :  { x: posX , y: posY + size },
            botRight : { x: posX + size, y: posY + size}
        };

        entities.forEach(function(entity){
            if (entity.id === id)  return;

            if (checkCorners(corners.topLeft, entity.position) ||
                checkCorners(corners.topRight, entity.position) ||
                checkCorners(corners.botLeft, entity.position) ||
                checkCorners(corners.botRight, entity.position)
            )
            { collisionDetected = true; }
        });

        return collisionDetected;
    }

    //check position against all entities spawned
    collisionCheckAll(posX, posY, entities= [], size = 32){
      //  console.log("position BEING checked: " + posX + " " + posY);

        let collisionDetected = false;

        let corners = {
        topLeft : { x: posX, y: posY },
        topRight : { x: posX + size, y: posY },
        botLeft :  { x: posX , y: posY + size },
        botRight : { x: posX + size, y: posY + size}
        };

        entities.forEach(function(entity){
            if (checkCorners(corners.topLeft, entity.position) ||
                checkCorners(corners.topRight, entity.position) ||
                checkCorners(corners.botLeft, entity.position) ||
                checkCorners(corners.botRight, entity.position)
            )
            { collisionDetected = true; }
        });

        return collisionDetected;
    }

}

function checkCorners (corner, otherCorner, size = 32){
    return (corner.x >= otherCorner.x &&
            corner.x <= otherCorner.x + size &&
            corner.y >= otherCorner.y &&
            corner.y <= otherCorner.y + size);


}

export default CollisionChecker;