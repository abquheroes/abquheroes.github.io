"use strict";
const FloorType = Object.freeze({FIGHT:"Fight", TRAP:"Trap", TRIAL:"Trial", TREASURE:"Treasure", HEAL:"Heal"});
const Stat = Object.freeze({HP:"HP",POW:"Power",AP:"AP",ACT:"Act"});

class Floor {
    constructor (lvl) {
        this.lvl = lvl;
        this.icon = '<img src="images/DungeonIcons/combat_floor.png">'
        this.difficulty = this.lvl*2+5;
        this.monster = [MobManager.getMonster(lvl)];
    }
    isDead() {
        return this.monster.every((mob) => mob.dead());
    }
}

const dungeonIcons = {
    [FloorType.FIGHT] : '<img src="images/DungeonIcons/combat_floor.png" alt="Fight">',
    [FloorType.TREASURE] : '<img src="images/DungeonIcons/treasure_floor.png" alt="Treasure">',
    [Stat.HP] : '<img src="images/DungeonIcons/hp.png" alt="HP">',
    [Stat.POW] : '<img src="images/DungeonIcons/pow.png" alt="POW">',
    [Stat.ACT] : '<img src="images/DungeonIcons/act.png" alt="Act">',
    [Stat.AP] : '<img src="images/DungeonIcons/ap.png" alt="AP">',
}
