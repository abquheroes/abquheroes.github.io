"use strict";

const $plRecipeMastery = $("#plRecipeMastery");
const $pbRecipe = $("#pbRecipe");
const $plWorkerLevel = $("#plWorkerLevel");
const $pbWorker = $("#pbWorker");
const $plHeroLevel = $("#plHeroLevel");
const $pbHero = $("#pbHero");
const $plOverall = $("#plOverall");
const $pbOverall = $("#pbOverall");
const $plAchieve = $("#plAchieve");
const $pbAchieve = $("#pbAchieve");

function refreshProgress() {
    //big progress boxes
    $plRecipeMastery.html(`${recipeList.masteryCount()}/${recipeList.recipeCount()}`);
    const recipePercent = (recipeList.masteryCount()/recipeList.recipeCount()*100).toFixed(2);
    $pbRecipe.css('width', recipePercent+"%");
    $plWorkerLevel.html(`${WorkerManager.workerLevelCount()}/${WorkerManager.workerMaxLevelCount()}`);
    const workerPercent = (WorkerManager.workerLevelCount()/WorkerManager.workerMaxLevelCount()*100).toFixed(2);
    $pbWorker.css('width', workerPercent+"%");
    $plHeroLevel.html(`${HeroManager.heroLevelCount()}/${HeroManager.heroMaxLevelCount()}`);
    const heroPercent = (HeroManager.heroLevelCount()/HeroManager.heroMaxLevelCount()*100).toFixed(2);
    $pbHero.css('width', heroPercent+"%");
    const achieves = achievementCheck();
    $plAchieve.html(`${achieves}/10`);
    const achievePercent = (achieves*10).toFixed(2);
    $pbAchieve.css('width', achievePercent+"%");
    const overallPercent = (achieves+recipeList.masteryCount()+WorkerManager.workerLevelCount()+HeroManager.heroLevelCount())/(10+recipeList.recipeCount()+WorkerManager.workerMaxLevelCount()+HeroManager.heroMaxLevelCount());
    $plOverall.html((overallPercent * 100).toFixed(2)+"%");
    $pbOverall.css('width', (overallPercent*100).toFixed(2)+"%");
}

const $statMaxFloor = $("#statMaxFloor");
const $statFloors = $("#statFloors");
const $statTimePlayed = $("#statTimePlayed");
const $statTotalGoldEarned = $("#statTotalGoldEarned");
const $statTotalItems = $("#statTotalItems");
const $statCommons = $("#statCommons");
const $statGoods = $("#statGoods");
const $statGreats = $("#statGreats");
const $statEpics = $("#statEpics");

const achievementStats = {
    maxFloor : 0,
    timePlayed : 0,
    totalGoldEarned : 0,
    epicsCrafted : 0,
    greatsCrafted : 0,
    goodsCrafted : 0,
    commonsCrafted : 0,
    totalItemsCrafted : 0,
    totalFloorsBeaten : 0,
    floorBeaten(floor) {
        this.totalFloorsBeaten += 1;
        this.maxFloor = Math.max(this.maxFloor,floor);
        $statMaxFloor.html("Floor " + this.maxFloor);
        $statFloors.html(this.totalFloorsBeaten)
    },
    setTimePlayed(ms) {
        this.timePlayed += ms;
        $statTimePlayed.html(timeSince(0,this.timePlayed));
    },
    craftedItem(rarity) {
        this.totalItemsCrafted += 1;
        if (rarity === "Common") this.commonsCrafted += 1;
        if (rarity === "Good") this.goodsCrafted += 1;
        if (rarity === "Great") this.greatsCrafted += 1;
        if (rarity === "Epic") this.epicsCrafted += 1;
        $statTotalItems.html(this.totalItemsCrafted);
        $statCommons.html(this.commonsCrafted);
        $statGoods.html(this.goodsCrafted);
        $statGreats.html(this.greatsCrafted);
        $statEpics.html(this.epicsCrafted);
    },
    gold(g) {
        this.totalGoldEarned += g;
        $statTotalGoldEarned.html(this.totalGoldEarned);
    },
    createSave() {
        const save = {};
        save.maxFloor = this.maxFloor;
        save.timePlayed = this.timePlayed;
        save.totalGoldEarned = this.totalGoldEarned;
        save.epicsCrafted = this.epicsCrafted;
        save.greatsCrafted = this.greatsCrafted;
        save.goodsCrafted = this.goodsCrafted;
        save.commonsCrafted = this.commonsCrafted;
        save.totalItemsCrafted = this.totalItemsCrafted;
        save.totalFloorsBeaten = this.totalFloorsBeaten;
        return save;
    },
    loadSave(save) {
        this.maxFloor = save.maxFloor;
        this.timePlayed = save.timePlayed;
        this.totalGoldEarned = save.totalGoldEarned;
        this.epicsCrafted = save.epicsCrafted;
        this.greatsCrafted = save.greatsCrafted;
        this.goodsCrafted = save.goodsCrafted;
        this.commonsCrafted = save.commonsCrafted;
        this.totalItemsCrafted = save.totalItemsCrafted;
        this.totalFloorsBeaten = save.totalFloorsBeaten;
        $statMaxFloor.html("Floor " + this.maxFloor);
        $statFloors.html(this.totalFloorsBeaten)
        $statTimePlayed.html(timeSince(0,this.timePlayed));
        $statTotalItems.html(this.totalItemsCrafted);
        $statCommons.html(this.commonsCrafted);
        $statGoods.html(this.goodsCrafted);
        $statGreats.html(this.greatsCrafted);
        $statEpics.html(this.epicsCrafted);
    }
}

const $achieve1 = $("#achieve1");
const $achieve2 = $("#achieve2");
const $achieve3 = $("#achieve3");
const $achieve4 = $("#achieve4");
const $achieve5 = $("#achieve5");
const $achieve6 = $("#achieve6");
const $achieve7 = $("#achieve7");
const $achieve8 = $("#achieve8");
const $achieve9 = $("#achieve9");
const $achieve10 = $("#achieve10");

function achievementCheck() {
    let total = 0;
    if (achievementStats.maxFloor === 20) {
        total += 1;
        $achieve1.addClass("achieved");
    }
    if (achievementStats.maxFloor === 100) {
        total += 1;
        $achieve2.addClass("achieved");
    }
    if (achievementStats.maxFloor === 150) {
        total += 1;
        $achieve3.addClass("achieved");
    }
    if (achievementStats.maxFloor === 200) {
        total += 1;
        $achieve4.addClass("achieved");
    }
    if (achievementStats.maxFloor === 350) {
        total += 1;
        $achieve5.addClass("achieved");
    }
    if (achievementStats.maxFloor === 500) {
        total += 1;
        $achieve6.addClass("achieved");
    }
    if (achievementStats.maxFloor === 750) {
        total += 1;
        $achieve7.addClass("achieved");
    }
    if (achievementStats.maxFloor === 1000) {
        total += 1;
        $achieve8.addClass("achieved");
    }
    if (achievementStats.maxFloor === 1500) {
        total += 1;
        $achieve1.addClass("achieved");
    }
    if (achievementStats.maxFloor === 2000) {
        total += 1;
        $achieve10.addClass("achieved");
    }
    return total;
}