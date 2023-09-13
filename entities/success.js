import Entity from "./entity.js";

class Success extends Entity{
    constructor(id, context2d, posX = 7 * 32, posY = 14 * 32, color = "gold") {
        super(id, context2d, posX, posY, color);

        console.log("Success is attainable: " + this.position.x, this.position.y);
    }
}