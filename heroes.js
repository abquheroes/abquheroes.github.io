"use strict";

const Class = Object.freeze({"FIGHTER":"Fighter", "CASTER":"Caster", "THIEF":"Thief",})

const heroBase = {
  "H001" : ["Abqu",Class.FIGHTER],
  "H002" : ["Katie",Class.CASTER],
  "H003" : ["Bloop",Class.THIEF],
}

class OwnedHero {
    constructor (name, id, role, might, mind, moxie) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.lvl = 1;
        this.xp = 0;
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
  return new OwnedHero(name,id,role,might,mind,moxie);
}

const $rollHero = $("#rollHero");
const $hireHero = $("#hireHero");
const $heroShop = $("#heroShop");
const $hiredHeros = $("#hiredHeros");

$rollHero.click((e) => {
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

$hireHero.click((e) => {
    e.preventDefault();
    if (!currentToHire) return;
    heroProgress.push(currentToHire);
    currentToHire = null;
    $heroShop.empty();
    refreshHeroes();
});

function refreshHeroes() {
    $hiredHeros.empty();
    for (let i=0;i<heroProgress.length;i++) {
        const hero = heroProgress[i];
        console.log(hero);
        const d = $("<div/>").addClass("heroOwnCard");
        const d1 = $("<div/>").addClass("heroOwnName").html(hero.name);
        const d2 = $("<div/>").addClass("heroOwneImage").html(heroImageReference[hero.id]);
        const d3 = $("<div/>").addClass('heroLvl').html("L"+hero.lvl + " (" +hero.xp +" xp)");
        const d4 = $("<div/>").addClass("heroOwneRole").html("Role: " + hero.role);
        const d5 = $("<div/>").addClass("heroOwnMight").html("Might: " + hero.might);
        const d6 = $("<div/>").addClass("heroOwnMind").html("Mind: " + hero.mind);
        const d7 = $("<div/>").addClass("heroOwnMoxie").html("Moxie: " + hero.moxie);
        d.append(d1,d2,d3,d4,d5,d6,d7)
        $hiredHeros.append(d);
    }
}


function rollDice(number, sides) {
  let total = 0;
  while(number-- > 0) total += Math.floor(Math.random() * sides) + 1;
  return total;
}
