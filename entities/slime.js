import Entity from "./entity.js";
import getRandomNumber from "../rng.js";
import Movement from "../movement.js";

class Slime extends Entity {
    constructor(id, context2d, posX = 7 * 32, posY = 14 * 32, color = "green") {
        super(id, context2d, posX, posY, color);

        this.movement = new Movement();

        this.velocity = {
            x : 0, y : 0
        };

        this.getNewDirection();

        console.log("Slimer has arrived: " + this.position.x, this.position.y);
    }

    update(entityArray) {
        let bHasCollided = !this.movement.movePosition(this.id, this.position, this.velocity, entityArray);

        if (bHasCollided) { this.getNewDirection() }
    }

    getNewDirection(){
        let horizontalOrVertical = getRandomNumber(0,1);

        this.velocity.x = this.velocity.y = 0;

        if (horizontalOrVertical === 0) {
            while (this.velocity.x === 0){
                this.velocity.x = getRandomNumber(-1, 1);
            }
        } else {
            while (this.velocity.y === 0){
                this.velocity.y = getRandomNumber(-1, 1);
            }
        }
    }
}

export default Slime;