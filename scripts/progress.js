"use strict";

const $plRecipeMastery = $("#plRecipeMastery");
const $pbRecipe = $("#pbRecipe");
const $plWorkerLevel = $("#plWorkerLevel");
const $pbWorker = $("#pbWorker");
const $plHeroLevel = $("#plHeroLevel");
const $pbHero = $("#pbHero");
const $plOverall = $("#plOverall");
const $pbOverall = $("#pbOverall");

function refreshProgress() {
    $plRecipeMastery.html(`${recipeList.masteryCount()}/${recipeList.recipeCount()}`);
    const recipePercent = (recipeList.masteryCount()/recipeList.recipeCount()*100).toFixed(2);
    $pbRecipe.css('width', recipePercent+"%");
    $plWorkerLevel.html(`${WorkerManager.workerLevelCount()}/${WorkerManager.workerMaxLevelCount()}`);
    const workerPercent = (WorkerManager.workerLevelCount()/WorkerManager.workerMaxLevelCount()*100).toFixed(2);
    $pbWorker.css('width', workerPercent+"%");
    $plHeroLevel.html(`${HeroManager.heroLevelCount()}/${HeroManager.heroMaxLevelCount()}`);
    const heroPercent = (HeroManager.heroLevelCount()/HeroManager.heroMaxLevelCount()*100).toFixed(2);
    $pbHero.css('width', heroPercent+"%");
    const overallPercent = (recipeList.masteryCount()+WorkerManager.workerLevelCount()+HeroManager.heroLevelCount())/(recipeList.recipeCount()+WorkerManager.workerMaxLevelCount()+HeroManager.heroMaxLevelCount());
    $plOverall.html((overallPercent * 100).toFixed(2)+"%");
    $pbOverall.css('width', overallPercent.toFixed(2)+"%");
}