function item(name) {
    this.name = name;
    this.count = 0;
}

const blueprints = {};

blueprints["knife"] = new item("knife");
blueprints["knife"].cost = {
    ORE:15
}
blueprints["knife"].value = 15;
blueprints["knife"].craftTime = 1500;
