// You will have to create new creeps when old ones die from age or some other reasons. 
// Since there are no events in the game to report death of a particular creep, the easiest way 
// is to just count the number of required creeps, and if it becomes less than a defined value, to start spawning.

// There are several ways to count the number of creeps of the required type. One of them is filtering 
// 'Game.creeps' with the help of the '_.filter' function and using the role in their memory. 
// Let’s try to do that and bring the number of creeps into the console.

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

// Let’s say we want to have at least two harvesters at any time. The easiest way to achieve this 
// is to run 'StructureSpawn.createCreep' each time we discover it’s less than this number. 
// You may not define its name (it will be given automatically in this case), but don’t forget to define the needed role.

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

// Now let’s try to emulate a situation when one of our harvesters dies. 
// You can now give the command suicide to the creep via the console or its properties panel on the right.

Game.creeps.Harvester1.suicide()

// An important point here is that the memory of dead creeps is not erased but kept for later reuse.
// If you create creeps with random names each time it may lead to memory overflow, 
// so you should clear it in the beginning of each tick (prior to the creep creation code).

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    // Always place this memory cleaning code at the very top of your main loop!

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

// Apart from creating new creeps after the death of old ones, there is another way to maintain the 
// needed number of creeps: the method StructureSpawn.renewCreep. Creep aging is disabled in the Tutorial, 
// so we recommend that you familiarize yourself with it on your own.