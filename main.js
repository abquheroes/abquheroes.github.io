"use strict";

const player = {
    money: 0,
    workers: 0,
    Ore : 0,
    oreCap : 200,
    Wood : 0,
    woodCap : 200,
    Leather : 0,
    leatherCap : 200,
    Herb : 0,
    herbCap : 200,
    actionSlots : [
        {
            actionType : "Empty",
            actionName : "Empty",
            actionTime : 0,
            actionEnd : 0,
        },
        {
            actionType : "Empty",
            actionName : "Empty",
            actionTime : 0,
            actionEnd : 0,
        },
        {
            actionType : "Empty",
            actionName : "Empty",
            actionTime : 0,
            actionEnd : 0,
        },
    ],
    currentType : null,
    inventoryCap : 5,
    lastLoop : Date.now(),
}

const resources = ["Ore","Wood","Leather","Herb"];

const workerProgress = {
    "Oren" : 1,
    "Eryn" : 0,
    "Herbie" : 0,
    "Lakur" : 0,
}

const workerSacProgress = {
}

const upgradeProgress = {
    "Max Ore" : 0,
    "Max Wood" : 0,
    "Max Leather" : 0,
    "Max Herb" : 0,
    "Max Action Slots" : 0,
    "Max Inventory Slots" : 0,
    "Auto Sell Value" : 0,
}

const rSL = {
    "Knives" : "KnifeSelector",
    "Maces" : "MaceSelector",
    "Gloves" : "GloveSelector",
    "Potions" : "PotionSelector",
    "Axes" : "AxeSelector",
    "Hats" : "HatSelector",
    "Wands" : "WandSelector",
    "Gauntlets" : "GauntletSelector",
    "Helmets" : "HelmetSelector",
    "Shoes" : "ShoeSelector",
    "Wards" : "WardSelector",
    "Shields" : "ShieldSelector",
    "Cloaks" : "CloakSelector",
    "Armor" : "ArmorSelector",
    "Pendants" : "PendantSelector",
}


const inventory = {};
const itemCount = {};

let oreRemainder = 0;
let woodRemainder = 0;
let herbRemainder = 0;
let leatherRemainder = 0;

let stopSave = false;

$("#exportDialog").dialog({
    autoOpen: false,
});
$("#importDialog").dialog({
    autoOpen: false,
});
$("#clearDialog").dialog({
    autoOpen: false,
});

const $oreAmt = $('#oreAmt');
const $woodAmt = $('#woodAmt');
const $leatherAmt = $('#leatherAmt');
const $herbAmt = $('#herbAmt');

const $moneyAmt = $('#moneyAmt');
const $orePSAmt = $('#orePerSecAmt');
const $woodPSAmt = $('#woodPerSecAmt');
const $leatherPSAmt = $('#leatherPerSecAmt');
const $herbPSAmt = $('#herbPerSecAmt');

const $RecipeResults = $('#RecipeResults');
const $inventory = $('#inventory');
const $actionSlots = $('#ActionSlots');
const $jobList = $('#joblist');

const $recipeFilter = $("#RecipeFilter");

initializeInventory();
loadGame();
refreshInventory();
refreshActionSlots();
populateJob();
refreshUpgrades();
refreshRecipeSelector();

$('#ActionSlots').on("click", "a.ASCancel", (e) => {
    e.preventDefault();
    const slot = $(e.target).attr("href");
    player.actionSlots[slot].actionType = "Empty";
    player.actionSlots[slot].actionName = "Empty";
    player.actionSlots[slot].actionTime = 0;
    refreshActionSlots();
    populateJob();
});

$("#clearSave").click((e) => {
    e.preventDefault();
    ClearSave();
});

$('#exportSave').click((e) => {
    e.preventDefault();
    ExportSave();
});

$('#importSave').click((e) => {
    e.preventDefault();
    ImportSaveButton();
});

$(document).on("click",".recipeSelect", (e) => {
    e.preventDefault();
    const type = $(e.target).text();
    player.currentType = type;
    populateRecipe(type);
})

$('#tabs-1').on("click", "a.addCraft", (e) => {
    e.preventDefault();
    addCraft(e.target.text,"Craft");
});

$(document).on("click", "a.addJob", (e) => {
    e.preventDefault();
    const name = $(e.target).attr("href");
    addCraft(name,"Job");
    populateJob();
});



