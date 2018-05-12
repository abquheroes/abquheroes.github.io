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
    cost : [100,200,300,400,500,600,700,800,900,1000],
    value : [1,1,1,1,1,1,1,1,1,1],
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
        const d4 = $('<div/>').addClass('upgradeDesc').html("Cost: "+upgrades[i].cost[lvl]+"&nbsp;"+imageReference["Gold"]);
        const b1 = $("<button/>").addClass("BuyUpgrade").attr("id",upgrades[i].name).html("PURCHASE");
        if (lvl === upgrades[i].cost.length) b1.addClass("hidden");
        upgrade.append(d1);
        upgrade.append(d2);
        upgrade.append(d3);
        upgrade.append(d4);
        upgrade.append(b1);
        $upgradelist.append(upgrade);
    }
}