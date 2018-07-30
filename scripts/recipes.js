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
        return this.name;
    }
    imageValue() {
        return ResourceManager.formatCost(Resources.GOLD,this.value);
    }
    visualizeCost() {
        const d = $("<div/>").addClass("itemCost")
        for (const [resource, amt] of Object.entries(this.cost)) {
            d.append($("<div/>").addClass("indvCost").html(ResourceManager.formatCost(resource,amt)));
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
        return this.recipes.filter(recipe => recipe.id === id);
    }
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
        const name = $('<a/>').addClass('addCraft').attr("href",recipe.id).html(recipe.name)
        const td1 = $('<div/>').addClass('recipeName').append(recipe.itemPicName());
        const td2 = $('<div/>').addClass('recipecostdiv').html(recipe.visualizeCost());
        const td3 = $('<div/>').addClass('recipeTime').html(msToTime(recipe.craftTime))
        const td4 = $('<div/>').addClass('recipeValue').html(recipe.imageValue());
        const row = $('<div/>').addClass('recipeRow').attr("id",recipe.id).append(td1,td2,td3,td4);
        table.append(row);
    });
    $RecipeResults.append(table);
}

$(document).on("click",".recipeSelect", (e) => {
    e.preventDefault();
    const type = $(e.target).text();
    player.currentType = type;
    populateRecipe(type);
})