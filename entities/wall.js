import Entity from "./entity.js";

class Wall extends Entity {
    constructor(context2d, posX = 5 * 32, posY = 14 * 32, color = "DarkSlateBlue") {
        super(context2d, posX, posY, color);
    }

    update() {
        this.color = "red";
        this.draw();
    }
}

export default Wall;