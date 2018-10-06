let stopSave = false;

function ClearSave() {
    localStorage.removeItem("ffgs1");
    location.replace('/');
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

function saveGame() {
    if (stopSave) return;
    localStorage.setItem('ffgs1', createSave());
    ga('send', 'event', 'Save', 'savegame', 'savegame');
}

function createSave() {
    const saveFile = {}
    console.log("start");
    saveFile["as"] = actionSlotManager.createSave();
    console.log("as");
    saveFile["da"] = DungeonAssist.createSave();
    console.log("da");
    saveFile["e"] = EventManager.createSave();
    console.log("e");
    saveFile["h"] = HeroManager.createSave();
    console.log("h");
    saveFile["i"] = Inventory.createSave();
    console.log("i");
    saveFile["p"] = party.createSave();
    console.log("p");
    saveFile["r"] = recipeList.createSave();
    console.log("r");
    saveFile["rs"] = ResourceManager.createSave();
    console.log("rs");
    saveFile["w"] = WorkerManager.createSave();
    console.log("w");
    const output = LZString.compress(JSON.stringify(saveFile));
    //const output = pako.gzip(JSON.stringify(saveFile),{ to: 'string' });
    console.log(output);
    return btoa(output);
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






//UI Stuff
$("#deleteSaveButton").click((e) => {
    e.preventDefault();
    ClearSave();
});

$('#exportSave').click((e) => {
    e.preventDefault();
    ExportSave();
});

$('#importSaveButton').click((e) => {
    e.preventDefault();
    ImportSaveButton();
});