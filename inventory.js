$('#inventory').on("click","a.inventoryLink",(e) => {
    e.preventDefault();
    const name = $(e.target).attr("href");
    removeFromInventory(name);
    player.money += nameToItem(name).value;
    refreshInventory();
    refreshUpgrades();
    refreshWorkers();
})

function sellExpensiveItem() {
    let maxMoney = 0;
    let itemToSell = "";
    for (let i=0;i<inventory.length;i++) {
        const item = nameToItem(inventory[i]);
        if (item.value > maxMoney) {
            maxMoney = item.value;
            itemToSell = inventory[i];
        }
    }
    if (maxMoney > 0) removeFromInventory(itemToSell);
    player.money += maxMoney;
}

function refreshInventory() {
    $inventory.empty();
    const t1 = $("<p/>").addClass("inventoryCount").html(inventory.length + "/" + player.inventoryCap + " Slots Filled");
    $inventory.append(t1);
    //build the sorted inventory
    for (let i=0;i<blueprints.length;i++) {
        const name = blueprints[i].name;
        const count = numberInventory(name);
        if (count > 0) {
            
            const itemdiv = $("<div/>").addClass("inventoryItem").html(imageReference[name])
            const itemLink = $('<a/>').addClass("inventoryLink tooltip").attr("href",name).attr("aria-label", "Sell "+name+" for "+blueprints[i].value+" Gold").html(name);
            const itemCt = $("<div/>").addClass("inventoryCount").html("x"+count);
            itemdiv.append(itemLink);
            itemdiv.append(itemCt);
            $inventory.append(itemdiv);
        }
    }
}

function canAddtoInventory(name) {
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


function removeFromInventory(itemName) {
    const index = inventory.indexOf(itemName);
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