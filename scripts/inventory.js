$('#inventory').on("click",".inventorySell",(e) => {
    e.preventDefault();
    const id = $(e.target).attr("id");
    const rarity = parseInt($(e.target).attr("r"));
    Inventory.sellInventory(id,rarity);
})

const $autoSellToggle = $("#autoSellToggle");

$(document).on("click","#autoSellToggle",(e) => {
    autoSellToggle = !autoSellToggle;
    if (autoSellToggle) $autoSellToggle.removeClass("noAutoSell").addClass("yesAutoSell").html("Autosell Commons");
    else $autoSellToggle.removeClass("yesAutoSell").addClass("noAutoSell").html("Don't Autosell Commons");
})

let containerid = 0;
let autoSellToggle = false;

class itemContainer {
    constructor(id,rarity) {
        this.id = id;
        this.item = recipeList.idToItem(id);
        this.name = this.item.name;
        this.type = this.item.type;
        this.picName = this.item.itemPicName();
        this.rarity = rarity;
        this.containerID = containerid;
        containerid += 1;
    }
    pow() {
        return this.item.pow;
    }
    hp() {
        return this.item.hp;
    }
    act() {
        return this.item.act();
    }
}

const Inventory = {
    inv : [],
    invMax : 20,
    addToInventory(id,rarity) {
        if (this.inv.length === this.invMax) {
            this.sellItem(id,rarity);
        }
        else if (autoSellToggle && rarity === 0) {
            this.sellItem(id,rarity);
        }
        else {
            this.inv.push(new itemContainer(id,rarity));
            refreshInventory();
            refreshWorkerAmts();
        }
    },
    craftToInventory(id) {
        const name = recipeList.idToItem(id).name;
        const roll = Math.floor(Math.random() * 1000)
        if (roll <= 1) {
            this.addToInventory(id,3);
            Notifications.exceptionalCraft(name,"epic");
        }
        else if (roll <= 10) {
            this.addToInventory(id,2);
            Notifications.exceptionalCraft(name,"great");
        }
        else if (roll <= 50) {
            this.addToInventory(id,1);
            Notifications.exceptionalCraft(name,"good");
        }
        else this.addToInventory(id,0);
    },
    removeFromInventory(id,rarity) {
        for (let i=0;i<this.inv.length;i++) {
            const ic = this.inv[i]
            if (ic.id === id && ic.rarity === rarity) {
                this.inv.splice(i,1);
                refreshInventory();
                return;
            }
        }
    },
    sellInventory(id,rarity) {
        this.removeFromInventory(id,rarity);
        this.sellItem(id,rarity);
    },
    sellItem(id,rarity) {
        const gold = recipeList.idToItem(id).value*(rarity+1);
        ResourceManager.addMaterial("M001",gold);
    },
    listbyType(types) {
        return this.inv.filter(r=>types.includes(r.type));
    },
    containerToItem(containerID) {
        return this.inv.find(r=>r.containerID===containerID)
    },
    haveItem(id,rarity) {
        return this.inv.filter(r=>r.id === id && r.rarity === rarity).length > 0
    },
    full() {
        return this.inv.length === this.invMax;
    }
}

$inventory = $("#inventory");

function refreshInventory() {
    $inventory.empty();
    //build the sorted inventory
    Inventory.inv.forEach(item => {
        const itemdiv = $("<div/>").addClass("inventoryItem");
        itemdiv.addClass("R"+item.rarity)
        const itemName = $("<div/>").addClass("inventoryItemName").attr("id",item.id).attr("r",item.rarity).html(item.picName);
        //const itemProps = $("<div/>").addClass("inventoryProps").html("item stats here");
        const sellButtons = $("<div/>").addClass('inventorySell').attr("id",item.id).attr("r",item.rarity).html("Sell");
        itemdiv.append(itemName,sellButtons);
        $inventory.append(itemdiv);
    });
}
