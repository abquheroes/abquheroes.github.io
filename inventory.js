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
    const item = nameToItem(name);
    for (const [res, amt] of Object.entries(item.cost)) {
        if (!resources.includes(res)) return true;
    }
    return player.inventoryCap > inventory.length;
}

function addToInventory(itemName) {
    inventory.push(itemName);
    refreshInventory();
}

function numberInventory(itemName) {
    let count = 0;
    for (let i=0;i<inventory.length;i++) {
        if (inventory[i] === itemName) count += 1;
    }
    return count;
}


function removeFromInventory(itemName, amt) {
    
    if (index > -1) {
        inventory.splice(index, 1);
        refreshInventory();
        return true;
    }
    return false;
}

function removeLotsFromInventory(itemName, amt) {
    for (let i=0;i<amt;i++) {
        const index = inventory.indexOf(itemName);
        if (index > -1) inventory.splice(index, 1);       
    }
    refreshInventory();
}