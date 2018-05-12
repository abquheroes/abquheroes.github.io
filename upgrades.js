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
    const table = $('<div/>').addClass('upgradeTable');
    const hrow = $('<div/>').addClass('upgradeHeader');
    const htd1 = $('<div/>').addClass('upgradeHeadName').html("NAME");
    const htd2 = $('<div/>').addClass('upgradeHeadDesc').html("DESCRIPTION");
    const htd3 = $('<div/>').addClass('upgradeHeadCost').html("COST");
    hrow.append(htd1);
    hrow.append(htd2);
    hrow.append(htd3);
    table.append(hrow);
    for (let i=0;i<upgrades.length;i++) {
        const lvl = upgradeProgress[upgrades[i].name];
        const row = $('<div/>').addClass('upgradeRow');
        const name = $('<a/>').addClass('buyUpgrade').attr("href",upgrades[i].name).html(upgrades[i].name);
        const td1 = $('<div/>').addClass('upgradeName');
        td1.append(name);
        const td2 = $('<div/>').addClass('upgradeDesc').html(upgrades[i].description);
        const td3 = $('<div/>').addClass('upgradeDesc').html(upgrades[i].cost[lvl]+" "+imageReference["Gold"]);
        row.append(td1);
        row.append(td2);
        row.append(td3);
        table.append(row);
    }
    $upgradelist.append(table);
}