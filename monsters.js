"use strict";

class Monster {
    constructor(name,atk,hp) {
        this.name = name;
        this.atk = atk;
        this.hp = hp;
        this.maxhp = hp;
    }
    get Atk() {
        return this.atk;
    }
    get Name() {
        return this.name;
    }
    get HP() {
        return this.hp;
    }
}

const monsters = [];

const cat = new Monster("CatMonster",10,10,10);
monsters.push[cat];