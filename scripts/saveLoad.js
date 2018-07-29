let stopSave = false;

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






//UI Stuff
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