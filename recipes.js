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
}
butterKnife.requires = {
    "Knife" : 30,
}
blueprints.push(butterKnife)

const kitchenKnife = new item("Kitchen Knife",13,8000,"knives");
kitchenKnife.cost = {
    "Ore":10,
}
kitchenKnife.requires = {
    "Butter Knife" : 40,
}
blueprints.push(kitchenKnife)

const chefsKnife = new item("Chefs Knife",20,11000,"knives");
chefsKnife.cost = {
    "Ore":14,
}
chefsKnife.requires = {
    "Kitchen Knife" : 50
}
blueprints.push(chefsKnife)

const fishingKnife = new item("Fishing Knife",31,14000,"knives");
fishingKnife.cost = {
    "Ore":19,
}
fishingKnife.requires = {
    "Chefs Knife" : 60,
}
blueprints.push(fishingKnife)

const thatsNotAKnife = new item("Thats Not A Knife",48,19000,"knives");
thatsNotAKnife.cost = {
    "Ore":27,
}
thatsNotAKnife.requires = {
    "Fishing Knife" : 70,
}
blueprints.push(thatsNotAKnife)

const thatsAKnife = new item("Thats A Knife",73,24000,"knives");
thatsAKnife.cost = {
    "Ore":38,
}
thatsAKnife.requires = {
    "Thats Not A Knife" : 80,
}
blueprints.push(thatsAKnife)

const clubKnife = new item("Club Knife",113,31000,"knives");
clubKnife.cost = {
    "Ore":53,
    "Club":2,
}
clubKnife.requires = {
    "Thats A Knife" : 90,
}
blueprints.push(clubKnife)

const darkIsTheKnife = new item("Dark Is The Knife",174,41000,"knives");
darkIsTheKnife.cost = {
    "Ore":74,
    "Butter Knife":2,
}
darkIsTheKnife.requires = {
    "Club Knife" : 100,
}
blueprints.push(darkIsTheKnife)

const theBloopinatorKnife = new item("The Bloopinator",268,53000,"knives");
theBloopinatorKnife.cost = {
    "Ore":103,
    "Thats Not A Knife":3,
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
    "Club" : 30,
}
blueprints.push(maulMace)

const brawlerMace = new item("Brawler",26,15000,"maces");
brawlerMace.cost = {
    "Wood":14,
}
brawlerMace.requires = {
    "Maul" : 40,
}
blueprints.push(brawlerMace)

const broomMace = new item("The Broominator",39,20000,"maces");
broomMace.cost = {
    "Wood":19,
}
broomMace.requires = {
    "Brawler" : 50,
}
blueprints.push(broomMace)

const blackjackMace = new item("Blackjack",61,26000,"maces");
blackjackMace.cost = {
    "Wood":27,
}
blackjackMace.requires = {
    "The Broominator" : 60,
}
blueprints.push(blackjackMace)

const bludgeonMace = new item("Bludgeon",93,33000,"maces");
bludgeonMace.cost = {
    "Wood":38,
}
bludgeonMace.requires = {
    "Blackjack" : 70,
}
blueprints.push(bludgeonMace)

const stripedClubMace = new item("Striped Club",144,43000,"maces");
stripedClubMace.cost = {
    "Wood":53,
}
stripedClubMace.requires = {
    "Bludgeon" : 80,
}
blueprints.push(stripedClubMace)

const nightClubMace = new item("Night Club",221,56000,"maces");
nightClubMace.cost = {
    "Wood":74,
    "Maul":2,
}
nightClubMace.requires = {
    "Striped Club" : 90,
}
blueprints.push(nightClubMace)

const factFinderMace = new item("Fact Finder",341,73000,"maces");
factFinderMace.cost = {
    "Wood":103,
    "Brawler":2,
}
factFinderMace.requires = {
    "Night Club" : 100,
}
blueprints.push(factFinderMace)

const knifeClubMace = new item("Knife Club",525,95000,"maces");
knifeClubMace.cost = {
    "Wood":145,
    "Knife":5,
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
    "Gardening Gloves" : 30,
}
blueprints.push(runningGloves)

const fightingGloves = new item("Fighting Gloves",46,30000,"gloves");
fightingGloves.cost = {
    "Leather":43,
}
fightingGloves.requires = {
    "Running Gloves" : 40,
}
blueprints.push(fightingGloves)

const cleaningGloves = new item("Cleaning Gloves",71,40000,"gloves");
cleaningGloves.cost = {
    "Leather":60,
}
cleaningGloves.requires = {
    "Fighting Gloves" : 50,
}
blueprints.push(cleaningGloves)

const punchingGloves = new item("Punching Gloves",109,51000,"gloves");
punchingGloves.cost = {
    "Leather":85,
}
punchingGloves.requires = {
    "Cleaning Gloves" : 60,
}
blueprints.push(punchingGloves)

const huggingGloves = new item("Hugging Gloves",168,67000,"gloves");
huggingGloves.cost = {
    "Leather":118,
}
huggingGloves.requires = {
    "Punching Gloves" : 70,
}
blueprints.push(huggingGloves)

const dancingGloves = new item("Dancing Gloves",258,87000,"gloves");
dancingGloves.cost = {
    "Leather":166,
}
dancingGloves.requires = {
    "Hugging Gloves" : 80,
}
blueprints.push(dancingGloves)

const lovingGloves = new item("Loving Gloves",398,113000,"gloves");
lovingGloves.cost = {
    "Leather":232,
    "Healing Potion":2,
}
lovingGloves.requires = {
    "Dancing Gloves" : 90,
}
blueprints.push(lovingGloves)

