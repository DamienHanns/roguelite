import Entity from "./entity.js";
import Movement from "../movement.js"
import CollisionChecker from "../collisionChecker.js";
import Success from "./success.js"

class Player extends Entity {
    constructor(id, context2d, posX = 7 * 32, posY = 14 * 32, color = "red", size = 30) {
        super(id, context2d, posX, posY, color, size);

        this.collisionChecker = new CollisionChecker();

        this.movement = new Movement(this.collisionChecker);

        this.setupInputListenerDown();
        this.setupInputListenerUp();

        this.inputs = {
            left : false,
            right : false,
            up : false,
            down : false
        }

        this.speed = 1;
        this.velocity = {
            x : 0,
            y : 0
        }

        console.log("ALIVE! IM ALIVE!!!!: " + this.position.x, this.position.y);
    }
    setupInputListenerDown (){
        document.addEventListener('keydown', (event) => {
            if ( event.key === 'a' ||  event.key === 'ArrowLeft') {
                this.inputs.left = true;

            }

            if (event.key === 'd' || event.key === 'ArrowRight') {
                this.inputs.right = true;
            }

            if ( event.key === 'w' ||  event.key === 'ArrowUp') {
                this.inputs.up = true;
            }

            if (event.key === 's' || event.key === 'ArrowDown') {
                this.inputs.down = true;
            }
        });
    }

    setupInputListenerUp(){
        document.addEventListener('keyup', (event) => {
            if ( event.key === 'a' ||  event.key === 'ArrowLeft') {
                this.inputs.left = false;
            }

            if (event.key === 'd' || event.key === 'ArrowRight') {
                this.inputs.right = false;
            }

            if ( event.key === 'w' ||  event.key === 'ArrowUp') {
                this.inputs.up = false;
            }

            if (event.key === 's' || event.key === 'ArrowDown') {
                this.inputs.down = false;
            }
        });
    }


    //check movement inputs and try to move
    update(entityArray){
        this.velocity.x = this.inputs.right - this.inputs.left;
        this.velocity.y = this.inputs.down - this.inputs.up;

        let movementThisFrame = {x:0, y:0};

        movementThisFrame.x = this.velocity.x;

        let bHasCollided = false;
        bHasCollided = !this.movement.movePosition(this.id, this.position, movementThisFrame, entityArray, this.size.x);
        if (bHasCollided){ this.checkCollisions();}

        movementThisFrame.x = 0;
        movementThisFrame.y = this.velocity.y;

        bHasCollided = !this.movement.movePosition(this.id, this.position, movementThisFrame, entityArray, this.size.x);
        if (bHasCollided){ this.checkCollisions();}

    }

    checkCollisions(){
        let collisions = this.collisionChecker.objectsCollided;

        for (let i = 0; i < collisions.length; i++){
            if (collisions[i] instanceof Success){
                console.log("Player has been successful");
                location.reload();
            }
        }
    }

}



export default Player;