function item(name,value,craftTime) {
    this.name = name;
    this.count = 0;
    this.value = value;
    this.craftTime = craftTime;
}

const blueprints = [];

const knife = new item("Knife",5,7000);
knife.cost = {
    "Ore":5,
}
blueprints.push(knife)

function nameToItem(name) {
    for (let i=0;i<blueprints.length;i++) {
        if (blueprints[i].name == name) {
            return blueprints[i];
        }
    }
    return null;
}