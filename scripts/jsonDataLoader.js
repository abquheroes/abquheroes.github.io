"use strict";

function loadRecipes() {
    $.getJSON("json/recipes.json", function(data){
        $.each(data, function(i,props){
            const item = new Item(props);
            recipeList.addItem(item);
        });
        initializeRecipes();
    });
}