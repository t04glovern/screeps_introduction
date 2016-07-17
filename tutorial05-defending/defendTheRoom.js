// In this Tutorial section, we’ll talk about how to set up your room defense
// with a structure available starting from level 3 of the Controller: Tower.

// This hostile creep has come from the left entry and attacked your colony.
// It’s good that we have walls to restrain it temporarily.
// But they will fall sooner or later, so we need to deal with the problem

// Towers are the easiest way to defend a room. They use energy and can be
// targeted at any creep in a room to attack or heal it. The effect depends
// on the distance between the tower and the target.

// To start with, let’s lay a foundation for our new tower. You can set any
// place you wish inside the walls and place the construction site there with
// the help of the button “Construct” on the upper panel.

// A tower uses energy, so let’s set the harvester role to bring energy to 
// the tower along with other structures. To do this, you need to add the 
// constant STRUCTURE_TOWER to the filter of structures your harvester is aimed at.

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
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
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

// Like a creep, a tower has several similar methods: attack, heal, and repair. 
// Each action spends 10 energy units. We need to use attack on the closest enemy 
// creep upon its discovery. Remember that distance is vital: the effect can be 
// several times stronger with the same energy cost!

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var tower = Game.getObjectById('4b221997b651e9fd730b8907');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}