"use strict";

function item(name,value,craftTime,type) {
    this.name = name;
    this.value = value;
    this.craftTime = craftTime; //this is in miliseconds
    this.type = type;
    this.cost = {
        "Ore" : 0,
        "Wood" : 0,
    }
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

function requirement(item) {
    for (let req in item.requires) {
        if (itemCount[req] < item.requires[req]) return false;
    }
    return true;
}


//this is where items go!!! copy these lines to add items, and add the image in the imageReference
//Knives Category
const knife = new item("Knife",5,7000,"knives");
knife.cost = {
    "Ore":5,
}
blueprints.push(knife)

const butterKnife = new item("Butter Knife",9,12000,"knives");
butterKnife.cost = {
    "Ore":9,
}
butterKnife.requires = {
    "Knife" : 100,
}
blueprints.push(butterKnife)

const kitchenKnife = new item("Kitchen Knife",12,15000,"knives");
kitchenKnife.cost = {
    "Ore":12,
}
kitchenKnife.requires = {
    "Butter Knife" : 100,
}
blueprints.push(kitchenKnife)

const chefsKnife = new item("Chefs Knife",17,19000,"knives");
chefsKnife.cost = {
    "Ore":17,
}
chefsKnife.requires = {
    "Kitchen Knife" : 100
}
blueprints.push(chefsKnife)

const fishingKnife = new item("Fishing Knife",22,23000,"knives");
fishingKnife.cost = {
    "Ore":22,
}
fishingKnife.requires = {
    "Chefs Knife" : 100,
}
blueprints.push(fishingKnife)

const thatsNotAKnife = new item("Thats Not A Knife",30,27000,"knives");
thatsNotAKnife.cost = {
    "Ore":30,
}
thatsNotAKnife.requires = {
    "Fishing Knife" : 100,
}
blueprints.push(thatsNotAKnife)

const thatsAKnife = new item("Thats A Knife",41,33000,"knives");
thatsAKnife.cost = {
    "Ore":41,
}
thatsAKnife.requires = {
    "Thats Not A Knife" : 100,
}
blueprints.push(thatsAKnife)

const clubKnife = new item("Club Knife",55,39000,"knives");
clubKnife.cost = {
    "Ore":55,
}
clubKnife.requires = {
    "Thats A Knife" : 100,
}
blueprints.push(clubKnife)

const darkIsTheKnife = new item("Dark Is The Knife",74,47000,"knives");
darkIsTheKnife.cost = {
    "Ore":74,
}
darkIsTheKnife.requires = {
    "Club Knife" : 100,
}
blueprints.push(darkIsTheKnife)

const theBloopinatorKnife = new item("The Bloopinator",101,56000,"knives");
theBloopinatorKnife.cost = {
    "Ore":101,
}
theBloopinatorKnife.requires = {
    "Dark Is The Knife" : 100,
}
blueprints.push(theBloopinatorKnife)

//Maces Category
const clubMace = new item("Club",7,10000,"maces");
clubMace.cost = {
    "Wood":5,
}
blueprints.push(clubMace)

const maulMace = new item("Maul",12,16000,"maces");
maulMace.cost = {
    "Wood":8,
}
maulMace.requires = {
    "Club" : 100,
}
blueprints.push(maulMace)

const brawlerMace = new item("Brawler",15,19000,"maces");
brawlerMace.cost = {
    "Wood":11,
}
brawlerMace.requires = {
    "Maul" : 100,
}
blueprints.push(brawlerMace)

const broomMace = new item("The Broominator",20,22000,"maces");
broomMace.cost = {
    "Wood":14,
}
broomMace.requires = {
    "Brawler" : 100,
}
blueprints.push(broomMace)

const blackjackMace = new item("Blackjack",26,26000,"maces");
blackjackMace.cost = {
    "Wood":19,
}
blackjackMace.requires = {
    "The Broominator" : 100,
}
blueprints.push(blackjackMace)

const bludgeonMace = new item("Bludgeon",24,30000,"maces");
bludgeonMace.cost = {
    "Wood":24,
}
bludgeonMace.requires = {
    "Blackjack" : 100,
}
blueprints.push(bludgeonMace)

const stripedClubMace = new item("Striped Club",44,35000,"maces");
stripedClubMace.cost = {
    "Wood":31,
}
stripedClubMace.requires = {
    "Bludgeon" : 100,
}
blueprints.push(stripedClubMace)

const nightClubMace = new item("Night Club",57,40000,"maces");
nightClubMace.cost = {
    "Wood":41,
}
nightClubMace.requires = {
    "Striped Club" : 100,
}
blueprints.push(nightClubMace)

const factFinderMace = new item("Fact Finder",74,46000,"maces");
factFinderMace.cost = {
    "Wood":53,
}
factFinderMace.requires = {
    "Night Club" : 100,
}
blueprints.push(factFinderMace)

const knifeClubMace = new item("Knife Club",97,53000,"maces");
knifeClubMace.cost = {
    "Wood":69,
}
knifeClubMace.requires = {
    "Fact Finder" : 100,
}
blueprints.push(knifeClubMace)

//Axes Category
const rageMakerAxe = new item("Rage Maker",12,17000,"axes");
rageMakerAxe.cost = {
    "Ore":5,
    "Wood":5,
}
blueprints.push(rageMakerAxe)

const furyBringerAxe = new item("Fury Bringer",22,29000,"axes");
furyBringerAxe.cost = {
    "Ore":8,
    "Wood":10,
}
furyBringerAxe.requires = {
    "Rage Maker" : 100,
}
blueprints.push(furyBringerAxe)

const venganceAxe = new item("Vengance",29,35000,"axes");
venganceAxe.cost = {
    "Ore":10,
    "Wood":14,
}
venganceAxe.requires = {
    "Fury Bringer" : 100,
}
blueprints.push(venganceAxe)

const prideAxe = new item("Pride",39,43000,"axes");
prideAxe.cost = {
    "Ore":12,
    "Wood":19,
}
prideAxe.requires = {
    "Vengance" : 100,
}
blueprints.push(prideAxe)

const greedyPickaxeAxe = new item("Greedy Pickaxe",53,52000,"axes");
greedyPickaxeAxe.cost = {
    "Ore":15,
    "Wood":27,
}
greedyPickaxeAxe.requires = {
    "Pride" : 100,
}
blueprints.push(greedyPickaxeAxe)

const slothslayerAxe = new item("Slothslayer",72,62000,"axes");
slothslayerAxe.cost = {
    "Ore":19,
    "Wood":38,
}
slothslayerAxe.requires = {
    "Greedy Pickaxe" : 100,
}
blueprints.push(slothslayerAxe)

const lustyHandaxeAxe = new item("Lusty Handaxe",98,75000,"axes");
lustyHandaxeAxe.cost = {
    "Ore":24,
    "Wood":53,
}
lustyHandaxeAxe.requires = {
    "Slothslayer" : 100,
}
blueprints.push(lustyHandaxeAxe)

const envyAxe = new item("Envy",133,89000,"axes");
envyAxe.cost = {
    "Ore":30,
    "Wood":74,
}
envyAxe.requires = {
    "Lusty Handaxe" : 100,
}
blueprints.push(envyAxe)

const gluttonousAxeAxe = new item("Gluttonous Axe",182,108000,"axes");
gluttonousAxeAxe.cost = {
    "Ore":37,
    "Wood":103,
}
gluttonousAxeAxe.requires = {
    "Envy" : 100,
}
blueprints.push(gluttonousAxeAxe)

const wrathAxe = new item("Wrath",249,130000,"axes");
wrathAxe.cost = {
    "Ore":47,
    "Wood":145,
}
wrathAxe.requires = {
    "Gluttonous Axe" : 100,
}
blueprints.push(wrathAxe)


const imageReference = {
    "Coin" : '<img src="PixelItem/CoinsGold5.png">',
    "Ore" : '<img src="PixelItem/Ore.png">',
    "Wood" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/materials/logs_6.png">',
    "Knife" : '<img src="PixelItem/Equip/Weapon/Knife.png">',
    "Butter Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_149.png">',
    "Kitchen Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_1.png">',
    "Chefs Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_6.png">',
    "Fishing Knife" : '<img src="PixelItem/Equip/Set/FineBlade0.png">',
    "Thats Not A Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc/key_1.png">',
    "Thats A Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_42.png">',
    "Club Knife" : '<img src="PixelItem/Equip/Set/FineBlade2.png">',
    "Dark Is The Knife" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/swords/sword_45.png">',
    "The Bloopinator" : '<img src="PixelItem/Equip/Set/FieryBlade3.png">',
    "Club" : '<img src="PixelItem/Equip/Weapon/Club.png">',
    "Maul" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_12.png">',
    "Brawler" : '<img src="PixelItem/Equip/Weapon/Mace1.png">',
    "The Broominator" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc/broom_1.png">',
    "Blackjack" : '<img src="PixelItem/Equip/Weapon/Mace2.png">',
    "Bludgeon" : '<img src="PixelItem/Equip/Weapon/Mace0.png">',
    "Striped Club" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_9.png">',
    "Night Club" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_30.png">',
    "Fact Finder" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_1.png">',
    "Knife Club" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/magic-weapons/magicweapon_1.png">',
    "Rage Maker" : '<img src="PixelItem/Equip/Set/NormalAxe.png">',
    "Fury Bringer" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/axes/axe_93.png">',
    "Vengance" : '<img src="PixelItem/Equip/Set/IcyAxe.png">',
    "Pride" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/axes/axe_100.png">',
    "Greedy Pickaxe" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/axes/axe_25.png">',
    "Slothslayer" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/axes/axe_51.png">',
    "Lusty Handaxe" : '<img src="PixelItem/Equip/Weapon/Shovel.png">',
    "Envy" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/axes/axe_105.png">',
    "Gluttonous Axe" : '<img src="PixelItem/Equip/Set/GoldAxe.png">',
    "Wrath" : '<img src="PixelItem/Equip/Set/BurningAxe.png">',
}