function mainLoop() {
    const deltaT = Date.now() - player.lastLoop;
    player.lastLoop = Date.now();
    const remainder = [oreRemainder,woodRemainder,leatherRemainder,herbRemainder];
    for (let i=0;i<resources.length;i++) {
        const lowercaseName = resources[i].toLowerCase();
        remainder[i] += deltaT*getProduction(resources[i]);
        player[resources[i]] += Math.floor(remainder[i]/1000);
        player[resources[i]] = Math.min(player[lowercaseName+"Cap"],player[resources[i]]);
        remainder[i] = remainder[i]%1000;
    }
    for (let i=0;i<player.actionSlots.length;i++) {
        const pb = "#c"+i+"pb";
        if (player.actionSlots[i].actionTime > 0) {
            let item = nameToItem(player.actionSlots[i].actionName);
            if (player.actionSlots[i].actionType === "Job") item = nameToWorker(player.actionSlots[i].actionName);
            if (Date.now() >= player.actionSlots[i].actionTime + item.craftTime) {
                progressFinish(player.actionSlots[i].actionType,player.actionSlots[i].actionName);
                player.actionSlots[i].actionTime = 0;
                $(pb).progressbar({
                    value: 0
                })
                if (player.actionSlots[i].actionType === "Craft") populateRecipe(player.currentType);
            }
            else {
                const pText = msToTime(player.actionSlots[i].actionTime + item.craftTime - Date.now());
                const p1 = (player.actionSlots[i].actionTime + item.craftTime - Date.now())/item.craftTime;
                $(pb+"Label").text(pText);
                $(pb).progressbar({
                    value: 100-p1*100
                })
            }
        }
        else {
            $(pb+"Label").text("Waiting for Resources...");
            $(pb).progressbar({
                value : 0
            });
        }
        if (canCraft(i)) {
            deductCost(i);
            startCraft(i);
        }
    }
    refreshResources();
}

setInterval(mainLoop, 10);
setInterval(saveGame, 5000);



function refreshResources() {
    $oreAmt.text(player["Ore"] + "/" + player.oreCap);
    $woodAmt.text(player["Wood"] + "/" + player.woodCap);
    $leatherAmt.text(player["Leather"] + "/" + player.leatherCap);
    $herbAmt.text(player["Herb"] +"/"+player.herbCap);
    $moneyAmt.text(Math.floor(player.money));
    $orePSAmt.text(getProduction("Ore").toFixed(2));
    $woodPSAmt.text(getProduction("Wood").toFixed(2));
    $leatherPSAmt.text(getProduction("Leather").toFixed(2));
    $herbPSAmt.text(getProduction("Herb").toFixed(2));
    if (workerProgress["Eryn"] > 0) $("#woodResource").removeClass("hidden");
    if (workerProgress["Lakur"] > 0) $("#leatherResource").removeClass("hidden");
    if (workerProgress["Herbie"] > 0) $("#herbResource").removeClass("hidden");
}

function populateJob() {
    $('#joblist').empty();
    const table = $('<div/>').addClass('jobTable');
    const hrow = $('<div/>').addClass('jobHeader');
    const htd1 = $('<div/>').addClass('jobHeadWorker').html("WORKER");
    const htd2 = $('<div/>').addClass('jobHeadTime').html("TIME");
    const htd3 = $('<div/>').addClass('jobHeadValue').html("VALUE");
    hrow.append(htd1);
    hrow.append(htd2);
    hrow.append(htd3);
    table.append(hrow);
    for (const [workerName,lvl] of Object.entries(workerProgress)) {
        if (lvl > 0) {
            const worker = nameToWorker(workerName);
            const trow = $('<div/>').addClass('jobRow');
            const td1 = $('<div/>').addClass('jobWorker');
            if (actionSlotContainsWorker(workerName)) {
                trow.addClass('jobDisable');
                td1.html("Hire "+workerName+" (Busy)");
            }
            else {
                const td1a = $("<a/>").addClass('addJob').attr("href",workerName).attr("target","_blank").html("Hire "+workerName);
                td1.append(td1a);
            }

            const td2 = $('<div/>').addClass('jobTime').html(msToTime(worker.craftTime));
            let s = "";
            for (const [mat,amt] of Object.entries(worker.produces)) {
                s += (amt*worker.multiplier[lvl]).toFixed(1) + "&nbsp;" + imageReference[mat] + "&nbsp;&nbsp;";
            }
            const td3 = $('<div/>').addClass('jobValue').html(s);
            trow.append(td1);
            trow.append(td2);
            trow.append(td3);
            table.append(trow);
        }
    }
    $('#joblist').append(table);
}

