"use strict";
const FloorType = Object.freeze({FIGHT:"Fight", TRAP:"Trap", CHALLENGE:"Challenge", TREASURE:"Treasure",});
const Stat = Object.freeze({MIGHT:"Might",MIND:"Mind",MOXIE:"Moxie"});

class Floor {
    constructor (type,lvl,content) {
        this.type = type;
        this.lvl = lvl;
        this.content = content;
        this.icon = dungeonIcons[[type]];
        this.beatTime = 2000;
        this.beatTotal = 5;
    }
    executeBeat(num,party) {
        console.log(num);
        if (this.type === FloorType.TRAP) {
            //this floor rolls a check for each hero in party, if they fail they take 10-30% danage
            const challenge = Math.pow(1.1,this.lvl+5);
            const heroes = party.heroList();
            console.log(heroes);
            if (num < heroes.length) {
                //there is a valid hit
                const hRoll = heroes[num].roll(Stat.MIGHT);
                if (hRoll >= challenge) {
                    addLog("Floor " + this.lvl + ": " + heroes[num].name + " outrolled the challenge.");
                }
                else {
                    heroes[i].takeDamage(1);
                    addLog("Floor " + this.lvl + ": " + heroes[num].name + " failed the challenge.");
                }
            }
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
    //for (let i=0;i<20;i++) {
        generateDungeonFloor();
    //}
    refreshDungeonGrid();
}

function generateDungeonFloor() {
    const s = Math.seededRandom(0,4);
    const f = [FloorType.FIGHT,FloorType.CHALLENGE,FloorType.TRAP,FloorType.TREASURE];
    //const floor = new Floor(f[s],1,[])
    const floor = new Floor(FloorType.TRAP,1,[])
    dungeon.push(floor);
    return floor;
}

function getFloor(id) {
    return dungeon[id]
}