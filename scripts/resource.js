"use strict";

const Resources = Object.freeze({GOLD:"gold",ORE:"ore",WOOD:"wood",LEATHER:"leather",HERB:"herb"});

const ResourceManager = {
    gold : 0,
    addResource(resource,amt) {
        this[resource] += amt;
    },
    canAfford(costs) {
        for (const [resource, amt] of Object.entries(costs)) {
            if (amt > this[resource]) return false;
        }
        return true;
    },
    deductCost(costs) {
        if (!this.canAfford(costs)) return;
        for (const [resource, amt] of Object.entries(costs)) {
            this[resource] -= amt;
        }
    }
}

function refreshResources() {
    for (let i=0;i<resources.length;i++) {
        const name = resources[i];
        if (displayedResources[name] !== player[name] || getCap(name) !== displayedResourcesCap[name]) {
            $resAmts[i].text(player[name] + "/" + getCap(name));
            displayedResources[name] = player[name];
            displayedResourcesCap[name] = getCap(name);
        }
    }
    if (player.money !== displayedResources["Money"]) {
        $moneyAmt.text(formatToUnits(player.money, 2));
        displayedResources["Money"] = player.money;
    }
}