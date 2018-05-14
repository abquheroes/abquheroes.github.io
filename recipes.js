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
const knife = new item("Knife",6,5000,"knives");
knife.cost = {
    "Ore":5,
}
blueprints.push(knife)

const butterKnife = new item("Butter Knife",8,7000,"knives");
butterKnife.cost = {
    "Ore":7,
}
butterKnife.requires = {
    "Knife" : 100,
}
blueprints.push(butterKnife)

const kitchenKnife = new item("Kitchen Knife",13,8000,"knives");
kitchenKnife.cost = {
    "Ore":10,
}
kitchenKnife.requires = {
    "Butter Knife" : 100,
}
blueprints.push(kitchenKnife)

const chefsKnife = new item("Chefs Knife",20,11000,"knives");
chefsKnife.cost = {
    "Ore":14,
}
chefsKnife.requires = {
    "Kitchen Knife" : 100
}
blueprints.push(chefsKnife)

const fishingKnife = new item("Fishing Knife",31,14000,"knives");
fishingKnife.cost = {
    "Ore":19,
}
fishingKnife.requires = {
    "Chefs Knife" : 100,
}
blueprints.push(fishingKnife)

const thatsNotAKnife = new item("Thats Not A Knife",48,19000,"knives");
thatsNotAKnife.cost = {
    "Ore":27,
}
thatsNotAKnife.requires = {
    "Fishing Knife" : 100,
}
blueprints.push(thatsNotAKnife)

const thatsAKnife = new item("Thats A Knife",73,24000,"knives");
thatsAKnife.cost = {
    "Ore":38,
}
thatsAKnife.requires = {
    "Thats Not A Knife" : 100,
}
blueprints.push(thatsAKnife)

const clubKnife = new item("Club Knife",113,31000,"knives");
clubKnife.cost = {
    "Ore":53,
}
clubKnife.requires = {
    "Thats A Knife" : 100,
}
blueprints.push(clubKnife)

const darkIsTheKnife = new item("Dark Is The Knife",174,41000,"knives");
darkIsTheKnife.cost = {
    "Ore":74,
}
darkIsTheKnife.requires = {
    "Club Knife" : 100,
}
blueprints.push(darkIsTheKnife)

const theBloopinatorKnife = new item("The Bloopinator",268,53000,"knives");
theBloopinatorKnife.cost = {
    "Ore":103,
}
theBloopinatorKnife.requires = {
    "Dark Is The Knife" : 100,
}
blueprints.push(theBloopinatorKnife)

//Maces Category
const clubMace = new item("Club",11,9000,"maces");
clubMace.cost = {
    "Wood":7,
}
blueprints.push(clubMace)

const maulMace = new item("Maul",17,12000,"maces");
maulMace.cost = {
    "Wood":10,
}
maulMace.requires = {
    "Club" : 100,
}
blueprints.push(maulMace)

const brawlerMace = new item("Brawler",26,15000,"maces");
brawlerMace.cost = {
    "Wood":14,
}
brawlerMace.requires = {
    "Maul" : 100,
}
blueprints.push(brawlerMace)

const broomMace = new item("The Broominator",39,20000,"maces");
broomMace.cost = {
    "Wood":19,
}
broomMace.requires = {
    "Brawler" : 100,
}
blueprints.push(broomMace)

const blackjackMace = new item("Blackjack",61,26000,"maces");
blackjackMace.cost = {
    "Wood":27,
}
blackjackMace.requires = {
    "The Broominator" : 100,
}
blueprints.push(blackjackMace)

const bludgeonMace = new item("Bludgeon",93,33000,"maces");
bludgeonMace.cost = {
    "Wood":38,
}
bludgeonMace.requires = {
    "Blackjack" : 100,
}
blueprints.push(bludgeonMace)

const stripedClubMace = new item("Striped Club",144,43000,"maces");
stripedClubMace.cost = {
    "Wood":53,
}
stripedClubMace.requires = {
    "Bludgeon" : 100,
}
blueprints.push(stripedClubMace)

const nightClubMace = new item("Night Club",221,56000,"maces");
nightClubMace.cost = {
    "Wood":74,
}
nightClubMace.requires = {
    "Striped Club" : 100,
}
blueprints.push(nightClubMace)

const factFinderMace = new item("Fact Finder",341,73000,"maces");
factFinderMace.cost = {
    "Wood":103,
}
factFinderMace.requires = {
    "Night Club" : 100,
}
blueprints.push(factFinderMace)

const knifeClubMace = new item("Knife Club",525,95000,"maces");
knifeClubMace.cost = {
    "Wood":145,
}
knifeClubMace.requires = {
    "Fact Finder" : 100,
}
blueprints.push(knifeClubMace)

//Axes Category
const rageMakerAxe = new item("Rage Maker",13,13000,"axes");
rageMakerAxe.cost = {
    "Ore":5,
    "Wood":5,
}
blueprints.push(rageMakerAxe)

