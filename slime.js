import Entity from "./entity.js";

class Slime extends Entity {
    constructor(context2d, posX = 7 * 32, posY = 14 * 32, color = "green") {
        super(context2d, posX, posY, color);

        console.log("Slimer has arrived: " + this.position.x, this.position.y);
    }

}

export default Slime;