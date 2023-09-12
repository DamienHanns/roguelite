import Entity from "./entity.js";

class Wall extends Entity {
    constructor(id, context2d, posX = 5 * 32, posY = 14 * 32, color = "DarkSlateBlue") {
        super(id, context2d, posX, posY, color);
    }

    update() {
    }
}

export default Wall;