"use strict";

class Monster {
    constructor(name,id,hp,pow,ap,act) {
        this.name = name;
        this.id = id;
        this.hp = hp;
        this.hpmax = hp;
        this.pow = pow;
        this.ap = 0;
        this.apmax = ap;
        this.act = 0;
        this.actmax = act;
        this.might = 5;
        this.mind = 5;
        this.moxie = 5;
    }
    waffle() {
        console.log("fire");
        return monsterImageReference[this.name];
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
        party[0].takeDamage(this.pow());
    }
    takeDamage(dmg) {
        this.hp = Math.max(this.hp-dmg,0);
    }
}

const alien = ["Alien","M001",10,1,4,5];
const bl = ["Bad Lady","M002",15,2,4,7];
const bat = ["Bat","M003",5,1,2,3];
const exe = ["Executioner","M004",25,5,5,15];
const knight = ["Knight","M005",20,3,7,5];
const monsterDB = [alien,bl,bat,exe,knight];

const monsterImageReference = {
    // fighters
    "Alien" : '<img src="enemies/alien.gif">',
    "Bad Lady" : '<img src="enemies/badlady.gif">',
    "Bat" : '<img src="enemies/bat.gif">',
    "Executioner" : '<img src="enemies/execute.gif">',
    "Knight" : '<img src="enemies/knight.gif">',
}

function getMonster() {
    const mp = monsterDB[Math.floor(Math.random()*monsterDB.length)];
    return new Monster(mp[0],mp[1],mp[2],mp[3],mp[4],mp[5]);
}