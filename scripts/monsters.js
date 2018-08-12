"use strict";

const TargetType = Object.freeze({FIRST:0, REVERSE:1, RANDOM:3, HIGHP:4, LOWHP:5});
const DamageType = Object.freeze({PHYSICAL:0,MAGIC:1});

const monsterDB = [];
function MonsterTemplate() {
    this.name = "Empty";
    this.image = ""
    this.id = "M999";
    this.hpFactor = [1,1];
    this.powFactor = [1,1];
    this.ap = 5;
    this.act = 5;
    this.target = TargetType.FIRST;
}

const alien = new MonsterTemplate();
alien.name      = "Alien";
alien.image     = "alien.gif";
alien.id        = "M001";
alien.hpFactor  = [1.1,40];
alien.powFactor = [1,4];
alien.ap        = 3;
alien.act       = 6000;
alien.armor     = 0;
alien.crit      = 5;
alien.critdmg   = 1.5;
alien.dodgeChance = 5;
alien.target    = TargetType.FIRST;
monsterDB.push(alien);

const badLady = new MonsterTemplate();
badLady.name      = "Bad Lady";
badLady.image     = "badlady.gif";
badLady.id        = "M002";
badLady.hpFactor  = [1.0,60];
badLady.powFactor = [1.5,3];
badLady.ap        = 4;
badLady.act       = 6000;
badLady.armor     = 3;
badLady.crit      = 10;
badLady.critdmg   = 3;
badLady.dodgeChance = 5;
badLady.target    = TargetType.HIGHHP;
monsterDB.push(badLady);

const bat = new MonsterTemplate();
bat.name      = "Bat";
bat.image     = "bat.gif";
bat.id        = "M003";
bat.hpFactor  = [1,25];
bat.powFactor = [0.5,1];
bat.ap        = 7;
bat.act       = 2000;
bat.armor     = 0;
bat.crit      = 20;
bat.critdmg   = 1.2;
bat.dodgeChance = 10;
bat.target    = TargetType.RANDOM;
monsterDB.push(bat);

const executioner = new MonsterTemplate();
executioner.name      = "Executioner";
executioner.image     = "execute.gif";
executioner.id        = "M004";
executioner.hpFactor  = [3,60];
executioner.powFactor = [2,4];
executioner.ap        = 3;
executioner.act       = 7000;
executioner.armor     = 5;
executioner.crit      = 10;
executioner.critdmg   = 2.5;
executioner.dodgeChance = 5;
executioner.target    = TargetType.LOWHP;
monsterDB.push(executioner);

const knight = new MonsterTemplate();
knight.name      = "Knight";
knight.image     = "knight.gif";
knight.id        = "M005";
knight.hpFactor  = [5,80];
knight.powFactor = [1,4];
knight.ap        = 2;
knight.act       = 8000;
knight.armor     = 8;
knight.crit      = 2;
knight.critdmg   = 2;
knight.dodgeChance = 0;
knight.target    = TargetType.FIRST;
monsterDB.push(knight);


class Monster {
    constructor(name,id,img,hp,pow,ap,act,target) {
        this.name = name;
        this.id = id;
        this.image = '<img src="enemies/' + img + '">';
        this.hp = hp;
        this.hpmax = hp;
        this.pow = pow;
        this.ap = 0;
        this.apmax = ap;
        this.act = 0;
        this.actmax = act;
        this.target = target;
        this.armor = 0;
        this.crit = 5;
        this.critdmg = 2;
        this.dodgeChance = 0;
    }
    power() {
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
        const dmg = this.critical(this.power());
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
            if (!this.dodge()) this.hp = Math.max(this.hp-dmg,0);
        }
        else {
            this.hp = Math.max(this.hp-dmg,0);
        }
    }
    dodge() {
        return this.dodgeChance > Math.floor(Math.random()*100) + 1;
    }
    critical(dmg) {
        if (this.crit > Math.floor(Math.random()*100) + 1) {
            dmg = dmg*this.critdmg
        }
        return dmg;
    }
}

function getMonster(floor) {
    const mp = monsterDB[Math.floor(Math.random()*monsterDB.length)];
    const hp = Math.floor(floor*mp.hpFactor[0]+mp.hpFactor[1]);
    const pow = Math.floor(floor*mp.powFactor[0]+mp.powFactor[1]);
    return new Monster(mp.name,mp.id,mp.image,hp,pow,mp.ap,mp.act,mp.target);
}

function getTarget(party,type) {
    if (type === TargetType.FIRST) {
        for (let i=0;i<party.length;i++) {
            if (party[i].alive()) {
                return party[i];
            }
        }
    }
    else if (type === TargetType.REVERSE) {
        for (let i=party.length;i>0;i--) {
            if (party[i].alive()) return party[i];
        }
    }
    else if (type === TargetType.RANDOM) {
        return party[Math.floor(Math.random()*party.length)];
    }
    else if (type === TargetType.HIGHHP) {
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
    else if (type === TargetType.LOWHP) {
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