const devtools = {
    godmode : function() {
        console.log("this will probably take a minute, don't close...");
        for (let i=0;i<blueprints.length;i++) {
            itemCount[blueprints[i].name] = 1000;
        }
        for (const [worker,lvl] of Object.entries(workerProgress)) {
            workerProgress[worker] = 25;
        }
        player.money = 1000000000000;
        for (let i=0;i<blueprints.length;i++) {
            inventory[blueprints[i].name] = 10;
        }
        refreshRecipeSelector();
        refreshWorkers();
        refreshUpgrades();
        refreshInventory();
    }
}

const $gameLogo = $("#game-logo");
let logoNum = 0;

$gameLogo.click((e) => {
    logoNum += 1;
    if (logoNum === 1) $gameLogo.css("background-image","url('images/site-logo.png')");
    else if (logoNum === 2) $gameLogo.css("background-image","url('images/site-logo2.png')");
    else {
        $gameLogo.css("background-image","none");
        logoNum = 0;
    }
});