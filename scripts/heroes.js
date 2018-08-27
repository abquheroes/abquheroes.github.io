"use strict";

class Hero {
    constructor (props) {
        Object.assign(this, props);
        this.lvl = 1;
        this.xp = 0;
        this.hp = 100;
        this.hpmax = 100;
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
        this.slot4 = null;
        this.slot5 = null;
        this.slot6 = null;
        this.image = '<img src="images/heroes/'+this.id+'.gif">';
        this.head = '<img src="images/heroes/heads/'+this.id+'.png">';
        this.owned = true;
    }
    pow() {
        let pow = 10;
        if (this.slot1 !== null) pow += this.slot1.pow();
        if (this.slot2 !== null) pow += this.slot2.pow();
        if (this.slot3 !== null) pow += this.slot3.pow();
        if (this.slot4 !== null) pow += this.slot4.pow();
        if (this.slot5 !== null) pow += this.slot5.pow();
        if (this.slot6 !== null) pow += this.slot6.pow();
        return pow;
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
        return [this.slot1,this.slot2,this.slot3,this.slot4,this.slot5,this.slot6];
    }
    equip(item) {
        const type = item.type;
        if (this.slot1Type.includes(type)) this.slot1 = item;
        else if (this.slot2Type.includes(type)) this.slot2 = item;
        else if (this.slot3Type.includes(type)) this.slot3 = item;
        else if (this.slot4Type.includes(type)) this.slot4 = item;
        else if (this.slot5Type.includes(type)) this.slot5 = item;
    }
    unequip(slot) {
        console.log(slot);
        if (slot === 0) {
            this.slot1 = null;
            console.log(this.slot1);
        }
        else if (slot === 1) this.slot2 = null;
        else if (slot === 2) this.slot3 = null;
        else if (slot === 3) this.slot4 = null;
        else if (slot === 4) this.slot5 = null;
        else this.slot6 = null;
    }
    slotTypesByNum(num) {
        const slots = [this.slot1Type,this.slot2Type,this.slot3Type,this.slot4Type,this.slot5Type,this.slot6Type];
        return slots[num];
    }
    slotEmpty(slot) {
        return this.getEquipSlots()[slot] === null;
    }
    getSlot(slot) {
        return this.getEquipSlots()[slot];
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
    },
    equipItem(containerID,heroID) {
        const item = Inventory.equipItem(containerID);
        const hero = this.idToHero(heroID);
        hero.equip(item);
    },
    getSlotTypes(slot,heroID) {
        const hero = this.idToHero(heroID);
        return hero.slotTypesByNum(slot);
    },
    slotEmpty(slot,heroID) {
        const hero = this.idToHero(heroID);
        return hero.slotEmpty(slot);
    },
    unequip(slot,heroID) {
        const hero = this.idToHero(heroID);
        const item = hero.getSlot(slot);
        hero.unequip(slot);
        Inventory.addToInventory(item.id,item.rarity,1);
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

const $heroDetails = $("#heroDetails");
const $heroGearSlots = $("#heroGearSlots");

function examineHero(ID) {
    const hero = HeroManager.idToHero(ID);
    $heroDetails.empty();
    $heroGearSlots.empty();
    const upperLeftDiv = $("<div/>").addClass("heroExamineTop");
    const d1 = $("<div/>").addClass("heroExamineImage").html(hero.image);
    const d2 = $("<div/>").addClass("heroExamineName").html(hero.name);
    const d3 = $("<div/>").addClass("heroExamineLvlClass").html("Lv&nbsp;"+hero.lvl+"&nbsp;"+hero.class);
    const d4 = $("<div/>").addClass("heroExamineExp").html("Exp: "+hero.xp);
    upperLeftDiv.append(d1,d2,d3,d4);
    const upperRightDiv = $("<div/>").addClass("heroExamineStats");
    const htd = $("<div/>").addClass("heroExamineHeading");
    const htd1 = $("<div/>").addClass("heroExamineStatHeading").html("STAT");
    const htd2 = $("<div/>").addClass("heroExamineStatValueHeading").html("VALUE");
    upperRightDiv.append(htd.append(htd1,htd2));
    const stats = [hero.hpmax,hero.pow(), hero.apmax, hero.actmax, hero.armor, hero.crit, hero.critdmg, hero.dodgeChance];
    const statName = ["HP","POW","AP","ACT","ARMOR","CRIT","CRDMG","DODGE"];
    for (let i=0;i<stats.length;i++) {
        upperRightDiv.append(statRow(statName[i],stats[i]));
    }
    const lowerDiv = $("<div/>").addClass("heroExamineEquip");
    const slots = hero.getEquipSlots();
    const slotName = ["Weapon","Head","Armament","Chest","Handheld","Accessory"]
    $.each(slots, (slotNum,equip) => {
        let equipText = "Empty"
        if (equip !== null) equipText = equip.picName;
        const d5 = $("<div/>").addClass("heroExamineEquipment").attr("data-value",slotNum).attr("heroID",ID);
        const d5a = $("<div/>").addClass("heroExamineEquipmentSlot").html(slotName[slotNum]);
        const d5b = $("<div/>").addClass("heroExamineEquipmentEquip").html(equipText);
        const d6 = $("<div/>").addClass("heroExamineEquipmentList");
        lowerDiv.append(d5.append(d5a,d5b),d6);
    });
    $heroDetails.append(upperLeftDiv,upperRightDiv);
    $heroGearSlots.append(lowerDiv);
}

function statRow(name,value) {
    const d1 = $("<div/>").addClass("heroExamineStatRow");
    const d2 = $("<div/>").addClass("heroExamineStatRowName").html(name);
    const d3 = $("<div/>").addClass("heroExamineStatRowValue").html(value);
    return d1.append(d2,d3);
}


const $heroEquipmentList = $("#heroEquipmentList");

let examineSlotCache = 0;
let examineHeroCache = null;

function examineHeroPossibleEquip(slot,heroID) {
    if (slot === 0) examineSlotCache = 0; //workaround for next line...
    slot = slot || examineSlotCache;
    heroID = heroID || examineHeroCache;
    examineSlotCache = slot;
    examineHeroCache = heroID;
    console.log(slot,heroID);
    if (slot === null || heroID === null) return;
    const types = HeroManager.getSlotTypes(slot,heroID);
    $heroEquipmentList.empty();
    //cycle through everything in bp's and make the div for it
    const table = $('<div/>').addClass('EHPE');
    const htd1 = $('<div/>').addClass('EHPEHeaderName').html("NAME");
    const htd2 = $('<div/>').addClass('EHPEHeaderStat').html("POW");
    const hrow = $('<div/>').addClass('EHPEHeader').append(htd1,htd2);
    table.append(hrow);
    console.log(Inventory.listbyType(types));
    Inventory.listbyType(types).forEach((itemContainer) => {
        const td1 = $('<div/>').addClass('EHPEname').html(itemContainer.picName);
        const td2 = $('<div/>').addClass('EHPEstat').html("5");
        const row = $('<div/>').addClass('EHPErow').attr("id",itemContainer.containerID).attr("heroID",heroID).append(td1,td2);
        table.append(row);
    });
    $heroEquipmentList.append(table);
};

function equipOrUnequipSlot(slot,heroID) {
    if (HeroManager.slotEmpty(slot,heroID)) {
        console.log("get equip");
        examineHeroPossibleEquip(slot,heroID)
    }
    else {
        console.log("unequip");
        HeroManager.unequip(slot,heroID);
    }
    examineHero(heroID);
}


$(document).on('click', "div.heroOwnedCard", (e) => {
    //pop up the detailed character card
    e.preventDefault();
    const ID = $(e.currentTarget).attr("data-value");
    $(".heroOwnedCard").removeClass("highlight");
    $(e.currentTarget).addClass("highlight");
    examineHero(ID);
});

$(document).on('click', "div.heroExamineEquipment", (e) => {
    //select an item type to display what you can equip OR unequip the current item;
    e.preventDefault();
    const slot = parseInt($(e.currentTarget).attr("data-value"));
    const heroID = $(e.currentTarget).attr("heroID");
    console.log(slot,heroID);
    equipOrUnequipSlot(slot,heroID);
});

$(document).on('click', "div.EHPErow", (e) => {
    //equip the clicked item
    e.preventDefault();
    const heroID = $(e.currentTarget).attr("heroID");
    const itemCOntainerID = parseInt($(e.currentTarget).attr("id"));
    HeroManager.equipItem(itemCOntainerID,heroID);
    examineHero(heroID);
    examineHeroPossibleEquip();
});