const otherGloves = new item("Other Gloves",612,147000,"gloves");
otherGloves.cost = {
    "Leather":325,
    "Running Gloves":2,
}
otherGloves.requires = {
    "Loving Gloves" : 100,
}
blueprints.push(otherGloves)

const boxingGloves = new item("Boxing Gloves",943,191000,"gloves");
boxingGloves.cost = {
    "Leather":455,
    "Punching Gloves":3,
}
boxingGloves.requires = {
    "Other Gloves" : 100,
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
    "Healing Potion" : 30,
}
blueprints.push(manaPotion)

const sleepingPotion = new item("Sleeping Potion",42,25000,"potions");
sleepingPotion.cost = {
    "Herb":20,
}
sleepingPotion.requires = {
    "Mana Potion" : 40,
}
blueprints.push(sleepingPotion)

const coughingPotion = new item("Coughing Potion",64,33000,"potions");
coughingPotion.cost = {
    "Herb":27,
}
coughingPotion.requires = {
    "Sleeping Potion" : 50,
}
blueprints.push(coughingPotion)

const invincibilityPotion = new item("Invincibility Potion",99,43000,"potions");
invincibilityPotion.cost = {
    "Herb":38,
}
invincibilityPotion.requires = {
    "Coughing Potion" : 60,
}
blueprints.push(invincibilityPotion)

const laughingPotion = new item("Laughing Potion",152,56000,"potions");
laughingPotion.cost = {
    "Herb":54,
}
laughingPotion.requires = {
    "Invincibility Potion" : 70,
}
blueprints.push(laughingPotion)

const rejuvinatingPotion = new item("Rejuvenating Potion",235,72000,"potions");
rejuvinatingPotion.cost = {
    "Herb":75,
}
rejuvinatingPotion.requires = {
    "Laughing Potion" : 80,
}
blueprints.push(rejuvinatingPotion)

const likePotion = new item("Like Potion",362,94000,"potions");
likePotion.cost = {
    "Herb":105,
    "Mana Potion":2,
}
likePotion.requires = {
    "Rejuvenating Potion" : 90,
}
blueprints.push(likePotion)

const bitterPotion = new item("Bitter Potion",557,122000,"potions");
bitterPotion.cost = {
    "Herb":148,
    "Gardening Gloves":2,
}
bitterPotion.requires = {
    "Like Potion" : 100,
}
blueprints.push(bitterPotion)

const strengthPotion = new item("Strength Potion",857,159000,"potions");
strengthPotion.cost = {
    "Herb":207,
    "Invincibility Potion":3,
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
    "Rage Maker" : 30,
}
blueprints.push(furyBringerAxe)

const vengeanceAxe = new item("Vengeance",32,23000,"axes");
vengeanceAxe.cost = {
    "Ore":9,
    "Wood":11,
}
vengeanceAxe.requires = {
    "Fury Bringer" : 40,
}
blueprints.push(vengeanceAxe)

const prideAxe = new item("Pride",49,29000,"axes");
prideAxe.cost = {
    "Ore":12,
    "Wood":15,
}
prideAxe.requires = {
    "Vengeance" : 50,
}
blueprints.push(prideAxe)

const greedyPickaxeAxe = new item("Greedy Pickaxe",77,37000,"axes");
greedyPickaxeAxe.cost = {
    "Ore":17,
    "Wood":22,
}
greedyPickaxeAxe.requires = {
    "Pride" : 60,
}
blueprints.push(greedyPickaxeAxe)

const slothslayerAxe = new item("Slothslayer",119,46000,"axes");
slothslayerAxe.cost = {
    "Ore":22,
    "Wood":32,
    "Kitchen Knife":2,
}
slothslayerAxe.requires = {
    "Greedy Pickaxe" : 70,
}
blueprints.push(slothslayerAxe)

const lustyHandaxeAxe = new item("Lusty Handaxe",186,57000,"axes");
lustyHandaxeAxe.cost = {
    "Ore":30,
    "Wood":46,
    "The Broominator":2,
}
lustyHandaxeAxe.requires = {
    "Slothslayer" : 80,
}
blueprints.push(lustyHandaxeAxe)

const envyAxe = new item("Envy",290,72000,"axes");
envyAxe.cost = {
    "Ore":41,
    "Wood":67,
    "Hugging Gloves":2,
}
envyAxe.requires = {
    "Lusty Handaxe" : 90,
}
blueprints.push(envyAxe)

const gluttonousAxeAxe = new item("Gluttonous Axe",453,89000,"axes");
gluttonousAxeAxe.cost = {
    "Ore":55,
    "Wood":98,
    "Night Club":2,
}
gluttonousAxeAxe.requires = {
    "Envy" : 100,
}
blueprints.push(gluttonousAxeAxe)

const wrathAxe = new item("Wrath",708,112000,"axes");
wrathAxe.cost = {
    "Ore":74,
    "Wood":142,
    "Strength Potion":2,
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
    "Simple Hat" : 30,
}
blueprints.push(hiddenHat)

const blackHat = new item("Black Hat",109,84000,"hats");
blackHat.cost = {
    "Herb":29,
    "Leather":36,
}
blackHat.requires = {
    "Hidden Mask" : 40,
}
blueprints.push(blackHat)

const beachHat = new item("Beach Hat",170,105000,"hats");
beachHat.cost = {
    "Herb":42,
    "Leather":49,
}
beachHat.requires = {
    "Black Hat" : 50,
}
blueprints.push(beachHat)

const greenBayHat = new item("Green Bay Beret",265,132000,"hats");
greenBayHat.cost = {
    "Herb":62,
    "Leather":66,
}
greenBayHat.requires = {
    "Beach Hat" : 60,
}
blueprints.push(greenBayHat)

