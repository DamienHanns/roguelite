import Entity from "./entity.js";

class LevelGenerator {
    constructor(context2d) {
        this.levelBlockDirectories=[
            './levelBlocks/topLeft/','./levelBlocks/middleLeft/', './levelBlocks/bottomLeft/',
            './levelBlocks/topMiddle/', './levelBlocks/centreMiddle/', './levelBlocks/bottomMiddle/',
            './levelBlocks/topRight/', './levelBlocks/middleRight/', './levelBlocks/bottomRight/'
        ];

        this.blockDirectoriesIndex = 0;

        this.context2d = context2d;
        this.levelLayout = [];

        this.totalVerticalLevelBlocks = 3;
        this.totalColumnNumber = 3;
        this.blockSize = 10;
        this.arrayIndexOffset = 0;

        this.buildLevelLayout();
    }

    async buildLevelLayout(){
        //get level blocks from txt files then push them into levelLayout[]

        //the level is built with a number of columns, build the left most column first,
        //then move onto building out the level column by column with level blocks in the txt files.

        for(let i = 0; i < this.totalVerticalLevelBlocks; i++) {

            //choose a block file, randomised number used for file name
            let fileIndex = this.getRandomNumber(0, 4);

            let folderPath = this.levelBlockDirectories[this.blockDirectoriesIndex];
            let filename = 'level' + fileIndex + '.txt';

            await this.processLevelData(folderPath + filename);

          //  console.log(folderPath + filename + "arrayIndex :" + this.blockDirectoriesIndex);

            //move though the file directories on first loop, pen ultimate loop and last loop
            //to arrive in the appropriate folder when selecting the level blocks.
            if(i === 0 || i === this.totalVerticalLevelBlocks - 2 || i === this.totalVerticalLevelBlocks - 1){
                this.blockDirectoriesIndex ++;
            }
        }

        //with the left most column finished, buildout the rest of the level, column by column.
        for(let i = 0; i < this.totalColumnNumber - 1; i++) {
            for(let j = 0; j < this.totalVerticalLevelBlocks; j++) {

                //randomise the number for use in the file name
                let fileIndex = this.getRandomNumber(0, 4);
                let folderPath = this.levelBlockDirectories[this.blockDirectoriesIndex];

                let filename = 'level' + fileIndex + '.txt';

                await this.processLevelData(folderPath + filename, false);

            //    console.log(folderPath + filename + " arrayIndex :" + this.blockDirectoriesIndex);

                if(j === 0 || j === this.totalVerticalLevelBlocks - 2 || j === this.totalVerticalLevelBlocks - 1 ){
                    this.blockDirectoriesIndex ++;
                }
            }
        }

        this.displayLevel();
    }

    //gets level data then pushes, or appends it, to the levelLayout[]
    async processLevelData(filePath, bIsFirstColumn = true) {
        let response = await fetch(filePath);
        let text = await response.text();
        this.processData(text, bIsFirstColumn);
        this.incrementIndexPosition();
    }

    processData(text, firstColumn = true){
    //if firstColumn is true push the values into in the array to set the verticle size.
    //otherwise append data to the end of the indices to build out the level layout.
        let levelBlocks = text.split('\n');

        console.log("size: " + levelBlocks.length );
        console.log (levelBlocks);

        for(let i = 0; i < levelBlocks.length; i ++){
            if (firstColumn === true ) {
                this.levelLayout.push(levelBlocks[i]);
            }
            else {
                let arrayIndex = i + this.arrayIndexOffset;
                this.levelLayout[arrayIndex] += levelBlocks[i];
            }
        }
    }

    //this keeps track of which index needs to be used in levelLayout[] when appending data
    //to it, ensuring the level block txt files are represented well in levelLayout[]
    incrementIndexPosition(){
        this.arrayIndexOffset += this.blockSize;

        if(this.arrayIndexOffset >= this.blockSize * this.totalVerticalLevelBlocks){
            this.arrayIndexOffset = 0;
        }
    }

    getRandomNumber(min, max) {
        // Generate a random decimal number between 0 and 1
        const randomDecimal = Math.random();

        // Scale the random number to fit the desired range
        return Math.floor(randomDecimal * (max - min + 1)) + min;
    }


    getLevel(){
        return this.levelLayout;
    }

    //todo handle drawing the map elsewhere
    displayLevel(){
        const cellSize = 32;
     //   console.log("display level called");
     //   console.log("array len: " +  this.levelLayout.length);
      //  console.log(this.levelLayout);

        for (let verticalIndex = 0; verticalIndex < this.levelLayout.length; verticalIndex++){
            for (let horizontalIndex = 0; horizontalIndex < this.levelLayout[verticalIndex].length; horizontalIndex++){
                if (this.levelLayout[verticalIndex][horizontalIndex] === "W" ||
                    this.levelLayout[verticalIndex][horizontalIndex] === "w"){
                    let wall = new Entity(horizontalIndex * cellSize, verticalIndex * cellSize, this.context2d);
                    wall.draw();
                }
            }
        }
    }
}

export default LevelGenerator;