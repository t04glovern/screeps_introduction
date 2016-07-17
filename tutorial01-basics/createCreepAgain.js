// Creep has a life cycle of 1500 game ticks, then it "ages" and dies
// Let's create another worker creep to help the first one. 
// It will cost another 200 energy units, so you may need to wait 
// until your harvester collects enough energy.

// The 'createCreep' method will return an error code 
// 'ERR_NOT_ENOUGH_ENERGY (-6)' until then.

// Spawn a second creep with the body [WORK,CARRY,MOVE] and name Harvester2.
Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Harvester2' );

