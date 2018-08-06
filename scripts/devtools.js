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
    },
    streamData : function() {
        //take each slot, find cost per second and output per second, sum amts and output results to console
        const results = {};
        for (let i=0;i<player.actionSlots.length;i++) {
            if (player.actionSlots[i].actionType === "Job") {
                const workerName = player.actionSlots[i].actionName;
                const production = getJobValue(workerName);
                const time = nameToWorker(workerName).craftTime/1000;
                for (const [product,amt] of Object.entries(production)) {
                    if (product in results) results[product] += amt/time;
                    else results[product] = amt/time;
                }
            }
            else if (player.actionSlots[i].actionType === "Craft") {
                const itemName = player.actionSlots[i].actionName;
                const item = nameToItem(itemName);
                const time = item.craftTime/1000;
                for (const [cost,amt] of Object.entries(item.cost)) {
                    if (cost in results) results[cost] -= amt/time;
                    else results[cost] = -amt/time;
                }
                if (itemName in results) results[itemName] += 1/time;
                else results[itemName] = 1/time;
            }
        }
        console.log(results);
        let profit = 0;
        let negative = false;
        for (const [thing,amt] of Object.entries(results)) {
            if (amt < 0) negative = true;
            if (!resources.includes(thing)) profit += amt*nameToItem(thing).value;
        }
        if (negative) return "Negatove flow, but wtf here's it anyway " + profit.toFixed(3);
        return "gold per second: " + profit.toFixed(3);
    },
    addGold(amt) {
        ResourceManager.addMaterial("M001",amt);
    },
    speed(amt) {
        player.timeWarp = amt;
    }
}