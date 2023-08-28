//detail level setup, how many enemies to spawn. Which types to spawn.
// Level collectables and objectives.
//can detail per lvl.

//lvl 1, player, collectables?, lvl exit.

class LevelSetup{
    constructor(){

    }

    // array values [0 /*player*/, 0 /*slime*/]

    //todo create function to select numbers and types of things to spawn in.  B M|<

    //prepare arrays filled with numbers to pass into entity manager for spawning.
    //each index indicates what type of entity to spawn
    //each number at a given index states how many of that type should be spawned
    level1 (){
       return [1 /*player*/, 30 /*slime*/];
    }

}

export default LevelSetup;