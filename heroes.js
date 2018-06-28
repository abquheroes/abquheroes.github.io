"use strict";

const Class = Object.freeze({"FIGHTER":"Fighter", "CASTER":"Caster", "THIEF":"Thief",})

const heroBase = {
  "H001" : ["Beorn",Class.FIGHTER],
  "H002" : ["Cedric",Class.FIGHTER],
  "H003" : ["Elda",Class.FIGHTER],
  "H004" : ["Elle",Class.FIGHTER],
  "H005" : ["Grim",Class.FIGHTER],
  "H006" : ["Lambug",Class.FIGHTER],
  "H007" : ["Luna",Class.FIGHTER],
  "H008" : ["Rey",Class.FIGHTER],
  "H009" : ["Rodney",Class.FIGHTER],
  "H010" : ["Ruby",Class.FIGHTER],
  "H011" : ["Shel",Class.FIGHTER],
  "H012" : ["Slate",Class.FIGHTER],
  "H013" : ["Viktor",Class.FIGHTER],
  "H014" : ["Caeda",Class.CASTER],
  "H015" : ["Fae",Class.CASTER],
  "H016" : ["Finn",Class.CASTER],
  "H017" : ["Gunther",Class.CASTER],
  "H018" : ["Nambra",Class.CASTER],
  "H019" : ["Neve",Class.CASTER],
  "H020" : ["Reid",Class.CASTER],
  "H021" : ["Rowan",Class.CASTER],
  "H022" : ["Titus",Class.CASTER],
  "H023" : ["Troy",Class.CASTER],
  "H024" : ["Zarlica",Class.CASTER],
  "H025" : ["Alok",Class.THIEF],
  "H026" : ["Grogmar",Class.THIEF],
  "H027" : ["Igor",Class.THIEF],
  "H028" : ["Jasper",Class.THIEF],
  "H029" : ["John",Class.THIEF],
  "H030" : ["Lola",Class.THIEF],
  "H031" : ["Maeve",Class.THIEF],
  "H032" : ["Revere",Class.THIEF],
  "H033" : ["Sebastian",Class.THIEF],
  "H034" : ["Sophie",Class.THIEF],
  "H035" : ["Soora",Class.THIEF],
  "H036" : ["Teagan",Class.THIEF],
  "H037" : ["Zoe",Class.THIEF],
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
        this.hp = 10;
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
    takeDamage(dmg) {
        this.hp -= dmg;
    }
}

//we need code to generate heroes, purchase heroes and add them to your progress. Progress is going to have

const heroImageReference = {
    "H001" : '<img src="heroes/beorn.gif">',
    "H002" : '<img src="heroes/cedric.gif">',
    "H003" : '<img src="heroes/elda.gif">',
    "H004" : '<img src="heroes/elle.gif">',
    "H005" : '<img src="heroes/grim.gif">',
    "H006" : '<img src="heroes/lambug.gif">',
    "H007" : '<img src="heroes/luna.gif">',
    "H008" : '<img src="heroes/rey.gif">',
    "H009" : '<img src="heroes/rodney.gif">',
    "H010" : '<img src="heroes/ruby.gif">',
    "H011" : '<img src="heroes/shel.gif">',
    "H012" : '<img src="heroes/slate.gif">',
    "H013" : '<img src="heroes/viktor.gif">',
    "H014" : '<img src="heroes/caeda.gif">',
    "H015" : '<img src="heroes/fae.gif">',
    "H016" : '<img src="heroes/finn.gif">',
    "H017" : '<img src="heroes/gunther.gif">',
    "H018" : '<img src="heroes/nambra.gif">',
    "H019" : '<img src="heroes/neve.gif">',
    "H020" : '<img src="heroes/reid.gif">',
    "H021" : '<img src="heroes/rowan.gif">',
    "H022" : '<img src="heroes/titus.gif">',
    "H023" : '<img src="heroes/troy.gif">',
    "H024" : '<img src="heroes/zarlica.gif">',
    "H025" : '<img src="heroes/alok.gif">',
    "H026" : '<img src="heroes/grogmar.gif">',
    "H027" : '<img src="heroes/igor.gif">',
    "H028" : '<img src="heroes/jasper.gif">',
    "H029" : '<img src="heroes/john.gif">',
    "H030" : '<img src="heroes/lola.gif">',
    "H031" : '<img src="heroes/maeve.gif">',
    "H032" : '<img src="heroes/revere.gif">',
    "H033" : '<img src="heroes/sebastian.gif">',
    "H034" : '<img src="heroes/sophie.gif">',
    "H035" : '<img src="heroes/soora.gif">',
    "H036" : '<img src="heroes/teagan.gif">',
    "H037" : '<img src="heroes/zoe.gif">',
}

const $heroList = $("#heroList");
const $heroCard = $("#heroCard");

function initializeHero() {
    ownAllHeroes();
    for (const [ID, props] of Object.entries(heroBase)) {
        if (ID === "H999") continue;
        const d = $("<div/>").addClass("heroOwnedCard").attr("data-value",ID);
        const d1 = $("<div/>").addClass("heroOwnedImage").html(heroImageReference[ID]);
        const d2 = $("<div/>").addClass("heroOwnedName").html(props[0]);
        d.append(d1,d2);
        if (!playerOwnsHero(ID)) d.hide();
        $heroList.append(d);        
    }
}

function memberAvailable(member) {
    if (member === "H999") return false;
    if (party.hasMember(member)) return false;
    return true;
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
