const devtools = {
    godmode : function() {
        for (let i=0;i<blueprints.length;i++) {
            itemCount[blueprints[i].name] = 1000;
        }
        for (const [worker,lvl] of Object.entries(workerProgress)) {
            workerProgress[worker] = 25;
        }
        for (const [upgrade,lvl] of Object.entries(upgradeProgress)) {
            upgradeProgress[upgrade] = 5;
        }
        refreshRecipeSelector();
        refreshWorkers();
        refreshUpgrades();
    }
}