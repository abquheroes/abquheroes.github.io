"use strict";

const Class = Object.freeze({"FIGHTER":"Fighter", "CASTER":"Caster", "THIEF":"Thief",})

const heroBase = {
  "H001" : ["Abqu",Class.FIGHTER],
  "H002" : ["Katie",Class.CASTER],
  "H003" : ["Bloop",Class.THIEF],
}

class OwnedHero {
    constructor (name, id, role, lvl, xp, might, mind, moxie) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.lvl = lvl;
        this.xp = xp;
        this.might = might;
        this.mind = mind;
        this.moxie = moxie;
    }
}


//we need code to generate heroes, purchase heroes and add them to your progress. Progress is going to have

const heroImageReference = {
    "H001" : '<img src="workers/oren.gif">',
    "H002" : '<img src="workers/eryn.gif">',
    "H003" : '<img src="workers/herbie.gif">',
}

let currentToHire = null;

function generateHero() {
  const heroNames = Object.keys(heroBase);
  const id = heroNames[Math.floor(Math.random() * heroNames.length)];
  const name = heroBase[id][0];
  const role = heroBase[id][1];
  const might = rollDice(3,6);
  const mind = rollDice(3,6);
  const moxie = rollDice(3,6);
  return new OwnedHero(name,id,role,1,0,might,mind,moxie);
}

const $rollHero = $("#rollHero");
const $hireHero = $("#hireHero");
const $heroShop = $("#heroShop");

$rollHero.click((e) => {
    console.log("TRIGGER");
    e.preventDefault();
    currentToHire = generateHero();
    $heroShop.empty();
    const d1 = $("<div/>").addClass("heroHireName").html(currentToHire.name);
    const d2 = $("<div/>").addClass("heroHireImage").html(heroImageReference[currentToHire.id]);
    const d3 = $("<div/>").addClass("heroHireRole").html("Role: " + currentToHire.role);
    const d4 = $("<div/>").addClass("heroHireMight").html("Might: " + currentToHire.might);
    const d5 = $("<div/>").addClass("heroHireMind").html("Mind: " + currentToHire.mind);
    const d6 = $("<div/>").addClass("heroHireMoxie").html("Moxie: " + currentToHire.moxie);
    $heroShop.append(d1);
    $heroShop.append(d2);
    $heroShop.append(d3);
    $heroShop.append(d4);
    $heroShop.append(d5);
    $heroShop.append(d6);
});



function rollDice(number, sides) {
  let total = 0;
  while(number-- > 0) total += Math.floor(Math.random() * sides) + 1;
  return total;
}
