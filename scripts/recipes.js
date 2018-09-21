"use strict";

const ItemType = Object.freeze({MACE:"Maces", AXE:"Axes", SPEAR:"Spears", ROD:"Rods", WAND:"Wands", STAFF:"Staves", KNIFE:"Knives", BOW:"Bows", WHIP:"Whips", HELMET:"Helmets", HAT:"Hats", MASK:"Masks", GAUNTLET:"Gauntlets", GLOVE:"Gloves", SHOE:"Shoes", ARMOR:"Armor", CLOAK:"Cloaks", VEST:"Vests", SHIELD:"Shields", WARD:"Wards", THROWN:"Thrown", OFFHAND:"Offhand", TOME:"Tomes", DART:"Darts", POTION:"Potions", PENDANT:"Pendants", RING:"Rings", INSTRUMENT:"Instruments", BELT:"Belts", EARRING:"Earrings"});
const Rarity = Object.freeze({COMMON:"common",UNCOMMON:"uncommon",RARE:"rare",LEGENDARY:"legendary"});

const $RecipeResults = $("#RecipeResults");

class Item{
    constructor (props) {
        Object.assign(this, props);
        this.owned = false;
    }
    itemPicName() {
        return "<img src='/images/recipes/"+this.type+"/"+this.id+".png'>"+"<div class='item-name'>"+this.name+"</div>";
    }
    itemPic() {
        return "<img src='/images/recipes/"+this.type+"/"+this.id+".png'>";
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
    canAfford() {
        return WorkerManager.couldCraft(this);
    }
    act() {
        return this.actTime;
    }
    recipeListStats() {
        const d = $("<div/>").addClass("recipeStatList");
        if (this.actTime > 0) {
            const d1 = $("<div/>").addClass("recipeStatListAct").html(miscIcons.act + "&nbsp;&nbsp;" + msToSec(this.actTime));
            d.append(d1);
        }
        if (this.pow > 0) {
            const d2 = $("<div/>").addClass("recipeStatListPow").html(miscIcons.pow + "&nbsp;&nbsp;" + this.pow);
            d.append(d2);
        }
        if (this.hp > 0) {
            const d3 = $("<div/>").addClass("recipeStatListHP").html(miscIcons.hp + "&nbsp;&nbsp;" + this.hp);
            d.append(d3);
        }
        return d;
    }
}

const recipeList = {
    recipes : [],
    addItem(item) {
        this.recipes.push(item);
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
    buyable(type) {
        return this.recipes.filter(recipe => recipe.type === type && !recipe.owned && recipe.canAfford())
    },
    owned(type) {
        return this.recipes.filter(recipe => recipe.type === type && recipe.owned);
    },
    buyBP(id) {
        if (ResourceManager.idToMaterial("M002").amt === 0) return;
        ResourceManager.addMaterial("M002",-1);
        const item = this.idToItem(id);
        item.owned = true;
        populateRecipe(item.type);
    },
    ownedOrBuyable(type) {
        return this.owned(type).length > 0 || this.buyable(type).length > 0;
    }
}

function populateRecipe(type) {
    type = type || ItemType.KNIFE;
    $(".recipeRow").hide();
    recipeList.listByType(type).filter(r => r.owned).forEach((recipe) => {
        $("#rr"+recipe.id).show();
    });
    refreshBlueprint(type);
}


function refreshRecipeFilters() {
    //hide recipe buttons if we don't know know a recipe and also can't learn one...
    $.each(ItemType , function(_, type) {
        if (recipeList.ownedOrBuyable(type)) $("#"+type).show();
        else $("#"+type).hide();
    });
}

function initializeRecipes() {
    $RecipeResults.empty();
    //cycle through everything in bp's and make the div for it
    const table = $('<div/>').addClass('recipeTable');
    const htd1 = $('<div/>').addClass('recipeHeadName').html("NAME");
    const htd2 = $('<div/>').addClass('recipeHeadLvl').html("LVL");
    const htd3 = $('<div/>').addClass('recipeHeadRes').html("RES");
    const htd4 = $('<div/>').addClass('recipeHeadCost').html("MATS");
    const htd5 = $('<div/>').addClass('recipeHeadStats').html("STATS");
    const htd6 = $('<div/>').addClass('recipeHeadTime').html("TIME");
    const htd7 = $('<div/>').addClass('recipeHeadValue').html("VALUE");
    const hrow = $('<div/>').addClass('recipeHeader').append(htd1,htd2,htd3,htd4,htd5,htd6,htd7);
    table.append(hrow);
    recipeList.recipes.forEach((recipe) => {
        const td1 = $('<div/>').addClass('recipeName').attr("id",recipe.id).append(recipe.itemPicName());
        const td2 = $('<div/>').addClass('recipeLvl').html(recipe.lvl);
        const td3 = $('<div/>').addClass('reciperesdiv').html(recipe.visualizeRes());
        const td4 = $('<div/>').addClass('recipematdiv').html(recipe.visualizeMat());
        const td5 = $('<div/>').addClass('recipeStats').html(recipe.recipeListStats());
        const td6 = $('<div/>').addClass('recipeTime').html(msToTime(recipe.craftTime))
        const td7 = $('<div/>').addClass('recipeValue').html(recipe.imageValue());
        const row = $('<div/>').addClass('recipeRow').attr("id","rr"+recipe.id).append(td1,td2,td3,td4,td5,td6,td7);
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

function refreshBlueprint(type) {
    $blueprintUnlock.empty();
    recipeList.buyable(type).forEach(recipe => {
        const d = $("<div/>").addClass('bpShop');
        const d1 = $("<div/>").addClass('bpShopName').html(recipe.itemPicName());
        const b1 = $("<div/>").addClass('bpShopButton').attr("id",recipe.id).html(`UNLOCK - 1 <img src="images/resources/M002.png" id="${recipe.id}" alt="Blueprint">`);
        d.append(d1,b1);
        $blueprintUnlock.append(d);
    })
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
    const type = $(e.target).attr("id");
    populateRecipe(type);
})

$(document).on('click','.bpShopButton', (e) => {
    e.preventDefault();
    const id = $(e.target).attr('id');
    recipeList.buyBP(id);
});

