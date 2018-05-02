function item(name,value,craftTime) {
    this.name = name;
    this.count = 0;
    this.value = value;
    this.craftTime = craftTime; //this is in miliseconds
}

const blueprints = [];


function nameToItem(name) {
    for (let i=0;i<blueprints.length;i++) {
        if (blueprints[i].name == name) {
            return blueprints[i];
        }
    }
    return null;
}


//this is where items go!!! copy these lines to add items, and add the image in the imageReference
const knife = new item("Knife",5,7000);
knife.cost = {
    "Ore":5,
}
blueprints.push(knife)

const butterKnife = new item("Butter Knife",9,12000);
butterKnife.cost = {
    "Ore":9,
}
blueprints.push(butterKnife)

const kitchenKnife = new item("Kitchen Knife",12,15000);
kitchenKnife.cost = {
    "Ore":12,
}
blueprints.push(kitchenKnife)

const chefsKnife = new item("Chef's Knife",17,19000);
chefsKnife.cost = {
    "Ore":17,
}
blueprints.push(chefsKnife)

const fishingKnife = new item("Fishing Knife",22,23000);
fishingKnife.cost = {
    "Ore":22,
}
blueprints.push(fishingKnife)

const thatsNotAKnife = new item("That's Not A Knife",30,27000);
thatsNotAKnife.cost = {
    "Ore":30,
}
blueprints.push(thatsNotAKnife)

const thatsAKnife = new item("That's A Knife",41,33000);
thatsAKnife.cost = {
    "Ore":41,
}
blueprints.push(thatsAKnife)

const clubKnife = new item("Club Knife",55,39000);
clubKnife.cost = {
    "Ore":55,
}
blueprints.push(clubKnife)

const darkIsTheKnife = new item("Dark Is The Knife",74,47000);
darkIsTheKnife.cost = {
    "Ore":74,
}
blueprints.push(darkIsTheKnife)

const theBloopinatorKnife = new item("The Bloopinator",101,56000);
theBloopinatorKnife.cost = {
    "Ore":101,
}
blueprints.push(theBloopinatorKnife)

const imageReference = {
    "Coin" : '<img src="PixelItem/CoinsGold5.png">',
    "Ore" : '<img src="PixelItem/Ore.png">',
    "Knife" : '<img src="PixelItem/Equip/Weapon/Knife.png">',
    "Butter Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_149.png">',
    "Kitchen Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_1.png">',
    "Chef's Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_6.png">',
    "Fishing Knife" : '<img src="PixelItem/Equip/Set/FineBlade0.png">',
    "That's Not A Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc/key_1.png">',
    "That's A Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_42.png">',
    "Club Knife" : '<img src="PixelItem/Equip/Set/FineBlade2.png">',
    "Dark Is The Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_45.png">',
    "The Bloopinator" : '<img src="PixelItem/Equip/Set/FieryBlade3.png">',
}