const theMindCapHat = new item("The Mind Cap",413,165000,"hats");
theMindCapHat.cost = {
    "Herb":90,
    "Leather":90,
    "Coughing Potion":2,
}
theMindCapHat.requires = {
    "Green Bay Beret" : 70,
}
blueprints.push(theMindCapHat)

const princessHat = new item("Ornate Crown",645,206000,"hats");
princessHat.cost = {
    "Herb":130,
    "Leather":121,
    "Thats A Knife":2,
}
princessHat.requires = {
    "The Mind Cap" : 80,
}
blueprints.push(princessHat)

const spellcasterHat = new item("Spellcasting Hat",1008,258000,"hats");
spellcasterHat.cost = {
    "Herb":189,
    "Leather":163,
    "Fighting Gloves":2,
}
spellcasterHat.requires = {
    "Ornate Crown" : 90,
}
blueprints.push(spellcasterHat)

const spoopyHat = new item("Spoopy Mask",1577,322000,"hats");
spoopyHat.cost = {
    "Herb":274,
    "Leather":221,
    "Other Gloves":2,
}
spoopyHat.requires = {
    "Spellcasting Hat" : 100,
}
blueprints.push(spoopyHat)

const allFolksHat = new item("All Folks Hat",2470,402000,"hats");
allFolksHat.cost = {
    "Herb":397,
    "Leather":298,
    "Dark Is The Knife":2,
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
    "Basic Wand" : 30,
}
blueprints.push(forestWand)

const windWand = new item("Wind Wand",88,59000,"wands");
windWand.cost = {
    "Wood":19,
    "Herb":22,
}
windWand.requires = {
    "Forest Wand" : 40,
}
blueprints.push(windWand)

const soulWand = new item("Soul Wand",134,74000,"wands");
soulWand.cost = {
    "Wood":27,
    "Herb":30,
}
soulWand.requires = {
    "Wind Wand" : 50,
}
blueprints.push(soulWand)

const rainWand = new item("Rain Wand",205,93000,"wands");
rainWand.cost = {
    "Wood":40,
    "Herb":40,
}
rainWand.requires = {
    "Soul Wand" : 60,
}
blueprints.push(rainWand)

const frozenWand = new item("Frozen Wand",315,116000,"wands");
frozenWand.cost = {
    "Wood":58,
    "Herb":54,
    "Cleaning Gloves":2
}
frozenWand.requires = {
    "Rain Wand" : 70,
}
blueprints.push(frozenWand)

const oceanWand = new item("Ocean Wand",483,145000,"wands");
oceanWand.cost = {
    "Wood":84,
    "Herb":73,
    "Rejuvenating Potion":2
}
oceanWand.requires = {
    "Frozen Wand" : 80,
}
blueprints.push(oceanWand)

const thunderWand = new item("Thunder Wand",742,181000,"wands");
thunderWand.cost = {
    "Wood":121,
    "Herb":98,
    "Striped Club":2
}
thunderWand.requires = {
    "Ocean Wand" : 90,
}
blueprints.push(thunderWand)

const hateWand = new item("Hate Wand",1142,226000,"wands");
hateWand.cost = {
    "Wood":176,
    "Herb":132,
    "Bitter Potion":2
}
hateWand.requires = {
    "Thunder Wand" : 100,
}
blueprints.push(hateWand)

const loveWand = new item("Love Wand",1760,283000,"wands");
loveWand.cost = {
    "Wood":255,
    "Herb":179,
    "Knife Club":2
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
    "New Gauntlets" : 30,
}	
blueprints.push(shinyGauntlets)

const plainGauntlets = new item("Plain Gauntlets",57,45000,"gauntlets");
plainGauntlets.cost = {
    "Ore":13,
    "Leather":38,
}
plainGauntlets.requires = {
    "Shiny Gauntlets" : 40,
}	
blueprints.push(plainGauntlets)

const pristineGauntlets = new item("Pristine Gauntlets",89,57000,"gauntlets");
pristineGauntlets.cost = {
    "Ore":17,
    "Leather":55,
}
pristineGauntlets.requires = {
    "Plain Gauntlets" : 50,
}	
blueprints.push(pristineGauntlets)

const challengeGauntlets = new item("Challenge Gauntlets",140,71000,"gauntlets");
challengeGauntlets.cost = {
    "Ore":23,
    "Leather":80,
}
challengeGauntlets.requires = {
    "Pristine Gauntlets" : 60,
}	
blueprints.push(challengeGauntlets)

const fancyGauntlets = new item("Fancy Gauntlets",219,89000,"gauntlets");
fancyGauntlets.cost = {
    "Ore":31,
    "Leather":115,
    "New Gauntlets":2,
}
fancyGauntlets.requires = {
    "Challenge Gauntlets" : 70,
}	
blueprints.push(fancyGauntlets)

const oldGauntlets = new item("Old Gauntlets",343,111000,"gauntlets");
oldGauntlets.cost = {
    "Ore":42,
    "Leather":167,
    "Chefs Knife":2,
}
oldGauntlets.requires = {
    "Fancy Gauntlets" : 80,
}	
blueprints.push(oldGauntlets)

const darkGauntlets = new item("Dark Gauntlets",539,138000,"gauntlets");
darkGauntlets.cost = {
    "Ore":57,
    "Leather":243,
    "Bludgeon":2
}
darkGauntlets.requires = {
    "Old Gauntlets" : 90,
}	
blueprints.push(darkGauntlets)

const dandyGauntlets = new item("Dandy Gauntlets",846,173000,"gauntlets");
dandyGauntlets.cost = {
    "Ore":77,
    "Leather":352,
    "Like Potion":2
}
dandyGauntlets.requires = {
    "Dark Gauntlets" : 100,
}	
blueprints.push(dandyGauntlets)