function actionSlotContainsWorker(name) {
    for (let i=0;i<player.actionSlots.length;i++) {
        if (player.actionSlots[i].actionName === name) return true;
    }
    return false;
}

function populateRecipe(type) {
    type = type.toLowerCase();
    $RecipeResults.empty();
    const table = $('<div/>').addClass('recipeTable');
    const hrow = $('<div/>').addClass('recipeHeader');
    const htd1 = $('<div/>').addClass('recipeHeadName').html("NAME");
    const htd2 = $('<div/>').addClass('recipeHeadCost').html("COST");
    const htd3 = $('<div/>').addClass('recipeHeadTime').html("TIME");
    const htd4 = $('<div/>').addClass('recipeHeadCount').html("COUNT");
    const htd5 = $('<div/>').addClass('recipeHeadValue').html("VALUE");
    hrow.append(htd1);
    hrow.append(htd2);
    hrow.append(htd3);
    hrow.append(htd4);
    hrow.append(htd5);
    table.append(hrow);
    let bpUnlock = null;
    for (let i=0;i<blueprints.length;i++) {
        if (blueprints[i].type === type && requirement(blueprints[i])) {
            const row = $('<div/>').addClass('recipeRow');
            const name = $('<a/>').addClass('addCraft').attr("href",blueprints[i].name).html(blueprints[i].name)
            const td1 = $('<div/>').addClass('recipeName').html(imageReference[blueprints[i].name]+"&nbsp;");
            td1.append(name);
            let s = "";
            const td2 = $('<div/>').addClass('recipecostdiv');
            for (const [type, amt] of Object.entries(blueprints[i].cost)) {
                if (amt > 0) {
                    const td2a = $('<div/>').addClass("recipeCost tooltip").attr("aria-label",type).html(amt + "&nbsp" + imageReference[type])
                    td2.append(td2a);
                }
            }
            
            const td3 = $('<div/>').addClass('recipeTime').html(msToTime(blueprints[i].craftTime))
            const td4 = $('<div/>').addClass('recipeCount').html(itemCount[blueprints[i].name]);
            const td5 = $('<div/>').addClass('recipeValue').html(blueprints[i].value + "&nbsp;" + imageReference["Gold"]);
            row.append(td1);
            row.append(td2);
            row.append(td3);
            row.append(td4);
            row.append(td5);
            table.append(row);
        }
        else if (blueprints[i].type === type && !requirement(blueprints[i]) && !bpUnlock) {
            let s = ""
            for (const [item, amt] of Object.entries(blueprints[i].requires)) {
                s += amt + " " + item + " "
            }
            bpUnlock = $('<span/>').addClass("unlockReq").html("<p><i>Unlock next recipe by crafting " + s + "</i></p>");
        }
    }
    $RecipeResults.append(table);
    $RecipeResults.append(bpUnlock);
}

function canCraft(loc) {
    if (player.actionSlots[loc].actionTime > 0) return false;
    if (player.actionSlots[loc].actionType === "Job") return true;
    if (player.actionSlots[loc].actionName === "Empty") return false;
    const itemName = player.actionSlots[loc].actionName
    const itemFull = nameToItem(itemName);
    for (const [res, amt] of Object.entries(itemFull.cost)) {
        if (resources.includes(res)) {
            if (player[res] < amt) return false;
        }
        else {
            console.log(res,inventory[res],amt);
            if (!(res in inventory) || inventory[res] < amt) return false;
        }
    }
    return true;
}

function deductCost(loc) {
    if (player.actionSlots[loc].actionType === "Job") return;
    const itemName = player.actionSlots[loc].actionName;
    const itemFull = nameToItem(itemName);
    for (const [res,amt] of Object.entries(itemFull.cost)) {
        console.log(amt);
        if (resources.includes(res)) player[res] -= amt;
        else removeFromInventory(res,amt);
    }
}

function startCraft(loc) {
    player.actionSlots[loc].actionTime = Date.now();
}

function msToTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    if (secs < 10) secs = "0" + secs
    if (mins < 10) mins = "0" + mins   
    
    return mins + ':' + secs;
}

function saveGame() {
    if (stopSave) return;
    localStorage.setItem('gameSave2', JSON.stringify(createSave()));
    ga('send', 'event', 'Save', 'savegame', 'savegame');
}

function createSave() {
    return {
        playerSave : player,
        workerProgressSave : workerProgress,
        workerSacProgressSave : workerSacProgress,
        upgradeProgressSave : upgradeProgress,
        inventorySave : inventory,
        itemCountSave : itemCount,
    }
}

