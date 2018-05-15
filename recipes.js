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
        if (typeof itemCount[req] === "undefined") return false;
        if (itemCount[req] < item.requires[req]) return false;
    }
    return true;
}


//one resource recipes
//Knives Category
const knife = new item("Knife",6,5000,"knives");
knife.cost = {
    "Ore":5,
}
blueprints.push(knife)

const butterKnife = new item("Butter Knife",8,7000,"knives");
butterKnife.cost = {
    "Ore":7,
    "Knife":1,
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

//Gloves Line
const gardeningGloves = new item("Gardening Gloves",19,18000,"gloves");
gardeningGloves.cost = {
    "Leather":22,
}
blueprints.push(gardeningGloves)

const runningGloves = new item("Running Gloves",30,23000,"gloves");
runningGloves.cost = {
    "Leather":31,
}
runningGloves.requires = {
    "Gardening Gloves" : 100,
}
blueprints.push(runningGloves)

const fightingGloves = new item("Fighting Gloves",46,30000,"gloves");
fightingGloves.cost = {
    "Leather":43,
}
fightingGloves.requires = {
    "Running Gloves" : 100,
}
blueprints.push(fightingGloves)

const cleaningGloves = new item("Cleaning Gloves",71,40000,"gloves");
cleaningGloves.cost = {
    "Leather":60,
}
cleaningGloves.requires = {
    "Fighting Gloves" : 100,
}
blueprints.push(cleaningGloves)

const punchingGloves = new item("Punching Gloves",109,51000,"gloves");
punchingGloves.cost = {
    "Leather":85,
}
punchingGloves.requires = {
    "Cleaning Gloves" : 100,
}
blueprints.push(punchingGloves)

const huggingGloves = new item("Hugging Gloves",168,67000,"gloves");
huggingGloves.cost = {
    "Leather":118,
}
huggingGloves.requires = {
    "Punching Gloves" : 100,
}
blueprints.push(huggingGloves)

const dancingGloves = new item("Dancing Gloves",258,87000,"gloves");
dancingGloves.cost = {
    "Leather":166,
}
dancingGloves.requires = {
    "Hugging Gloves" : 100,
}
blueprints.push(dancingGloves)

const lovingGloves = new item("Loving Gloves",398,113000,"gloves");
lovingGloves.cost = {
    "Leather":232,
}
lovingGloves.requires = {
    "Dancing Gloves" : 100,
}
blueprints.push(lovingGloves)

const otherGloves = new item("Other Gloves",612,147000,"gloves");
otherGloves.cost = {
    "Leather":325,
}
otherGloves.requires = {
    "Loving Gloves" : 100,
}
blueprints.push(otherGloves)

const boxingGloves = new item("Boxing Gloves",943,191000,"gloves");
boxingGloves.cost = {
    "Leather":455,
}
boxingGloves.requires = {
    "Dancing Gloves" : 100,
}
blueprints.push(boxingGloves)

//Potions Line
const healingPotion = new item("Healing Potion",18,15000,"potions");
healingPotion.cost = {
    "Herb":10,
}
blueprints.push(healingPotion)

const manaPotion = new item("Mana Potion",27,20000,"potions");
manaPotion.cost = {
    "Herb":14,
}
manaPotion.requires = {
    "Healing Potion" : 100,
}
blueprints.push(manaPotion)

const sleepingPotion = new item("Sleeping Potion",42,25000,"potions");
sleepingPotion.cost = {
    "Herb":20,
}
sleepingPotion.requires = {
    "Mana Potion" : 100,
}
blueprints.push(sleepingPotion)

const coughingPotion = new item("Coughing Potion",64,33000,"potions");
coughingPotion.cost = {
    "Herb":27,
}
coughingPotion.requires = {
    "Sleeping Potion" : 100,
}
blueprints.push(coughingPotion)

const invincibilityPotion = new item("Invincibility Potion",99,43000,"potions");
invincibilityPotion.cost = {
    "Herb":38,
}
invincibilityPotion.requires = {
    "Coughing Potion" : 100,
}
blueprints.push(invincibilityPotion)

const laughingPotion = new item("Laughing Potion",152,56000,"potions");
laughingPotion.cost = {
    "Herb":54,
}
laughingPotion.requires = {
    "Invincibility Potion" : 100,
}
blueprints.push(laughingPotion)

const rejuvinatingPotion = new item("Rejuvinating Potion",235,72000,"potions");
rejuvinatingPotion.cost = {
    "Herb":75,
}
rejuvinatingPotion.requires = {
    "Laughing Potion" : 100,
}
blueprints.push(rejuvinatingPotion)

const likePotion = new item("Like Potion",362,94000,"potions");
likePotion.cost = {
    "Herb":105
}
likePotion.requires = {
    "Rejuvinating Potion" : 100,
}
blueprints.push(likePotion)

const bitterPotion = new item("Bitter Potion",557,122000,"potions");
bitterPotion.cost = {
    "Herb":148,
}
bitterPotion.requires = {
    "Like Potion" : 100,
}
blueprints.push(bitterPotion)

const strengthPotion = new item("Strength Potion",857,159000,"potions");
strengthPotion.cost = {
    "Herb":207,
}
strengthPotion.requires = {
    "Bitter Potion" : 100,
}
blueprints.push(strengthPotion)

//two resource recipes
//Axes Category
const rageMakerAxe = new item("Rage Maker",13,15000,"axes");
rageMakerAxe.cost = {
    "Ore":5,
    "Wood":5,
}
blueprints.push(rageMakerAxe)

const furyBringerAxe = new item("Fury Bringer",20,19000,"axes");
furyBringerAxe.cost = {
    "Ore":7,
    "Wood":7,
}
furyBringerAxe.requires = {
    "Rage Maker" : 100,
}
blueprints.push(furyBringerAxe)

const venganceAxe = new item("Vengance",32,23000,"axes");
venganceAxe.cost = {
    "Ore":9,
    "Wood":11,
}
venganceAxe.requires = {
    "Fury Bringer" : 100,
}
blueprints.push(venganceAxe)

const prideAxe = new item("Pride",49,29000,"axes");
prideAxe.cost = {
    "Ore":12,
    "Wood":15,
}
prideAxe.requires = {
    "Vengance" : 100,
}
blueprints.push(prideAxe)

const greedyPickaxeAxe = new item("Greedy Pickaxe",77,37000,"axes");
greedyPickaxeAxe.cost = {
    "Ore":17,
    "Wood":22,
}
greedyPickaxeAxe.requires = {
    "Pride" : 100,
}
blueprints.push(greedyPickaxeAxe)

const slothslayerAxe = new item("Slothslayer",119,46000,"axes");
slothslayerAxe.cost = {
    "Ore":22,
    "Wood":32,
}
slothslayerAxe.requires = {
    "Greedy Pickaxe" : 100,
}
blueprints.push(slothslayerAxe)

const lustyHandaxeAxe = new item("Lusty Handaxe",186,57000,"axes");
lustyHandaxeAxe.cost = {
    "Ore":30,
    "Wood":46,
}
lustyHandaxeAxe.requires = {
    "Slothslayer" : 100,
}
blueprints.push(lustyHandaxeAxe)

const envyAxe = new item("Envy",290,72000,"axes");
envyAxe.cost = {
    "Ore":41,
    "Wood":67,
}
envyAxe.requires = {
    "Lusty Handaxe" : 100,
}
blueprints.push(envyAxe)

const gluttonousAxeAxe = new item("Gluttonous Axe",453,89000,"axes");
gluttonousAxeAxe.cost = {
    "Ore":55,
    "Wood":98,
}
gluttonousAxeAxe.requires = {
    "Envy" : 100,
}
blueprints.push(gluttonousAxeAxe)

const wrathAxe = new item("Wrath",708,112000,"axes");
wrathAxe.cost = {
    "Ore":74,
    "Wood":142,
}
wrathAxe.requires = {
    "Gluttonous Axe" : 100,
}
blueprints.push(wrathAxe)

//hats category
const simpleHat = new item("Simple Hat",45,54000,"hats");
simpleHat.cost = {
    "Herb":14,
    "Leather":20,
}
blueprints.push(simpleHat)

const hiddenHat = new item("Hidden Mask",70,68000,"hats");
hiddenHat.cost = {
    "Herb":20,
    "Leather":27,
}
hiddenHat.requires = {
    "Simple Hat" : 100,
}
blueprints.push(hiddenHat)

const blackHat = new item("Black Hat",109,84000,"hats");
blackHat.cost = {
    "Herb":29,
    "Leather":36,
}
blackHat.requires = {
    "Hidden Mask" : 100,
}
blueprints.push(blackHat)

const beachHat = new item("Beach Hat",170,105000,"hats");
beachHat.cost = {
    "Herb":42,
    "Leather":49,
}
beachHat.requires = {
    "Black Hat" : 100,
}
blueprints.push(beachHat)

const greenBayHat = new item("Green Bay Beret",265,132000,"hats");
greenBayHat.cost = {
    "Herb":62,
    "Leather":66,
}
greenBayHat.requires = {
    "Beach Hat" : 100,
}
blueprints.push(greenBayHat)

const theMindCapHat = new item("The Mind Cap",413,165000,"hats");
theMindCapHat.cost = {
    "Herb":90,
    "Leather":90,
}
theMindCapHat.requires = {
    "Green Bay Beret" : 100,
}
blueprints.push(theMindCapHat)

const princessHat = new item("Ornate Crown",645,206000,"hats");
princessHat.cost = {
    "Herb":130,
    "Leather":121,
}
princessHat.requires = {
    "The Mind Cap" : 100,
}
blueprints.push(princessHat)

const spellcasterHat = new item("Spellcasting Hat",1008,258000,"hats");
spellcasterHat.cost = {
    "Herb":189,
    "Leather":163,
}
spellcasterHat.requires = {
    "Ornate Crown" : 100,
}
blueprints.push(spellcasterHat)

const spoopyHat = new item("Spoopy Mask",1577,322000,"hats");
spoopyHat.cost = {
    "Herb":274,
    "Leather":221,
}
spoopyHat.requires = {
    "Spellcasting Hat" : 100,
}
blueprints.push(spoopyHat)

const allFolksHat = new item("All Folks Hats",2470,402000,"hats");
allFolksHat.cost = {
    "Herb":397,
    "Leather":298,
}
allFolksHat.requires = {
    "Spoopy Mask" : 100,
}
blueprints.push(allFolksHat)

//wands category
const basicWand = new item("Basic Wand",38,38000,"wands");
basicWand.cost = {
    "Wood":9,
    "Herb":12,
}
blueprints.push(basicWand)

const forestWand = new item("Forest Wand",57,48000,"wands");
forestWand.cost = {
    "Wood":13,
    "Herb":16,
}
forestWand.requires = {
    "Basic Wand" : 100,
}
blueprints.push(forestWand)

const windWand = new item("Wind Wand",88,59000,"wands");
windWand.cost = {
    "Wood":19,
    "Herb":22,
}
windWand.requires = {
    "Forest Wand" : 100,
}
blueprints.push(windWand)

const soulWand = new item("Soul Wand",134,74000,"wands");
soulWand.cost = {
    "Wood":27,
    "Herb":30,
}
soulWand.requires = {
    "Wind Wand" : 100,
}
blueprints.push(soulWand)

const rainWand = new item("Rain Wand",205,93000,"wands");
rainWand.cost = {
    "Wood":40,
    "Herb":40,
}
rainWand.requires = {
    "Soul Wand" : 100,
}
blueprints.push(rainWand)

const frozenWand = new item("Frozen Wand",315,116000,"wands");
frozenWand.cost = {
    "Wood":58,
    "Herb":54,
}
frozenWand.requires = {
    "Rain Wand" : 100,
}
blueprints.push(frozenWand)

const oceanWand = new item("Ocean Wand",483,145000,"wands");
oceanWand.cost = {
    "Wood":84,
    "Herb":73,
}
oceanWand.requires = {
    "Frozen Wand" : 100,
}
blueprints.push(oceanWand)

const thunderWand = new item("Thunder Wand",742,181000,"wands");
thunderWand.cost = {
    "Wood":121,
    "Herb":98,
}
thunderWand.requires = {
    "Ocean Wand" : 100,
}
blueprints.push(thunderWand)

const hateWand = new item("Hate Wand",1142,226000,"wands");
hateWand.cost = {
    "Wood":176,
    "Herb":132,
}
hateWand.requires = {
    "Thunder Wand" : 100,
}
blueprints.push(hateWand)

const loveWand = new item("Love Wand",1760,283000,"wands");
loveWand.cost = {
    "Wood":255,
    "Herb":179,
}
loveWand.requires = {
    "Hate Wand" : 100,
}
blueprints.push(loveWand)

//gauntlets category

const newGauntlets = new item("New Gauntlets",24,29000,"gauntlets");
newGauntlets.cost = {
    "Ore":7,
    "Leather":18,
}
blueprints.push(newGauntlets)

const shinyGauntlets = new item("Shiny Gauntlets",37,36000,"gauntlets");
shinyGauntlets.cost = {
    "Ore":9,
    "Leather":26,
}
shinyGauntlets.requires = {
    "New Gauntlets" : 100,
}	
blueprints.push(shinyGauntlets)

const plainGauntlets = new item("Plain Gauntlets",57,45000,"gauntlets");
plainGauntlets.cost = {
    "Ore":13,
    "Leather":38,
}
plainGauntlets.requires = {
    "Shiny Gauntlets" : 100,
}	
blueprints.push(plainGauntlets)

const pristineGauntlets = new item("Pristine Gauntlets",89,57000,"gauntlets");
pristineGauntlets.cost = {
    "Ore":17,
    "Leather":55,
}
pristineGauntlets.requires = {
    "Plain Gauntlets" : 100,
}	
blueprints.push(pristineGauntlets)

const challengeGauntlets = new item("Challenge Gauntlets",140,71000,"gauntlets");
challengeGauntlets.cost = {
    "Ore":23,
    "Leather":80,
}
challengeGauntlets.requires = {
    "Pristine Gauntlets" : 100,
}	
blueprints.push(challengeGauntlets)

const fancyGauntlets = new item("Fancy Gauntlets",219,89000,"gauntlets");
fancyGauntlets.cost = {
    "Ore":31,
    "Leather":115,
}
fancyGauntlets.requires = {
    "Challenge Gauntlets" : 100,
}	
blueprints.push(fancyGauntlets)

const oldGauntlets = new item("Old Gauntlets",343,111000,"gauntlets");
oldGauntlets.cost = {
    "Ore":42,
    "Leather":167,
}
oldGauntlets.requires = {
    "Fancy Gauntlets" : 100,
}	
blueprints.push(oldGauntlets)

const darkGauntlets = new item("Dark Gauntlets",539,138000,"gauntlets");
darkGauntlets.cost = {
    "Ore":57,
    "Leather":243,
}
darkGauntlets.requires = {
    "Old Gauntlets" : 100,
}	
blueprints.push(darkGauntlets)

const dandyGauntlets = new item("Dandy Gauntlets",846,173000,"gauntlets");
dandyGauntlets.cost = {
    "Ore":77,
    "Leather":352,
}
dandyGauntlets.requires = {
    "Dark Gauntlets" : 100,
}	
blueprints.push(dandyGauntlets)

const coolGauntlets = new item("Cool Gauntlets",1329,216000,"gauntlets");
coolGauntlets.cost = {
    "Ore":104,
    "Leather":510,
}
coolGauntlets.requires = {
    "Dandy Gauntlets" : 100,
}	
blueprints.push(coolGauntlets)

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
    "Simple Hat" : '<img src="PixelItem/Equip/Head/Hat0.png">',
    "Hidden Mask" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_97.png">',
    "Black Hat" : '<img src="PixelItem/Equip/Head/Hat2.png">',
    "Beach Hat" : '<img src="PixelItem/Equip/Head/Hat1.png">',
    "Green Bay Beret" : '<img src="PixelItem/Consume/Cheese.png">',
    "The Mind Cap" : '<img src="PixelItem/Equip/Head/Hat5.png">',
    "Ornate Crown" : '<img src="PixelItem/Equip/Head/CrownEmrald.png">',
    "Spellcasting Hat" : '<img src="PixelItem/Equip/Head/Hat3.png">',
    "Spoopy Mask" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_102.png">',
    "All Folks Hats" : '<img src="PixelItem/Equip/Head/Hat4.png">',
    "Basic Wand" : '<img src="PixelItem/Equip/Weapon/Wand0.png">',
    "Forest Wand" : '<img src="PixelItem/Equip/Weapon/Wand1.png">',
    "Wind Wand" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc-weapons/weapon_176.png			">',
    "Soul Wand" : '<img src="Equip/Weapon/Wand6.png">',
    "Rain Wand" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc-weapons/weapon_177.png">',
    "Frozen Wand" : '<img src="PixelItem/Equip/Weapon/Wand4.png">',
    "Ocean Wand" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc-weapons/weapon_189.png">',
    "Thunder Wand" : '<img src="PixelItem/Equip/Weapon/Wand3.png">',
    "Hate Wand" : '<img src="PixelItem/Equip/Weapon/Wand2.png">',
    "Love Wand" : '<img src="PixelItem/Equip/Weapon/Wand5.png">',
    "New Gauntlets" : '<img src="PixelItem/Equip/Set/CrusaderGauntlets.png">',
    "Shiny Gauntlets" : '<img src="PixelItem/Equip/Set/BrassGauntlets.png">',
    "Plain Gauntlets" : '<img src="PixelItem/Equip/Set/FineSteelGauntlets.png">',
    "Pristine Gauntlets" : '<img src="PixelItem/Equip/Set/TitaniumGauntlets.png">',
    "Challenge Gauntlets" : '<img src="PixelItem/Equip/Set/FieryGauntlets.png">',
    "Fancy Gauntlets" : '<img src="PixelItem/Equip/Set/PoisonGauntlets.png">',
    "Old Gauntlets" : '<img src="PixelItem/Equip/Hands/Gauntlets.png">',
    "Dark Gauntlets" : '<img src="PixelItem/Equip/Set/DarkGauntlets.png">',
    "Dandy Gauntlets" : '<img src="PixelItem/Equip/Set/GoldGauntlets.png">',
    "Cool Gauntlets" : '<img src="PixelItem/Equip/Set/IcyGauntlets.png">',
}