const coolGauntlets = new item("Cool Gauntlets",1329,216000,"gauntlets");
coolGauntlets.cost = {
    "Ore":104,
    "Leather":510,
    "Boxing Gloves":2
}
coolGauntlets.requires = {
    "Dandy Gauntlets" : 100,
}	
blueprints.push(coolGauntlets)

//helmets
const standardHelmet = new item("Standard Helmet",31,29000,"helmets");
standardHelmet.cost = {
    "Ore":8,
    "Herb":11,
}
blueprints.push(standardHelmet)

const cobaltHelmet = new item("Cobalt Helmet",46,36000,"helmets");
cobaltHelmet.cost = {
    "Ore":12,
    "Herb":15,
}
cobaltHelmet.requires = {
    "Standard Helmet" : 30,
}
blueprints.push(cobaltHelmet)

const regularHelmet = new item("Regular Helmet",70,45000,"helmets");
regularHelmet.cost = {
    "Ore":17,
    "Herb":20,
}
regularHelmet.requires = {
    "Cobalt Helmet" : 40,
}
blueprints.push(regularHelmet)

const superHelmet = new item("Super Helmet",107,57000,"helmets");
superHelmet.cost = {
    "Ore":24,
    "Herb":27,
}
superHelmet.requires = {
    "Regular Helmet" : 50,
}
blueprints.push(superHelmet)

const megaHelmet = new item("Mega Helmet",163,71000,"helmets");
megaHelmet.cost = {
    "Ore":35,
    "Herb":37,
}
megaHelmet.requires = {
    "Super Helmet" : 60,
}
blueprints.push(megaHelmet)

const skullHelmet = new item("Skull Helmet",248,89000,"helmets");
skullHelmet.cost = {
    "Ore":51,
    "Herb":49,
    "Blackjack":2,
}
skullHelmet.requires = {
    "Mega Helmet" : 70,
}
blueprints.push(skullHelmet)

const darkHelmet = new item("Dark Helmet",378,111000,"helmets");
darkHelmet.cost = {
    "Ore":74,
    "Herb":67,
    "Sleeping Potion":2
}
darkHelmet.requires = {
    "Skull Helmet" : 80,
}
blueprints.push(darkHelmet)

const whimsicalHelmet = new item("Whimsical Helmet",578,138000,"helmets");
whimsicalHelmet.cost = {
    "Ore":108,
    "Herb":90,
    "Fishing Knife":2
}
whimsicalHelmet.requires = {
    "Dark Helmet" : 90,
}
blueprints.push(whimsicalHelmet)

const magnetizedHelmet = new item("Magnetized Helmet",884,173000,"helmets");
magnetizedHelmet.cost = {
    "Ore":156,
    "Herb":121,
    "Mega Helmet":2,
}
magnetizedHelmet.requires = {
    "Whimsical Helmet" : 100,
}
blueprints.push(magnetizedHelmet)

const coalHelmutHelmet = new item("Coal Helmut",1353,216000,"helmets");
coalHelmutHelmet.cost = {
    "Ore":227,
    "Herb":164,
    "Fact Finder":2,
}
coalHelmutHelmet.requires = {
    "Magnetized Helmet" : 100,
}
blueprints.push(coalHelmutHelmet)

//shoes
const hamsterShoes = new item("Hamster Clogs",31,36000,"shoes");
hamsterShoes.cost = {
    "Wood":8,
    "Leather":21,
}
blueprints.push(hamsterShoes)

const mageShoes = new item("Mage Moccasins",48,45000,"shoes");
mageShoes.cost = {
    "Wood":11,
    "Leather":30,
}
mageShoes.requires = {
    "Hamster Clogs" : 30,
}
blueprints.push(mageShoes)

const druidicShoes = new item("Druidic Boots",74,56000,"shoes");
druidicShoes.cost = {
    "Wood":15,
    "Leather":44,
}
druidicShoes.requires = {
    "Mage Moccasins" : 40,
}
blueprints.push(druidicShoes)

const fightingShoes = new item("Fighting Stilettos",115,70000,"shoes");
fightingShoes.cost = {
    "Wood":20,
    "Leather":64,
}
fightingShoes.requires = {
    "Druidic Boots" : 50,
}
blueprints.push(fightingShoes)

const bardicShoes = new item("Bardic Galoshes",180,88000,"shoes");
bardicShoes.cost = {
    "Wood":27,
    "Leather":93,
}
bardicShoes.requires = {
    "Fighting Stilettos" : 60,
}
blueprints.push(bardicShoes)

const masterShoes = new item("Master Loafers",280,110000,"shoes");
masterShoes.cost = {
    "Wood":36,
    "Leather":135,
    "Laughing Potion":2
}
masterShoes.requires = {
    "Bardic Galoshes" : 70,
}
blueprints.push(masterShoes)

const foxyShoes = new item("Foxy Slippers",436,137000,"shoes");
foxyShoes.cost = {
    "Wood":48,
    "Leather":195,
    "Hamster Clogs":2,
}
foxyShoes.requires = {
    "Master Loafers" : 80,
}
blueprints.push(foxyShoes)

const hairyShoes = new item("Hairy Shoes",682,172000,"shoes");
hairyShoes.cost = {
    "Wood":65,
    "Leather":283,
    "Dancing Gloves":2,
}
hairyShoes.requires = {
    "Foxy Slippers" : 90,
}
blueprints.push(hairyShoes)

const lunarShoes = new item("Lunar Whalers",1065,215000,"shoes");
lunarShoes.cost = {
    "Wood":88,
    "Leather":410,
    "Club Knife":2,
}
lunarShoes.requires = {
    "Hairy Shoes" : 100,
}
blueprints.push(lunarShoes)

