// Maintaining extensions requires you to teach your harvesters to carry 
// energy not just to a spawn but also to extensions. To do this, you can 
// either use the 'Game.structures' object or search within the room with 
// the help of 'Room.find(FIND_STRUCTURES)'. In both cases, you will need 
// to filter the list of items on the condition 
// 'structure.structureType == STRUCTURE_EXTENSION' (or, alternatively, 
// structure instanceof StructureExtension) and also check them for energy 
// load, as before.

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;

// To know the total amount of energy in the room, you can use the property Room.energyAvailable. 
// Let’s add the output of this property into the console in order to track it during the filling of extensions.

var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');

module.exports.loop = function() {

    for (var name in Game.rooms) {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}

// In total, we have 550 energy units in our spawn and extensions. It is enough to build a creep 
// with the body [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]. This creep will work 4 times faster than a 
// regular worker creep. Its body is heavier, so we’ll add another MOVE to it. However, two parts 
// are still not enough to move it at the speed of a small fast creep which would require 4xMOVEs or building a road.

Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'HarvesterBig', { role: 'harvester' });
