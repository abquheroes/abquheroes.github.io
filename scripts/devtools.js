const devtools = {
    godmode : function() {
        console.log("this will probably take a minute, don't close...");
        recipeList.recipes.forEach(recipe => {
            recipe.owned = true;
        })
        WorkerManager.workers.forEach(worker => {
            worker.owned = true;
            worker.lvl = 10;
        })
        ResourceManager.materials.forEach(material => {
            ResourceManager.addMaterial(material.id,100);
        })
        refreshWorkers();
        examineHeroPossibleEquip();
        refreshRecipeFilters();
        console.log("done!");
    },
    materials : function() {
        ResourceManager.materials.forEach(material => {
            ResourceManager.addMaterial(material.id,10000);
        })
    },
    addGold(amt) {
        ResourceManager.addMaterial("M001",amt);
    },
    speed(amt) {
        player.timeWarp = amt;
    },
    heroTest() {
        Inventory.addToInventory("R0101",0);
        Inventory.addToInventory("R0201",0);
        Inventory.addToInventory("R0301",0);
    },
}