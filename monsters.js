"use strict";

class Monster {
    constructor(name,atk,hp) {
        this.name = name;
        this.atk = atk;
        this.hp = hp;
        this.maxhp = hp;
    }
    get atk() {
        return this.atk;
    }
    get name() {
        return this.name;
    }
    get hp() {
        return this.hp;
    }
}

const monsters = [];

const cat = new Hero("CatMonster",10,10,10);
monsters.push[cat];