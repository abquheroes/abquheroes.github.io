"use strict";

const Class = Object.freeze({"FIGHTER":"Fighter", "CASTER":"Caster", "THIEF":"Thief",})

const heroBase = {
  // fighters
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
  "H014" : ["Cora",Class.FIGHTER],
  // casters
  "H101" : ["Caeda",Class.CASTER],
  "H102" : ["Zoe",Class.CASTER], // fae gif
  "H103" : ["Finn",Class.CASTER],
  "H104" : ["Gunther",Class.CASTER],
  "H105" : ["Hank",Class.CASTER],
  "H106" : ["Neve",Class.CASTER],
  "H107" : ["Reid",Class.CASTER],
  "H108" : ["Rowan",Class.CASTER],
  "H109" : ["Titus",Class.CASTER],
  "H110" : ["Troy",Class.CASTER],
  "H111" : ["Zarlica",Class.CASTER],
  "H112" : ["Alora",Class.CASTER], // soora gif
  "H113" : ["Thamior",Class.CASTER],
  "H114" : ["Richard",Class.CASTER],
  // thieves
  "H201" : ["Alok",Class.THIEF],
  "H202" : ["Grogmar",Class.THIEF],
  "H203" : ["Igor",Class.THIEF],
  "H204" : ["Jasper",Class.THIEF],
  "H205" : ["John",Class.THIEF],
  "H206" : ["Lola",Class.THIEF],
  "H207" : ["Maeve",Class.THIEF],
  "H208" : ["Revere",Class.THIEF],
  "H209" : ["Sebastian",Class.THIEF],
  "H210" : ["Sophie",Class.THIEF],
  "H211" : ["Teagan",Class.THIEF],
  "H212" : ["Claudia",Class.THIEF], // zoe gif
  "H213" : ["Bloop",Class.THIEF],
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
        this.hpmax = 10;
    }
    get pow() {
        if (this.role == Class.FIGHTER) return this.might;
        else if (this.role == Class.CASTER) return this.mind;
        else if (this.role == Class.THIEF) return this.moxie;
    }
    get pic() {
        return heroImageReference[this.id];
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
    dead() {
        return this.hp === 0;
    }
}

//we need code to generate heroes, purchase heroes and add them to your progress. Progress is going to have

const heroImageReference = {
    // fighters
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
    "H014" : '<img src="heroes/cora.gif">',
    // casters
    "H101" : '<img src="heroes/caeda.gif">',
    "H102" : '<img src="heroes/fae.gif">', // gif name is fae, char name is zoe
    "H103" : '<img src="heroes/finn.gif">',
    "H104" : '<img src="heroes/gunther.gif">',
    "H105" : '<img src="heroes/hank.gif">',
    "H106" : '<img src="heroes/neve.gif">',
    "H107" : '<img src="heroes/reid.gif">',
    "H108" : '<img src="heroes/rowan.gif">',
    "H109" : '<img src="heroes/titus.gif">',
    "H110" : '<img src="heroes/troy.gif">',
    "H111" : '<img src="heroes/zarlica.gif">',
    "H112" : '<img src="heroes/soora.gif">', // gif name soora, char name alora
    "H113" : '<img src="heroes/thamior.gif">',
    "H114" : '<img src="heroes/richard.gif">',
    // thieves
    "H201" : '<img src="heroes/alok.gif">',
    "H202" : '<img src="heroes/grogmar.gif">',
    "H203" : '<img src="heroes/igor.gif">',
    "H204" : '<img src="heroes/jasper.gif">',
    "H205" : '<img src="heroes/john.gif">',
    "H206" : '<img src="heroes/lola.gif">',
    "H207" : '<img src="heroes/maeve.gif">',
    "H208" : '<img src="heroes/revere.gif">',
    "H209" : '<img src="heroes/sebastian.gif">',
    "H210" : '<img src="heroes/sophie.gif">',
    "H211" : '<img src="heroes/teagan.gif">',
    "H212" : '<img src="heroes/zoe.gif">', // gif name is zoe, char name is claudia
    "H213" : '<img src="heroes/bloop.gif">',
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
