"use strict";
const FloorType = Object.freeze({FIGHT:"Fight", TRAP:"Trap", CHALLENGE:"Challenge", TREASURE:"Treasure",});
const Stat = Object.freeze({MIGHT:"Might",MIND:"Mind",MOXIE:"Moxie",HP:"HP",POW:"Power",});

class Floor {
    constructor (type,lvl,content) {
        this.type = type;
        this.lvl = lvl;
        this.content = content;
        this.icon = dungeonIcons[[type]];
        this.beatTime = 2000;
        this.beatTotal = 5;
        this.difficulty = Math.ceil(Math.pow(1.1,this.lvl+5));
    }
    getDescription() {
        if (this.type === FloorType.TRAP) return "Trap Floor (Might)";
    }
    getFloorTime() {
        return this.beatTime*this.beatTotal;
    }
    executeBeat(num,party) {
        if (this.type === FloorType.TRAP) {
            //this floor rolls a check for each hero in party, if they fail they take 10-30% danage
            const challenge = Math.pow(1.1,this.lvl+5);
            const heroes = party.heroList();
            if (num < heroes.length) {
                if (heroes[num].dead()) {
                    addLog("Floor " + this.lvl + ": " + heroes[num].name + " is dead already.");
                    return "dead"
                }
                //there is a valid hit
                const hRoll = heroes[num].roll(Stat.MIGHT);
                if (hRoll >= challenge) {
                    addLog("Floor " + this.lvl + ": " + heroes[num].name + " outrolled the challenge.");
                }
                else {
                    heroes[num].takeDamage(1);
                    addLog("Floor " + this.lvl + ": " + heroes[num].name + " failed the challenge.");
                }
                return hRoll;
            }
        }
        return null;
    }
}

const dungeonIcons = {
    [FloorType.FIGHT] : '<img src="DungeonIcons/fight_floor.png" alt="Fight">',
    [FloorType.TRAP] : '<img src="DungeonIcons/trap_floor.png" alt="Trap">',
    [FloorType.CHALLENGE] : '<img src="DungeonIcons/challenge_floor.png" alt="Challenge">',
    [FloorType.TREASURE] : '<img src="DungeonIcons/treasure_floor.png" alt="Treasure">',
    [FloorType.HEAL] : '<img src="DungeonIcons/heal_floor.png" alt="Heal">',
    [Stat.MIGHT] : '<img src="DungeonIcons/mighticon.png" alt="Might">',
    [Stat.MIND] : '<img src="DungeonIcons/mindicon2.png" alt="Mind">',
    [Stat.MOXIE] : '<img src="DungeonIcons/moxieicon.png" alt="Moxie">',
    [Stat.HP] : '<img src="PixelItem/Heart.png" alt="HP">',
    [Stat.POW] : '<img src="PixelItem/Icosahedron.png" alt="POW">',
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
    const floor = new Floor(FloorType.TRAP,dungeon.length+1,[])
    dungeon.push(floor);
    return floor;
}