const walkerShoes = new item("Jay Walkers",1667,268000,"shoes");
walkerShoes.cost = {
    "Wood":119,
    "Leather":595,
    "Loving Gloves":2,
}
walkerShoes.requires = {
    "Lunar Whalers" : 100,
}
blueprints.push(walkerShoes)

//three resource items
//wards

const stealthWard = new item("Stealth Ward",49,45000,"wards");
stealthWard.cost = {
    "Ore":6,
    "Wood":8,
    "Herb":15,
    "Basic Wand":1,
}
blueprints.push(stealthWard)

const sentryWard = new item("Sentry Ward",76,56000,"wards");
sentryWard.cost = {
    "Ore":8,
    "Wood":11,
    "Herb":22,
    "Forest Wand":1,
}
sentryWard.requires = {
    "Stealth Ward" : 60,
}
blueprints.push(sentryWard)

const spellWard = new item("Spell Ward",119,70000,"wards");
spellWard.cost = {
    "Ore":11,
    "Wood":16,
    "Herb":32,
    "Wind Wand":1,
}
spellWard.requires = {
    "Sentry Ward" : 65,
}
blueprints.push(spellWard)

const curseWard = new item("Curse Ward",187,88000,"wards");
curseWard.cost = {
    "Ore":15,
    "Wood":22,
    "Herb":46,
    "Soul Wand":1,
}
curseWard.requires = {
    "Spell Ward" : 70,
}
blueprints.push(curseWard)

const poisonWard = new item("Poison Ward",294,110000,"wards");
poisonWard.cost = {
    "Ore":20,
    "Wood":31,
    "Herb":66,
    "Rain Wand":1,
}
poisonWard.requires = {
    "Curse Ward" : 75,
}
blueprints.push(poisonWard)

const diseaseWard = new item("Disease Ward",461,137000,"wards");
diseaseWard.cost = {
    "Ore":27,
    "Wood":43,
    "Herb":96,
    "Stealth Ward":2,
}
diseaseWard.requires = {
    "Poison Ward" : 80,
}
blueprints.push(diseaseWard)

const infectionWard = new item("Infection Ward",724,172000,"wards");
infectionWard.cost = {
    "Ore":36,
    "Wood":60,
    "Herb":139,
    "Sentry Ward":2,
}
infectionWard.requires = {
    "Disease Ward" : 85,
}
blueprints.push(infectionWard)

const cancerWard = new item("Cancer Ward",1138,215000,"wards");
cancerWard.cost = {
    "Ore":49,
    "Wood":84,
    "Herb":202,
    "Spell Ward":2
}
cancerWard.requires = {
    "Infection Ward" : 90,
}
blueprints.push(cancerWard)

const maternityWard = new item("Maternity Ward",1790,268000,"wards");
maternityWard.cost = {
    "Ore":66,
    "Wood":118,
    "Herb":293,
    "Love Wand":2,
}
maternityWard.requires = {
    "Cancer Ward" : 100,
}
blueprints.push(maternityWard)

const burnUnitWard = new item("Burn Unit",2816,335000,"wards");
burnUnitWard.cost = {
    "Ore":89,
    "Wood":165,
    "Herb":425,
    "Hate Wand":3,
}
burnUnitWard.requires = {
    "Maternity Ward" : 100,
}
blueprints.push(burnUnitWard)

//shields
const patienceShield = new item("Patience",40,32000,"shields");
patienceShield.cost = {
    "Ore":7,
    "Wood":10,
    "Leather":19,
    "Rage Maker":1,
}
blueprints.push(patienceShield)

const faithfulShield = new item("Faithful Buckler",61,40000,"shields");
faithfulShield.cost = {
    "Ore":10,
    "Wood":15,
    "Leather":26,
    "Fury Bringer":1,
}
faithfulShield.requires = {
    "Patience" : 60,
}
blueprints.push(faithfulShield)

const defiantShield = new item("Defiant Targe",94,50000,"shields");
defiantShield.cost = {
    "Ore":14,
    "Wood":21,
    "Leather":35,
    "Vengeance":1,
}
defiantShield.requires = {
    "Faithful Buckler" : 65,
}
blueprints.push(defiantShield)

const fairShield = new item("Fair Shield",145,63000,"shields");
fairShield.cost = {
    "Ore":19,
    "Wood":30,
    "Leather":47,
    "Pride":1,
}
fairShield.requires = {
    "Defiant Targe" : 70,
}
blueprints.push(fairShield)

const wisdomShield = new item("Wisdom",224,78000,"shields");
wisdomShield.cost = {
    "Ore":27,
    "Wood":44,
    "Leather":63,
    "Greedy Pickaxe":1,
}
wisdomShield.requires = {
    "Fair Shield" : 75,
}
blueprints.push(wisdomShield)

const generousShield = new item("Generous Blocker",346,98000,"shields");
generousShield.cost = {
    "Ore":38,
    "Wood":64,
    "Leather":85,
    "Patience":2,
}
generousShield.requires = {
    "Wisdom" : 80,
}
blueprints.push(generousShield)

const loyalShield = new item("Loyal Companion",536,122000,"shields");
loyalShield.cost = {
    "Ore":53,
    "Wood":93,
    "Leather":115,
    "Faithful Buckler":2,
}
loyalShield.requires = {
    "Generous Blocker" : 85,
}
blueprints.push(loyalShield)

const dignityShield = new item("Dignity",829,153000,"shields");
dignityShield.cost = {
    "Ore":74,
    "Wood":135,
    "Leather":155,
    "Defiant Targe":2,
}
dignityShield.requires = {
    "Loyal Companion" : 90,
}
blueprints.push(dignityShield)

