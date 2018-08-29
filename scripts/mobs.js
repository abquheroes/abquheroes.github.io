"use strict";
const DamageType = Object.freeze({PHYSICAL:0,MAGIC:1});

const monsterDB = [];

const MobManager = {
    monsterDB : [],
    addMob(mob) {
        this.monsterDB.push(mob);
    },
    getMonster(floor) {
        const mobTemplate = this.monsterDB[Math.floor(Math.random()*this.monsterDB.length)];
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
    }
}

class Mob {
    constructor (lvl,mobTemplate) {
        this.lvl = lvl;
        this.name = mobTemplate.name;
        this.id = mobTemplate.id;
        this.image = mobTemplate.image;
        this.pow = Math.floor(mobTemplate.powBase + mobTemplate.powLvl*lvl);
        this.hpmax = Math.floor(mobTemplate.hpBase + mobTemplate.hpLvl*lvl);
        this.hp = this.hpmax;
        this.actmax = mobTemplate.act;
        this.act = 0;
        this.armor = mobTemplate.armor;
        this.critdmg = mobTemplate.critdmg;
        this.dodge = mobTemplate.dodge;
        this.target = mobTemplate.target;
        this.apmax = mobTemplate.ap;
        this.ap = 0;
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
        if (this.act >= this.actmax) {
            this.act -= this.actmax;
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
}

function getTarget(party,type) {
    console.log(party);
    if (type === "first") {
        for (let i=0;i<party.length;i++) {
            if (party[i].alive()) {
                return party[i];
            }
        }
    }
    else if (type === "reverse") {
        for (let i=party.length;i>0;i--) {
            if (party[i].alive()) return party[i];
        }
    }
    else if (type === "random") {
        return party[Math.floor(Math.random()*party.length)];
    }
    else if (type === "highHP") {
        let highhp = 0;
        let chosen = null;
        for (let i=0;i<party.length;i++) {
            if (party[i].hp > highhp) {
                highhp = party[i].hp;
                chosen = party[i];
            }
        }
        return chosen;
    }
    else if (type === "lowHP") {
        let lowhp = 9999999999;
        let chosen = null;
        for (let i=0;i<party.length;i++) {
            if (party[i].hp < lowhp && party[i].hp > 0) {
                lowhp = party[i].hp;
                chosen = party[i];
            }
        }
        return chosen;
    }
}