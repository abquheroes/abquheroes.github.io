"use strict";

const Class = Object.freeze({"FIGHTER":1, "CASTER":2, "THIEF":3,})

class Hero {
    constructor(name,might,mind,moxie) {
        this.name = name;
        this.might = might;
        this.mind = mind;
        this.moxie = moxie;
        this.hp = 10;
    }
    get might() {
        return this.might;
    }
    get mind() {
        return this.mind;
    }
    get moxie() {
        return this.moxie;
    }
}

class HeroProgress {
    constructor (name, id, role, lvl, xp, slot1, slot2, slot3, slot4) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.lvl = lvl;
        this.xp = xp;
        this.slot1 = slot1;
        this.slot2 = slot2;
        this.slot3 = slot3;
    }
}

const heroes = [];

const Abqu = new Hero("Abqu",10,10,10);
Abqu.class = Class.FIGHTER;
heroes.push[Abqu];