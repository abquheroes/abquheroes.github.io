"use strict";

const player = {
    saveStart : Date.now(),
    lastTime : Date.now(),
    timeWarp : 1,
}

function afterLoad() {
    initializeRecipes();
    initializeMats();
    if (!loadGame()) {
        WorkerManager.generateWorkerSac();
        WorkerManager.workerBuySeed();
        HeroManager.heroBuySeed();
        WorkerManager.gainWorker("W001");
        recipeList.idToItem("R0701").owned = true;
        HeroManager.idToHero("H203").owned = true;
        ResourceManager.addMaterial("M001",miscLoadedValues.startingGold);
    }
    else {
        WorkerManager.generateWorkerSac();
        WorkerManager.workerBuySeed();
        HeroManager.heroBuySeed();
    }
    refreshInventory();
    refreshWorkers();
    refreshSideWorkers();
    initializeActionSlots();
    initializeHeroList();
    refreshHeroSelect();
    refreshRecipeFilters();
    populateRecipe("Knives");    
}

loadMisc(); //the others are loaded in order
openTab("recipesTab");

function mainLoop() {
    const elapsedTime = (Date.now()-player.lastTime)*player.timeWarp;
    player.lastTime = Date.now();
    DungeonAssist.addTime(elapsedTime);
    actionSlotManager.craftAdvance(elapsedTime);
    HeroManager.healTimer(elapsedTime);
}

setInterval(mainLoop, 10);