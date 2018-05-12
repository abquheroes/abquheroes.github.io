const upgrades = []

const maxOre = {
    name : "Max Ore",
    description : "Increases Maximum Ore",
    cost : [100,200,300,400,500,600,700,800,900,1000],
    value : [5,5,10,10,15,15,20,20,30,50],
}
upgrades.push(maxOre);

const maxWood = {
    name : "Max Wood",
    description : "Increases Maximum Wood",
    cost : [100,200,300,400,500,600,700,800,900,1000],
    value : [5,5,10,10,15,15,20,20,30,50],
}
upgrades.push(maxWood);

const maxLeather = {
    name : "Max Leather",
    description : "Increases Maximum Leather",
    cost : [100,200,300,400,500,600,700,800,900,1000],
    value : [5,5,10,10,15,15,20,20,30,50],
}
upgrades.push(maxLeather);

const maxHerb = {
    name : "Max Herb",
    description : "Increases Maximum Herb",
    cost : [100,200,300,400,500,600,700,800,900,1000],
    value : [5,5,10,10,15,15,20,20,30,50],
}
upgrades.push(maxHerb);

const maxActionSlots = {
    name : "Max Action Slots",
    description : "Increases Maximum Action Slots",
    cost : [100,200,300,400,500,600,700],
    value : [1,1,1,1,1,1,1],
}
upgrades.push(maxActionSlots);

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