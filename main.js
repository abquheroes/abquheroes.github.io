"use strict";

const player = {
    money: 0,
    workers: 0,
    ore : 0,
    oreCap : 200,
    wood : 0,
    woodCap : 200,
    leather: 0,
    leatherCap : 200,
    herb: 0,
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
    //actionSlots is a list of dictionaries in form
    //{ 
        //actionType
        //actionName
        //actionTime
    //},
    currentType : null,
    inventoryCap : 5,
    lastLoop : Date.now(),
}

const workerProgress = {

}

const inventory = [];
const itemCount = {};

let oreRemainder = 0;
let woodRemainder = 0;
let herbRemainder = 0;
let leatherRemainder = 0;

let stopSave = false;

$(document).ready(() => {

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

    loadGame();
    refreshInventory();
    refreshActionSlots();

    $('#ActionSlots').on("click", "a.ASCancel", (e) => {
        e.preventDefault();
        const slot = $(e.target).attr("href");
        player.actionSlots[slot].actionType = "Empty";
        player.actionSlots[slot].actionName = "Empty";
        player.actionSlots[slot].actionTime = 0;
        refreshActionSlots();
    });

    /*$('#increaseOreLevel').click( () => {
        if (player.money >= getOreWorkerCost()) {
            player.money -= getOreWorkerCost();
            workerLevels["Ore"] += 1;
            refreshWorkers();
        }
    });*/

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

    $('.recipeSelect').click((e) => {
        e.preventDefault();
        const type = $(e.target).text();
        player.currentType = type;
        populateRecipe(type);
    })

    $('#tabs-1').on("click", "a.addCraft", (e) => {
        e.preventDefault();
        addCraft(e.target.text,"Craft");
    });

    $('#inventory').on("click","a.inventoryLink",(e) => {
        e.preventDefault();
        const slot = $(e.target).attr("href");
        item = inventory[slot];
        player.money += nameToItem(item).value;
        inventory.splice(slot, 1);
        refreshInventory();
    })

    function mainLoop() {
        const deltaT = Date.now() - player.lastLoop;
        player.lastLoop = Date.now();
        const resources = ["Ore","Wood","Leather","Herb"];
        const remainder = [oreRemainder,woodRemainder,leatherRemainder,herbRemainder];
        for (let i=0;i<resources.length;i++) {
            const lowercaseName = resources[i].toLowerCase();
            remainder[i] += deltaT*getProduction(resources[i]);
            player[lowercaseName] += Math.floor(remainder[i]/1000);
            player[lowercaseName] = Math.min(player[lowercaseName+"Cap"],player[lowercaseName]);
            remainder[i] = remainder[i]%1000;
        }
        for (let i=0;i<player.actionSlots.length;i++) {
            if (player.actionSlots[i].actionTime > 0) {
                const item = nameToItem(player.actionSlots[i].actionName);
                const pb = "#c"+i+"pb";
                if (Date.now() >= player.actionSlots[i].actionTime + item.craftTime) {
                    progressFinish(player.actionSlots[i].actionType,player.actionSlots[i].actionName);
                    player.actionSlots[i].actionTime = 0;
                    $(pb).progressbar({
                        value: 0
                    })
                    populateRecipe(player.currentType);
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
            if (canCraft(i)) {
                deductCost(i);
                startCraft(i);
            }
        }
        refreshResources();
    }

    setInterval(mainLoop, 10);
    //setInterval(saveGame, 5000);

    function addToInventory(itemName) {
        const item = nameToItem(itemName);
        if (player.inventoryCap == inventory.length) {
            player.money += item.value;
            return;
        }
        inventory.push(itemName);
        refreshInventory();
    }

    function refreshResources() {
        $oreAmt.text(player.ore + "/" + player.oreCap);
        $woodAmt.text(player.wood + "/" + player.woodCap);
        $leatherAmt.text(player.leather + "/" + player.leatherCap);
        $herbAmt.text(player.herb+"/"+player.herbCap);
        $moneyAmt.text(Math.floor(player.money));
        $orePSAmt.text(getProduction("Ore").toFixed(2));
        $woodPSAmt.text(getProduction("Wood").toFixed(2));
        $leatherPSAmt.text(getProduction("Leather").toFixed(2));
        $herbPSAmt.text(getProduction("Herb").toFixed(2));
    }

    function populateJob() {
        $jobList.empty();
        const table = $('<table/>').addClass('jobTable'):
        const hrow = $('<tr/>').addClass('jobHeader');
        const htd1 = $('<td/>').addClass('jobHeadName').html("NAME");
        const htd2 = $('<td/>').addClass('jobHeadWorker').html("WORKER");
        const htd3 = $('<td/>').addClass('jobHeadTime').html("TIME");
        const htd4 = $('<td/>').addClass('recipeHeadCount').html("COUNT");
        const htd5 = $('<td/>').addClass('recipeHeadValue').html("VALUE");
    }

    function populateRecipe(type) {
        type = type.toLowerCase();
        $RecipeResults.empty();
        const table = $('<table/>').addClass('recipeTable');
        const hrow = $('<tr/>').addClass('recipeHeader');
        const htd1 = $('<td/>').addClass('recipeHeadName').html("NAME");
        const htd2 = $('<td/>').addClass('recipeHeadCost').html("COST");
        const htd3 = $('<td/>').addClass('recipeHeadTime').html("TIME");
        const htd4 = $('<td/>').addClass('recipeHeadCount').html("COUNT");
        const htd5 = $('<td/>').addClass('recipeHeadValue').html("VALUE");
        hrow.append(htd1);
        hrow.append(htd2);
        hrow.append(htd3);
        hrow.append(htd4);
        hrow.append(htd5);
        table.append(hrow);
        let bpUnlock = null;
        for (let i=0;i<blueprints.length;i++) {
            if (blueprints[i].type === type && requirement(blueprints[i])) {
                const row = $('<tr/>').addClass('recipeRow');
                const name = $('<a/>').addClass('addCraft').attr("href",blueprints[i].name).html(blueprints[i].name)
                const td1 = $('<td/>').addClass('recipeName').html(imageReference[blueprints[i].name]+"&nbsp;");
                td1.append(name);
                let s = "";
                for (const [type, amt] of Object.entries(blueprints[i].cost)) {
                    if (amt > 0) {
                        s += amt;
                        s += imageReference[type];
                        s += "&nbsp;&nbsp;"
                    }
                }
                const td2 = $('<td/>').addClass('recipeCost').html(s);
                const td3 = $('<td/>').addClass('recipeTime').html(msToTime(blueprints[i].craftTime))
                const td4 = $('<td/>').addClass('recipeCount').html(itemCount[blueprints[i].name]);
                const td5 = $('<td/>').addClass('recipeValue').html(blueprints[i].value + "&nbsp;" + imageReference["Gold"]);
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
        if (player.actionSlots[loc].actionName === "Empty") return false;
        if (player.actionSlots[loc].actionTime > 0) return false;
        if (player.actionSlots[loc].actionType === "Job") return true;
        const itemName = player.actionSlots[loc].actionName
        const itemFull = nameToItem(itemName);
        if (!("Ore" in itemFull.cost)) itemFull.cost["Ore"] = 0;
        if (!("Wood" in itemFull.cost)) itemFull.cost["Wood"] = 0;
        return itemFull.cost["Ore"] <= player.ore && itemFull.cost["Wood"] <= player.wood
    }

    function deductCost(loc) {
        const itemName = player.actionSlots[loc].actionName;
        const itemFull = nameToItem(itemName);
        player.ore -= itemFull.cost["Ore"];
        player.wood -= itemFull.cost["Wood"];
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
        const saveFile = {
            playerSave : player,
            itemSave : itemCount,
            workerSave : workerLevels,
        }
        localStorage.setItem('gameSave2', JSON.stringify(saveFile));
     }

    function loadGame() {
        //populate itemCount with blueprints as a base
        blueprints.forEach(bp => {
            itemCount[bp.name] = 0;
        })
        const loadGame = JSON.parse(localStorage.getItem("gameSave2"));
        if (loadGame !== null) {
            //player variables
            if ($.type(loadGame.playerSave.money) !== null) player.money = loadGame.playerSave.money;
            if (typeof loadGame.playerSave.ore != null) player.ore = loadGame.playerSave.ore;
            if ($.type(loadGame.playerSave.wood) !== $.type(null)) {
                player.wood = loadGame.playerSave.wood;
            }
            else {
                console.log("wood not loaded");
            }
            if (typeof loadGame.playerSave.craft1 !== null) player.craft1 = loadGame.playerSave.craft1;
            if (typeof loadGame.playerSave.craft1start !== null) player.craft1start = loadGame.playerSave.craft1start;
            if (typeof loadGame.playerSave.craft2 !== null) player.craft2 = loadGame.playerSave.craft2;
            if (typeof loadGame.playerSave.craft2start !== null) player.craft2start = loadGame.playerSave.craft2start;
            if (typeof loadGame.playerSave.craft3 !== null) player.craft3 = loadGame.playerSave.craft3;
            if (typeof loadGame.playerSave.craft3start !== null) player.craft3start = loadGame.playerSave.craft3start;
            //item variables
            for (const [bp, _] of Object.entries(itemCount)) {
                if (bp in loadGame.itemSave) itemCount[bp] = loadGame.itemSave[bp];
            }
            //load workers
            //if (typeof loadGame.workerSave["Ore"] !== null) workerLevels["Ore"] = loadGame.workerSave["Ore"];
            //console.log($.type(loadGame.workerSave["Wood"]), $.type(undefined));
            //if ($.type(loadGame.workerSave["Wood"]) !== $.type(undefined)) {
            //    workerLevels["Wood"] = loadGame.workerSave["Wood"];
            //}
            //else {
            //    console.log("worker level not loaded");
            //}
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
        const saveFile = {
            playerSave : player,
            itemSave : itemCount,
            workerSave : workerLevels,
        }
        $("#exportDialog").html("<p>Copy this code to import later:</p>"+btoa(JSON.stringify(saveFile)))
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
        }
    }

    function refreshInventory() {
        $inventory.empty();
        for (let i=0;i<inventory.length;i++) {
            const itemLink = $('<a/>').addClass("inventoryLink tooltip").attr("href",i).attr("aria-label", "Click to sell this Item").html(inventory[i]);
            const itemdiv = $("<div/>").addClass("inventoryItem").html(imageReference[inventory[i]]+"&nbsp;")
            itemdiv.append(itemLink);
            $inventory.append(itemdiv);
        }
        for (let i=0;i<player.inventoryCap-inventory.length;i++) {
            $inventory.append($("<div/>").addClass("inventoryItem").html("-Empty-"));
        }
    }

    function refreshActionSlots() {
        $actionSlots.empty();
        const table = $('<table/>').addClass('ASTable');
        const hrow = $('<tr/>').addClass('ASHeader');
        const htd1 = $('<td/>').addClass('ASHeadType').html("TYPE");
        const htd2 = $('<td/>').addClass('ASHeadName').html("NAME");
        const htd3 = $('<td/>').addClass('ASHeadProgress').html("PROGRESS");
        hrow.append(htd1);
        hrow.append(htd2);
        hrow.append(htd3);
        table.append(hrow);
        for (let i=0;i<player.actionSlots.length;i++) {
            const row = $('<tr/>').addClass('ASRow');
            const td1 = $('<td/>').addClass('ASType').html(player.actionSlots[i].actionType);
            const td2 = $('<td/>').addClass('ASName').html(imageReference[player.actionSlots[i].actionName] + "&nbsp;" + player.actionSlots[i].actionName + "&nbsp;");
            
            const td2cancel = $('<a/>').addClass("ASCancel").attr("href",i).html("[x]");
            if (player.actionSlots[i].actionName === "Empty") td2.addClass("hidden")
            td2.append(td2cancel);
            const td3 = $('<td/>')
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
});