const trustworthyShield = new item("Trustworthy Kite",1284,191000,"shields");
trustworthyShield.cost = {
    "Ore":103,
    "Wood":195,
    "Leather":210,
    "Gluttonous Axe":2,
}
trustworthyShield.requires = {
    "Dignity" : 100,
}
blueprints.push(trustworthyShield)

const truthTellerShield = new item("Truth Teller",1991,238000,"shields");
truthTellerShield.cost = {
    "Ore":145,
    "Wood":283,
    "Leather":283,
    "Wrath":3,
}
truthTellerShield.requires = {
    "Trustworthy Kite" : 100,
}
blueprints.push(truthTellerShield)

//cloaks
const noviceCloak = new item("Novice Cloak",53,32000,"cloaks");
noviceCloak.cost = {
    "Wood":7,
    "Leather":23,
    "Herb":13,
    "Simple Hat":1,
}
blueprints.push(noviceCloak)

const apprenticeCloak = new item("Apprentice Cloak",78,40000,"cloaks");
apprenticeCloak.cost = {
    "Wood":9,
    "Leather":33,
    "Herb":18,
    "Hidden Mask":1,
}
apprenticeCloak.requires = {
    "Novice Cloak" : 60,
}
blueprints.push(apprenticeCloak)

const practitionerCloak = new item("Practitioner Cloak",115,50000,"cloaks");
practitionerCloak.cost = {
    "Wood":13,
    "Leather":48,
    "Herb":25,
    "Black Hat":1,
}
practitionerCloak.requires = {
    "Apprentice Cloak" : 65,
}
blueprints.push(practitionerCloak)

const journeymanCloak = new item("Journeyman Cloak",170,63000,"cloaks");
journeymanCloak.cost = {
    "Wood":17,
    "Leather":70,
    "Herb":36,
    "Beach Hat":1,
}
journeymanCloak.requires = {
    "Practitioner Cloak" : 70,
}
blueprints.push(journeymanCloak)

const expertCloak = new item("Expert Cloak",253,78000,"cloaks");
expertCloak.cost = {
    "Wood":23,
    "Leather":102,
    "Herb":50,
    "Green Bay Beret":1,
}
expertCloak.requires = {
    "Journeyman Cloak" : 75,
}
blueprints.push(expertCloak)

const frostflingerCloak = new item("Frostflinger Cloak",379,98000,"cloaks");
frostflingerCloak.cost = {
    "Wood":31,
    "Leather":147,
    "Herb":70,
    "Novice Cloak":2,
}
frostflingerCloak.requires = {
    "Expert Cloak" : 80,
}
blueprints.push(frostflingerCloak)

const waterbringerCloak = new item("Stormbringer Cloak",569,122000,"cloaks");
waterbringerCloak.cost = {
    "Wood":42,
    "Leather":214,
    "Herb":98,
    "Apprentice Cloak":2,
}
waterbringerCloak.requires = {
    "Frostflinger Cloak" : 85,
}
blueprints.push(waterbringerCloak)

const earthslingerCloak = new item("Earthslinger Cloak",858,153000,"cloaks");
earthslingerCloak.cost = {
    "Wood":57,
    "Leather":310,
    "Herb":137,
    "Practitioner Cloak":2,
}
earthslingerCloak.requires = {
    "Stormbringer Cloak" : 90,
}
blueprints.push(earthslingerCloak)

const lifegiverCloak = new item("Lifegiver Cloak",1301,191000,"cloaks");
lifegiverCloak.cost = {
    "Wood":77,
    "Leather":449,
    "Herb":192,
    "Spoopy Mask":2,
}
lifegiverCloak.requires = {
    "Earthslinger Cloak" : 100,
}
blueprints.push(lifegiverCloak)

const deathcallerCloak = new item("Deathcaller Cloak",1982,238000,"cloaks");
deathcallerCloak.cost = {
    "Wood":104,
    "Leather":652,
    "Herb":269,
    "All Folks Hat":3,
}
deathcallerCloak.requires = {
    "Lifegiver Cloak" : 100,
}
blueprints.push(deathcallerCloak)

//armor
const metalArmor = new item("Metal Armor",43,20000,"armor");
metalArmor.cost = {
    "Ore":9,
    "Leather":21,
    "Herb":9,
    "Standard Helmet":1,
}
blueprints.push(metalArmor)


const metallicArmor = new item("Metallic Armor",61,25000,"armor");
metallicArmor.cost = {
    "Ore":13,
    "Leather":29,
    "Herb":12,
    "Shiny Gauntlets":1,
}
metallicArmor.requires = {
    "Metal Armor" : 60,
}
blueprints.push(metallicArmor)

const pantherArmor = new item("Panther Armor",88,31000,"armor");
pantherArmor.cost = {
    "Ore":19,
    "Leather":41,
    "Herb":16,
    "Plain Gauntlets":1,
}
pantherArmor.requires = {
    "Metallic Armor" : 65,
}
blueprints.push(pantherArmor)

const slayersArmor = new item("Slayers Plate",126,39000,"armor");
slayersArmor.cost = {
    "Ore":27,
    "Leather":58,
    "Herb":22,
    "Pristine Gauntlets":1,
}
slayersArmor.requires = {
    "Panther Armor" : 70,
}
blueprints.push(slayersArmor)

const zeppelinArmor = new item("Leaded Zeppelin Hull",182,49000,"armor");
zeppelinArmor.cost = {
    "Ore":40,
    "Leather":81,
    "Herb":30,
    "Challenge Gauntlets":1,
}
zeppelinArmor.requires = {
    "Slayers Plate" : 75,
}
blueprints.push(zeppelinArmor)

const acdChainmailArmor = new item("A Cool Dark Chainmail",265,61000,"armor");
acdChainmailArmor.cost = {
    "Ore":58,
    "Leather":113,
    "Herb":40,
    "Metal Armor":2,
}
acdChainmailArmor.requires = {
    "Leaded Zeppelin Hull" : 80,
}
blueprints.push(acdChainmailArmor)

