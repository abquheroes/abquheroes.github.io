$('#inventory').on("click",".inventorySellOne",(e) => {
    e.preventDefault();
    const id = $(e.target).attr("id");
    const rarity = $(e.target).attr("r");
    Inventory.sellItem(id,rarity,1);
})

$('#inventory').on("click",".inventorySellAll",(e) => {
    e.preventDefault();
    const id = $(e.target).attr("id");
    const rarity = $(e.target).attr("r");
    Inventory.sellItem(id,rarity);
})

let containerid = 0;

class itemContainer {
    constructor(id,rarity,amt) {
        this.id = id;
        this.item = recipeList.idToItem(id);
        this.name = this.item.name;
        this.type = this.item.type;
        this.picName = this.item.itemPicName();
        this.rarity = rarity;
        this.amt = amt || 1;
        this.containerID = containerid;
        containerid += 1;
    }
    match(id,rarity) {
        return id+rarity === this.id + this.rarity;
    }
    pow() {
        return this.item.pow;
    }
    hp() {
        return this.item.hp;
    }
}

const Inventory = {
    inv : [],
    addToInventory(id,rarity,amt,norefresh) {
        amt = amt || 1;
        for (let i=0;i<this.inv.length;i++) {
            if (this.inv[i].match(id,rarity)) {
                this.inv[i].amt += amt;
                if (!norefresh) refreshInventory();
                return;
            }
        }
        this.inv.push(new itemContainer(id,rarity,amt));
        if (!norefresh) {
            refreshInventory();
            refreshWorkers();
            examineHeroPossibleEquip();
        }
    },
    craftToInventory(id) {
        const roll = Math.floor(Math.random() * 1000)
        if (roll <= 1) this.addToInventory(id,3,1);
        else if (roll <= 10) this.addToInventory(id,2,1);
        else if (roll <= 50) this.addToInventory(id,1,1);
        else this.addToInventory(id,0,1);
    },
    removeFromInventory(id,rarity,amt) {
        for (let i=0;i<this.inv.length;i++) {
            if (this.inv[i].match(id,rarity)) {
                this.inv[i].amt -= amt;
                if (this.inv[i].amt <= 0) this.inv.splice(i, 1);
            }
        }
        refreshInventory();
    },
    sellItem(id,rarity,amt) {
        amt = amt || this.itemCount(id,rarity);
        this.removeFromInventory(id,rarity,amt);
        const gold = recipeList.idToItem(id).value*amt;
        ResourceManager.addMaterial("M001",gold);
    },
    itemCount(id,rarity) {
        for (let i=0;i<this.inv.length;i++) {
            if (this.inv[i].match(id,rarity)) return this.inv[i].amt;
        }
        return 0;
    },
    listbyType(types) {
        const filtered = [];
        this.inv.forEach(item => {
            if (types.includes(item.type)) {
                filtered.push(item);
            }
        });
        return filtered;
    },
    equipItem(containerID) {
        for (let i=0;i<this.inv.length;i++) {
            if (this.inv[i].containerID === containerID) {
                const id = this.inv[i].id;
                const rarity = this.inv[i].rarity;
                this.removeFromInventory(id,rarity,1);
                return new itemContainer(id,rarity);
            }
        }
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
        const itemCt = $("<div/>").addClass("inventoryCount").html("x"+item.amt);
        const itemProps = $("<div/>").addClass("inventoryProps").html("item stats here");
        const sellButtons = $("<div/>").addClass('inventorySellButtons');
        const sellOne = $("<div/>").addClass('inventorySellOne').attr("id",item.id).attr("r",item.rarity).html("Sell 1x");
        const sellAll = $("<div/>").addClass('inventorySellAll').attr("id",item.id).attr("r",item.rarity).html("Sell Max");
        sellButtons.append(sellOne,sellAll);
        itemdiv.append(itemName,itemCt,sellButtons,);
        $inventory.append(itemdiv);
    });
}