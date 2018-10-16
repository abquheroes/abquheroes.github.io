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
        ItemType.forEach(type => recipeList.recipeNewFilter.push(type));
    }
    else {
        WorkerManager.generateWorkerSac();
        WorkerManager.workerBuySeed();
        HeroManager.heroBuySeed();
    }
    refreshCraftCount();
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

const loadMessage = "Placeholder text for random load messages.";

const loading_screen = pleaseWait({
    logo: "images/site-logo.png",
    backgroundColor: 'var(--bg)',
    loadingHtml: `
    <div class="loadingMessage">${loadMessage}</div>
    <div class="spinner"></div>
    `
});
loadMisc(); //the others are loaded in order
openTab("recipesTab");

function mainLoop() {
    const elapsedTime = (Date.now()-player.lastTime)*player.timeWarp;
    achievementStats.setTimePlayed(elapsedTime);
    saveGame(Date.now()-player.lastTime);
    player.lastTime = Date.now();
    DungeonAssist.addTime(elapsedTime);
    actionSlotManager.craftAdvance(elapsedTime);
    HeroManager.healTimer(elapsedTime);
}