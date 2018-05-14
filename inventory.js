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
    //build the sorted inventory
    for (let i=0;i<blueprints.length;i++) {
        const name = blueprints[i].name;
        const count = numberInventory(name);
        if (count > 0) {
            
            const itemdiv = $("<div/>").addClass("inventoryItem").html(imageReference[name])
            const itemLink = $('<a/>').addClass("inventoryLink tooltip").attr("href",name).attr("aria-label", "Click to sell "+name).html(name);
            const itemCt = $("<div/>").addClass("inventoryCount").html(count+"x");
            itemdiv.append(itemLink);
            itemdiv.append(itemCt);
            $inventory.append(itemdiv);
        }
    }
    const t1 = $("<p/>").addClass("inventoryCount").html(inventory.length + "/" + player.inventoryCap + " Slots Filled");
    $inventory.append(t1);
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