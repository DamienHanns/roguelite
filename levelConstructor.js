import Player from "./player.js";
import Wall from "./wall.js";

class LevelGenerator {
    constructor() {
        this.levelBlockDirectories=[
            './levelBlocks/topLeft/','./levelBlocks/middleLeft/', './levelBlocks/bottomLeft/',
            './levelBlocks/topMiddle/', './levelBlocks/centreMiddle/', './levelBlocks/bottomMiddle/',
            './levelBlocks/topRight/', './levelBlocks/middleRight/', './levelBlocks/bottomRight/'
        ];

        this.blockDirectoriesIndex = 0;
        this.levelLayout = [];

        this.totalVerticalLevelBlocks = 3;
        this.totalColumnNumber = 3;
        this.blockSize = 10;
        this.arrayIndexOffset = 0;
    }

    //todo redo the level construction method.
    // block out a clear path to the goal
    // fill out the other blocks with random blocks from any directory
    // then set a solid impassable frame around the edge of the level.
    // look into marking elements within none essential map blocks to assist in the
    // entity spawning process. i.e mark locations to spawn non essential gameplay elements.

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

        for(let i = 0; i < levelBlocks.length; i ++){
            if (firstColumn === true ) {
                this.levelLayout.push(levelBlocks[i]);
            }
            else {
                let arrayIndex = i + this.arrayIndexOffset;
                this.levelLayout[arrayIndex] += levelBlocks[i];
            }
        }
       // console.log("built level");
       // console.log(this.levelLayout);
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


    async getLevel(){
        await this.buildLevelLayout();

        return this.levelLayout;
    }


}

export default LevelGenerator;