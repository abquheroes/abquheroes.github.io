$('#inventory').on("click",".inventorySell",(e) => {
    e.preventDefault();
    const id = $(e.target).attr("id");
    Inventory.sellInventory(id);
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
        return Math.round(this.item.pow * (1+0.5*this.rarity));
    }
    hp() {
        return Math.round(this.item.hp * (1+0.5*this.rarity));
    }
    act() {
        return this.item.act();
    }
    propDiv() {
        const d = $("<div/>").addClass("invProp");
        if (this.act() > 0) {
            const d1 = $("<div/>").addClass("invPropAct").html(miscIcons.act + "&nbsp;" + msToSec(this.act()))
            d.append(d1);
        }
        if (this.pow() > 0) {
            const d2 = $("<div/>").addClass("invPropPow").html(miscIcons.pow + "&nbsp;" + this.pow())
            d.append(d2);
        }
        if (this.hp() > 0) {
            const d3 = $("<div/>").addClass("invPropHP").html(miscIcons.hp + "&nbsp;" + this.hp())
            d.append(d3);
        }
        return d;
    }
}

const Inventory = {
    inv : createArray(20,null),
    invMax : 20,
    addToInventory(id,rarity) {
        if (this.full()) {
            this.sellItem(id,rarity);
        }
        else if (autoSellToggle && rarity === 0) {
            this.sellItem(id,rarity);
        }
        else {
            this.findempty(new itemContainer(id,rarity));
        }
    },
    findempty(item) {
        const i = this.inv.findIndex(r=>r===null);
        this.inv[i] = item;
        refreshInventory();
        refreshWorkerAmts();
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
                this.inv[i] = null;
                refreshInventory();
                refreshWorkerAmts();
                return;
            }
        }
    },
    sellInventory(indx) {
        const item = this.inv[indx];
        this.inv[indx] = null;
        this.sellItem(item.id,item.rarity);
        refreshInventory();
        refreshWorkerAmts();
    },
    sellItem(id,rarity) {
        const gold = recipeList.idToItem(id).value*(rarity+1);
        ResourceManager.addMaterial("M001",gold);
    },
    listbyType(types) {
        return this.nonblank().filter(r=>types.includes(r.type));
    },
    containerToItem(containerID) {
        return this.nonblank().find(r=>r.containerID===containerID)
    },
    haveItem(id,rarity) {
        return this.nonblank().filter(r=>r.id === id && r.rarity === rarity).length > 0
    },
    full() {
        return this.nonblank().length === this.inv.length;
    },
    nonblank() {
        return this.inv.filter(r=>r !== null);
    }
}

$inventory = $("#inventory");

function refreshInventory() {
    $inventory.empty();
    //build the sorted inventory
    Inventory.inv.forEach((item,i) => {
        const itemdiv = $("<div/>").addClass("inventoryItem");
        if (item === null) {
            itemdiv.html("Empty");
            $inventory.append(itemdiv);
            return;
        }
        itemdiv.addClass("R"+item.rarity)
        const itemName = $("<div/>").addClass("inventoryItemName").attr("id",item.id).attr("r",item.rarity).html(item.picName);
        const itemProps = $("<div/>").addClass("inventoryProps").html(item.propDiv());
        const equipButton = $("<div/>").addClass('inventoryEquip').attr("id",i).html("Equip");
        const sellButton = $("<div/>").addClass('inventorySell').attr("id",i).html("Sell");
        itemdiv.append(itemName,itemProps, equipButton, sellButton);
        $inventory.append(itemdiv);
    });
}
