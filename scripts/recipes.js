"use strict";

const ItemType = Object.freeze({KNIFE:"Knives", MACE:"Maces", GLOVE:"Gloves", POTION:"Potions", AXE:"Axes", HAT:"Hats", WAND:"Wands", GAUNTLET:"Gauntlets", HELMET:"Helmets", SHOES:"Shoes", WARD:"Wards", SHIELD:"Shields", CLOAK:"Cloaks", ARMOR:"Armor", PENDANT:"Pendants"});
const Rarity = Object.freeze({COMMON:"common",UNCOMMON:"uncommon",RARE:"rare",LEGENDARY:"legendary"});

const $RecipeResults = $("#RecipeResults");

class Item{
    constructor (props) {
        Object.assign(this, props);
        this.owned = true;
    }
    canAfford() {
        return Resources.canAfford(this.cost);
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
    visualizeCost() {
        const d = $("<div/>").addClass("itemCost")
        for (const [resource, amt] of Object.entries(this.rcost)) {
            const resourceNameForTooltips = resource.charAt(0).toUpperCase()+resource.slice(1);
            d.append($("<div/>").addClass("indvCost tooltip").attr("data-tooltip",resourceNameForTooltips).html(ResourceManager.formatCost(resource,amt)));
        }
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
}

function populateRecipe(type) {
    type = type || ItemType.KNIFE;
    $(".recipeRow").hide();
    recipeList.listByType(type).forEach((recipe) => {
        $("#"+recipe.id).show();
    });
}

function initializeRecipes() {
    $RecipeResults.empty();
    //cycle through everything in bp's and make the div for it
    const table = $('<div/>').addClass('recipeTable');
    const htd1 = $('<div/>').addClass('recipeHeadName').html("NAME");
    const htd2 = $('<div/>').addClass('recipeHeadCost').html("COST");
    const htd3 = $('<div/>').addClass('recipeHeadTime').html("TIME");
    const htd4 = $('<div/>').addClass('recipeHeadValue').html("VALUE");
    const hrow = $('<div/>').addClass('recipeHeader').append(htd1,htd2,htd3,htd4);
    table.append(hrow);
    recipeList.recipes.forEach((recipe) => {
        const td1 = $('<div/>').addClass('recipeName').attr("id",recipe.id).append(recipe.itemPicName());
        const td2 = $('<div/>').addClass('recipecostdiv').html(recipe.visualizeCost());
        const td3 = $('<div/>').addClass('recipeTime').html(msToTime(recipe.craftTime))
        const td4 = $('<div/>').addClass('recipeValue').html(recipe.imageValue());
        const row = $('<div/>').addClass('recipeRow').attr("id",recipe.id).append(td1,td2,td3,td4);
        table.append(row);
    });
    $RecipeResults.append(table);
}

$(document).on('click', '.recipeName', (e) => {
    e.preventDefault();
    const type = $(e.target).attr("id");
    const item = recipeList.idToItem(type);
    actionSlotManager.addSlot(type);
});

$(document).on('click', '.recipeSelect', (e) => {
    e.preventDefault();
    const type = $(e.target).attr("id");
    console.log(type);
    populateRecipe(type);
})