const player = {
    money: 0,
    workers: 0,
    ore : 0,
    status : null,
    craft1: null,
    craft1start : 0,
    craft2: null,
    craft2start : 0,
    craft3: null,
    craft3start : 0,
    lastLoop : Date.now(),
}

const itemCount = {};

let oreRemainder = 0;

const GameState = {
    CRAFT1 : "craft1",
    CRAFT2 : "craft2",
    CRAFT3 : "craft3",
}

$(document).ready(() => {
    loadGame();
    refreshCrafts();
    const $oreAmt = $('#oreAmt');
    const $moneyAmt = $('#moneyAmt');
    
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
        refreshCraftCount();
        saveGame();
    }

    setInterval(mainLoop, 10);

    function refreshResources() {
        $oreAmt.text(player.ore);
        $moneyAmt.text(player.money);
    }

    function refreshCraftCount() {
        /*blueprints.forEach(item => {

            if ($('#'+item.name+"_count").length > 0) {
                $('#'+item.name+"_count").text(itemCount[item.name]);
                console.log(itemCount[item.name])
            }
        });*/
    }

    function canCraft(loc) {
        if (player[loc+"start"] > 0) return false;
        const itemName = player[loc];
        const itemFull = nameToItem(itemName);
        return itemFull.cost["Ore"] <= player.ore
    }

    function deductCost(loc) {
        const itemName = player[loc];
        const itemFull = nameToItem(itemName);
        player.ore -= itemFull.cost["Ore"];
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
        localStorage.setItem('gameSave1', JSON.stringify(player));
        localStorage.setItem('itemCount1', JSON.stringify(itemCount));
        localStorage.setItem('workerLevels1', JSON.stringify(workerLevels));
    }

    function loadGame() {
        var loadGame = JSON.parse(localStorage.getItem("gameSave1"));
        if (loadGame !== null) {
            if (typeof loadGame.money !== null) player.money = loadGame.money;
            if (typeof loadGame.ore !== null) player.ore = loadGame.ore;
            if (typeof loadGame.craft1 !== null) player.craft1 = loadGame.craft1;
            if (typeof loadGame.craft1start !== null) player.craft1start = loadGame.craft1start;
            if (typeof loadGame.craft2 !== null) player.craft2 = loadGame.craft2;
            if (typeof loadGame.craft2start !== null) player.craft2start = loadGame.craft2start;
            if (typeof loadGame.craft3 !== null) player.craft3 = loadGame.craft3;
            if (typeof loadGame.craft3start !== null) player.craft3start = loadGame.craft3start;
        }
        const itemCountLoad = JSON.parse(localStorage.getItem("itemCount1"));
        //populate itemCount with blueprints as a base
        blueprints.forEach(bp => {
            itemCount[bp.name] = 0;
        })
        if (itemCountLoad !== null) {
            for (const [bp, _] of Object.entries(itemCount)) {
                if (bp in itemCountLoad) itemCount[bp] = itemCountLoad[bp];
            }
        }
        const workerLoad = JSON.parse(localStorage.getItem("workerLevels1"));
        if (workerLoad !== null) {
            if (typeof workerLoad["Ore"] !== null) workerLevels["Ore"] = workerLoad["Ore"];
        }
    }
});