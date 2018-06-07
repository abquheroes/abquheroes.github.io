"use strict";

class Dungeon {
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

const dungeon = {
    "CatDungeon" : [cat,cat,cat],
}

dungeonImageReference = {
    "ticket1" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/books/book_1.png">',
}