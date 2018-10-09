"use strict";

const ItemType = ["Armor", "Axes", "Belts", "Bows", "Cloaks", "Darts", "Earrings", "Gauntlets", "Gloves", "Hats", "Helmets", "Instruments", "Knives", "Maces", "Masks", "Pendants", "Potions", "Rings", "Rods", "Shields", "Shoes", "Spears", "Staves", "Swords", "Thrown", "Tomes", "Vests", "Wands", "Wards", "Whips"];

const $RecipeResults = $("#RecipeResults");

class Item{
    constructor (props) {
        Object.assign(this, props);
        this.owned = false;
        this.craftCount = 0;
        this.autoSell = "None";
    }
    createSave() {
        const save = {};
        save.id = this.id;
        save.owned = this.owned;
        save.craftCount = this.craftCount;
        save.autoSell = this.autoSell;
        return save;
    }
    loadSave(save) {
        this.owned = save.owned;
        this.craftCount = save.craftCount;
        this.autoSell = save.autoSell;
    }
    itemPicName() {
        return "<img src='images/recipes/"+this.type+"/"+this.id+".png'>"+"<div class='item-name'>"+this.name+"</div>";
    }
    itemPic() {
        return "<img src='images/recipes/"+this.type+"/"+this.id+".png'>";
    }
    imageValue() {
        return ResourceManager.formatCost("M001",this.value);
    }
    visualizeRes() {
        const d = $("<div/>").addClass("itemCost")
        this.rcost.forEach(resource => {
            const resourceNameForTooltips = resource.charAt(0).toUpperCase()+resource.slice(1);
            d.append($("<div/>").addClass("indvCost tooltip").attr("data-tooltip",resourceNameForTooltips).html('<img src="images/resources/'+resource+'.png">'));
        })
        return d;
    }
    visualizeMat() {
        const d = $("<div/>").addClass("itemCost")
        for (const [material, amt] of Object.entries(this.mcost)) {
            const mat = ResourceManager.idToMaterial(material)
            d.append($("<div/>").addClass("indvCost tooltip").attr("data-tooltip",mat.name).html(ResourceManager.formatCost(material,amt)));
        }
        return d;
    }
    getCost(resource) {
        if (resource in this.rcost) return this.rcost[resource];
        return 0;
    }
    act() {
        return this.actTime;
    }
    recipeListStats() {
        const d = $("<div/>").addClass("recipeStatList");
        if (this.actTime > 0) {
            const d1 = $("<div/>").addClass("recipeStatListAct tooltip").attr("data-tooltip", "ACT").html(miscIcons.act + "&nbsp;&nbsp;" + msToSec(this.actTime));
            d.append(d1);
        }
        if (this.pow > 0) {
            const d2 = $("<div/>").addClass("recipeStatListPow tooltip").attr("data-tooltip", "POW").html(miscIcons.pow + "&nbsp;&nbsp;" + this.pow);
            d.append(d2);
        }
        if (this.hp > 0) {
            const d3 = $("<div/>").addClass("recipeStatListHP tooltip").attr("data-tooltip", "HP").html(miscIcons.hp + "&nbsp;&nbsp;" + this.hp);
            d.append(d3);
        }
        return d;
    }
    remainingReqs() {
        let s = ""
        this.rcost.forEach(r => {
            if (WorkerManager.lvlByType(r) >= this.lvl) return;
            const mat = r.charAt(0).toUpperCase() + r.slice(1);
            s += `Lv${this.lvl} ${mat}, `
        });
        return s.slice(0, -2);
    }
    count() {
        return Math.min(this.craftCount,100);
    }
    addCount() {
        this.craftCount += 1;
        if (this.craftCount === 100) initializeActionSlots();
        $("#rc"+this.id).html(this.count()+"/100");
    }
    isMastered() {
        return this.craftCount >= 100;
    }
    autoSellToggle() {
        if (this.autoSell === "None") this.autoSell = "Common";
        else if (this.autoSell === "Common") this.autoSell = "Good";
        else if (this.autoSell === "Good") this.autoSell = "Great";
        else if (this.autoSell === "Great") this.autoSell = "Epic";
        else this.autoSell = "None";
    }
}

const recipeList = {
    recipes : [],
    createSave() {
        const save = [];
        this.recipes.forEach(r=> {
            save.push(r.createSave());
        });
        return save;
    },
    loadSave(save) {
        save.forEach(i => {
            const rec = this.idToItem(i.id);
            rec.loadSave(i);
        });
    },
    addItem(item) {
        this.recipes.push(item);
    },
    getAutoSellPref() {
        return this.autoSell;
    },
    listByType(type) {
        return this.recipes.filter(recipe => recipe.type === type);
    },
    listbyTypes(types) {
        return this.recipes.filter(recipe => types.includes(recipe.type));
    },
    idToItem(id) {
        return this.recipes.find(recipe => recipe.id === id);
    },
    getNextBuyable(type) {
        return this.recipes.find(recipe => recipe.type === type && !recipe.owned);
    },
    getNextRequirement(type) {
        this.recipes.find(recipe)
    },
    buyable(type) {
        return true;
    },
    buyBP(id) {
        const item = this.idToItem(id);
        const amt = miscLoadedValues.recipeBuy[item.lvl-1]
        if (ResourceManager.materialAvailable("M001") < amt) {
            Notifications.cantAffordBlueprint();
            return;
        }
        ResourceManager.deductMoney(amt);
        item.owned = true;
        populateRecipe(item.type);
    },
    ownAtLeastOneOrCanBuy(type) {
        let returnVal = true;
        const owned = this.recipes.filter(recipe => recipe.type === type && recipe.owned).length;
        if (owned === 0) {
            const item = this.getNextBuyable(type);
            item.rcost.forEach(r => {
                if (WorkerManager.lvlByType(r) >= item.lvl) return;
                returnVal = false;
            });
        }
        return returnVal;
    },
    moreRecipes(type) {
        return this.recipes.filter(r => !r.owned && type === r.type).length > 0;
    },
    remainingReqs(type) {
        const item = this.getNextBuyable(type);
        if (item === undefined) return null;
        return item.remainingReqs();
    },
    recipeIDByTypeLvl(type,lvl) {
        return this.recipes.find(r => r.type === type && r.lvl === lvl).id;
    },
}

