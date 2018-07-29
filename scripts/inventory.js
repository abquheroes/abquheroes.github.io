$('#inventory').on("click","a.inventoryLink",(e) => {
    e.preventDefault();
    const name = $(e.target).attr("href");
    let amt = player.sellPref;
    if (e.shiftKey) amt = 100;
    amt = Math.min(inventory[name],amt)
    removeFromInventory(name,amt);
    sellItem(name,1,amt);
})

class itemContainer {
    constructor(id,rarity,amt) {
        this.id = id;
        this.rarity = rarity;
        this.amt = amt;
    }
    match(id,rarity) {
        return this.id === id && this.rarity === rarity;
    }
}

const Inventory = {
    inv : [],
    addToInventory(id,rarity,amt) {
        for (let i=0;i<inv.length;i++) {
            if (inv[i].match(id,rarity)) {
                inv[i].amt += amt;
                return;
            }
        }
        inv.push(new itemContainer(id,rarity,amt));
    },
    removeFromInventory(id,rarity,amt) {
        for (let i=0;i<inv.length;i++) {
            if (inv[i].match(id,rarity)) {
                inv[i].amt -= amt;
                if (inv[i].amt <= 0) inv.splice(i, 1);
            }
        }
    },
}


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