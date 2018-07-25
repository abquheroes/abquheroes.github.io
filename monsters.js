"use strict";

const TargetType = Object.freeze({FIRST:0, REVERSE:1, RANDOM:3, HIGHP:4, LOWHP:5});

const monsterDB = [];
function MonsterTemplate() {
    this.name = "Empty";
    this.image = ""
    this.id = "M999";
    this.hpFactor = 1;
    this.powFactor = 1;
    this.ap = 5;
    this.act = 5;
    this.target = TargetType.FIRST;
}

const alien = new MonsterTemplate();
alien.name      = "Alien";
alien.image     = "alien.gif";
alien.id        = "M001";
alien.hpFactor  = 1.1;
alien.powFactor = 1.5;
alien.ap        = 3;
alien.act       = 5000;
monsterDB.push(alien);

const badLady = new MonsterTemplate();
badLady.name      = "Bad Lady";
badLady.image     = "badlady.gif";
badLady.id        = "M002";
badLady.hpFactor  = 1.0;
badLady.powFactor = 1.7;
badLady.ap        = 4;
badLady.act       = 3000;
monsterDB.push(badLady);

const bat = new MonsterTemplate();
bat.name      = "Bat";
bat.image     = "bat.gif";
bat.id        = "M003";
bat.hpFactor  = 0.7;
bat.powFactor = 1.0;
bat.ap        = 7;
bat.act       = 1000;
monsterDB.push(bat);

const executioner = new MonsterTemplate();
executioner.name      = "Executioner";
executioner.image     = "execute.gif";
executioner.id        = "M004";
executioner.hpFactor  = 2;
executioner.powFactor = 1.1;
executioner.ap        = 3;
executioner.act       = 7000;
monsterDB.push(executioner);

const knight = new MonsterTemplate();
knight.name      = "Knight";
knight.image     = "knight.gif";
knight.id        = "M005";
knight.hpFactor  = 2;
knight.powFactor = 1.5;
knight.ap        = 2;
knight.act       = 6000;
monsterDB.push(knight);


class Monster {
    constructor(name,id,img,hp,pow,ap,act,target) {
        this.name = name;
        this.id = id;
        this.image = '<img src="enemies/' + img + '">';
        this.hp = hp;
        this.hpmax = hp;
        this.power = pow;
        this.ap = 0;
        this.apmax = ap;
        this.act = 0;
        this.actmax = act;
        this.target = target;
    }
    pow() {
        return this.power;
    }
    pic() {
        return this.image;
    }
    addTime(t) {
        this.act += t;
        if (this.act >= this.actmax) {
            this.act -= this.actmax;
            return true;
        }
        return false;
    }
    attack(party) {
        //takes a list of mobs and executes an attack
        //this is just w/e right now...
        const target = getTarget(party,this.target);
        if (this.ap === this.apmax) {
            target.takeDamage(this.pow()*2);
            this.ap = 0;
        }
        else {
            this.ap += 1;
            target.takeDamage(this.pow());
        }
    }
    takeDamage(dmg) {
        this.hp = Math.max(this.hp-dmg,0);
    }
    dead() {
        return this.hp === 0;
    }
}

function getMonster(floor) {
    const mp = monsterDB[Math.floor(Math.random()*monsterDB.length)];
    return new Monster(mp.name,mp.id,mp.image,Math.floor(10+floor*mp.hpFactor),Math.floor(1+floor*mp.powFactor),mp.ap,mp.act,mp.target);
}

function getTarget(party,type) {
    console.log(type);
    if (type === TargetType.FIRST) {
        for (let i=0;i<party.length;i++) {
            if (party[i].alive()) {
                console.log(party[i].name, party[i].hp);
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