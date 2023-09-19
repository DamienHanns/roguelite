import getRandomNumber from "../rng.js";

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
            let fileIndex = getRandomNumber(0, 4);

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
                let fileIndex = getRandomNumber(0, 4);
                let folderPath = this.levelBlockDirectories[this.blockDirectoriesIndex];

                let filename = 'level' + fileIndex + '.txt';

                await this.processLevelData(folderPath + filename, false);

            //    console.log(folderPath + filename + " arrayIndex :" + this.blockDirectoriesIndex);

                if(j === 0 || j === this.totalVerticalLevelBlocks - 2 || j === this.totalVerticalLevelBlocks - 1 ){
                    this.blockDirectoriesIndex ++;
                }
            }
        }

        this.setSuccessPosition();
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

    //todo move this functionality to the spawner.
    setSuccessPosition(){
        //loop through level array and take note of where all the success markers - "S" - are.
        //replace all "S" with "." - ground tiles.
        //after all are removed place one "S" back into the map.
        let successPoints = [];

        for (let verticalIndex = 0; verticalIndex < this.levelLayout.length; verticalIndex++){
            for (let horizontalIndex = 0; horizontalIndex < this.levelLayout[verticalIndex].length; horizontalIndex++){
                if (this.levelLayout[verticalIndex][horizontalIndex] === "S" ||
                    this.levelLayout[verticalIndex][horizontalIndex] === "s"){

                    let successPointPosition = {ver: verticalIndex, hor: horizontalIndex};

                    successPoints.push(successPointPosition);

                    this.levelLayout[verticalIndex] = this.levelLayout[verticalIndex].substring(0, horizontalIndex) + "." + this.levelLayout[verticalIndex].substring(horizontalIndex + 1);
                }
            }
        }

        let pointToKeepIndex = getRandomNumber(0, successPoints.length - 1);
        let pointToKeep = successPoints[pointToKeepIndex];

        this.levelLayout[pointToKeep.ver] = this.levelLayout[pointToKeep.ver].substring(0, pointToKeep.hor) + "S" +
            this.levelLayout[pointToKeep.ver].substring(pointToKeep.hor + 1);
    }

    changeSymbol(newSymbol, stringToChange, indexToChange){
        return stringToChange.substring(0, indexToChange) + newSymbol + stringToChange.substring(indexToChange + 1);
    }

    async getLevel(){
        await this.buildLevelLayout();

        return this.levelLayout;
    }


}

export default LevelGenerator;