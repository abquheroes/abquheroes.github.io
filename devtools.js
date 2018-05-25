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
        refreshWorkers();
        refreshUpgrades();
        refreshInventory();
    }
}