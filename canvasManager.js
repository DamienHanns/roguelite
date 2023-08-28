class CanvasManager {
    constructor() {
        //setup area for the game tto be rendered
        if (typeof window !== 'undefined'){
            this.gameGrid = window.document.getElementById("gameGrid");
            this.context2d = this.gameGrid.getContext("2d");

            //todo create an adjustable viewport for the render.
            // get rid of the multiplication of native game grid size
            //todo look into the flex display property
            //todo make any visible surround to the game an appropriate color.

            this.gameGrid.width = 320 * 3 ;
            this.gameGrid.height = 320 * 3;

            this.context2d.fillStyle = "black";
            this.context2d.fillRect(0,0, this.gameGrid.width, this.gameGrid.height);

            // Center the gameGrid
            this.gameGrid.style.position = 'absolute';
            this.gameGrid.style.top = '50%';
            this.gameGrid.style.left = '50%';
            this.gameGrid.style.transform = 'translate(-50%, -50%)';
            this.gameGrid.style.margin = '0px';


        }
        else { console.error("window and DOM failed to load"); }
    }

    getContext2d() {
        return this.context2d;
    }

    getGameGrid(){
        return this.gameGrid;
    }
}

export default CanvasManager;