"use strict";

function loadMaterials() {
    $.ajax({
        url: "json/materials.json",
    }).done((data) => {
        console.log("material load complete");
        $.each(data, function(i,props){
            const material = new Material(props);
            ResourceManager.addNewMaterial(material);
        });
        loadRecipes();
    });
}

function loadRecipes() {
    $.ajax({
        url: "json/recipes.json",
    }).done((data) => {
        console.log("recipe load complete");
        $.each(data, function(i,props){
            const item = new Item(props);
            recipeList.addItem(item);
        });
        loadWorkers();
    });
};

function loadWorkers() {
    $.ajax({
        url: "json/workers.json",
    }).done((data) => {
        console.log("worker load complete");
        $.each(data, function(i,props){
            const worker = new Worker(props);
            WorkerManager.addWorker(worker);
        });
        afterLoad();
    });
}