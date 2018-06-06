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

const heroes = [];

const Abqu = new Hero("Abqu",10,10,10);
Abqu.class = Class.FIGHTER;
heroes.push[Abqu];