"use strict";

const player = {
    saveStart : Date.now(),
    completeTime : 0,
    lastTime : Date.now(),
    timeWarp : 1,
    sellPref : 1,
}

function afterLoad() {
    initializeRecipes();
    WorkerManager.generateWorkerSac();
    WorkerManager.gainWorker("W001");
    recipeList.idToItem("R0701").owned = true;
    refreshInventory(); //the others are loaded in order
    refreshWorkers();
    refreshSideWorkers();
    initializeActionSlots();
    HeroManager.idToHero("H203").owned = true;
    initializeHeroList();
    initializeMats();
    refreshHeroSelect();
    populateRecipe("Knives");
    refreshRecipeFilters();
    ResourceManager.addMaterial("M001",miscLoadedValues.startingGold);
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