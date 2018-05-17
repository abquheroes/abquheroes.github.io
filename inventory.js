$('#inventory').on("click","a.inventoryLink",(e) => {
    e.preventDefault();
    const name = $(e.target).attr("href");
    removeFromInventory(name);
    sellItem(name,1);
})

function refreshInventory() {
    $inventory.empty();
    //build the sorted inventory
    for (const [name,amt] of Object.entries(inventory)) {
        if (amt > 0) {
            const itemdiv = $("<div/>").addClass("inventoryItem").html(imageReference[name])
            const itemLink = $('<a/>').addClass("inventoryLink tooltip").attr("href",name).attr("aria-label", "Sell "+name+" for "+blueprints[i].value+" Gold").html(name);
            const itemCt = $("<div/>").addClass("inventoryCount").html("x"+amt);
            itemdiv.append(itemLink);
            itemdiv.append(itemCt);
            $inventory.append(itemdiv);
        }
    }
}

function addToInventory(itemName) {
    if (inventory[itemName] > getMaxInventory()) {
        const upgrade = nameToUpgrade("Auto Sell Value");
        const mod = upgrade.value[upgradeProgress["Auto Sell Value"]]
        sellItem(itemName,mod);
    }
    else {
        if (itemName in inventory) inventory[itemName] += 1;
        else inventory[itemName] = 1;
        refreshInventory();
    }
}

function removeFromInventory(itemName) {
    if (inventory[itemName] === 0) return false;
    inventory[itemName] -= 1;
    refreshInventory();
    return true;    
}

function sellItem(itemName,modifier) {
    player.money += nameToItem(itemName).value*modifier
    refreshWorkers();
    refreshUpgrades();
}