const miBreastplateArmor = new item("Maidens Plate",388,76000,"armor");
miBreastplateArmor.cost = {
    "Ore":84,
    "Leather":158,
    "Herb":54,
    "Metallic Armor":2
}
miBreastplateArmor.requires = {
    "A Cool Dark Chainmail" : 85,
}
blueprints.push(miBreastplateArmor)

const ipCuirassArmor = new item("Intense Purple Cuirass",569,95000,"armor");
ipCuirassArmor.cost = {
    "Ore":121,
    "Leather":221,
    "Herb":74,
    "Panther Armor":2,
}
ipCuirassArmor.requires = {
    "Maidens Plate" : 90,
}
blueprints.push(ipCuirassArmor)

const wsChainmailArmor = new item("Serpent Mail",841,119000,"armor");
wsChainmailArmor.cost = {
    "Ore":176,
    "Leather":310,
    "Herb":99,
    "Cool Gauntlets":2,
}
wsChainmailArmor.requires = {
    "Intense Purple Cuirass" : 100,
}
blueprints.push(wsChainmailArmor)

const heavyMetalArmor = new item("Heavy Metal Armor",1250,149000,"armor");
heavyMetalArmor.cost = {
    "Ore":255,
    "Leather":434,
    "Herb":134,
    "Coal Helmut":3,
}
heavyMetalArmor.requires = {
    "Serpent Mail" : 100,
}
blueprints.push(heavyMetalArmor)

//four resource items
//pendants

const lettucePendant = new item("Lactuca",184,90000,"pendants");
lettucePendant.cost = {
    "Ore":20,
    "Wood":28,
    "Leather":45,
    "Herb":40,
    "Wisdom":1,
}
blueprints.push(lettucePendant)

const jellyPeanutPendant = new item("Gelata Eros",276,113000,"pendants");
jellyPeanutPendant.cost = {
    "Ore":29,
    "Wood":39,
    "Leather":59,
    "Herb":54,
    "Loyal Companion":1,
}
jellyPeanutPendant.requires = {
    "Lactuca" : 100,
}
blueprints.push(jellyPeanutPendant)

const shirePendant = new item("Comitatus",414,141000,"pendants");
shirePendant.cost = {
    "Ore":42,
    "Wood":55,
    "Leather":76,
    "Herb":73,
    "Mage Moccasins":2,
    "Lifegiver Cloak":1,
}
shirePendant.requires = {
    "Gelata Eros" : 100,
}
blueprints.push(shirePendant)

const silentPendant = new item("Tacet Gladio",622,176000,"pendants");
silentPendant.cost = {
    "Ore":61,
    "Wood":77,
    "Leather":99,
    "Herb":98,
    "Fighting Stilettos":2,
    "Serpent Mail":1,
}
silentPendant.requires = {
    "Comitatus" : 100,
}
blueprints.push(silentPendant)

const friendDoorPendant = new item("Ostium Amici",936,220000,"pendants");
friendDoorPendant.cost = {
    "Ore":88,
    "Wood":108,
    "Leather":129,
    "Herb":133,
    "Hairy Shoes":1,
    "Trustworthy Kite":1,
}
friendDoorPendant.requires = {
    "Tacet Gladio" : 100,
}
blueprints.push(friendDoorPendant)

const phoenixPendant = new item("Ignis Pullum",1409,275000,"pendants");
phoenixPendant.cost = {
    "Ore":128,
    "Wood":151,
    "Leather":167,
    "Herb":179,
    "The Bloopinator":3,
    "Maternity Ward":1,
}
phoenixPendant.requires = {
    "Ostium Amici" : 100,
}
blueprints.push(phoenixPendant)

const katiePendant = new item("Folium Strennus",2125,343000,"pendants");
katiePendant.cost = {
    "Ore":186,
    "Wood":211,
    "Leather":217,
    "Herb":242,
    "Druidic Boots":2,
    "Burn Unit":2,
}
katiePendant.requires = {
    "Ignis Pullum" : 100,
}
blueprints.push(katiePendant)

const richardPendant = new item("Magicae Criceta",3209,429000,"pendants");
richardPendant.cost = {
    "Ore":270,
    "Wood":295,
    "Leather":282,
    "Herb":327,
    "Jay Walkers":1,
    "Heavy Metal Armor":2,
}
richardPendant.requires = {
    "Folium Strennus" : 100,
}
blueprints.push(richardPendant)

const akersonPendant = new item("Inpulsa Sciurus",4851,536000,"pendants");
akersonPendant.cost = {
    "Ore":391,
    "Wood":413,
    "Leather":367,
    "Herb":441,
    "Master Loafers":1,
    "Truth Teller":2,
}
akersonPendant.requires = {
    "Magicae Criceta" : 100,
}
blueprints.push(akersonPendant)

