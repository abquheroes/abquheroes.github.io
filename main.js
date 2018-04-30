const player = {
    money: 0,
    workers: 0,
    ore : 0,
    status : null,
    craft1: null,
    craft1start : 0,
    craft2: null,
    craft1start : 0,
    craft3: null,
    craft1start : 0,
    lastLoop : Date.now(),
}

let oreRemainder = 0;

const GameState = {
    CRAFT1 : "craft1",
    CRAFT2 : "craft2",
    CRAFT3 : "craft3",
}

$(document).ready(() => {
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
        oreRemainder += deltaT;
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
                    nameToItem(player[slot]).count += 1;
                    $(pbName[slot]).progressbar({
                        value: 0
                    })
                }
                else {
                    const p1 = (slotStart + slotCraft - Date.now())/slotCraft;
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
    }

    setInterval(mainLoop, 10);

    function refreshResources() {
        $oreAmt.text(player.ore);
        $moneyAmt.text(player.money);
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
});

const imageReference = {
    "Coin" : '<img src="PixelItem/CoinsGold5.png">',
    "Ore" : '<img src="PixelItem/Ore.png">',
    "Knife" : '<img src="PixelItem/Equip/Weapon/Knife.png">',
}