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

function loadWorkers() {
    $.getJSON("json/workers.json", function(data){
        $.each(data, function(i,props){
            const worker = new Worker(props);
            WorkerManager.addWorker(worker);
        });
        refreshResources();
    });
}