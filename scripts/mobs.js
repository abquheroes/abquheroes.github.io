"use strict";
const DamageType = Object.freeze({PHYSICAL:0,MAGIC:1});
const MobState = Object.freeze({DEAD:0,ALIVE:1});

const monsterDB = [];

const MobManager = {
    monsterDB : [],
    addMob(mob) {
        this.monsterDB.push(mob);
    },
    getMonster(floor) {
        const possibleMonster = this.monsterDB.filter(mob => mob.minFloor <= floor && mob.maxFloor >= floor);
        const mobTemplate = possibleMonster[Math.floor(Math.random()*possibleMonster.length)];
        return new Mob(floor,mobTemplate);
    },
    idToMob(id) {
        return this.monsterDB.find(mob => mob.id === id);
    },
}

class MobTemplate {
    constructor (props) {
        Object.assign(this, props);
        this.image = '<img src="images/enemies/' + this.id + '.gif">';
        this.head = '<img src="images/enemies/heads/' + this.id + '.png">';
    }
}

class Mob {
    constructor (lvl,mobTemplate) {
        this.lvl = lvl;
        this.name = mobTemplate.name;
        this.id = mobTemplate.id;
        this.image = mobTemplate.image;
        this.head = mobTemplate.head;
        this.drops = mobTemplate.drops;
        this.pow = Math.floor(mobTemplate.powBase + mobTemplate.powLvl*lvl);
        this.hpmax = Math.floor(mobTemplate.hpBase + mobTemplate.hpLvl*lvl);
        this.hp = this.hpmax;
        this.actmaxnum = mobTemplate.act;
        this.act = 0;
        this.armor = mobTemplate.armor;
        this.critdmg = mobTemplate.critdmg;
        this.dodge = mobTemplate.dodge;
        this.target = mobTemplate.target;
        this.apmax = mobTemplate.ap;
        this.ap = 0;
        this.status = MobState.ALIVE;
    }
    actmax() {
        return this.actmaxnum;
    }
    getPow() {
        return this.pow;
    }
    pic() {
        return this.image;
    }
    addTime(t) {
        if (this.dead()) return false;
        this.act += t;
        if (this.act >= this.actmax()) {
            this.act -= this.actmax();
            return true;
        }
        return false;
    }
    dead() {
        return this.hp === 0;
    }
    alive() {
        return this.hp > 0;
    }
    attack(party) {
        //takes a list of mobs and executes an attack on one of them
        //todo: more than one...
        const target = getTarget(party,this.target);
        const dmg = this.critical(this.getPow());
        if (this.ap === this.apmax) {
            target.takeDamage(DamageType.MAGIC,dmg*2);
            this.ap = 0;
        }
        else {
            this.ap += 1;
            target.takeDamage(DamageType.PHYSICAL,dmg);
        }
    }
    takeDamage(type,dmg) {
        if (type === DamageType.PHYSICAL) {
            dmg -= this.armor;
            if (!this.dodgeCheck()) this.hp = Math.max(this.hp-dmg,0);
        }
        else {
            this.hp = Math.max(this.hp-dmg,0);
        }
        this.deadCheck();
        refreshHPBar(this);
    }
    dodgeCheck() {
        return this.dodgeChance > Math.floor(Math.random()*100) + 1;
    }
    critical(dmg) {
        if (this.crit > Math.floor(Math.random()*100) + 1) {
            dmg = dmg*this.critdmg
        }
        return dmg;
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
    rollDrops() {
        if (this.drops === null) return;
        for (const [material, success] of Object.entries(this.drops)) {
            const roll = Math.floor(Math.random() * 100);
            if (success > roll) {
                DungeonAssist.addDungeonDrop(material,1);
            }
        }
    }
    healCost() {return};
}

function getTarget(party,type) {
    if (type === "first") {
        return party.filter(hero => hero.alive())[0]
    }
    else if (type === "reverse") {
        for (let i=party.length;i>0;i--) {
            if (party[i].alive()) return party[i];
        }
    }
    else if (type === "random") {
        return party[Math.floor(Math.random()*party.length)];
    }
    else if (type === "highhp") {
        return party.sort((a,b) => {return b.hp - a.hp})[0];
    }
    else if (type === "lowhp") {
        return party.sort((a,b) => {return a.hp - b.hp})[0];
    }
}