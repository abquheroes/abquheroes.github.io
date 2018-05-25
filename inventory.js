$('#inventory').on("click","a.inventoryLink",(e) => {
    e.preventDefault();
    const name = $(e.target).attr("href");
    let amt = player.sellPref;
    if (e.shiftKey) amt = 100;
    amt = Math.min(inventory[name],amt)
    removeFromInventory(name,amt);
    sellItem(name,1,amt);
})

function refreshInventory() {
    $inventory.empty();
    //build the sorted inventory
    for (let i=0;i<blueprints.length;i++) {
        const name = blueprints[i].name;
        if (name in inventory && inventory[name] > 0) {
            const item = nameToItem(name);
            if (item == null) continue;
            const itemdiv = $("<div/>").addClass("inventoryItem").html(imageReference[name])
            const itemLink = $('<a/>').addClass("inventoryLink tooltip").attr("href",name).attr("aria-label", "Sell "+name+" for "+item.value+" Gold").html(name);
            const itemCt = $("<div/>").addClass("inventoryCount").html("x"+inventory[name]);
            itemdiv.append(itemLink);
            itemdiv.append(itemCt);
            $inventory.append(itemdiv);
        }
    }
}

function addToInventory(itemName,amt) {
    amt = amt || 1;
    for (let i=0;i<amt;i++) {
        if (inventory[itemName] >= getMaxInventory()) {
            const upgrade = nameToUpgrade("Auto Sell Value");
            const mod = upgrade.value[upgradeProgress["Auto Sell Value"]]/100;
            sellItem(itemName,mod);
        }
        else {
            if (itemName in inventory) inventory[itemName] += 1;
            else inventory[itemName] = 1;
            refreshInventory();
        }
    }
}

function removeAllFromInventory(itemName) {
    if (!(itemName in inventory) || inventory[itemName] === 0) return false;
    const toRemove = inventory[itemName];
    for (let i=0;i<toRemove;i++) {
        sellItem(itemName,1);
        inventory[itemName] -= 1;
    }
    refreshInventory();
}

function removeFromInventory(itemName,amt) {
    amt = amt || 1;
    if (itemName === "Gold") {
        const removeG = Math.min(player.money,amt);
        player.money -= removeG;
        return removeG;
    }
    else {
        if (!(itemName in inventory)) return 0;
        const remove = Math.min(inventory[itemName],amt);
        inventory[itemName] -= remove;
        refreshInventory();
        return remove;    
    }
}

function sellItem(itemName,modifier,amt) {
    amt = amt || 1
    player.money += Math.floor(nameToItem(itemName).value*modifier*amt);
    refreshWorkers();
    refreshUpgrades();
}

$sellOne = $("#sell1");
$sellTen = $("#sell10");
$sellAll = $("#sellAll");

$sellOne.click((e) => {
    e.preventDefault();
    player.sellPref = 1;
    $sellOne.addClass("itemSellPrefSelected");
    $sellTen.removeClass("itemSellPrefSelected");
    $sellAll.removeClass("itemSellPrefSelected");
});

$sellTen.click((e) => {
    e.preventDefault();
    player.sellPref = 10;
    $sellOne.removeClass("itemSellPrefSelected");
    $sellTen.addClass("itemSellPrefSelected");
    $sellAll.removeClass("itemSellPrefSelected");
});

$sellAll.click((e) => {
    e.preventDefault();
    player.sellPref = 100;
    $sellOne.removeClass("itemSellPrefSelected");
    $sellTen.removeClass("itemSellPrefSelected");
    $sellAll.addClass("itemSellPrefSelected");
});