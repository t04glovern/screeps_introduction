// To set the behavior of both creeps we could just duplicate 
// the entire script for the second one, but it's much better 
// to use the 'for loop' against all the screeps in 'Game.creeps'

module.exports.loop = function() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

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
}