const furyBringerAxe = new item("Fury Bringer",19,16000,"axes");
furyBringerAxe.cost = {
    "Ore":7,
    "Wood":7,
}
furyBringerAxe.requires = {
    "Rage Maker" : 100,
}
blueprints.push(furyBringerAxe)

const venganceAxe = new item("Vengance",29,20000,"axes");
venganceAxe.cost = {
    "Ore":9,
    "Wood":11,
}
venganceAxe.requires = {
    "Fury Bringer" : 100,
}
blueprints.push(venganceAxe)

const prideAxe = new item("Pride",44,25000,"axes");
prideAxe.cost = {
    "Ore":12,
    "Wood":15,
}
prideAxe.requires = {
    "Vengance" : 100,
}
blueprints.push(prideAxe)

const greedyPickaxeAxe = new item("Greedy Pickaxe",66,32000,"axes");
greedyPickaxeAxe.cost = {
    "Ore":17,
    "Wood":22,
}
greedyPickaxeAxe.requires = {
    "Pride" : 100,
}
blueprints.push(greedyPickaxeAxe)

const slothslayerAxe = new item("Slothslayer",102,40000,"axes");
slothslayerAxe.cost = {
    "Ore":22,
    "Wood":32,
}
slothslayerAxe.requires = {
    "Greedy Pickaxe" : 100,
}
blueprints.push(slothslayerAxe)

const lustyHandaxeAxe = new item("Lusty Handaxe",157,50000,"axes");
lustyHandaxeAxe.cost = {
    "Ore":30,
    "Wood":46,
}
lustyHandaxeAxe.requires = {
    "Slothslayer" : 100,
}
blueprints.push(lustyHandaxeAxe)

const envyAxe = new item("Envy",243,62000,"axes");
envyAxe.cost = {
    "Ore":41,
    "Wood":67,
}
envyAxe.requires = {
    "Lusty Handaxe" : 100,
}
blueprints.push(envyAxe)

const gluttonousAxeAxe = new item("Gluttonous Axe",378,77000,"axes");
gluttonousAxeAxe.cost = {
    "Ore":55,
    "Wood":98,
}
gluttonousAxeAxe.requires = {
    "Envy" : 100,
}
blueprints.push(gluttonousAxeAxe)

const wrathAxe = new item("Wrath",589,97000,"axes");
wrathAxe.cost = {
    "Ore":74,
    "Wood":142,
}
wrathAxe.requires = {
    "Gluttonous Axe" : 100,
}
blueprints.push(wrathAxe)

//Potions Line
const healingPotion = new item("Healing Potion",16,15000,"potions");
healingPotion.cost = {
    "Herb":10,
}
blueprints.push(healingPotion)

const manaPotion = new item("Mana Potion",22,20000,"potions");
manaPotion.cost = {
    "Herb":14,
}
manaPotion.requires = {
    "Healing Potion" : 100,
}
blueprints.push(manaPotion)

const sleepingPotion = new item("Sleeping Potion",31,25000,"potions");
sleepingPotion.cost = {
    "Herb":20,
}
sleepingPotion.requires = {
    "Mana Potion" : 100,
}
blueprints.push(sleepingPotion)

const coughingPotion = new item("Coughing Potion",44,33000,"potions");
coughingPotion.cost = {
    "Herb":27,
}
coughingPotion.requires = {
    "Sleeping Potion" : 100,
}
blueprints.push(coughingPotion)

const invincibilityPotion = new item("Invincibility Potion",61,43000,"potions");
invincibilityPotion.cost = {
    "Herb":38,
}
invincibilityPotion.requires = {
    "Coughing Potion" : 100,
}
blueprints.push(invincibilityPotion)

const laughingPotion = new item("Laughing Potion",86,56000,"potions");
laughingPotion.cost = {
    "Herb":54,
}
laughingPotion.requires = {
    "Invincibility Potion" : 100,
}
blueprints.push(laughingPotion)

const rejuvinatingPotion = new item("Rejuvinating Potion",120,72000,"potions");
rejuvinatingPotion.cost = {
    "Herb":75,
}
rejuvinatingPotion.requires = {
    "Laughing Potion" : 100,
}
blueprints.push(rejuvinatingPotion)

const likePotion = new item("Like Potion",169,94000,"potions");
likePotion.cost = {
    "Herb":105
}
likePotion.requires = {
    "Rejuvinating Potion" : 100,
}
blueprints.push(likePotion)

const bitterPotion = new item("Bitter Potion",236,122000,"potions");
bitterPotion.cost = {
    "Herb":148,
}
bitterPotion.requires = {
    "Like Potion" : 100,
}
blueprints.push(bitterPotion)

const strengthPotion = new item("Strength Potion",331,159000,"potions");
strengthPotion.cost = {
    "Herb":207,
}
strengthPotion.requires = {
    "Bitter Potion" : 100,
}
blueprints.push(strengthPotion)

