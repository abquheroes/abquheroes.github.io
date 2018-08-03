const upgrades = []

const maxOre = {
    name : "Max Ore",
    description : "Increases the maximum capacity of Ore you can store.",
    cost : [100,200,300,400,500,600,700,800,1000,1500,2000,2500,5000,10000,20000,30000,40000,50000,70000,80000,90000,120000],
    value : [50,60,70,80,90,100,120,140,160,180,200,250,300,350,400,450,500,550,600,700,800,900],
    valueSuffix : " Ore Capacity",
}
upgrades.push(maxOre);

const maxWood = {
    name : "Max Wood",
    description : "Increases the maximum capacity of Wood you can store.",
    cost : [100,200,300,400,500,600,700,800,1000,1500,2000,2500,5000,10000,20000,30000,40000,50000,70000,80000,90000,120000],
    value : [50,60,70,80,90,100,120,140,160,180,200,250,300,350,400,450,500,550,600,700,800,900],
    valueSuffix : " Wood Capacity",
}
upgrades.push(maxWood);

const maxLeather = {
    name : "Max Leather",
    description : "Increases the maximum capacity of Leather you can store.",
    cost : [100,200,300,400,500,600,700,800,1000,1500,2000,2500,5000,10000,20000,30000,40000,50000,70000,80000,90000,120000],
    value : [50,60,70,80,90,100,120,140,160,180,200,250,300,350,400,450,500,550,600,700,800,900],
    valueSuffix : " Leather Capacity",
}
upgrades.push(maxLeather);

const maxHerb = {
    name : "Max Herb",
    description : "Increases the maximum capacity of Herb you can store.",
    cost : [100,200,300,400,500,600,700,800,1000,1500,2000,2500,5000,10000,20000,30000,40000,50000,70000,80000,90000,120000],
    value : [50,60,70,80,90,100,120,140,160,180,200,250,300,350,400,450,500,550,600,700,800,900],
    valueSuffix : " Herb Capacity",
}
upgrades.push(maxHerb);

const maxActionSlots = {
    name : "Max Action Slots",
    description : "Increases the number of Action Slots you can have.",
    cost : [2000,4000,10000,25000,50000,75000,100000],
    value : [3,4,5,6,7,8,9,10],
    valueSuffix : " Action Slots"
}
upgrades.push(maxActionSlots);

const maxInventory = {
    name : "Max Inventory Slots",
    description : "Increases the number of Inventory Slots you can have per item.",
    cost : [500,1000,1500,2000,2500,3000,4000,5000,6000,7000,8000,10000,15000,20000,30000,50000],
    value : [10,11,12,13,14,15,16,17,18,19,20,22,24,26,28,30],
    valueSuffix : " Inventory Slots",
}
upgrades.push(maxInventory);

const autoSell = {
    name : "Auto Sell Value",
    description : "Increases the value of item auto-selling.",
    cost : [2000,4000,8000,12000,16000,20000,40000,60000,80000,100000],
    value : [50,55,60,65,70,75,80,85,90,95],
    valueSuffix : "% Sell Value"
}
upgrades.push(autoSell);

function nameToUpgrade(name) {
    for (let i=0;i<upgrades.length;i++) {
        if (upgrades[i].name == name) return upgrades[i];
    }
    return null;
}

$upgradelist = $("#upgradelist");

function getMaxInventory() {
    return maxInventory.value[upgradeProgress["Max Inventory Slots"]];
}

function refreshUpgrades() {
    $upgradelist.empty();
    for (let i=0;i<upgrades.length;i++) {
        if (upgrades[i].name === "Max Wood" && workerProgress["Eryn"] === 0) continue;
        if (upgrades[i].name === "Max Leather" && workerProgress["Lakur"] === 0) continue;
        if (upgrades[i].name === "Max Herb" && workerProgress["Herbie"] === 0) continue;
        const lvl = upgradeProgress[upgrades[i].name];
        const upgrade = $('<div/>').addClass("Upgrade");
        const d1 = $("<div/>").addClass("upgradeImage").html(upgradeImageReference[upgrades[i].name]);
        const d2 = $('<div/>').addClass('upgradeName').html("<h3>"+upgrades[i].name+"</h3>");
        const d3 = $('<div/>').addClass('upgradeDesc').html(upgrades[i].description);
        const d4 = $("<div/>").addClass("upgradeLvl tooltip").html(lvl).attr("aria-label", "Upgrade Level");
        const d5 = $("<div/>").addClass("upgradeLvlDesc").html("");
        if (lvl !== upgrades[i].value.length-1) {
            const delta = upgrades[i].value[lvl+1] - upgrades[i].value[lvl]
            const s = "+" + delta + upgrades[i].valueSuffix;
            d5.append(s);
        }
        if (lvl === 0) d4.addClass("hidden");
        const d6 = $('<div/>').addClass('upgradeCost').html("Cost:&nbsp;&nbsp;&nbsp;"+imageReference["Gold"]+"&nbsp;&nbsp;"+formatToUnits(upgrades[i].cost[lvl],2));
        const b1 = $("<button/>").addClass("BuyUpgrade").attr("id",upgrades[i].name).html("PURCHASE");
        if (player.money < upgrades[i].cost[lvl]) b1.addClass("upgradeDisable tooltip").attr("aria-label", "You do not have enough Gold to purchase this upgrade.");
        if (lvl === upgrades[i].value.length-1) {
            d6.addClass("hidden");
            b1.addClass("hidden");
        }
        upgrade.append(d1);
        upgrade.append(d2);
        upgrade.append(d3);
        upgrade.append(d4);
        upgrade.append(d5);
        upgrade.append(d6);
        upgrade.append(b1);
        $upgradelist.append(upgrade);
    }
}

$upgradelist.on("click", ".BuyUpgrade", (e) => {
    e.preventDefault();
    upgrade(e.target.id);
    refreshWorkers();
    refreshUpgrades();
});

function upgrade(name) {
    const upgrade = nameToUpgrade(name);
    const cost = upgrade.cost[upgradeProgress[name]];
    if (player.money >= cost) {
        player.money -= cost;
        upgradeProgress[name] += 1;
        if (name === "Max Ore") player.oreCap = upgrade.value[upgradeProgress[name]];
        else if (name === "Max Wood") player.woodCap = upgrade.value[upgradeProgress[name]];
        else if (name === "Max Leather") player.leatherCap = upgrade.value[upgradeProgress[name]];
        else if (name === "Max Herb") player.herbCap = upgrade.value[upgradeProgress[name]];
        else if (name === "Max Action Slots") {
            player.actionSlots.push({
                actionType : "Empty",
                actionName : "Empty",
                actionTime : 0,
            });
        }
        else if (name === "Max Inventory Slots") {
            player.inventoryCap = upgrade.value[upgradeProgress[name]];
        }
        ga('send', 'event', 'Upgrades', 'upgrade', name);
    }
}

const upgradeImageReference = {
    "Max Ore" : '<img src="upgrades/max_ore.png">',
    "Max Wood" : '<img src="upgrades/max_wood.png">',
    "Max Leather" : '<img src="upgrades/max_leather.png">',
    "Max Herb" : '<img src="upgrades/max_herbs.png">',
    "Max Action Slots" : '<img src="upgrades/max_action_slots.png">',
    "Max Inventory Slots" : '<img src="upgrades/max_inventory_slots.png">',
    "Auto Sell Value" : '<img src="upgrades/auto_sell_value.png">',
}