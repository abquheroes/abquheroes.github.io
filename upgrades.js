const upgrades = []

const maxOre = {
    name : "Max Ore",
    description : "Increases the maximum capacity of Ore you can store.",
    cost : [625,781,977,1221,1526,1907,2384,2980,3725,4657,5821,7276,9095,11369,14211,17764,22204,27756,34694,43368,54210,67763,84703,105879],
    value : [17,17,18,18,18,18,18,18,108,18,18,18,18,18,18,18,18,18,108,18,18,18,18,108],
}
upgrades.push(maxOre);

const maxWood = {
    name : "Max Wood",
    description : "Increases the maximum capacity of Wood you can store.",
    cost : [625,781,977,1221,1526,1907,2384,2980,3725,4657,5821,7276,9095,11369,14211,17764,22204,27756,34694,43368,54210,67763,84703,105879],
    value : [17,17,18,18,18,18,18,18,108,18,18,18,18,18,18,18,18,18,108,18,18,18,18,108],
}
upgrades.push(maxWood);

const maxLeather = {
    name : "Max Leather",
    description : "Increases the maximum capacity of Leather you can store.",
    cost : [625,781,977,1221,1526,1907,2384,2980,3725,4657,5821,7276,9095,11369,14211,17764,22204,27756,34694,43368,54210,67763,84703,105879],
    value : [17,17,18,18,18,18,18,18,108,18,18,18,18,18,18,18,18,18,108,18,18,18,18,108],
}
upgrades.push(maxLeather);

const maxHerb = {
    name : "Max Herb",
    description : "Increases the maximum capacity of Herb you can store.",
    cost : [625,781,977,1221,1526,1907,2384,2980,3725,4657,5821,7276,9095,11369,14211,17764,22204,27756,34694,43368,54210,67763,84703,105879],
    value : [17,17,18,18,18,18,18,18,108,18,18,18,18,18,18,18,18,18,108,18,18,18,18,108],
}
upgrades.push(maxHerb);

const maxActionSlots = {
    name : "Max Action Slots",
    description : "Increases the number of Action Slots you can have.",
    cost : [1000,2000,4000,10000,20000,50000,100000],
    value : [1,1,1,1,1,1,1],
}
upgrades.push(maxActionSlots);

const maxInventory = {
    name : "Max Inventory Slots",
    description : "Increases the number of Inventory Slots you can have.",
    cost : [500,1000,1500,2000,2500,3000,4000,5000,6000,7000,8000,10000,15000,20000,30000],
    value : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
}
upgrades.push(maxInventory);

function nameToUpgrade(name) {
    for (let i=0;i<upgrades.length;i++) {
        if (upgrades[i].name == name) return upgrades[i];
    }
    return null;
}

$upgradelist = $("#upgradelist");

function refreshUpgrades() {
    $upgradelist.empty();
    for (let i=0;i<upgrades.length;i++) {
        const lvl = upgradeProgress[upgrades[i].name];
        const upgrade = $('<div/>').addClass("Upgrade");
        const d1 = $('<div/>').addClass('upgradeName').html("<h3>"+upgrades[i].name+"</h3>")
        const d2 = $('<div/>').addClass('upgradeDesc').html(upgrades[i].description);
        const d3 = $("<div/>").addClass("upgradeLvl").html("Lvl. " + lvl)
        if (lvl === 0) d3.addClass("hidden");
        const d4 = $('<div/>').addClass('upgradeCost').html("Cost: "+upgrades[i].cost[lvl]+"&nbsp;"+imageReference["Gold"]);
        const b1 = $("<button/>").addClass("BuyUpgrade").attr("id",upgrades[i].name).html("PURCHASE");
        if (player.money < upgrades[i].cost[lvl]) b1.addClass("upgradeDisable");
        if (lvl === upgrades[i].cost.length) {
            d4.addClass("hidden");
            b1.addClass("hidden");
        }
        upgrade.append(d1);
        upgrade.append(d2);
        upgrade.append(d3);
        upgrade.append(d4);
        upgrade.append(b1);
        $upgradelist.append(upgrade);
    }
}

$upgradelist.on("click", ".BuyUpgrade", (e) => {
    e.preventDefault();
    upgrade(e.target.id);
    refreshUpgrades();
});

function upgrade(name) {
    const upgrade = nameToUpgrade(name);
    const cost = upgrade.cost[upgradeProgress[name]];
    if (player.money >= cost) {
        player.money -= cost;
        if (name === "Max Ore") player.oreCap += upgrade.value[upgradeProgress[name]];
        else if (name === "Max Wood") player.woodCap += upgrade.value[upgradeProgress[name]];
        else if (name === "Max Leather") player.leatherCap += upgrade.value[upgradeProgress[name]];
        else if (name === "Max Herb") player.herbCap += upgrade.value[upgradeProgress[name]];
        else if (name === "Max Action Slots") {
            player.actionSlots.push({
                actionType : "Empty",
                actionName : "Empty",
                actionTime : 0,
                actionEnd : 0,
            });
            refreshActionSlots();
        }
        else if (name === "Max Inventory Slots") {
            player.inventoryCap += upgrade.value[upgradeProgress[name]];
        }
        upgradeProgress[name] += 1;
    }
}

function purchaseWorker(name) {
    const worker = nameToWorker(name);
    const cost = worker.cost[workerProgress[name]];
    if (player.money >= cost) {
        player.money -= cost;
        workerProgress[name] += 1;
    }
}