//Gloves Line
const gardeningGloves = new item("Gardening Gloves",18,18000,"gloves");
gardeningGloves.cost = {
    "Leather":22,
}
blueprints.push(gardeningGloves)

const runningGloves = new item("Running Gloves",25,23000,"gloves");
runningGloves.cost = {
    "Leather":31,
}
runningGloves.requires = {
    "Gardening Gloves" : 100,
}
blueprints.push(runningGloves)

const fightingGloves = new item("Fighting Gloves",34,30000,"gloves");
fightingGloves.cost = {
    "Leather":43,
}
fightingGloves.requires = {
    "Running Gloves" : 100,
}
blueprints.push(fightingGloves)

const cleaningGloves = new item("Cleaning Gloves",48,40000,"gloves");
cleaningGloves.cost = {
    "Leather":60,
}
cleaningGloves.requires = {
    "Fighting Gloves" : 100,
}
blueprints.push(cleaningGloves)

const punchingGloves = new item("Punching Gloves",68,51000,"gloves");
punchingGloves.cost = {
    "Leather":85,
}
punchingGloves.requires = {
    "Cleaning Gloves" : 100,
}
blueprints.push(punchingGloves)

const huggingGloves = new item("Hugging Gloves",95,67000,"gloves");
huggingGloves.cost = {
    "Leather":118,
}
huggingGloves.requires = {
    "Punching Gloves" : 100,
}
blueprints.push(huggingGloves)

const dancingGloves = new item("Dancing Gloves",133,87000,"gloves");
dancingGloves.cost = {
    "Leather":166,
}
dancingGloves.requires = {
    "Hugging Gloves" : 100,
}
blueprints.push(dancingGloves)

const lovingGloves = new item("Loving Gloves",186,113000,"gloves");
lovingGloves.cost = {
    "Leather":232,
}
lovingGloves.requires = {
    "Dancing Gloves" : 100,
}
blueprints.push(lovingGloves)

const otherGloves = new item("Other Gloves",260,147000,"gloves");
otherGloves.cost = {
    "Leather":325,
}
otherGloves.requires = {
    "Loving Gloves" : 100,
}
blueprints.push(otherGloves)

const boxingGloves = new item("Boxing Gloves",364,191000,"gloves");
boxingGloves.cost = {
    "Leather":455,
}
boxingGloves.requires = {
    "Dancing Gloves" : 100,
}
blueprints.push(boxingGloves)


const imageReference = {
    "Gold" : '<img src="PixelItem/CoinsGold5.png">',
    "Coin" : '<img src="PixelItem/CoinsGold5.png">',
    "Ore" : '<img src="PixelItem/Ore.png">',
    "Herb" : '<img src="PixelItem/Consume/Herb5.png">',
    "Leather" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/materials/fabric_9.png">',
    "Oren" : '<img src="workers/heads/orenhead.png">',
    "Eryn" : '<img src="workers/heads/erynhead.png">',
    "Herbie" : '<img src="workers/heads/herbiehead.png">',
    "Lakur" : '<img src="workers/heads/lakurhead.png">',
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
    "Healing Potion" : '<img src="PixelItem/Consume/Potion/TinyWhitePotion.png">',
    "Mana Potion" : '<img src="PixelItem/Consume/Potion/PotionPurple.png">',
    "Sleeping Potion" : '<img src="PixelItem/Consume/BeerMug.png">',
    "Coughing Potion" : '<img src="PixelItem/Consume/Potion/TinyRedPotion.png">',
    "Invincibility Potion" : '&nbsp;&nbsp;&nbsp;&nbsp;',
    "Laughing Potion" : '<img src="PixelItem/Consume/Wine.png">',
    "Rejuvinating Potion" : '<img src="PixelItem/Consume/Potion/PotionMulticolor.png">',
    "Like Potion" : '<img src="PixelItem/Consume/Potion/PotionPink.png">',
    "Bitter Potion" : '<img src="PixelItem/Consume/Whisky.png">',
    "Strength Potion" : '<img src="PixelItem/Consume/Potion/PyramidPotion4.png">',
    "Gardening Gloves" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/gloves/glove_2.png">',
    "Running Gloves" : '<img src="PixelItem/Equip/Hands/Gloves0.png">',
    "Fighting Gloves" : '<img src="PixelItem/Equip/Hands/Gloves4.png">',
    "Cleaning Gloves" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/gloves/glove_10.png">',
    "Punching Gloves" : '<img src="PixelItem/Equip/Hands/Gloves1.png">',
    "Hugging Gloves" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/gloves/glove_7.png">',
    "Dancing Gloves" : '<img src="PixelItem/Equip/Hands/Gloves3.png">',
    "Loving Gloves" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/gloves/glove_8.png">',
    "Other Gloves" : '<img src="PixelItem/Equip/Hands/Gloves2.png">',
    "Boxing Gloves" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/gloves/glove_1.png">',
}
