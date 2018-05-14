$('#inventory').on("click","a.inventoryLink",(e) => {
    e.preventDefault();
    const slot = $(e.target).attr("href");
    item = inventory[slot];
    player.money += nameToItem(item).value;
    inventory.splice(slot, 1);
    refreshInventory();
    refreshUpgrades();
    refreshWorkers();
})

function refreshInventory() {
    $inventory.empty();
    for (let i=0;i<inventory.length;i++) {
        const itemLink = $('<a/>').addClass("inventoryLink tooltip").attr("href",i).attr("aria-label", "Click to sell "+inventory[i]).html(inventory[i]);
        const itemdiv = $("<div/>").addClass("inventoryItem").html(imageReference[inventory[i]]+"&nbsp;")
        itemdiv.append(itemLink);
        $inventory.append(itemdiv);
    }
    for (let i=0;i<player.inventoryCap-inventory.length;i++) {
        $inventory.append($("<div/>").addClass("inventoryItem").html("-Empty-"));
    }
}

function canAddtoInventory(name) {
    return player.inventoryCap > inventory.length;
}

function addToInventory(itemName) {
    const item = nameToItem(itemName);
    if (player.inventoryCap == inventory.length) {
        player.money += item.value;
        return;
    }
    inventory.push(itemName);
    refreshInventory();
}


function removeFromInventory(itemName) {
    const index = inventory.indexOf(itemName);
    if (index > -1) {
        inventory.splice(index, 1);
        refreshInventory();
        return true;
    }
    return false;
}