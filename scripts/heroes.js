"use strict";

class Hero {
    constructor (props) {
        Object.assign(this, props);
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
        //this.target = TargetType.FIRST;
        this.slot1Type = [ItemType.KNIFE,ItemType.MACE,ItemType.AXE,ItemType.WAND];
        this.slot2Type = [ItemType.HAT,ItemType.HELMET,ItemType.ARMOR];
        this.slot3Type = [ItemType.WARD,ItemType.PENDANT];
        this.slot1 = null;
        this.slot2 = null;
        this.slot3 = null;
        this.image = '<img src="images/heroes/'+this.id+'.gif">';
        this.head = '<img src="images/heroes/head/'+"oren"+'head.png">';
        this.owned = true;
    }
    power() {
        return this.pow;
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
        if (type === DamageType.PHYSICAL) {
            dmg -= this.armor;
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
    getEquipSlots() {
        //return an object with 
        const equip = {};
        equip["HEAD"] = this.slot1 || "Empty";
        equip["WEAPON"] = this.slot2 || "Empty";
        equip["FEET"] = this.slot3 || "Empty";
        return equip;
    }
}

const HeroManager = {
    heroes : [],
    addHero(hero) {
        this.heroes.push(hero);
    },
    ownAllHeroes() {
        this.heroes.forEach(hero => {
            hero.owned = true;
        });
    },
    heroOwned(ID) {
        if (party.hasMember(member)) return false;
        return true;
    },
    idToHero(ID) {
        for (let i=0;i<this.heroes.length;i++) {
            if (this.heroes[i].id === ID) return this.heroes[i];
        }
        return null;
    }

}

const $heroList = $("#heroList");

function initializeHeroList() {
    HeroManager.ownAllHeroes();
    HeroManager.heroes.forEach(hero => {
        const d = $("<div/>").addClass("heroOwnedCard").attr("data-value",hero.id);
        const d1 = $("<div/>").addClass("heroOwnedImage").html(hero.image);
        const d2 = $("<div/>").addClass("heroOwnedName").html(hero.name);
        d.append(d1,d2);
        if (!hero.owned) d.hide();
        $heroList.append(d);
    })
}

function refreshHeroes() {
    $hiredHeroes.empty();
    for (let i=0;i<heroProgress.length;i++) {
        const hero = heroProgress[i];
        const d = $("<div/>").addClass("heroOwnCard");
        const d1 = $("<div/>").addClass("heroOwnName").html(hero.name);
        const d2 = $("<div/>").addClass("heroOwneImage").html(hero.image);
        const d3 = $("<div/>").addClass('heroLvl').html("L"+hero.lvl + " (" +hero.xp +" xp)");
        const d4 = $("<div/>").addClass("heroOwneRole").html("Role: " + hero.role);
        d.append(d1,d2,d3,d4)
        $hiredHeroes.append(d);
    }
}

const $heroCard = $("#heroCard");

function examineHero(ID) {
    const hero = HeroManager.idToHero(ID);
    $heroCard.empty();
    const upperDiv = $("<div/>").addClass("heroExamineTop");
    const d1 = $("<div/>").addClass("heroExamineImage").html(hero.image);
    const d2 = $("<div/>").addClass("heroExamineName").html(hero.name);
    const d3 = $("<div/>").addClass("heroExamineLvlClass").html("Lv&nbsp;"+hero.lvl+"&nbsp;"+hero.class);
    const d4 = $("<div/>").addClass("heroExamineExp").html("Exp: "+hero.xp);
    upperDiv.append(d1,d2,d3,d4);
    const middleDiv = $("<div/>").addClass("heroExamineStats");
    const htd = $("<div/>").addClass("heroExamineHeading");
    const htd1 = $("<div/>").addClass("heroExamineStatHeading").html("STAT");
    const htd2 = $("<div/>").addClass("heroExamineStatValueHeading").html("VALUE");
    middleDiv.append(htd.append(htd1,htd2));
    const stats = [hero.hpmax,hero.pow, hero.apmax, hero.actmax, hero.armor, hero.crit, hero.critdmg, hero.dodgeChance];
    const statName = ["HP","POW","AP","ACT","ARMOR","CRIT","CRDMG","DODGE"];
    for (let i=0;i<stats.length;i++) {
        middleDiv.append(statRow(statName[i],stats[i]));
    }
    const lowerDiv = $("<div/>").addClass("heroExamineEquip");
    const slots = hero.getEquipSlots();
    $.each(slots, (slotName,equip) => {
        const d5 = $("<div/>").addClass("heroExamineEquipment").attr("data-value",slotName);
        const d5a = $("<div/>").addClass("heroExamineEquipmanetSlot").html(slotName);
        const d5b = $("<div/>").addClass("heroExamineEquipmentEquip").html(equip);
        lowerDiv.append(d5.append(d5a,d5b));
    });
    $heroCard.append(upperDiv,middleDiv,lowerDiv);
    //const lowestDiv = $("<div/>").addClass("heroExamineEquipmentSelector");
}
function statRow(name,value) {
    const d1 = $("<div/>").addClass("heroExamineStatRow");
    const d2 = $("<div/>").addClass("heroExamineStatRowName").html(name);
    const d3 = $("<div/>").addClass("heroExamineStatRowValue").html(value);
    return d1.append(d2,d3);
}

$(document).on('click', "div.heroOwnedCard", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("data-value");
    $(".heroOwnedCard").removeClass("highlight");
    $(e.currentTarget).addClass("highlight");
    examineHero(ID);
});





/*function generateHeroIDList() {
    //this is a list of all IDs the player doesn't own yet
    const possibleIDs = Object.keys(heroBase);
    const ownedIDs = [];
    for (let i=0;i<heroProgress.length;i++) {
        ownedIDs.push(heroProgress[i].id);
    }
    return possibleIDs.filter(x => !ownedIDs.includes(x));
}*/