function loadGame() {
    //populate itemCount with blueprints as a base
    const loadGame = JSON.parse(localStorage.getItem("gameSave2"));
    if (loadGame !== null) {
        //aka there IS a file
        if (typeof loadGame.playerSave !== "undefined") $.extend(player,loadGame.playerSave);
        if (typeof loadGame.workerProgressSave !== "undefined") $.extend(workerProgress,loadGame.workerProgressSave);
        if (typeof loadGame.workerSacProgressSave !== "undefined") $.extend(workerSacProgress,loadGame.workerSacProgressSave);
        if (typeof loadGame.upgradeProgressSave !== "undefined") $.extend(upgradeProgress,loadGame.upgradeProgressSave);
        if (typeof loadGame.inventorySave !== "undefined") $.extend(inventory,loadGame.inventorySave);
        if (typeof loadGame.itemCountSave !== "undefined") $.extend(itemCount,loadGame.itemCountSave);
    }
}

function ClearSave() {
    stopSave = true;
    $('#clearDialog').dialog({
        buttons: {
            "Yes": function () {
                localStorage.removeItem("gameSave2");
                location.reload();
            },
            "No": function () {
                stopSave = false;
                $(this).dialog("close");
            }
        }
    });
    $('#clearDialog').dialog("open");
}

function ExportSave() {
    const saveFile = createSave();
    $("#exportDialog").html("<p>Copy this code to import later:</p><span id='copyme'>"+btoa(JSON.stringify(saveFile))+"</span>");
    $("#exportDialog").dialog({
        buttons: {
            "Copy to Clipboard": () => {
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val($("#copyme").text()).select();
                document.execCommand("copy");
                $temp.remove();
            }
        }
    })
    ga('send', 'event', 'Save', 'export', 'export');
    $("#exportDialog").dialog("open");
}

function ImportSaveButton() {
    stopSave = true;
    $('#importDialog').dialog({
        buttons: {
            "Import": function () {
                const s = JSON.parse(atob($('#importSaveText').val()));
                localStorage.setItem('gameSave2', JSON.stringify(s));
                location.reload();
            },
            "Cancel": function () {
                $(this).dialog("close");
                stopSave = false;
            }
        }
    });
    $('#importDialog').dialog("open");
}

function addCraft(itemName,craft) {
    //find an empty craft slot and add this to it
    for (let i=0;i<player.actionSlots.length;i++) {
        if (player.actionSlots[i].actionName === "Empty") {
            player.actionSlots[i].actionName = itemName;
            player.actionSlots[i].actionType = craft;
            player.actionSlots[i].craftTime = 0;
            break;
        }
    }
    refreshActionSlots();
}

function progressFinish(type,name) {
    if (type === "Craft") {
        addToInventory(name);
        if (name in itemCount) itemCount[name] += 1;
        else itemCount[name] = 1;
    }
    if (type === "Job") {
        const resourceDist = getJobValue(name);
        if ("Ore" in resourceDist) player["Ore"]+= resourceDist["Ore"];
        if ("Leather" in resourceDist) player["Leather"] += resourceDist["Leather"];
        if ("Herb" in resourceDist) player["Herb"] += resourceDist["Herb"];
        if ("Wood" in resourceDist) player["Wood"] += resourceDist["Wood"];
    }
    refreshRecipeSelector();
}



function refreshActionSlots() {
    $actionSlots.empty();
    const table = $('<div/>').addClass('ASTable');
    const hrow = $('<div/>').addClass('ASHeader');
    const htd1 = $('<div/>').addClass('ASHeadType').html("TYPE");
    const htd2 = $('<div/>').addClass('ASHeadName').html("NAME");
    const htd3 = $('<div/>').addClass('ASHeadProgress').html("PROGRESS");
    hrow.append(htd1);
    hrow.append(htd2);
    hrow.append(htd3);
    table.append(hrow);
    for (let i=0;i<player.actionSlots.length;i++) {
        const row = $('<div/>').addClass('ASRow');
        const td1 = $('<div/>').addClass('ASType').html(player.actionSlots[i].actionType);
        const td2 = $('<div/>').addClass('ASName').html(imageReference[player.actionSlots[i].actionName] + "&nbsp;" + player.actionSlots[i].actionName + "&nbsp;");
        const td2cancel = $('<a/>').addClass("ASCancel").attr("href",i).html("[x]");
        if (player.actionSlots[i].actionName === "Empty") td2.addClass("hidden")
        td2.append(td2cancel);
        const td3 = $('<div/>')
        const tdPBOuter = $('<div/>').attr("id","c"+i+"pb");
        $("id","c"+i+"pb").progressbar();
        if (player.actionSlots[i].actionName === "Empty") tdPBOuter.addClass("hidden")
        const tdPBtext = $('<div/>').addClass("pbLabel").attr("id","c"+i+"pbLabel").html("Waiting for Resources...");
        tdPBOuter.append(tdPBtext);
        td3.append(tdPBOuter);
        row.append(td1);
        row.append(td2);
        row.append(td3);
        table.append(row);
    }
    $actionSlots.append(table);
}