function populateRecipe(type) {
    $(".recipeRow").hide();
    if (type === "Matless") {
        console.log('fire')
        recipeList.recipes.filter(r => r.owned && r.mcost.length === 0).forEach((recipe) => {
            $("#rr"+recipe.id).show();
        });
    }
    recipeList.listByType(type).filter(r => r.owned).forEach((recipe) => {
        $("#rr"+recipe.id).show();
    });
    refreshBlueprint(type);
}


function refreshRecipeFilters() {
    //hide recipe buttons if we don't know know a recipe and also can't learn one...
    ItemType.forEach(type => {
        if (recipeList.ownAtLeastOneOrCanBuy(type)) $("#rf"+type).show();
        else $("#rf"+type).hide();
    });
}

function initializeRecipes() {
    $RecipeResults.empty();
    //cycle through everything in bp's and make the div for it
    const table = $('<div/>').addClass('recipeTable');
    const htd1 = $('<div/>').addClass('recipeHeadName').html("NAME");
    const htd2 = $('<div/>').addClass('recipeHeadLvl').html("LVL");
    const htd3 = $('<div/>').addClass('recipeHeadRes').html("RESOURCES");
    const htd4 = $('<div/>').addClass('recipeHeadCost').html("MATS");
    const htd5 = $('<div/>').addClass('recipeHeadStats').html("STATS");
    const htd6 = $('<div/>').addClass('recipeHeadTime').html("TIME");
    const htd7 = $('<div/>').addClass('recipeHeadValue').html("VALUE");
    const htd8 = $('<div/>').addClass('recipeHeadCount').html("MASTER");
    const hrow = $('<div/>').addClass('recipeHeader').append(htd1,htd2,htd3,htd4,htd5,htd6,htd7,htd8);
    table.append(hrow);
    recipeList.recipes.forEach((recipe) => {
        const td1 = $('<div/>').addClass('recipeName').attr("id",recipe.id).append(recipe.itemPicName());
        const td2 = $('<div/>').addClass('recipeLvl').html(recipe.lvl);
        const td3 = $('<div/>').addClass('reciperesdiv').html(recipe.visualizeRes());
        const td4 = $('<div/>').addClass('recipematdiv').html(recipe.visualizeMat());
        const td5 = $('<div/>').addClass('recipeStats').html(recipe.recipeListStats());
        const td6 = $('<div/>').addClass('recipeTime').html(msToTime(recipe.craftTime))
        const td7 = $('<div/>').addClass('recipeValue').html(recipe.imageValue());
        const td8 = $('<div/>').addClass('recipeCount').attr("id","rc"+recipe.id).html(recipe.count()+"/100");
        const row = $('<div/>').addClass('recipeRow').attr("id","rr"+recipe.id).append(td1,td2,td3,td4,td5,td6,td7,td8);
        table.append(row);
    });
    $RecipeResults.append(table);
}

function recipeCanCraft() {
    //loops through recipes, adds class if disabled
    $(".recipeRow").removeClass("recipeRowDisable");
    recipeList.recipes.forEach(recipe => {
        if (!WorkerManager.canCurrentlyCraft(recipe)) $("#rr"+recipe.id).addClass("recipeRowDisable");
    }) 
}

const $blueprintUnlock = $("#BlueprintUnlock");
let cachedbptype = null;

function refreshBlueprint(type) {
    type = type || cachedbptype;
    cachedbptype = type;
    $blueprintUnlock.empty();
    const d = $("<div/>").addClass('bpShop');
    const nextRecipe = recipeList.getNextBuyable(type);
    if (recipeList.moreRecipes(type)) {
        const d1 = $("<div/>").addClass('bpShopName').html(nextRecipe.itemPicName());
        d.append(d1);
    }
    else {
        return;
    }
    const needed = recipeList.remainingReqs(type);
    if (needed.length === 0) {
        console.log(nextRecipe.lvl);
        const b1 = $("<div/>").addClass('bpShopButton').attr("id",nextRecipe.id).html(`UNLOCK - ${miscIcons.gold}&nbsp;&nbsp;${miscLoadedValues.recipeBuy[nextRecipe.lvl-1]}`);
        d.append(b1);
    }
    else {
        const d2 = $("<div/>").addClass('bpReq').html("REQUIRES:<br>" + needed);
        d.append(d2);
    }
    $blueprintUnlock.append(d);
}

$(document).on('click', '.recipeName', (e) => {
    //click on a recipe to slot it
    e.preventDefault();
    const type = $(e.target).attr("id");
    const item = recipeList.idToItem(type);
    actionSlotManager.addSlot(type);
});

$(document).on('click', '.recipeSelect', (e) => {
    e.preventDefault();
    const type = $(e.target).attr("id").substring(2);
    populateRecipe(type);
})

$(document).on('click','.bpShopButton', (e) => {
    e.preventDefault();
    const id = $(e.target).attr('id');
    recipeList.buyBP(id);
});

