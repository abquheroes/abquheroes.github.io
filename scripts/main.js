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
    populateRecipe("Knives");
    refreshProgress();
    initializeSideBarDungeon();
    setInterval(mainLoop, 10);
    if (HeroManager.heroes.some(h=>h.xp === h.maxXP())) $("#heroTab").addClass("hasEvent");
    loading_screen.finish();
}

/* Load Message Selection */
const loadMessages = [
    "Spreading misinformation.",
    "Rewriting all of the code.",
    "Delaying Version 0.3.",
    "Getting ducks in a row.",
    "Increasing functionality by 19%.",
    "Making bad puns.",
    "Learning Javascript.",
    "Translating Latin.",
    "Temporarily reviewing accounts.",
    "Recoloring sprites.",
    "Hyping Elites.",
    "Leaking outdated information.",
    "Rebooting idea machine.",
    "Sourcing locally grown lettuce.",
    "Finding cute animal gifs.",
    "Lowering self esteem."
];

function selectLoadMessage() {
    const randomNumber = Math.floor(Math.random()*loadMessages.length);
    return loadMessages[randomNumber];
}

const loading_screen = pleaseWait({
    logo: "images/site-logo.png",
    backgroundColor: 'var(--bg)',
    loadingHtml: `
    <div class="loadingMessage">${selectLoadMessage()}</div>
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
    DungeonManager.addTime(elapsedTime);
    actionSlotManager.craftAdvance(elapsedTime);
    HeroManager.healTimer(elapsedTime);
}