function round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
}

function initializeInventory() {
    for (let i=0;i<blueprints[i].length;i++) {
        inventory[blueprints[i].name] = 0;
    }
}

function refreshRecipeSelector() {
    
}

function canSee(name) {
    if (name === "Knives") return true;
    if (name === "Maces") return workerProgress["Eryn"] > 0;
    if (name === "Gloves") return workerProgress["Lakur"] > 0;
    if (name === "Potions") return workerProgress["Herbie"] > 0;
    if (name === "Axes") return itemCount["Chefs Knife"] >= 3 && itemCount["The Broominator"] >= 3;
    if (name === "Hats") return itemCount["Cleaning Gloves"] >= 3 && itemCount["Sleeping Potion"] >= 3;
    if (name === "Wands") return itemCount["Blackjack"] >= 3 && itemCount["Invincibility Potion"] >= 3;
    if (name === "Gauntlets") return itemCount["Punching Gloves"] >= 3 && itemCount["Fishing Knife"] >= 3;
    if (name === "Helmets") return itemCount["Club Knife"] >= 3 && itemCount["Like Potion"] >= 3;
    if (name === "Shoes") return itemCount["Night Club"] >= 3 && itemCount["Loving Gloves"] >= 3;
    if (name === "Wards") return itemCount["Vengance"] >= 3 && itemCount["Regular Helmet"] >= 3 &&  itemCount["Wind Wand"] >= 3;
    if (name === "Shields") return itemCount["Slothslayer"] >= 3 && itemCount["Bardic Galoshes"] >= 3 &&  itemCount["Plain Gauntlets"] >= 3;
    if (name === "Cloaks") return itemCount["Black Hat"] >= 3 && itemCount["Druidic Boots"] >= 3 &&  itemCount["Rain Wand"] >= 3;
    if (name === "Armor") return itemCount["Mega Helmet"] >= 3 && itemCount["Green Bay Beret"] >= 3 &&  itemCount["Challenge Gauntlets"] >= 3;
    if (name === "Pendants") return itemCount["Disease Ward"] >= 5 && itemCount["Generous Blocker"] >= 5 &&  itemCount["A Cool Dark Chainmail"] >= 5 &&  itemCount["Frostflinger Cloak"] >= 5;
}

function refreshProgress() {
    let recipeCt = 0;
    for (const [item,cnt] of Object.entries(itemCount)) {
        console.log(item,cnt);
        if (cnt >= 100) recipeCt += 1;
    }
    const recipeMaxCt = blueprints.length;
    $("#plRecipeMastery").html(recipeCt + "/" + recipeMaxCt);
    $("#pbRecipe").progressbar({
        value: recipeCt/recipeMaxCt*100
    });
    let workerCt = 0;
    for (const [worker,lvl] of Object.entries(workerProgress)) {
        workerCt += lvl;
    }
    let workerMaxCt = 0;
    for (let i=0;i<workers.length;i++) {
        workerMaxCt += workers[i].cost.length;
    }
    $("#plWorkerLevel").html(workerCt + "/" + workerMaxCt);
    $("#pbWorker").progressbar({
        value: workerCt/workerMaxCt*100
    });
    let upgradeCt = 0;
    for (const [upgrade,lvl] of Object.entries(upgradeProgress)) {
        upgradeCt += lvl;
    }
    let upgradeMaxCt = 0;
    for (let i=0;i<upgrades.length;i++) {
        upgradeMaxCt += upgrades[i].value.length-1;
    }
    $('#plUpgradeLevel').html(upgradeCt + "/" + upgradeMaxCt);
    $('#pbUpgrade').progressbar({
        value: upgradeCt/upgradeMaxCt*100
    })
    const overallCt = recipeCt+workerCt+upgradeCt;
    const overallMaxCt = recipeMaxCt+workerMaxCt+upgradeMaxCt;
    $('#plOverall').html((overallCt/overallMaxCt*100).toFixed(1) + "%")
    $('#pbOverall').progressbar({
        value: overallCt/overallMaxCt*100
    });
}