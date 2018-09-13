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
        recipeList.recipes.forEach(recipe => {
            Inventory.addToInventory(recipe.id,0,10,true);
            Inventory.addToInventory(recipe.id,1,10,true);
            Inventory.addToInventory(recipe.id,2,10,true);
        })
        refreshInventory();
        refreshWorkers();
        examineHeroPossibleEquip();
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
}