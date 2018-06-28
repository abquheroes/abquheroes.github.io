"use strict";
const FloorType = Object.freeze({FIGHT:"Fight", TRAP:"Trap", CHALLENGE:"Challenge", TREASURE:"Treasure",});
const Stat = Object.freeze({MIGHT:"Might",MIND:"Mind",MOXIE:"Moxie"});

class Floor {
    constructor (type,difficulty,content) {
        this.type = type;
        this.difficulty = difficulty;
        this.content = content;
        this.icon = dungeonIcons[[type]];
    }
    attempt(party) {
        return false;
        if (this.type === FloorType.TRAP) {
            //this floor rolls a check for each hero in party, if they fail they take 10-30% danage
            const beat = Math.pow(1.1,this.difficulty);
            const pattempt = party.partyRoll(content);
            console.log("Attempted floor: " + pattempt + " vs " + beat);
            if (pattempt < beat) {
                party.damageParty(2);
                refreshDungeonRunHeroes(party);
                return true;
            }
            return true;
        }
    }
}

const dungeonIcons = {
    [FloorType.FIGHT] : '<img src="DungeonIcons/fight.png" alt="Fight">',
    [FloorType.TRAP] : '<img src="DungeonIcons/trap.png" alt="Trap">',
    [FloorType.CHALLENGE] : '<img src="DungeonIcons/challenge.png" alt="Challenge">',
    [FloorType.TREASURE] : '<img src="DungeonIcons/treasure.png" alt="Treasure">',
}

const dungeon = [];

function generateDungeon() {
    for (let i=0;i<20;i++) {
        generateDungeonFloor();
    }
    refreshDungeonGrid();
}

function generateDungeonFloor() {
    const s = Math.seededRandom(0,4);
    const f = [FloorType.FIGHT,FloorType.CHALLENGE,FloorType.TRAP,FloorType.TREASURE];
    dungeon.push(new Floor(f[s],1,[]));
}

function getFloor(id) {
    return dungeon[id];
}