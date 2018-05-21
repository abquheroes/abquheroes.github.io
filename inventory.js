$('#inventory').on("click","a.inventoryLink",(e) => {
    e.preventDefault();
    const name = $(e.target).attr("href");
    if (e.shiftKey) removeAllFromInventory(name);
    else removeFromInventory(name);
    sellItem(name,1);
})

function refreshInventory() {
    $inventory.empty();
    //build the sorted inventory
    for (const [name,amt] of Object.entries(inventory)) {
        if (amt > 0) {
            const item = nameToItem(name);
            const itemdiv = $("<div/>").addClass("inventoryItem").html(imageReference[name])
            const itemLink = $('<a/>').addClass("inventoryLink tooltip").attr("href",name).attr("aria-label", "Sell "+name+" for "+item.value+" Gold").html(name);
            const itemCt = $("<div/>").addClass("inventoryCount").html("x"+amt);
            itemdiv.append(itemLink);
            itemdiv.append(itemCt);
            $inventory.append(itemdiv);
        }
    }
}

function addToInventory(itemName) {
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
    console.log(amt);
    amt = amt || 1;
    console.log(amt);
    if (!(itemName in inventory) || inventory[itemName] < amt) return false;
    inventory[itemName] -= amt;
    refreshInventory();
    return true;    
}

function sellItem(itemName,modifier) {
    player.money += nameToItem(itemName).value*modifier
    refreshWorkers();
    refreshUpgrades();
}