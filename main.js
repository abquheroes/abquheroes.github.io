"use strict";

const player = {
    money: 0,
    workers: 0,
    ore : 0,
    wood : 0,
    craft1: null,
    craft1start : 0,
    craft2: null,
    craft2start : 0,
    craft3: null,
    craft3start : 0,
    currentType : null,
    lastLoop : Date.now(),
}

const itemCount = {};

let oreRemainder = 0;
let woodRemainder = 0;

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

    loadGame();
    refreshCrafts();

    const $oreAmt = $('#oreAmt');
    const $woodAmt = $('#woodAmt');
    const $moneyAmt = $('#moneyAmt');
    const $orePSAmt = $('#orePerSecAmt');
    const $woodPSAmt = $('#woodPerSecAmt');
    const $knifeSelector = $('#KnifeSelector');
    const $axeSelector = $('#AxeSelector');
    const $maceSelector = $('#MaceSelector');
    const $RecipeResults = $('#RecipeResults');

    $('#tabs-1').on("click", "#craft1", (e) => {
        e.preventDefault();
        player.status = GameState.CRAFT1;
        $("#tabs").tabs({active:2});
    });
    $('#tabs-1').on("click", "#craft2", (e) => {
        e.preventDefault();
        player.status = GameState.CRAFT2;
        $("#tabs").tabs({active:2});
    });
    $('#tabs-1').on("click", "#craft3", (e) => {
        e.preventDefault();
        player.status = GameState.CRAFT3;
        $("#tabs").tabs({active:2});
    });

    //clear slots
    $('#tabs-1').on("click", "#c1Close", (e) => {
        e.preventDefault();
        player.craft1 = null;
        player.craft1start = 0;
        refreshCrafts();
    });
    $('#tabs-1').on("click", "#c2Close", (e) => {
        e.preventDefault();
        player.craft2 = null;
        player.craft2start = 0;
        refreshCrafts();
    });
    $('#tabs-1').on("click", "#c3Close", (e) => {
        e.preventDefault();
        player.craft3 = null;
        player.craft3start = 0;
        refreshCrafts();
    });

    $('#increaseOreLevel').click( () => {
        if (player.money >= getOreWorkerCost()) {
            player.money -= getOreWorkerCost();
            workerLevels["Ore"] += 1;
            refreshWorkers();
        }
    });

    $('#increaseWoodLevel').click( () => {
        if (player.money >= getWoodWorkerCost()) {
            player.money -= getWoodWorkerCost();
            workerLevels["Wood"] += 1;
            refreshWorkers();
        }
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

    $knifeSelector.click((e) => {
        e.preventDefault();
        player.currentType = "knives";
        populateRecipe("knives");
    });

    $axeSelector.click((e) => {
        e.preventDefault();
        player.currentType = "axes";
        populateRecipe("axes");
    });

    $maceSelector.click((e) => {
        e.preventDefault();
        player.currentType = "maces";
        populateRecipe("maces");
    });


    $('#tabs-1').on("click", "a.addCraft", (e) => {
        e.preventDefault();
        addCraft(e.target.text)
    });

    $('#tabs-3').on("click", ".craft", (e) => {
        e.preventDefault();
        
        if (player.status === GameState.CRAFT1) {
            player.craft1 = $(e.target).text();
        }
        if (player.status === GameState.CRAFT2) {
            player.craft2 = $(e.target).text();
        }
        if (player.status === GameState.CRAFT3) {
            player.craft3 = $(e.target).text();
        }
        player.status = null;
        $("#tabs").tabs({active:0});
    });

    function mainLoop() {
        const deltaT = Date.now() - player.lastLoop;
        player.lastLoop = Date.now();
        oreRemainder += deltaT*getOreInterval();
        player.ore += Math.floor(oreRemainder/1000);
        oreRemainder = oreRemainder%1000;
        woodRemainder += deltaT*getWoodInterval();
        player.wood += Math.floor(woodRemainder/1000);
        woodRemainder = woodRemainder%1000;
        const slots = ["craft1","craft2","craft3"];
        const pbName = {
            "craft1" : "#c1pb",
            "craft2" : "#c2pb",
            "craft3" : "#c3pb",
        }

        slots.forEach(slot => {
            if (player[slot] === null) return;
            const slotStart = player[slot + "start"];
            const slotCraft = nameToItem(player[slot]).craftTime
            const slotValue = nameToItem(player[slot]).value;

            if (slotStart > 0) {
                if (Date.now() >= slotStart + slotCraft) {
                    player[slot + "start"] = 0;
                    player.money += slotValue;
                    itemCount[player[slot]] += 1;
                    $(pbName[slot]).progressbar({
                        value: 0
                    })
                    populateRecipe(player.currentType);
                }
                else {
                    const pText = msToTime(slotStart + slotCraft - Date.now());
                    const p1 = (slotStart + slotCraft - Date.now())/slotCraft;
                    $(pbName[slot]+"Label").text(pText);
                    $(pbName[slot]).progressbar({
                        value: 100-p1*100
                    })
                }
            }

            if (canCraft(slot)) {
                deductCost(slot);
                startCraft(slot);
            }
        });
        refreshResources();
        saveGame();
    }

    setInterval(mainLoop, 10);

    function refreshResources() {
        $oreAmt.text(player.ore);
        $woodAmt.text(player.wood);
        $moneyAmt.text(Math.floor(player.money));
        $orePSAmt.text(getOreInterval().toFixed(2))
        $woodPSAmt.text(getWoodInterval().toFixed(2))
    }

    function populateRecipe(type) {
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
                let s = ""
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
        if (player[loc+"start"] > 0) return false;
        const itemName = player[loc];
        const itemFull = nameToItem(itemName);
        if (!("Ore" in itemFull.cost)) itemFull.cost["Ore"] = 0;
        if (!("Wood" in itemFull.cost)) itemFull.cost["Wood"] = 0;
        return itemFull.cost["Ore"] <= player.ore && itemFull.cost["Wood"] <= player.wood
    }

    function deductCost(loc) {
        const itemName = player[loc];
        const itemFull = nameToItem(itemName);
        player.ore -= itemFull.cost["Ore"];
        player.wood -= itemFull.cost["Wood"];
    }

    function startCraft(loc) {
        player[loc+"start"] = Date.now();
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
        console.log(JSON.parse(localStorage.getItem("gameSave2")));
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
            if (typeof loadGame.workerSave["Ore"] !== null) workerLevels["Ore"] = loadGame.workerSave["Ore"];
            console.log($.type(loadGame.workerSave["Wood"]), $.type(undefined));
            if ($.type(loadGame.workerSave["Wood"]) !== $.type(undefined)) {
                workerLevels["Wood"] = loadGame.workerSave["Wood"];
            }
            else {
                console.log("worker level not loaded");
            }
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

    function addCraft(itemName) {
        //find an empty craft slot and add this to it
        if (player.craft1 === null) {
            player.craft1 = itemName;
        }
        else if (player.craft2 === null) {
            player.craft2 = itemName;
        }
        else if (player.craft3 === null) {
            player.craft3 = itemName;
        }
        refreshCrafts();
    }
});