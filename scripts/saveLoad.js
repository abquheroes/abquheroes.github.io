let stopSave = false;

function ClearSave() {
    localStorage.removeItem("ffgs1");
    location.replace('/');
}

function ExportSave() {
    const saveFile = createSaveExport();
    $("#exportSaveText").val(saveFile);
    ga('send', 'event', 'Save', 'export', 'export');
}

function ImportSaveButton() {
    stopSave = true;
    const unpako = atob($('#importSaveText').val());
    const saveFile = JSON.parse(pako.ungzip(unpako,{ to: 'string' }));
    localStorage.setItem('ffgs1', saveFile);
    location.reload(true);
}

let saveTime = 0;

function saveGame(ms) {
    saveTime += ms;
    if (saveTime < 10000) return;
    saveTime -= 10000;
    if (stopSave) return;
    localStorage.setItem('ffgs1', createSave());
    ga('send', 'event', 'Save', 'savegame', 'savegame');
    console.log('game saved!');
}

function createSave() {
    const saveFile = {}
    saveFile["as"] = actionSlotManager.createSave();
    saveFile["da"] = DungeonAssist.createSave();
    saveFile["e"] = EventManager.createSave();
    saveFile["h"] = HeroManager.createSave();
    saveFile["i"] = Inventory.createSave();
    saveFile["p"] = party.createSave();
    saveFile["r"] = recipeList.createSave();
    saveFile["rs"] = ResourceManager.createSave();
    saveFile["w"] = WorkerManager.createSave();
    saveFile["se"] = seedCreateSave();
    //const output = pako.gzip(JSON.stringify(saveFile),{ to: 'string' });
    return JSON.stringify(saveFile);
}

function createSaveExport() {
    const save = createSave();
    const pakoSave = pako.gzip(JSON.stringify(save),{ to: 'string' });
    return btoa(pakoSave);
}

function loadGame() {
    //populate itemCount with blueprints as a base
    const loadGame = JSON.parse(localStorage.getItem("ffgs1"));
    if (loadGame === null) return false;
    //aka there IS a file
    if (typeof loadGame["as"] !== "undefined") actionSlotManager.loadSave(loadGame["as"]);
    if (typeof loadGame["da"] !== "undefined") DungeonAssist.loadSave(loadGame["da"]);
    if (typeof loadGame["e"] !== "undefined") EventManager.loadSave(loadGame["e"]);
    if (typeof loadGame["h"] !== "undefined") HeroManager.loadSave(loadGame["h"]);
    if (typeof loadGame["i"] !== "undefined") Inventory.loadSave(loadGame["i"]);
    if (typeof loadGame["p"] !== "undefined") party.loadSave(loadGame["p"]);
    if (typeof loadGame["r"] !== "undefined") recipeList.loadSave(loadGame["r"]);
    if (typeof loadGame["rs"] !== "undefined") ResourceManager.loadSave(loadGame["rs"]);
    if (typeof loadGame["w"] !== "undefined") WorkerManager.loadSave(loadGame["w"]);
    if (typeof loadGame["se"] !== "undefined") seedLoadSave(loadGame["se"]);
    console.log("GAME LOADED");
    return true;
}

//UI Stuff
$("#deleteSaveButton").click((e) => {
    e.preventDefault();
    ClearSave();
});

$('#exportSave').click(() => {
    ExportSave();
});

$('#importSaveButton').click((e) => {
    e.preventDefault();
    ImportSaveButton();
});

$("#exportSaveCopy").click((e) => {
    e.preventDefault();
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($("#exportSaveText").val()).select();
    document.execCommand("copy");
    $temp.remove();
})