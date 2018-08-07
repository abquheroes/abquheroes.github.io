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
        this.slot1 = null;
        this.slot2 = null;
        this.slot3 = null;
        this.image = '<img src="images/heroes/'+this.id+'.gif">';
        this.head = '<img src="images/heroes/heads/'+this.id+'.png">';
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
        equip["WEAPON"] = this.slot1 || "Empty";
        equip["ARMOR"] = this.slot2 || "Empty";
        equip["ACCESSORY"] = this.slot3 || "Empty";
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
        const d1 = $("<div/>").addClass("heroOwnedImage").html(hero.head);
        const d2 = $("<div/>").addClass("heroOwnedName").html(hero.name);
        d.append(d1,d2);
        if (!hero.owned) d.hide();
        $heroList.append(d);
    });
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
    const upperLeftDiv = $("<div/>").addClass("heroExamineTop");
    const d1 = $("<div/>").addClass("heroExamineImage").html(hero.image);
    const d2 = $("<div/>").addClass("heroExamineName").html(hero.name);
    const d3 = $("<div/>").addClass("heroExamineLvlClass").html("Lv&nbsp;"+hero.lvl+"&nbsp;"+hero.class);
    const d4 = $("<div/>").addClass("heroExamineExp").html("Exp: "+hero.xp);
    upperLeftDiv.append(d1,d2,d3,d4);
    const upperRightDive = $("<div/>").addClass("heroExamineStats");
    const htd = $("<div/>").addClass("heroExamineHeading");
    const htd1 = $("<div/>").addClass("heroExamineStatHeading").html("STAT");
    const htd2 = $("<div/>").addClass("heroExamineStatValueHeading").html("VALUE");
    upperRightDive.append(htd.append(htd1,htd2));
    const stats = [hero.hpmax,hero.pow, hero.apmax, hero.actmax, hero.armor, hero.crit, hero.critdmg, hero.dodgeChance];
    const statName = ["HP","POW","AP","ACT","ARMOR","CRIT","CRDMG","DODGE"];
    for (let i=0;i<stats.length;i++) {
        upperRightDive.append(statRow(statName[i],stats[i]));
    }
    const lowerDiv = $("<div/>").addClass("heroExamineEquip");
    const slots = hero.getEquipSlots();
    $.each(slots, (slotName,equip) => {
        const d5 = $("<div/>").addClass("heroExamineEquipment").attr("data-value",slotName).attr("heroID",ID);
        const d5a = $("<div/>").addClass("heroExamineEquipmentSlot").html(slotName);
        const d5b = $("<div/>").addClass("heroExamineEquipmentEquip").html(equip);
        const d6 = $("<div/>").addClass("heroExamineEquipmentList");
        lowerDiv.append(d5.append(d5a,d5b),d6);
    });
    $heroCard.append(upperLeftDiv,upperRightDive,lowerDiv);
    $heroEquipmentList.empty();
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

$(document).on('click', "div.heroExamineEquipment", (e) => {
    e.preventDefault();
    const slot = $(e.currentTarget).attr("data-value");
    const heroID = $(e.currentTarget).attr("heroID");
    displayEquipChoices(heroID,slot);
});

const $heroEquipmentList = $("#heroEquipmentList");

function examineHeroPossibleEquip() {
    $heroEquipmentList.empty();
    //cycle through everything in bp's and make the div for it
    const table = $('<div/>').addClass('recipeTable');
    const htd1 = $('<div/>').addClass('recipeHeadName').html("NAME");
    const htd2 = $('<div/>').addClass('recipeHeadCost').html("COST");
    const htd3 = $('<div/>').addClass('recipeHeadTime').html("TIME");
    const htd4 = $('<div/>').addClass('recipeHeadValue').html("VALUE");
    const hrow = $('<div/>').addClass('recipeHeader').append(htd1,htd2,htd3,htd4);
    table.append(hrow);
    recipeList.recipes.forEach((recipe) => {
        const td1 = $('<div/>').addClass('recipeName').attr("id",recipe.id).append(recipe.itemPicName());
        const td2 = $('<div/>').addClass('recipecostdiv').html(recipe.visualizeCost());
        const td3 = $('<div/>').addClass('recipeTime').html(msToTime(recipe.craftTime))
        const td4 = $('<div/>').addClass('recipeValue').html(recipe.imageValue());
        const row = $('<div/>').addClass('recipeRow').attr("id",recipe.id).append(td1,td2,td3,td4);
        table.append(row);
    });
    $RecipeResults.append(table);
}