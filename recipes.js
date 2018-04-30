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


const imageReference = {
    "Coin" : '<img src="PixelItem/CoinsGold5.png">',
    "Ore" : '<img src="PixelItem/Ore.png">',
    "Knife" : '<img src="PixelItem/Equip/Weapon/Knife.png">',
}