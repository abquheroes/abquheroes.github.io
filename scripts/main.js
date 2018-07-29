"use strict";

const player = {
    saveStart : Date.now(),
    completeTime : 0,
    lastTime : Date.now(),
    timeWarp : 1,
}

function initialize() {
    loadRecipes();
}

initialize();

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

$('#ActionSlots').on("click", "a.ASCancelText", (e) => {
    e.preventDefault();
    const slot = $(e.target).parent().attr("href")-1;
    if(player.actionSlots[slot].actionType === "Craft" && player.actionSlots[slot].actionTime > 0) itemRefund(player.actionSlots[slot].actionName);
    player.actionSlots[slot].actionTime = 0;
    refreshWorkers();
});


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
    const elapsedTime = (Date.now()-player.lastTime)*player.timeWarp;
    player.lastTime = Date.now();
    //dungeonAdvance(elapsedTime);
    craftAdvance(elapsedTime);
}

setInterval(mainLoop, 10);

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

function increaseItemCount(name) {
    if (name in itemCount) itemCount[name] += 1;
    else itemCount[name] = 1;
    const truncName = name.replace(/\s/g, '');
    $("#"+truncName+"_count").html(itemCount[name]);
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