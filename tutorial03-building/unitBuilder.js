// The Controller upgrade gives access to some new structures: walls, ramparts, and extensions. 
// We’ll discuss walls and ramparts in the next Tutorial section, for now let’s talk about extensions.

// Extensions // 
// are required to build larger creeps. A creep with only one body part of one type works poorly. 
// Giving it several WORKs will make him work proportionally faster.

// However, such a creep will be costly and a lone spawn can only contain 300 energy units.
// To build creeps costing over 300 energy units you need spawn extensions.

// Let’s create a new creep whose purpose is to build structures. 
// This process will be similar to the previous Tutorial sections. 
// But this time let’s set the memory for the new creep right in the method 
// Spawn.createCreep // by passing it as the third function argument.

Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], 'Builder1', { role: 'builder' });

// As before, let’s move this role into a separate module role.builder. 
// The building is carried out by applying the method Creep.build to the construction 
// sites searchable by Room.find(FIND_CONSTRUCTION_SITES). 
// The structure requires energy which your creep can harvest on its own.

// To avoid having the creep run back and forth too often but make it deplete the cargo, 
// let’s complicate our logic by creating a new Boolean variable creep.memory.building 
// which will tell the creep when to switch tasks.

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleBuilder;