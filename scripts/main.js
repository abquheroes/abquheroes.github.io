"use strict";

const player = {
    saveStart : Date.now(),
    completeTime : 0,
    lastTime : Date.now(),
    timeWarp : 1,
    sellPref : 1,
}

function afterLoad() {
    refreshInventory(); //the others are loaded in order
    refreshWorkers();
    refreshResources();
    initializeRecipes();
    initializeActionSlots();
    initializeHeroList();
    refreshHeroSelect();
    populateRecipe("Maces");
}

loadMaterials(); //the others are loaded in order
openTab("recipesTab");

function mainLoop() {
    const elapsedTime = (Date.now()-player.lastTime)*player.timeWarp;
    player.lastTime = Date.now();
    dungeonAdvance(elapsedTime);
    actionSlotManager.craftAdvance(elapsedTime);
}

setInterval(mainLoop, 10);

function refreshProgress() {
    let recipeCt = 0;
    for (const [item,cnt] of Object.entries(itemCount)) {
        if (cnt >= 100) recipeCt += 1;
    }
    const recipeMaxCt = blueprints.length;
    $("#plRecipeMastery").html(recipeCt + "/" + recipeMaxCt);
    $("#pbRecipe").css('width', recipeCt/recipeMaxCt*100+"%");
    let workerCt = 0;
    for (const [worker,lvl] of Object.entries(workerProgress)) {
        workerCt += lvl;
    }
    let workerMaxCt = 0;
    for (let i=0;i<workers.length;i++) {
        workerMaxCt += workers[i].lvlreq.length;
    }
    $("#plWorkerLevel").html(workerCt + "/" + workerMaxCt);
    $("#pbWorker").css('width', workerCt/workerMaxCt*100+"%");
    let upgradeCt = 0;
    for (const [upgrade,lvl] of Object.entries(upgradeProgress)) {
        upgradeCt += lvl;
    }
    let upgradeMaxCt = 0;
    for (let i=0;i<upgrades.length;i++) {
        upgradeMaxCt += upgrades[i].value.length-1;
    }
    $('#plUpgradeLevel').html(upgradeCt + "/" + upgradeMaxCt);
    $('#pbUpgrade').css('width', upgradeCt/upgradeMaxCt*100+"%");
    const overallCt = recipeCt+workerCt+upgradeCt;
    const overallMaxCt = recipeMaxCt+workerMaxCt+upgradeMaxCt;
    $('#plOverall').html((overallCt/overallMaxCt*100).toFixed(1) + "%")
    player.percent = (overallCt/overallMaxCt*100).toFixed(1);
    if (player.percent >= 100 && player.completeTime === 0) player.completeTime = Date.now();
    $('#pbOverall').css('width', overallCt/overallMaxCt*100+"%");
}