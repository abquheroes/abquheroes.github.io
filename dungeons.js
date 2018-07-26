"use strict";
const FloorType = Object.freeze({FIGHT:"Fight", TRAP:"Trap", TRIAL:"Trial", TREASURE:"Treasure", HEAL:"Heal"});
const Stat = Object.freeze({MIGHT:"Might",MIND:"Mind",MOXIE:"Moxie",HP:"HP",POW:"Power",AP:"AP",ACT:"Act"});

class Floor {
    constructor (type,lvl) {
        this.type = type;
        this.lvl = lvl;
        this.icon = dungeonIcons[[type]];
        this.difficulty = this.lvl*2+5;
        this.monster = [getMonster(lvl)];
    }
    isDead() {
        return this.monster.every((mob) => mob.dead());
    }
}

const dungeonIcons = {
    [FloorType.FIGHT] : '<img src="DungeonIcons/combat_floor.png" alt="Fight">',
    [FloorType.TREASURE] : '<img src="DungeonIcons/treasure_floor.png" alt="Treasure">',
    [Stat.MIGHT] : '<img src="DungeonIcons/mighticon.png" alt="Might">',
    [Stat.MIND] : '<img src="DungeonIcons/mindicon2.png" alt="Mind">',
    [Stat.MOXIE] : '<img src="DungeonIcons/moxieicon.png" alt="Moxie">',
    [Stat.HP] : '<img src="PixelItem/Heart.png" alt="HP">',
    [Stat.POW] : '<img src="PixelItem/Icosahedron.png" alt="POW">',
    [Stat.ACT] : '<img src="DungeonIcons/act.png" alt="Act">',
    [Stat.AP] : '<img src="DungeonIcons/ap.png" alt="AP">',
}

const dungeon = [];

function generateDungeonFloor() {
    let ft = null;
    if ((dungeon.length+1) % 5 === 0) ft = FloorType.TREASURE;
    else ft = FloorType.FIGHT;
    const difficulty = dungeon.length+1;
    const floor = new Floor(ft,difficulty);
    dungeon.push(floor);
}