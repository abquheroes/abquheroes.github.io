"use strict";

const player = {
    money: 500,
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
        },
        {
            actionType : "Empty",
            actionName : "Empty",
            actionTime : 0,
        },
        {
            actionType : "Empty",
            actionName : "Empty",
            actionTime : 0,
        },
    ],
    currentType : "Knives",
    inventoryCap : 5,
    saveStart : Date.now(),
    percent : 0,
    blueprintShow : false,
    sellPref : 1,
    lastSave : 0,
    completeTime : 0,
}

const resources = ["Ore","Wood","Leather","Herb"];

const displayedResources = {};
const displayedResourcesCap = {};

const hidden = {
    "woodResource" : true,
    "leatherResource" : true,
    "herbResource" : true,
    "recipeMace" : true,
    "recipeGlove" : true,
    "recipePotion" : true,
    "recipeAxe" : true,
    "recipeHat" : true,
    "recipeWand" : true,
    "recipeGauntlet" : true,
    "recipeHelmet" : true,
    "recipeShoe" : true,
    "recipeWard" : true,
    "recipeShield" : true,
    "recipeCloak" : true,
    "recipeArmor" : true,
    "recipePendant" : true,
    "blueprints" : true,
    "upgrades" : true,
    "progress" : true,
    "blueprintTab" : true,
    "upgradeTab" : true,
    "progressTab" : true,
    "fullProgress" : true,
}

function initialize() {
    for (let i=0;i<resources.length;i++) {
        displayedResources[resources[i]] = 0;
    }
    displayedResources["Money"] = 0;
    if (player.sellPref === 1) $("#sell1").addClass("itemSellPrefSelected");
    else if (player.sellPref === 10) $("#sell10").addClass("itemSellPrefSelected");
    else if (player.sellPref === 100) $("#sellAll").addClass("itemSellPrefSelected");
    $("#completeTime").hide();
    $("#pfImportExport").hide();
    $("#loadSure").hide();
    //fix for new bin levels
    const newMax = ["Max Ore","Max Wood","Max Leather","Max Herb"];
    for (let i=0;i<newMax.length;i++) {
        upgradeProgress[newMax[i]] = Math.min(upgradeProgress[newMax[i]],nameToUpgrade(newMax[i]).value.length-1)
    }
    //fix for Vengance
    if ("Vengance" in itemCount) delete itemCount["Vengance"];
}

