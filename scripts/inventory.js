$('#inventory').on("click",".inventorySell",(e) => {
    e.preventDefault();
    const id = $(e.target).attr("id");
    Inventory.sellInventory(id);
})

$(document).on("click","#sortInventory",(e) => {
    e.preventDefault();
    Inventory.sortInventory();
});

let containerid = 0;
//let autoSellToggle = false;

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
    createSave() {
        const save = {};
        save.id = this.id;
        save.rarity = this.rarity;
        return save;
    }
    pow() {
        return Math.round(this.item.pow * miscLoadedValues.rarityMod[this.rarity]);
    }
    hp() {
        return Math.round(this.item.hp * miscLoadedValues.rarityMod[this.rarity]);
    }
    act() {
        return this.item.act();
    }
    propDiv() {
        const d = $("<div/>").addClass("invProp");
        if (this.act() > 0) {
            const d1 = $("<div/>").addClass("invPropAct tooltip").attr("data-tooltip", "ACT").html(miscIcons.act + "&nbsp;" + msToSec(this.act()))
            d.append(d1);
        }
        if (this.pow() > 0) {
            const d2 = $("<div/>").addClass("invPropPow tooltip").attr("data-tooltip", "POW").html(miscIcons.pow + "&nbsp;" + this.pow())
            d.append(d2);
        }
        if (this.hp() > 0) {
            const d3 = $("<div/>").addClass("invPropHP tooltip").attr("data-tooltip", "HP").html(miscIcons.hp + "&nbsp;" + this.hp())
            d.append(d3);
        }
        return d;
    }
    goldValueFormatted() {
        return ResourceManager.materialIcon("M001") + "&nbsp;" + this.goldValue();
    }
    goldValue() {
        return (this.item.value * (this.rarity+1)).toString();
    }

}

const Inventory = {
    inv : createArray(20,null),
    invMax : 20,
    createSave() {
        const save = [];
        this.inv.forEach(i => {
            if (i === null) save.push(null);
            else save.push(i.createSave());
        });
        return save;
    },
    loadSave(save) {
        save.forEach((item,i) => {
            if (item === null) return;
            const container = new itemContainer(item.id,item.rarity);
            this.inv[i] = container;
        });
    },
    addToInventory(id,rarity,autoSell) {
        if (this.full()) {
            this.sellItem(id,rarity);
        }
        else if (autoSell >= rarity) {
            this.sellItem(id,rarity);
        }
        else {
            this.findempty(new itemContainer(id,rarity));
            const item = recipeList.idToItem(id);
            if (examineGearTypesCache.includes(item.type)) {
                examineHeroPossibleEquip(examineGearSlotCache,examineGearHeroIDCache);
            }
        }
    },
    addItemContainerToInventory(container) {
        if (this.full()) this.sellItem(id,rarity);
        else this.findempty(container);
    },
    findempty(item) {
        const i = this.inv.findIndex(r=>r===null);
        this.inv[i] = item;
        refreshInventory();
        refreshWorkerAmts();
    },
    craftToInventory(id,autoSell) {
        const item = recipeList.idToItem(id)
        const name = item.name;
        item.addCount();
        const roll = Math.floor(Math.random() * 1000)
        let mod = 1;
        let sellToggle = -1
        if (autoSell === "Common") sellToggle = 0;
        if (autoSell === "Good") sellToggle = 1;
        if (autoSell === "Great") sellToggle = 2;
        if (autoSell === "Epic") sellToggle = 3;
        if (item.isMastered()) mod = 2;
        if (roll < miscLoadedValues.qualityCheck[3]*mod) {
            this.addToInventory(id,3,sellToggle);
            if (sellToggle < 3) Notifications.exceptionalCraft(name,"Epic","craftEpic");
        }
        else if (roll < (miscLoadedValues.qualityCheck[3]+miscLoadedValues.qualityCheck[2])*mod) {
            this.addToInventory(id,2,sellToggle);
            if (sellToggle < 2) Notifications.exceptionalCraft(name,"Great","craftGreat");
        }
        else if (roll < (miscLoadedValues.qualityCheck[3]+miscLoadedValues.qualityCheck[2]+miscLoadedValues.qualityCheck[1])*mod) {
            this.addToInventory(id,1,sellToggle);
            if (sellToggle < 1) Notifications.exceptionalCraft(name,"Good","craftGood");
        }
        else {
            this.addToInventory(id,0,sellToggle);
        }
    },
    removeFromInventory(id,rarity) {
        for (let i=0;i<this.inv.length;i++) {
            const ic = this.inv[i]
            if (ic === null) continue;
            if (ic.id === id && ic.rarity === rarity) {
                this.inv[i] = null;
                refreshInventory();
                refreshWorkerAmts();
                return;
            }
        }
    },
    removeContainerFromInventory(containerID) {
        this.inv = this.inv.filter(c=>c === null || c.containerID !== containerID);
        this.inv.push(null);
        refreshInventory();
        refreshWorkerAmts();
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
    },
    sortInventory() {
        this.inv = this.inv.filter(c=>c !== null);
        while (this.inv.length < this.invMax) {
            this.inv.push(null);
        }
        refreshInventory();
        refreshWorkerAmts();
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
        const itemCost = $("<div/>").addClass("inventoryItemValue").html(item.goldValueFormatted());
        const itemProps = $("<div/>").addClass("inventoryProps").html(item.propDiv());
        const equipButton = $("<div/>").addClass('inventoryEquip').attr("id",i).html("Equip");
        const sellButton = $("<div/>").addClass('inventorySell').attr("id",i).html("Sell");
        itemdiv.append(itemName,itemCost,itemProps, equipButton, sellButton);
        $inventory.append(itemdiv);
    });
}