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
}

const GameState = {
    CRAFT1 : "craft1",
    CRAFT2 : "craft2",
    CRAFT3 : "craft3",
}

$(document).ready(() => {
    const $oreAmt = $('#oreAmt');
    
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
        console.log(player.status);
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
        player.ore += 1;
        if (canCraft("craft1")) {
            deductCost("craft1");
            startCraft("craft1");
        }
        if (canCraft("craft2")) {
            deductCost("craft2");
            startCraft("craft2");
        }
        if (canCraft("craft3")) {
            deductCost("craft3");
            startCraft("craft3");
        }
        refreshResources();
    }

    setInterval(mainLoop, 1000);

    function refreshResources() {
        $oreAmt.text(player.ore);
    }

    function canCraft(loc) {
        if (player[loc] !== null) {
            const itemCraft = player[loc];
            if (itemCraft.cost["Ore"] >= player.ore) {
                return true;
            }
        }
        return false;
    }

    function deductCost(loc) {
        
    }
});

const imageReference = {
    "Coin" : '<img src="PixelItem/CoinsGold5.png">n',
    "Ore" : '<img src="PixelItem/Ore.png">',
    "Knife" : '<img src="PixelItem/Equip/Weapon/Knife.png">',
}