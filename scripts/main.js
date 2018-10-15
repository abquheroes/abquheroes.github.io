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
        WorkerManager.workerOrder.shift();
        recipeList.idToItem("R0701").owned = true;
        HeroManager.idToHero("H203").owned = true;
        HeroManager.heroOrder.shift();
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
    refreshEvents();
    hardMatRefresh();
    loadCorrectDungeonScreen();
    populateRecipe("Knives");
    refreshProgress();
    setInterval(mainLoop, 10);
    loading_screen.finish();
}

const loading_screen = pleaseWait({
    logo: "images/site-logo.png",
    backgroundColor: '#f46d3b',
    loadingHtml: "<div class='sk-spinner sk-spinner-wave'><div class='sk-rect1'></div><div class='sk-rect2'></div><div class='sk-rect3'></div><div class='sk-rect4'></div><div class='sk-rect5'></div></div>"
});
loadMisc(); //the others are loaded in order
openTab("recipesTab");

function mainLoop() {
    const elapsedTime = (Date.now()-player.lastTime)*player.timeWarp;
    saveGame(Date.now()-player.lastTime);
    player.lastTime = Date.now();
    DungeonAssist.addTime(elapsedTime);
    actionSlotManager.craftAdvance(elapsedTime);
    HeroManager.healTimer(elapsedTime);
}