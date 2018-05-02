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

const chefsKnife = new item("Chefs Knife",17,19000);
chefsKnife.cost = {
    "Ore":17,
}
blueprints.push(chefsKnife)

const fishingKnife = new item("Fishing Knife",22,23000);
fishingKnife.cost = {
    "Ore":22,
}
blueprints.push(fishingKnife)

const thatsNotAKnife = new item("Thats Not A Knife",30,27000);
thatsNotAKnife.cost = {
    "Ore":30,
}
blueprints.push(thatsNotAKnife)

const thatsAKnife = new item("Thats A Knife",41,33000);
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

const clubMace = new item("Club",7,10000);
clubMace.cost = {
    "Wood":5,
}
blueprints.push(clubMace)

const maulMace = new item("Maul",12,16000);
maulMace.cost = {
    "Wood":8,
}
blueprints.push(maulMace)

const brawlerMace = new item("Mace",15,19000);
brawlerMace.cost = {
    "Wood":11,
}
blueprints.push(brawlerMace)

const broomMace = new item("The Broominator",20,22000);
broomMace.cost = {
    "Wood":14,
}
blueprints.push(broomMace)

const blackjackMace = new item("Blackjack",26,26000);
blackjackMace.cost = {
    "Wood":19,
}
blueprints.push(blackjackMace)

const bludgeonMace = new item("Bludgeon",24,30000);
bludgeonMace.cost = {
    "Wood":24,
}
blueprints.push(bludgeonMace)

const stripedClubMace = new item("Striped Club",44,35000);
stripedClubMace.cost = {
    "Wood":31,
}
blueprints.push(stripedClubMace)

const nightClubMace = new item("Night Club",57,40000);
nightClubMace.cost = {
    "Wood":41,
}
blueprints.push(nightClubMace)

const factFinderMace = new item("Fact Finder",74,46000);
factFinderMace.cost = {
    "Wood":53,
}
blueprints.push(factFinderMace)

const knifeClubMace = new item("Knife Club",97,53000);
knifeClubMace.cost = {
    "Wood":69,
}
blueprints.push(knifeClubMace)

const imageReference = {
    "Coin" : '<img src="PixelItem/CoinsGold5.png">',
    "Ore" : '<img src="PixelItem/Ore.png">',
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
    "clubMace" : '<img src="PixelItem/Equip/Weapon/Club.png">',
    "maulMace" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_12.png">',
    "brawlerMace" : '<img src="PixelItem/Equip/Weapon/Mace1.png">',
    "broomMace" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/misc/broom_1.png">',
    "blackjackMace" : '<img src="PixelItem/Equip/Weapon/Mace2.png">',
    "bludgeonMace" : '<img src="PixelItem/Equip/Weapon/Mace0.png">',
    "stripedClubMace" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_9.png">',
    "nightClubMace" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_30.png">',
    "factFinderMace" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/hammers/hammer_1.png">',
    "knifeClubMace" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/magic-weapons/magicweapon_1.png">',
}