const workerProgress = {
    "Oren" : 0,
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

const flags = {}

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
$("#tipsDialog").dialog({
    autoOpen: false,
});
$("#unlockDialog").dialog({
    autoOpen: false,
});


const $asParts = [
    {
        block : $("#ASBlock1"),
        type : $("#ASType1"),
        cancel : $("#ASCancel1"),
        name : $("#ASName1"),
        pb : $("#c1pb"),
        pbLabel : $("#c1pbLabel"),
    },
    {
        block : $("#ASBlock2"),
        type : $("#ASType2"),
        cancel : $("#ASCancel2"),
        name : $("#ASName2"),
        pb : $("#c2pb"),
        pbLabel : $("#c2pbLabel"),
    },
    {
        block : $("#ASBlock3"),
        type : $("#ASType3"),
        cancel : $("#ASCancel3"),
        name : $("#ASName3"),
        pb : $("#c3pb"),
        pbLabel : $("#c3pbLabel"),
    },
    {
        block : $("#ASBlock4"),
        type : $("#ASType4"),
        cancel : $("#ASCancel4"),
        name : $("#ASName4"),
        pb : $("#c4pb"),
        pbLabel : $("#c4pbLabel"),
    },
    {
        block : $("#ASBlock5"),
        type : $("#ASType5"),
        cancel : $("#ASCancel5"),
        name : $("#ASName5"),
        pb : $("#c5pb"),
        pbLabel : $("#c5pbLabel"),
    },
    {
        block : $("#ASBlock6"),
        type : $("#ASType6"),
        cancel : $("#ASCancel6"),
        name : $("#ASName6"),
        pb : $("#c6pb"),
        pbLabel : $("#c6pbLabel"),
    },
    {
        block : $("#ASBlock7"),
        type : $("#ASType7"),
        cancel : $("#ASCancel7"),
        name : $("#ASName7"),
        pb : $("#c7pb"),
        pbLabel : $("#c7pbLabel"),
    },
    {
        block : $("#ASBlock8"),
        type : $("#ASType8"),
        cancel : $("#ASCancel8"),
        name : $("#ASName8"),
        pb : $("#c8pb"),
        pbLabel : $("#c8pbLabel"),
    },
    {
        block : $("#ASBlock9"),
        type : $("#ASType9"),
        cancel : $("#ASCancel9"),
        name : $("#ASName9"),
        pb : $("#c9pb"),
        pbLabel : $("#c9pbLabel"),
    },
    {
        block : $("#ASBlock10"),
        type : $("#ASType10"),
        cancel : $("#ASCancel10"),
        name : $("#ASName10"),
        pb : $("#c10pb"),
        pbLabel : $("#c10pbLabel"),
    },
]

const asState = ["Empty","Empty","Empty"];
const pbValue = [0,0,0];
const pbValueCurrent = [0,0,0];
const pbLabelText = ["","",""];
const pbLabelTextCurrent = ["","",""];

function refreshActionSlots(hardRefresh) {
    hardRefresh = hardRefresh || false;
    for (let i=0;i<player.actionSlots.length;i++) {
        if (i === asState.length) { //aka we dn't have a state for a slot, probably just bought...
            asState.push("Empty");
            pbValue.push(0);
            pbValueCurrent.push(0);
            pbLabelText.push("");
            pbLabelTextCurrent.push("");
            $asParts[i].block.removeClass("none");
        }
        if (player.actionSlots[i].actionType !== asState[i] || hardRefresh) { //aka we changed states...
            if (player.actionSlots[i].actionType === "Empty") {
                $asParts[i].type.html("Empty");
                $asParts[i].cancel.addClass("hidden");
                $asParts[i].name.addClass("hidden");
                $asParts[i].pbLabel.addClass("hidden");
            }
            else if (player.actionSlots[i].actionType === "Job") {
                $asParts[i].type.html("Job");
                $asParts[i].cancel.removeClass("hidden");
                const name = imageReference[player.actionSlots[i].actionName] + "&nbsp;" + player.actionSlots[i].actionName;
                const resourcesProduced = getJobValue(player.actionSlots[i].actionName);
                let s = ""
                for (const [name,value] of Object.entries(resourcesProduced)) {
                    s += imageReference[name]+" "+value;
                }
                $asParts[i].name.removeClass("hidden").html(name);
                $asParts[i].name.append("</br>"+ s);
                $asParts[i].pbLabel.removeClass("hidden")
            }
            else if (player.actionSlots[i].actionType === "Craft") {
                $asParts[i].type.html("Craft");
                $asParts[i].cancel.removeClass("hidden");
                const name = imageReference[player.actionSlots[i].actionName] + "&nbsp;" + player.actionSlots[i].actionName;
                $asParts[i].name.removeClass("hidden").html(name);
                $asParts[i].pbLabel.removeClass("hidden")
            }
            asState[i] = player.actionSlots[i].actionType;
        }
        if (pbValueCurrent[i] !== pbValue[i]) {
            $asParts[i].pb.css('width', pbValue[i]);
            pbValueCurrent[i] = pbValue[i];
        }
        if (pbLabelTextCurrent[i] !== pbLabelText[i]) {
            $asParts[i].pbLabel.attr("data-label",pbLabelText[i])
            pbLabelTextCurrent[i] = pbLabelText[i];
        }
    }
}


const $resAmts = [$('#oreAmt'),$('#woodAmt'),$('#leatherAmt'),$('#herbAmt')];

const $moneyAmt = $('#moneyAmt');

const $RecipeResults = $('#RecipeResults');
const $inventory = $('#inventory');
const $actionSlots = $('#ActionSlots');
const $jobList = $('#joblist');

const $achievements = $("#achievements");

initializeInventory();
loadGame();
initialize();
initializeRecipes();
refreshInventory();
refreshUpgrades();
populateRecipe(player.currentType);
fakeSelect(player.currentType);
refreshWorkers();

//used at the beginning to fake what tab you're on
function fakeSelect(name) {
    const janky = {
        "Knives" : "#recipeKnife",
        "Maces" : "#recipeMace",
        "Gloves" : "#recipeGlove",
        "Potions" : "#recipePotion",
        "Axes" : "#recipeAxe",
        "Hats" : "#recipeHat",
        "Wands" : "#recipeWand",
        "Gauntlets" : "#recipeGauntlet",
        "Helmets" : "#recipeHelmet",
        "Shoes" : "#recipeShoe",
        "Wards" : "#recipeWard",
        "Shields" : "#recipeShield",
        "Cloaks" : "#recipeCloak",
        "Armor" : "#recipeArmor",
        "Pendants" : "#recipePendant",
    }
    $(janky[name]).addClass("selected");
}

$('#ActionSlots').on("click", "a.ASCancelText", (e) => {
    e.preventDefault();
    const slot = $(e.target).attr("href")-1;
    if(player.actionSlots[slot].actionType === "Craft" && player.actionSlots[slot].actionTime > 0) itemRefund(player.actionSlots[slot].actionName);
    player.actionSlots[slot].actionType = "Empty";
    player.actionSlots[slot].actionName = "Empty";
    player.actionSlots[slot].actionTime = 0;
    refreshWorkers();
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

$('#tips').click((e) => {
    e.preventDefault();
    $('#tipsDialog').dialog("open");
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

$(document).on("click", ".HireWorker", (e) => {
    e.preventDefault();
    const name = $(e.target).attr("data-value");
    addCraft(name,"Job");
    refreshWorkers();
});

function mainLoop() {
    player.Ore = Math.min(player.Ore,getCap("Ore"));
    player.Wood = Math.min(player.Wood,getCap("Wood"));
    player.Leather = Math.min(player.Leather,getCap("Leather"));
    player.Herb = Math.min(player.Herb,getCap("Herb"));
    for (let i=0;i<player.actionSlots.length;i++) {
        if (player.actionSlots[i].actionTime > 0) {
            let craftTime = null;
            if (player.actionSlots[i].actionType === "Job") craftTime = nameToWorker(player.actionSlots[i].actionName).craftTime;
            else craftTime = nameToItem(player.actionSlots[i].actionName).craftTime;
            if (Date.now() >= player.actionSlots[i].actionTime + craftTime) {
                progressFinish(player.actionSlots[i].actionType,player.actionSlots[i].actionName);
                player.actionSlots[i].actionTime = 0;
                pbValue[i] = 0;
            }
            else {
                pbLabelText[i] = msToTime(player.actionSlots[i].actionTime + craftTime - Date.now());
                const p1 = (player.actionSlots[i].actionTime + craftTime - Date.now())/craftTime;
                pbValue[i] = (100-p1*100).toFixed(1)+"%";
            }
        }
        else {
            pbLabelText[i] = "Waiting for Resources...";
            pbValue[i] = 0;
        }
        if (canCraft(i)) {
            deductCost(i);
            startCraft(i);
        }
    }
    refreshResources();
    unhideStuff();
    refreshActionSlots();
    refreshProgress();
}


setInterval(mainLoop, 10);
setInterval(gameTime, 1000);
setInterval(saveGame, 5000);
setTimeout(window.loading_screen.finish(),1500)

function refreshResources() {
    for (let i=0;i<resources.length;i++) {
        const name = resources[i];
        if (displayedResources[name] !== player[name] || getCap(name) !== displayedResourcesCap[name]) {
            $resAmts[i].text(player[name] + "/" + getCap(name));
            displayedResources[name] = player[name];
            displayedResourcesCap[name] = getCap(name);
        }
    }
    if (player.money !== displayedResources["Money"]) {
        $moneyAmt.text(formatToUnits(player.money, 2));
        displayedResources["Money"] = player.money;
    }
}

function formatToUnits(number, precision) {
    const abbrev = ['', ' K', ' M', ' B', ' T'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ))
    const suffix = abbrev[order];
    
    return parseFloat((number / Math.pow(10, order * 3)).toFixed(precision)) + suffix;
}


const nameToUnlock = {
    "recipeMace" : "Mace",
    "recipeGlove" : "Glove",
    "recipePotion" : "Potion",
    "recipeAxe" : "Axe",
    "recipeHat" : "Hat",
    "recipeWand" : "Wand",
    "recipeGauntlet" : "Gauntlet",
    "recipeHelmet" : "Helmet",
    "recipeShoe" : "Shoe",
    "recipeWard" : "Ward",
    "recipeShield" : "Shield",
    "recipeCloak" : "Cloak",
    "recipeArmor" : "Armor",
    "recipePendant" : "Pendant",
}

function unhideStuff() {
    for (const [name,isHidden] of Object.entries(hidden)) {
        if (isHidden && canSee(name)) {
            if (!isFlagged(name) && name !== "woodResource" && name !== "leatherResource" && name !== "herbResource" && name !== "blueprintTab" && name !== "upgradeTab" && name !== "progressTab" && name !== "fullProgress") {
                $("#unlockDialog").html("You unlocked the " + nameToUnlock[name] + " recipe line!");
                ga('send', 'event', 'Recipe', 'unlock', name);
                $("#unlockDialog").dialog("open");
                flags[name] = true;
            }
            if (name in nameToUnlock) starMe(nameToUnlock[name]);
            if (name === "fullProgress") $("#completeTime").show();
            $("#"+name).removeClass("none");
            hidden[name] = false;
        }
    }
}

function isFlagged(name) {
    if (!(name in flags)) {
        flags[name] = false;
    }
    return flags[name];
}

function actionSlotContainsWorker(name) {
    for (let i=0;i<player.actionSlots.length;i++) {
        if (player.actionSlots[i].actionName === name) return true;
    }
    return false;
}

function populateRecipe(type) {
    type = type || "knife";
    type = type.toLowerCase();
    let bpUnlock = false;
    $("#unlockRequirement").empty();
    for (let i=0;i<blueprints.length;i++) {
        let recipeName = "#"+blueprints[i].name+"_row";
        recipeName = recipeName.replace(/\s/g, '');
        const $recipe = $(recipeName);
        if (blueprints[i].type === type && requirement(blueprints[i])) {
            if ($recipe.hasClass("none")) $recipe.removeClass("none");
        }
        else if (!$recipe.hasClass("none")) $recipe.addClass("none");       
        if (blueprints[i].type === type && !requirement(blueprints[i]) && !bpUnlock) {
            let s = ""
            //console.log(blueprints[i]);
            for (const [item, amt] of Object.entries(blueprints[i].requires)) {
                s += amt + " " + item + " ";
            }
            $("#unlockRequirement").html("<i>Unlock next by crafting " + s + "</i>");
            bpUnlock = true;              
        }
    }
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
    player.lastSave = Date.now();
    localStorage.setItem('gameSave3', JSON.stringify(createSave()));
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
        flagsSave : flags,
    }
}

function loadGame() {
    //populate itemCount with blueprints as a base
    const loadGame = JSON.parse(localStorage.getItem("gameSave3"));
    if (loadGame !== null) {
        //aka there IS a file
        if (typeof loadGame.playerSave !== "undefined") $.extend(player,loadGame.playerSave);
        if (typeof loadGame.workerProgressSave !== "undefined") $.extend(workerProgress,loadGame.workerProgressSave);
        if (typeof loadGame.workerSacProgressSave !== "undefined") $.extend(workerSacProgress,loadGame.workerSacProgressSave);
        if (typeof loadGame.upgradeProgressSave !== "undefined") $.extend(upgradeProgress,loadGame.upgradeProgressSave);
        if (typeof loadGame.inventorySave !== "undefined") $.extend(inventory,loadGame.inventorySave);
        if (typeof loadGame.itemCountSave !== "undefined") $.extend(itemCount,loadGame.itemCountSave);
        if (typeof loadGame.flagsSave !== "undefined") $.extend(flags,loadGame.flagsSave);
    }
}

function ClearSave() {
    stopSave = true;
    $('#clearDialog').dialog({
        buttons: {
            "Yes": function () {
                localStorage.removeItem("gameSave3");
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
                localStorage.setItem('gameSave3', JSON.stringify(s));
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
}

function progressFinish(type,name) {
    player.blueprintShow = true;
    if (type === "Craft") {
        addToInventory(name);
        increaseItemCount(name);
        populateRecipe(player.currentType);
    }
    if (type === "Job") {
        const resourceDist = getJobValue(name);
        if ("Ore" in resourceDist) player["Ore"]+= resourceDist["Ore"];
        if ("Leather" in resourceDist) player["Leather"] += resourceDist["Leather"];
        if ("Herb" in resourceDist) player["Herb"] += resourceDist["Herb"];
        if ("Wood" in resourceDist) player["Wood"] += resourceDist["Wood"];
    }
}

function increaseItemCount(name) {
    if (name in itemCount) itemCount[name] += 1;
    else itemCount[name] = 1;
    const truncName = name.replace(/\s/g, '');
    $("#"+truncName+"_count").html(itemCount[name]);
    if (itemCount[name] >= 100) $("#"+truncName+"_star").removeClass("hidden");
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

function initializeRecipes() {
    //cycle through everything in bp's and make the div for it
    const table = $('<div/>').addClass('recipeTable');
    const hrow = $('<div/>').addClass('recipeHeader');
    const htd1 = $('<div/>').addClass('recipeHeadName').html("NAME");
    const htd2 = $('<div/>').addClass('recipeHeadCost').html("COST");
    const htd3 = $('<div/>').addClass('recipeHeadTime').html("TIME");
    const htd4 = $('<div/>').addClass('recipeHeadCount').html("COUNT");
    const htd5 = $('<div/>').addClass('recipeHeadValue').html("VALUE");
    hrow.append(htd1);
    hrow.append(htd2);
    hrow.append(htd5);
    hrow.append(htd3);
    hrow.append(htd4);
    table.append(hrow);
    let bpUnlock = null;
    for (let i=0;i<blueprints.length;i++) {
        const truncName = blueprints[i].name.replace(/\s/g, '');
        const row = $('<div/>').addClass('recipeRow').attr("id",truncName+"_row");
        const name = $('<a/>').addClass('addCraft').attr("href",blueprints[i].name).html(blueprints[i].name)
        const td1 = $('<div/>').addClass('recipeName');
        const td1a = $('<div/>').addClass('recipeStar').attr("id",truncName+"_star").html(imageReference["Mastery"]);
        if (!(blueprints[i].name in itemCount) || itemCount[blueprints[i].name] < 100) {
            td1a.addClass("hidden");
        }
        td1.append(td1a);
        td1.append(imageReference[blueprints[i].name]+"&nbsp;");
        td1.append(name);
        let s = "";
        const td2 = $('<div/>').addClass('recipecostdiv');
        for (const [type, amt] of Object.entries(blueprints[i].cost)) {
            if (amt > 0) {
                const td2a = $('<div/>').addClass("recipeCost tooltip").attr("aria-label",type).html(imageReference[type] + "&nbsp;" + amt)
                td2.append(td2a);
            }
        }
        const td3 = $('<div/>').addClass('recipeTime').html(msToTime(blueprints[i].craftTime))
        const td4 = $('<div/>').addClass('recipeCount').attr("id",truncName+"_count").html(itemCount[blueprints[i].name]);
        const td5 = $('<div/>').addClass('recipeValue').html(imageReference["Gold"] + "&nbsp;" + blueprints[i].value);
        row.append(td1);
        row.append(td2);
        row.append(td5);
        row.append(td3);
        row.append(td4);
        row.addClass("none");
        table.append(row);
    }
    $RecipeResults.append(table);
}

function canSee(name) {
    if (name === "blueprintTab") return player.blueprintShow || workerProgress["Oren"] > 1;
    if (name === "upgradeTab") return workerProgress["Eryn"] > 0;
    if (name === "progressTab") return player.percent >= 7.5;
    if (name === "woodResource") return workerProgress["Eryn"] > 0;
    if (name === "leatherResource") return workerProgress["Lakur"] > 0;
    if (name === "herbResource") return workerProgress["Herbie"] > 0; 
    if (name === "recipeMace") return workerProgress["Eryn"] > 0;
    if (name === "recipeGlove") return workerProgress["Lakur"] > 0;
    if (name === "recipePotion") return workerProgress["Herbie"] > 0;
    if (name === "recipeAxe") return itemCount["Chefs Knife"] >= 3 && itemCount["The Broominator"] >= 3;
    if (name === "recipeHat") return itemCount["Cleaning Gloves"] >= 3 && itemCount["Sleeping Potion"] >= 3;
    if (name === "recipeWand") return itemCount["Blackjack"] >= 3 && itemCount["Invincibility Potion"] >= 3;
    if (name === "recipeGauntlet") return itemCount["Punching Gloves"] >= 3 && itemCount["Fishing Knife"] >= 3;
    if (name === "recipeHelmet") return itemCount["Club Knife"] >= 3 && itemCount["Like Potion"] >= 3;
    if (name === "recipeShoe") return itemCount["Night Club"] >= 3 && itemCount["Loving Gloves"] >= 3;
    if (name === "recipeWard") return itemCount["Vengeance"] >= 3 && itemCount["Regular Helmet"] >= 3 &&  itemCount["Wind Wand"] >= 3;
    if (name === "recipeShield") return itemCount["Slothslayer"] >= 3 && itemCount["Bardic Galoshes"] >= 3 &&  itemCount["Plain Gauntlets"] >= 3;
    if (name === "recipeCloak") return itemCount["Black Hat"] >= 3 && itemCount["Druidic Boots"] >= 3 &&  itemCount["Rain Wand"] >= 3;
    if (name === "recipeArmor") return itemCount["Mega Helmet"] >= 3 && itemCount["Green Bay Beret"] >= 3 &&  itemCount["Challenge Gauntlets"] >= 3;
    if (name === "recipePendant") return itemCount["Disease Ward"] >= 5 && itemCount["Generous Blocker"] >= 5 &&  itemCount["A Cool Dark Chainmail"] >= 5 &&  itemCount["Frostflinger Cloak"] >= 5;
    if (name === "fullProgress") return player.percent >= 100;
}

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

function starMe(name) {
    $("#"+name+"Star").attr("src","images/star.png");
}

function getCap(res) {
    const name = "Max " + res;
    const lvl = upgradeProgress[name]
    const upgrade = nameToUpgrade(name);
    return upgrade.value[lvl];
}

const $gameTime = $("#gameTime")
const $completeTime = $("#completeTime");

function gameTime() {
    $gameTime.html("You've been playing this save for: " + timeSince(player.saveStart));
    if (player.completeTime > 0) {
        $completeTime.show();
        $completeTime.html("You 100% completed this game in: " + timeSince(player.saveStart,player.completeTime));
    }
}

function timeSince(startTime,endTime) {
    endTime = endTime || Date.now()
    let s = "";
    let diff = Math.round((endTime-startTime)/1000);
    const d = Math.floor(diff/(24*60*60))
    diff = diff-d*24*60*60
    if (d === 1) s += d + " day, ";
    else s += d + " days, ";
    const h = Math.floor(diff/(60*60));
    diff = diff-h*60*60;
    if (h === 1) s += h + " hour, ";
    else s += h + " hours, ";
    const m = Math.floor(diff/60);
    diff = diff-m*60;
    if (m === 1) s += m + " minute, ";
    else s += m + " minutes, ";
    if (diff === 1) s += diff + " second, ";
    else s += diff + " seconds, ";
    return s.slice(0, -2);
}
