"use strict";

const MobManager = {
    monsterDB : [],
    addMob(mob) {
        this.monsterDB.push(mob);
    },
    idToMob(id) {
        return this.monsterDB.find(mob => mob.id === id);
    },
    generateDungeonMobs(dungeonID, floorNum) {
        if (dungeonID !== "d1") return;
        const mobs = [];
        let mobCount = 1;
        if (floorNum >= 100) mobCount += 1;
        if (floorNum >= 200) mobCount += 1;
        if (floorNum >= 300) mobCount += 1;
        while (mobCount > 0) {
            const possibleMonster = this.monsterDB.filter(mob => mob.minFloor <= floorNum && mob.maxFloor >= floorNum);
            const mobTemplate = possibleMonster[Math.floor(Math.random()*possibleMonster.length)];
            mobs.push(new Mob(floorNum, mobTemplate));
            mobCount -=1;
        }
        return mobs;        
    }
}

class MobTemplate {
    constructor (props) {
        Object.assign(this, props);
        this.image = '<img src="images/enemies/' + this.id + '.gif">';
        this.head = '<img src="images/enemies/heads/' + this.id + '.png">';
    }
}

let mobID = 0;
class Mob {
    constructor (lvl,mobTemplate) {
        console.log(mobTemplate);
        Object.assign(this, mobTemplate);
        //this.name = mobTemplate.name;
        //this.image = mobTemplate.image;
        //this.head = mobTemplate.head;
        //this.drops = mobTemplate.drops;
        //this.actmaxnum = mobTemplate.act;
        //this.armor = mobTemplate.armor;
        //this.critdmg = mobTemplate.critdmg;
        //this.dodge = mobTemplate.dodge;
        //this.target = mobTemplate.target;
        //this.apmax = mobTemplate.ap; -- REMOVE
        //this.id = mobTemplate.id;
        this.lvl = lvl;
        this.pow = Math.floor(mobTemplate.powBase + mobTemplate.powLvl*lvl);
        this.hpmax = Math.floor(mobTemplate.hpBase + mobTemplate.hpLvl*lvl);
        this.hp = this.hpmax;
        this.act = 0;
        this.ap = 0;
        this.uniqueid = mobID;
        mobID += 1;
    }
    createSave() {
        const save = {};
        save.lvl = this.lvl;
        save.id = this.id;
        save.hp = this.hp;
        save.act = this.act;
        save.ap = this.ap
        return save;
    }
    loadSave(save) {
        this.lvl = save.lvl;
        this.hp = save.hp;
        this.act = save.act;
        this.ap = save.ap;
    }
    addTime(t, dungeonID) {
        if (this.dead()) {
            this.act = 0;
            this.ap = 0;
            return;
        }
        this.act += t;
        if (this.act >= this.actmax()) {
            this.act -= this.actmax();
            CombatManager.mobAttack(this, dungeonID);
        }
    }
    actmax() {
        return this.actTime;
    }
    getPow() {
        return this.pow;
    }
    pic() {
        return this.image;
    }
    dead() {
        return this.hp === 0;
    }
    alive() {
        return this.hp > 0;
    }
    maxHP() {
        return this.hpmax;
    }
    deadCheck() {
        if (this.hp > 0 || this.status === MobState.DEAD) return;
        this.status = MobState.DEAD;
        this.rollDrops();
        party.addXP(this.lvl);
    }
    rollDrops(dungeon) {
        if (this.drops === null) return;
        for (const [material, success] of Object.entries(this.drops)) {
            const roll = Math.floor(Math.random() * 100);
            if (success > roll) dungeon.addDungeonDrop(material,1);
        }
    }
    healCost() {
        return 0;
    }
}
