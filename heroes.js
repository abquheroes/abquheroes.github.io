"use strict";

const Class = Object.freeze({"FIGHTER":"Fighter", "CASTER":"Caster", "THIEF":"Thief",})

const heroBase = {
  "H001" : ["Abqu",Class.FIGHTER],
  "H002" : ["Katie",Class.CASTER],
  "H003" : ["Bloop",Class.THIEF],
  "H999" : ["Empty",null],
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
    get hp() {
        return 10;
    }
    get atk() {
        if (this.role == Class.FIGHTER) return this.might;
        else if (this.role == Class.CASTER) return this.mind;
        else if (this.role == Class.THIEF) return this.moxie;
    }
    roll(stat) {
        let n = this.moxie;
        if (stat == Stat.MIGHT) n = this.might;
        else if (stat == Stat.MIND) n = this.mind;
        return randomNormal(Math.floor(n*0.75),Math.ceil(n*1.25));
    }
}

//we need code to generate heroes, purchase heroes and add them to your progress. Progress is going to have

const heroImageReference = {
    "H001" : '<img src="workers/oren.gif">',
    "H002" : '<img src="workers/eryn.gif">',
    "H003" : '<img src="workers/herbie.gif">',
    "H999" : '<img src="workers/blackoutline.png">',
}

const $heroList = $("#heroList");
const $heroCard = $("#heroCard");

function initializeHero() {
    ownAllHeroes();
    for (const [ID, props] of Object.entries(heroBase)) {
        const d = $("<div/>").addClass("heroOwnedCard").attr("data-value",ID);
        const d1 = $("<div/>").addClass("heroOwnedImage").html(heroImageReference[ID]);
        const d2 = $("<div/>").addClass("heroOwnedName").html(props[0]);
        d.append(d1,d2);
        if (!playerOwnsHero(ID)) d.hide();
        $heroList.append(d);        
    }
}

function playerOwnsHero(ID) {
    for (let i=0;i<heroProgress.length;i++) {
        if (heroProgress[i].id == ID) return true;
    }
    return false;
}

function heroOwnedbyID(ID) {
    for (let i=0;i<heroProgress.length;i++) {
        if (heroProgress[i].id == ID) return heroProgress[i];
    }
    console.log("ERROR: No hero for that ID found");
    return null;
}

function ownAllHeroes() {
    for (let i=0;i<Object.keys(heroBase).length;i++) {
        heroProgress.push(generateHero());
    }
}

function generateHero() {
    const possibleID = generateHeroIDList();
    const id = possibleID[Math.floor(Math.random() * possibleID.length)];
    const name = heroBase[id][0];
    const role = heroBase[id][1];
    const might = rollDice(3,6);
    const mind = rollDice(3,6);
    const moxie = rollDice(3,6);
    return new OwnedHero(name,id,role,might,mind,moxie);
}

function generateHeroIDList() {
    //this is a list of all IDs the player doesn't own yet
    const possibleIDs = Object.keys(heroBase);
    const ownedIDs = [];
    for (let i=0;i<heroProgress.length;i++) {
        ownedIDs.push(heroProgress[i].id);
    }
    return possibleIDs.filter(x => !ownedIDs.includes(x));
}

$(document).on('click', "div.heroOwnedCard", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("data-value");
    $(".heroOwnedCard").removeClass("highlight");
    $(e.currentTarget).addClass("highlight");
    $heroCard.html(displayHeroCard(ID));
});

function displayHeroCard(ID) {
    const heroCard = $("<div/>").addClass("heroCard");
    const hero = heroOwnedbyID(ID);
    const d1 = $("<div/>").addClass("hcName").html(hero.name);
    const d2 = $("<div/>").addClass("hcImage").html(heroImageReference[ID]);
    const d3 = $("<div/>").addClass("hcClassLvl").html("L"+hero.lvl+" "+hero.role);
    const d4 = $("<div/>").addClass("hcStats");
    const d4a = $("<div/>").addClass("hcStatsHP").html("HP: "+hero.hp);
    const d4b = $("<div/>").addClass("hcStatsATK").html("ATK: "+hero.atk);
    const d4c = $("<div/>").addClass("hcStatsMight").html("MIGHT: "+hero.might);
    const d4d = $("<div/>").addClass("hcStatsMind").html("MIND: "+hero.mind);
    const d4e = $("<div/>").addClass("hcStatsMoxie").html("MOXIE: "+hero.moxie);
    d4.append(d4a,d4b,d4c,d4d,d4e);
    const d5 = $("<div/>").addClass("hcEquip").html("Equip goes here?");
    heroCard.append(d1,d2,d3,d4,d5);
    return heroCard;
}

function refreshHeroes() {
    $hiredHeroes.empty();
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
        $hiredHeroes.append(d);
    }
}


function rollDice(number, sides) {
  let total = 0;
  while(number-- > 0) total += Math.floor(Math.random() * sides) + 1;
  return total;
}
