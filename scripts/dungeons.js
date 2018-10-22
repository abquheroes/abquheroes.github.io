"use strict";
const FloorType = Object.freeze({FIGHT:"Fight", TRAP:"Trap", TRIAL:"Trial", TREASURE:"Treasure", HEAL:"Heal"});
const Stat = Object.freeze({HP:"HP",POW:"Power",AP:"AP",ACT:"Act"});

class Dungeon {
    constructor(id,party) {
        this.id = id;
        this.name = "Groovy Grove"
        this.floorNum = 1;
        this.party = party;
        this.mobs = MobManager.generateDungeonMobs(this.id,this.floorNum)
        this.dropList = [];
        this.dungeonTime = 0;
    }
    createSave() {
        const save = {};
        save.id = this.id;
        save.floorNum = this.floorNum;
        save.party = this.party.createSave();
        save.mobs = [];
        this.mobs.forEach(m=>{
            save.mobs.push(m.createSave());
        })
        save.dropList = this.dropList;
        save.dungeonTime = this.dungeonTime;
        return save;
    }
    loadSave(save) {
        this.floorNum = save.floorNum;
        this.mobs = [];
        save.mobs.forEach(mobSave => {
            const mobTemplate = MobManager.idToMob(mobSave.id);
            const mob = new Mob(save.floorNum, mobTemplate);
            mob.loadSave(mobSave);
        });
        this.dropList = save.dropList;
        this.dungeonTime = save.dungeonTime;
    }
    addTime(t) {
        //add time to all combatants, if they're ready for combat they'll bounce back here.
        this.dungeonTime += t;
        this.party.addTime(t, this.id);
        this.mobs.forEach(mob => {
            mob.addTime(t, this.id);
            if (mob.hp === 0) {
                const drops = mob.rollDrops();
                this.party.addXP(mob.lvl);
                this.addDungeonDrop(drops);
            }
        });
        const newmobs = this.mobs.filter(m => m.hp > 0);
        if (newmobs.length < this.mobs.length) floorStateChange(this.id);
        this.mobs = this.mobs.filter(m => m.hp > 0);
        if (this.party.isDead()) {
            this.party.heroes.forEach(h=>h.inDungeon = false);
            EventManager.addEventDungeon(this.dropList,this.dungeonTime,this.floorNum);
            DungeonManager.removeDungeon(this.id);
            if (DungeonManager.dungeonView !== null) {
                openTab("dungeonsTab");
            }
            initializeSideBarDungeon();
            return;
        }
        if (this.mobs.length === 0) this.advanceFloor();
    }
    addDungeonDrop(drops) {
        drops.forEach(drop => {
            const found = this.dropList.find(d => d.id === drop)
            if (found === undefined) this.dropList.push({"id":drop,"amt":1});
            else found.amt += 1;
        })
    }
    advanceFloor() {
        achievementStats.floorBeaten(this.floorNum);
        this.floorNum += 1;
        this.mobs = MobManager.generateDungeonMobs(this.id,this.floorNum);
        floorStateChange(this.id);
    }
    heroInHere(heroID) {
        return this.party.some(h=>h.id === heroID);
    }
}

const DungeonManager = {
    dungeons : [],
    dungeonCreatingID : null,
    dungeonView : null,
    createSave() {
        const save = {};
        save.dungeons = [];
        this.dungeons.forEach(d => {
            save.dungeons.push(d.createSave());
        });
        return save;
    },
    loadSave(save) {
        save.dungeons.forEach(d => {
            const party = new Party(d.party.heroID);
            const dungeon = new Dungeon(d.id,party);
            dungeon.loadSave(d);
            this.dungeons.push(dungeon);
        });
    },
    addTime(t) {
        this.dungeons.forEach(dungeon => {
            dungeon.addTime(t);
        });
        if (this.dungeonView !== null) refreshDungeonFloorBars();
    },
    removeDungeon(id) {
        this.dungeons = this.dungeons.filter(d => d.id !== id);
    },
    dungeonStatus(dungeonID) {
        return this.dungeons.filter(d=>d.id === dungeonID).length > 0;
    },
    createDungeon() {
        const party = PartyCreator.lockParty();
        const dungeon = new Dungeon(this.dungeonCreatingID,party);
        this.dungeons.push(dungeon);
    },
    dungeonByID(dungeonID) {
        return this.dungeons.find(d => d.id === dungeonID);
    },
    getCurrentDungeon() {
        return this.dungeonByID(this.dungeonView);
    }
};

const dungeonIcons = {
    [FloorType.FIGHT] : '<img src="images/DungeonIcons/combat_floor.png" alt="Fight">',
    [FloorType.TREASURE] : '<img src="images/DungeonIcons/treasure_floor.png" alt="Treasure">',
    [Stat.HP] : '<img src="images/DungeonIcons/hp.png" alt="HP">',
    [Stat.POW] : '<img src="images/DungeonIcons/pow.png" alt="POW">',
    [Stat.ACT] : '<img src="images/DungeonIcons/act.png" alt="Act">',
    [Stat.AP] : '<img src="images/DungeonIcons/ap.png" alt="AP">',
}