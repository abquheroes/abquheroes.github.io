"use strict";

const Class = Object.freeze({"FIGHTER":"Fighter", "CASTER":"Caster", "THIEF":"Thief",});

const heroBase = {
  // fighters
  "H001" : ["Beorn",Class.FIGHTER],
  "H002" : ["Cedric",Class.FIGHTER],
  "H003" : ["Grim",Class.FIGHTER],
  "H004" : ["Lambug",Class.FIGHTER],
  // casters
  "H101" : ["Zoe",Class.CASTER], // fae gif
  "H102" : ["Neve",Class.CASTER],
  "H103" : ["Titus",Class.CASTER],
  "H104" : ["Troy",Class.CASTER],
  // thieves
  "H201" : ["Alok",Class.THIEF],
  "H202" : ["Grogmar",Class.THIEF],
  "H203" : ["Revere",Class.THIEF],
  "H204" : ["Claudia",Class.THIEF], // zoe gif
  // null!
  "H999" : ["Empty",null],
}

class OwnedHero {
    constructor (name, id, role) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.lvl = 1;
        this.xp = 0;
        this.hp = 100;
        this.hpmax = 100;
        this.pow = 10;
        this.ap = 0;
        this.apmax = 5;
        this.act = 0;
        this.actmax = 5000;
        this.armor = 0;
        this.crit = 5;
        this.critdmg = 2;
        this.dodgeChance = 0;
        this.target = TargetType.FIRST;
        this.slot1Type = [ItemType.KNIFE,ItemType.MACE,ItemType.AXE,ItemType.WAND];
        this.slot2Type = [ItemType.HAT,ItemType.HELMET,ItemType.ARMOR];
        this.slot3Type = [];
    }
    power() {
        return this.pow;
    }
    pic() {
        return heroImageReference[this.id];
    }
    heal(hp) {
        this.hp = Math.min(this.hp+hp,this.hpmax);
    }
    dead() {
        return this.hp === 0;
    }
    alive() {
        return this.hp > 0;
    }
    addTime(t) {
        if (this.dead()) {
            this.act = 0;
            this.ap = 0;
            return false;
        }
        this.act += t;
        if (this.act >= this.actmax) {
            this.act -= this.actmax;
            return true;
        }
        return false;
    }
    attack(mobs) {
        //takes a list of mobs and executes an attack
        //this is just w/e right now...
        const target = getTarget(mobs,this.target);
        const dmg = this.critical(this.power());
        if (this.ap === this.apmax) {
            target.takeDamage(DamageType.MAGIC,dmg*2);
            this.ap = 0;
        }
        else {
            this.ap += 1;
            target.takeDamage(DamageType.PHYSICAL,dmg);
        }
    }
    takeDamage(type,dmg) {
        console.log(dmg);
        if (type === DamageType.PHYSICAL) {
            dmg -= this.armor;
            console.log(dmg);
            if (!this.dodge()) this.hp = Math.max(this.hp-dmg,0);
        }
        else {
            this.hp = Math.max(this.hp-dmg,0);
        }
    }
    dodge() {
        return this.dodgeChance > Math.floor(Math.random()*100) + 1;
    }
    critical(dmg) {
        if (this.crit > Math.floor(Math.random()*100) + 1) dmg = dmg*this.critdmg
        return dmg;
    }
}

//we need code to generate heroes, purchase heroes and add them to your progress. Progress is going to have

const heroImageReference = {
    // fighters
    "H001" : '<img src="heroes/beorn.gif">',
    "H002" : '<img src="heroes/cedric.gif">',
    "H003" : '<img src="heroes/grim.gif">',
    "H004" : '<img src="heroes/lambug.gif">',
    // casters
    "H101" : '<img src="heroes/caeda.gif">',
    "H102" : '<img src="heroes/neve.gif">',
    "H103" : '<img src="heroes/titus.gif">',
    "H104" : '<img src="heroes/troy.gif">',
    // thieves
    "H201" : '<img src="heroes/alok.gif">',
    "H202" : '<img src="heroes/grogmar.gif">',
    "H203" : '<img src="heroes/revere.gif">',
    "H204" : '<img src="heroes/zoe.gif">', // gif name is zoe, char name is claudia
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
    return new OwnedHero(name,id,role);
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

function displayHeroCard(ID) {
    const heroCard = $("<div/>").addClass("heroCard");
    const hero = heroOwnedbyID(ID);
    const d1 = $("<div/>").addClass("hcName").html(hero.name);
    const d2 = $("<div/>").addClass("hcImage").html(heroImageReference[ID]);
    const d3 = $("<div/>").addClass("hcClassLvl").html("L"+hero.lvl+" "+hero.role);
    const d4 = $("<div/>").addClass("hcStats");
    const d4a = $("<div/>").addClass("hcStatsHP").html("HP: "+hero.hp);
    const d4b = $("<div/>").addClass("hcStatsATK").html("ATK: "+hero.atk);
    d4.append(d4a,d4b);
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
        d.append(d1,d2,d3,d4)
        $hiredHeroes.append(d);
    }
}


function rollDice(number, sides) {
  let total = 0;
  while(number-- > 0) total += Math.floor(Math.random() * sides) + 1;
  return total;
}


$(document).on('click', "div.heroOwnedCard", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("data-value");
    $(".heroOwnedCard").removeClass("highlight");
    $(e.currentTarget).addClass("highlight");
    $heroCard.html(displayHeroCard(ID));
});