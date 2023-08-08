//all object base class
class Entity {
    constructor(posX = 0, posY = 0, context2d) {
        this.position = {
            x: posX,
            y: posY,
        };

        //todo consider moving this if proper components are introduced.
        this.size = {
            x : 32,
            y : 32,
        };

        this.context2d = context2d;
    }

    //todo draw function probably shouldn't be here. keep this reminder here.
    draw(){
        this.context2d.fillStyle = "orange";
        this.context2d.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        console.log("draw called");
    }
}

export default Entity;