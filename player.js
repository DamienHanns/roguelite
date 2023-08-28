import Entity from "./entity.js";

class Player extends Entity {
    constructor(context2d, posX = 0, posY = 0, color = "red") {
        super(context2d, posX, posY, color);

        console.log("ALIVE! IM ALIVE!!!!: " + this.position.x, this.position.y);
    }

}

export default Player;