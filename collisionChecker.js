class CollisionChecker {
    constructor() {

    }

    positionFree(posX, posY, map= []){
      //  console.log("position BEING checked: " + posX + " " + posY);
        return (map[posY][posX] === '.');
    }
}

export default CollisionChecker;