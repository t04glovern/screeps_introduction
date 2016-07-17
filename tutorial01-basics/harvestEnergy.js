// Yellow square is an energy source
// It can be harvested by creeps with one or more WORK body parts
// Transported to the spawn by creeps with CARRY parts.
// Commands will be passed each game tick.
// The harvest method requires that the energy source is adjacent to the creep.

// You give orders to a creep by its name this way 'Game.creeps.Harvester1'
// Use the 'FIND_SOURCES' constant as an argument to the 'Room.find' method.

module.exports.loop = function() {
    var creep = Game.creeps.Harvester1;
    var sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
}

// To make the creep transfer energy back to the spawn
// you need to use the method Creep.transfer If you modify the code by 
// adding the check '.carry.energy < .carryCapacity' to the creep it will be 
// able to go back and forth on its own.

module.exports.loop = function() {
    var creep = Game.creeps.Harvester1;

    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    } else {
        if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Spawn1);
        }
    }
}
