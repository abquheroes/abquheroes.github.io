$('#inventory').on("click",".inventoryItem",(e) => {
    e.preventDefault();
    const id = $(e.target).attr("id");
    const rarity = $(e.target).attr("r");
    let amt = player.sellPref || 1;
//  if (e.shiftKey) amt = 100
    Inventory.sellItem(id,rarity,amt);
})

let containerid = 0;

class itemContainer {
    constructor(id,rarity) {
        this.id = id;
        this.item = recipeList.idToItem(id);
        this.name = this.item.name;
        this.type = this.item.type;
        this.picName = this.item.itemPicName();
        this.rarity = rarity;
        this.amt = 1;
        this.containerID = containerid;
        containerid += 1;
    }
    match(id,rarity) {
        return id+rarity === this.id + this.rarity;
    }
}

const Inventory = {
    inv : [],
    addToInventory(id,rarity,amt) {
        amt = amt || 1;
        for (let i=0;i<this.inv.length;i++) {
            if (this.inv[i].match(id,rarity)) {
                this.inv[i].amt += amt;
                refreshInventory();
                return;
            }
        }
        this.inv.push(new itemContainer(id,rarity,amt));
        refreshInventory();
        refreshWorkers();
        examineHeroPossibleEquip();
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
        this.removeFromInventory(id,rarity,amt);
        const gold = recipeList.idToItem(id).value;
        console.log(gold);
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
        const itemdiv = $("<div/>").addClass("inventoryItem tooltip").attr("id",item.id).attr("r",item.rarity).html(item.picName);
        itemdiv.addClass("R"+item.rarity)
        const itemCt = $("<div/>").addClass("inventoryCount").html("x"+item.amt);
        itemdiv.append(itemCt);
        $inventory.append(itemdiv);
    });
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