const abquPendant = new item("Adipem Pater",7342,671000,"pendants");
abquPendant.cost = {
    "Ore":567,
    "Wood":579,
    "Leather":477,
    "Herb":596,
    "Bardic Galoshes":2,
    "Deathcaller Cloak":2,
}
abquPendant.requires = {
    "Inpulsa Sciurus" : 100,
}
blueprints.push(abquPendant)

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
    "Otto" : '<img src="workers/heads/ottohead.png">',
    "Wood" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/materials/logs_6.png">',
    "Sell" : 'Item',
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
    "Vengeance" : '<img src="PixelItem/Equip/Set/IcyAxe.png">',
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
    "Invincibility Potion" : '<img src="PixelAbqu/blank_tile.png">',
    "Laughing Potion" : '<img src="PixelItem/Consume/Wine.png">',
    "Rejuvenating Potion" : '<img src="PixelItem/Consume/Potion/PotionMulticolor.png">',
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
    "All Folks Hat" : '<img src="PixelItem/Equip/Head/Hat4.png">',
    "Basic Wand" : '<img src="PixelItem/Equip/Weapon/Wand0.png">',
    "Forest Wand" : '<img src="PixelItem/Equip/Weapon/Wand1.png">',
    "Wind Wand" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc-weapons/weapon_176.png">',
    "Soul Wand" : '<img src="PixelItem/Equip/Weapon/Wand6.png">',
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
    "Standard Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_63.png">',
    "Cobalt Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_64.png">',
    "Regular Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_2.png">',
    "Super Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_6.png">',
    "Mega Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_5.png">',
    "Skull Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_66.png">',
    "Dark Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_18.png">',
    "Whimsical Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_50.png">',
    "Magnetized Helmet" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_19.png">',
    "Coal Helmut" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/helmets/helmet_13.png">',
    "Hamster Clogs" : '<img src="PixelItem/Equip/Feet/ShoesB0.png">',
    "Mage Moccasins" : '<img src="PixelItem/Equip/Feet/ShoesE3.png">',
    "Druidic Boots" : '<img src="PixelItem/Equip/Feet/SabatonsB1.png">',
    "Fighting Stilettos" : '<img src="PixelItem/Equip/Feet/ShoesC0.png">',
    "Bardic Galoshes" : '<img src="PixelItem/Equip/Feet/ShoesH.png">',
    "Master Loafers" : '<img src="PixelItem/Equip/Feet/Sandals0.png">',
    "Foxy Slippers" : '<img src="PixelItem/Equip/Feet/ShoesA0.png">',
    "Hairy Shoes" : '<img src="PixelItem/Equip/Feet/ShoesF1.png">',
    "Lunar Whalers" : '<img src="PixelItem/Equip/Feet/ShoesE4.png">',
    "Jay Walkers" : '<img src="PixelItem/Equip/Feet/ShoesF0.png">',
    "Stealth Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_81.png">',
    "Sentry Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_74.png">',
    "Spell Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_77.png">',
    "Curse Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_80.png">',
    "Poison Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_83.png">',
    "Disease Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_76.png">',
    "Infection Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_79.png">',
    "Cancer Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_82.png">',
    "Maternity Ward" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_75.png">',
    "Burn Unit" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/shields/shield_73.png">',
    "Patience" : '<img src="PixelItem/Equip/Shield/Shield25.png">',
    "Faithful Buckler" : '<img src="PixelItem/Equip/Shield/Shield13.png">',
    "Defiant Targe" : '<img src="PixelItem/Equip/Shield/Shield12.png">',
    "Fair Shield" : '<img src="PixelItem/Equip/Shield/Shield3.png">',
    "Wisdom" : '<img src="PixelItem/Equip/Shield/Shield20.png">',
    "Generous Blocker" : '<img src="PixelItem/Equip/Shield/Shield9.png">',
    "Loyal Companion" : '<img src="PixelItem/Equip/Shield/Shield8.png">',
    "Dignity" : '<img src="PixelItem/Equip/Shield/Shield7.png">',
    "Trustworthy Kite" : '<img src="PixelItem/Equip/Shield/Shield10.png">',
    "Truth Teller" : '<img src="PixelItem/Equip/Shield/Shield11.png">',
    "Novice Cloak" : '<img src="PixelItem/Equip/Back/CloakE3.png">',
    "Apprentice Cloak" : '<img src="PixelItem/Equip/Back/CloakE4.png">',
    "Practitioner Cloak" : '<img src="PixelItem/Equip/Back/CloakE1.png">',
    "Journeyman Cloak" : '<img src="PixelItem/Equip/Back/CloakE2.png">',
    "Expert Cloak" : '<img src="PixelItem/Equip/Back/CloakE0.png">',
    "Frostflinger Cloak" : '<img src="PixelItem/Equip/Back/CloakA0.png">',
    "Stormbringer Cloak" : '<img src="PixelItem/Equip/Back/CloakB7.png">',
    "Earthslinger Cloak" : '<img src="PixelItem/Equip/Back/CloakA4.png">',
    "Lifegiver Cloak" : '<img src="PixelItem/Equip/Back/CloakB0.png">',
    "Deathcaller Cloak" : '<img src="PixelItem/Equip/Back/CloakC2.png">',
    "Metal Armor" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_1.png">',
    "Metallic Armor" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_74.png">',
    "Panther Armor" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_48.png">',
    "Slayers Plate" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_75.png">',
    "Leaded Zeppelin Hull" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_3.png">',
    "A Cool Dark Chainmail" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_51.png">',
    "Maidens Plate" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_41.png">',
    "Intense Purple Cuirass" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_73.png">',
    "Serpent Mail" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_46.png">',
    "Heavy Metal Armor" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/armors/armor_4.png">',
    "Lactuca" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/amulets/amulet_10.png">',
    "Gelata Eros" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/amulets/amulet_23.png">',
    "Comitatus" : '<img src="PixelItem/Equip/Neck/NeckSilver3.png">',
    "Tacet Gladio" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/amulets/amulet_37.png">',
    "Ostium Amici" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/amulets/amulet_13.png">',
    "Ignis Pullum" : '<img src="PixelItem/Equip/Neck/NeckSilver0.png">',
    "Folium Strennus" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/amulets/amulet_18.png">',
    "Magicae Criceta" : '<img src="PixelItem/Equip/Neck/NeckSilver2.png">',
    "Inpulsa Sciurus" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/amulets/amulet_30.png">',
    "Adipem Pater" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/amulets/amulet_35.png">',
}
