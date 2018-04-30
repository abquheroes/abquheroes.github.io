function item(name) {
    this.name = name;
    this.count = 0;
}

const blueprints = [];

const knife = new item("Knife");
knife.cost = {
    "Ore":15,
}
knife.value = 15;
knife.craftTime = 1500;
blueprints.push(knife)
