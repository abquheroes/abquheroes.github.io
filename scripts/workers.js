"use strict";

class Worker {
    constructor(props) {
        Object.assign(this, props);
        this.lvl = 1;
        this.pic = '<img src="images/workers/'+this.name+'.gif">';
        this.prodpic = '<img src="images/resources/'+this.production+'.png">';
        this.donated = {};
        this.owned = false;
        this.assigned = false;
        this.status = "idle";
    }
    createSave() {
        const save = {};
        save.id = this.workerID;
        save.lvl = this.lvl;
        save.donated = this.donated;
        save.owned = this.owned;
        return save;
    }
    loadSave(save) {
        this.lvl = save.lvl;
        this.donated = save.donated;
        this.owned = save.owned;
    }
    produces(resource) {
        if (!this.owned) return 0;
        if (resource in this.production) return this.production[resource] * this.lvl;
        return 0;
    }
    maxlevel() {
        return this.lvl > this.lvlreq.length;
    }
    thislvlreq() {
        return this.lvlreq[this.lvl-1];
    }
    upgrade() {
        if (ResourceManager.materialAvailable("M001") < this.numToDonate("M001")) {
            Notifications.workerGoldReq();
            return;
        }
        if (!this.canUpgrade()) return;
        ResourceManager.deductMoney(this.numToDonate("M001"));
        this.lvl += 1;
        this.clearDonation();
        refreshWorkers();
    }
    productionText() {
        return "Produces:&nbsp;&nbsp;"+ResourceManager.materialIcon(this.production);
    }
    clearDonation() {
        this.donated = {};
    }
    numToDonate(craftID) {
        return this.thislvlreq().find(l => l[0] === craftID)[2];
    }
    sacRemaining(craftID) {
        const needed = this.numToDonate(craftID);
        if (craftID in this.donated) return needed - this.donated[craftID];
        return needed;
    }
    canUpgrade() {
        let result = true;
        if (devtools.bypassUpgrade) return true;
        this.thislvlreq().forEach(req => {
            if (req[0] === "M001") return;
            if (!(req[0] in this.donated)) result = false;
            else if (this.donated[req[0]] < req[2]) result = false;
        })
        return result;
    }
}

const WorkerManager = {
    workers : [],
    workerOrder : [],
    addWorker(worker) {
        this.workers.push(worker);
    },
    createSave() {
        const save = [];
        this.workers.forEach(w=> {
            save.push(w.createSave());
        });
        return save;
    },
    loadSave(save) {
        save.forEach(w=> {
            const worker = this.workerByID(w.id);
            worker.loadSave(w);
        });
    },
    workerBuySeed() {
        //pre-populate the hero buy order so you can't savescum
        Math.seed = wbSeed;
        this.workerOrder = ["W001"];
        const standardWorkers = this.workers.filter(w=>w.type === "standard");
        const advancedWorkers = this.workers.filter(w=>w.type === "advanced");
        while (this.workerOrder.length < standardWorkers.length) {
            const possibleWorkers = standardWorkers.map(w=>w.workerID).filter(h=>!this.workerOrder.includes(h));
            const workerID = possibleWorkers[Math.floor(Math.seededRandom() * possibleWorkers.length)];
            this.workerOrder.push(workerID);
        }
        while (this.workerOrder.length < this.workers.length) {
            const possibleWorkers = advancedWorkers.map(w=>w.workerID).filter(h=>!this.workerOrder.includes(h));
            const workerID = possibleWorkers[Math.floor(Math.seededRandom() * possibleWorkers.length)];
            this.workerOrder.push(workerID);
        }
        //remove workers we already bought
        const alreadyBought = this.workers.filter(w=>w.owned).map(w=>w.workerID);
        this.workerOrder = this.workerOrder.filter(w=>!alreadyBought.includes(w));
    },
    workerByID(id) {
        return this.workers.find(worker => worker.workerID === id);
    },
    upgrade(workerID) {
        const worker = this.workerByID(workerID);
        worker.upgrade();
        refreshWorkers();
        refreshRecipeFilters();
        refreshSideWorkers();
        recipeCanCraft();
        refreshBlueprint();
        refreshProgress();
    },
    gainWorker(workerID) {
        const worker = this.workerByID(workerID);
        worker.owned = true;
        worker.clearDonation();
        this.freeCraft(workerID);
        refreshWorkers();
        refreshSideWorkers();
        refreshRecipeFilters();
        recipeCanCraft();
        refreshProgress();
    },
    freeCraft(workerID) {
        if (workerID === "W001") recipeList.idToItem("R0701").owned = true;
        if (workerID === "W002") recipeList.idToItem("R0101").owned = true;
        if (workerID === "W003") recipeList.idToItem("R6101").owned = true;
        if (workerID === "W004") recipeList.idToItem("R0901").owned = true;
        if (workerID === "W005") recipeList.idToItem("R0301").owned = true;
        if (workerID === "W006") recipeList.idToItem("R6201").owned = true;
        if (workerID === "W007") recipeList.idToItem("R1001").owned = true;
        if (workerID === "W008") recipeList.idToItem("R0401").owned = true;
        if (workerID === "W009") recipeList.idToItem("R5501").owned = true;
        if (workerID === "W010") recipeList.idToItem("R0501").owned = true;
    },
    assignWorker(item) {
        const lvl = item.lvl;
        item.rcost.forEach(res => {
            const freeworkers = this.workers.filter(worker=>worker.status === "idle");
            const chosenworker = freeworkers.filter(worker => worker.production === res && worker.owned && worker.lvl >= lvl).sort((a,b) => a.lvl - b.lvl)[0];
            chosenworker.status = item.id;
        });
    },
    nextAvailable(res,lvl) {
        const freeworkers = this.workers.filter(worker => worker.status === "idle" && worker.owned && worker.production === res && worker.lvl >= lvl)
        if (freeworkers.length == 0) return false;
        return freeworkers.sort((a,b) => a.lvl-b.lvl)[0]
    },
    reallocate() {
        //reassign workers as appropriate
        this.workers.forEach(worker => worker.status = "idle");
        const items = actionSlotManager.itemList().sort((a,b) => b.lvl-a.lvl);
        items.forEach(item => {
            this.assignWorker(item);
        })
    },
    couldCraft(item) {
        const canProduce = this.workers.filter(w=> w.lvl >= item.lvl && w.owned).map(w=>w.production);
        const difference = item.rcost.filter(x => !canProduce.includes(x));
        return difference.length === 0;
    },
    canCurrentlyCraft(item) {
        const canProduce = this.workers.filter(w=> w.lvl >= item.lvl && w.owned && w.status === "idle").map(w=>w.production);
        const difference = item.rcost.filter(x => !canProduce.includes(x));
        return difference.length === 0;
    },
    sacrificeItem(workerID,craftID,rarity) {
        if (!Inventory.haveItem(craftID,rarity)) return;
        const worker = this.workerByID(workerID);
        Inventory.removeFromInventory(craftID,rarity);
        if (craftID in worker.donated) worker.donated[craftID] += 1;
        else worker.donated[craftID] = 1;
    },
    lvlByType(production) {
        const workerLvls = this.workers.filter(w=> w.owned && w.production === production).map(w=>w.lvl);
        return Math.max(...workerLvls);
    },
    purchaseWorker() {
        const amt = miscLoadedValues.workerCost[this.workers.filter(w=>w.owned).length];
        if (ResourceManager.materialAvailable("M001") < amt) {
            Notifications.cantAffordWorker();
            return;
        }
        ResourceManager.deductMoney(amt);
        const workerID = this.workerOrder.shift();
        this.gainWorker(workerID);
        recipeCanCraft();
    },
    generateWorkerSac() {
        Math.seed = wsSeed;
        this.workers.forEach(w=>w.lvlreq = []);
        ["standard","advanced"].forEach(t => {
            for (let i=1;i<10;i++) { //10 levels of worker sac, generate a new random list every time
                const usedTypes = this.workers.map(w=>w.defaultRecipeLine);
                let remainingTypes = ItemType.slice().filter(x => !usedTypes.includes(x));
                this.workers.filter(w=>w.type === t).forEach(worker => {
                    const T1 = worker.defaultRecipeLine;
                    //we don't remove because we did that already
                    const T2 = remainingTypes[Math.floor(Math.seededRandom() * remainingTypes.length)];
                    remainingTypes = remainingTypes.filter(t=>t !== T2);
                    const T3 = remainingTypes[Math.floor(Math.seededRandom() * remainingTypes.length)];
                    remainingTypes = remainingTypes.filter(t=>t !== T3);
                    let r = 0
                    if (t === "advanced") r = 1
                    const req = [[recipeList.recipeIDByTypeLvl(T1,i),r,10],[recipeList.recipeIDByTypeLvl(T2,i),r,10],[recipeList.recipeIDByTypeLvl(T3,i),r,10],["M001",0,miscLoadedValues.workerSacCost[i]]];
                    worker.lvlreq.push(req);
                });
            };
        });
    },
    workerLevelCount() {
        return this.workers.filter(w=>w.owned).map(w=>w.lvl).reduce((a,b) => a+b,0);
    },
    workerMaxLevelCount() {
        return this.workers.length*10;
    }
}

const $workers = $('#workerList');
const $workersUse = $("#workersUse");

function refreshSideWorkers() {
    $workersUse.empty();
    WorkerManager.reallocate();
    WorkerManager.workers.filter(w=>w.owned).forEach(worker => {
        const d = $("<div/>").addClass("workerSideBar").attr("id",worker.status);
        const d1 = $("<div/>").addClass("wsbLvl tooltip").attr("data-tooltip", "Worker Level").html(worker.lvl);
        const d2 = $("<div/>").addClass("wsbType").html(worker.prodpic+"&nbsp;"+worker.name);
        const d3 = $("<div/>").addClass("wsbCraft");
        if (worker.status === "idle") {
            d.addClass("wsbIdle");
            d3.html("Idle");
        }
        else {
            const item = recipeList.idToItem(worker.status);
            d.addClass("wsbActive");
            d3.html(item.itemPic()).addClass("tooltip").attr("data-tooltip","Cancel crafting " + item.name);
        }
        d.append(d1,d2,d3);
        $workersUse.append(d);
    });

}

function refreshWorkers() {
    $workers.empty();
    WorkerManager.workers.forEach(worker => {
        if (!worker.owned) return;
        const workerDiv = $('<div/>').addClass("Worker");
        workerDiv.addClass("wt"+worker.type);
        const workerDetails = $('<div/>').addClass("WorkerDetails");
            const d1 = $("<div/>").addClass("WorkerImage").html(worker.pic);
        const workerNameProduction = $('<div/>').addClass("WorkerNameAndProduction");
            const d2 = $("<div/>").addClass("WorkerName").html(worker.name);
                const d2a = $("<div/>").addClass("WorkerDesc tooltip").html("<i class='fas fa-info-circle'></i>").attr("data-tooltip", worker.description);
            d2.append(d2a);
            const d3 = $("<div/>").addClass("WorkerProduction").html(worker.productionText());
        workerNameProduction.append(d2, d3);
        workerDetails.append(d1, workerNameProduction);
        const d4 = $("<div/>").addClass("WorkerLvl").html("Level " + worker.lvl);
        const d5a = $("<div/>").addClass("itemContributions").html("Required Contributions"); 
        const d5 = $('<div/>').addClass("itemSac");
        workerDiv.append(workerDetails,d4,d5a,d5)
        //workersac
        if (!worker.maxlevel()) {
            let money = "";
            worker.thislvlreq().forEach(reqs => {
                const res = reqs[0];
                const rarity = reqs[1];
                const amt = reqs[2];
                if (res === "M001") {
                    money = ResourceManager.materialIcon("M001") + "&nbsp;" + formatToUnits(amt,2);
                    return;
                }
                const adjamt = worker.sacRemaining(reqs[0])
                if (adjamt === 0) return;
                const d5a = $("<div/>").addClass("itemToSacDiv").attr("id","ws"+worker.workerID+res+rarity);
                if (worker.type === "advanced") d5a.addClass("isGood");
                if (!Inventory.haveItem(res,rarity)) d5a.addClass("cantAfford");
                const resIcon = ResourceManager.materialIcon(res);
                const d5b = $('<div/>').addClass("itemToSac tooltip").attr("data-tooltip",ResourceManager.nameForWorkerSac(res))
                const d5b1 = $('<div/>').addClass("itemToSacReqHead").html(resIcon)
                const d5b2 = $('<div/>').addClass("itemToSacReq").html(formatToUnits(adjamt,2));
                d5b.append(d5b1,d5b2);
                d5.append(d5a.append(d5b));
            });
            const b1 = $("<button/>").addClass("WorkerUpgrade").attr("data-value",worker.workerID).html("Upgrade&nbsp;&nbsp;" + money);
            if (!worker.canUpgrade()) b1.addClass("workerUpgradeDisable tooltip").attr("data-tooltip","You must first contribute the items above by clicking on them.")
            workerDiv.append(b1);
        }
        if (worker.maxlevel()) {
            d5a.hide(); 
            d5.hide();
            const d6 = $("<div/>").addClass("workerMaxDescription").html("Maximum Level Reached!");
            workerDiv.append(d6);
        }
        $workers.append(workerDiv)
    });
    const amt = miscLoadedValues.workerCost[WorkerManager.workers.filter(w=>w.owned).length]
    const pw = $("<div/>").addClass("purchaseWorkerCard");
    const pw1 = $("<div/>").addClass("unknownWorker").html('<img src="images/workers/blackoutline.png">');
    const b1 = $("<div/>").addClass("buyNewWorker").html(`Purchase New Worker <div class="buyWorkerCost">${miscIcons.gold} ${amt}</div>`);
    pw.append(pw1,b1);
    if (WorkerManager.workers.filter(w=>!w.owned).length === 0) pw.hide();
    $workers.append(pw);
}

function refreshWorkerAmts() {
    //loop through JUST the worker resource costs to update "cantAffords"
    WorkerManager.workers.forEach(worker => {
        if (worker.maxlevel()) return;
        worker.thislvlreq().forEach(reqs => {
            if (!Inventory.haveItem(reqs[0],reqs[1])) $("#ws"+worker.workerID+reqs[0]+reqs[1]).addClass("cantAfford");
            else $("#ws"+worker.workerID+reqs[0]+reqs[1]).removeClass("cantAfford");
        });
    });
}

$(document).on("click", ".WorkerUpgrade", (e) => {
    //click the upgrade button on a worker!
    e.preventDefault();
    const worker = $(e.currentTarget).attr("data-value");
    WorkerManager.upgrade(worker);
});

$(document).on("click", ".workerSideBar", (e) => {
    //unslot an action slot for worker if assigned
    e.preventDefault();
    const craft = $(e.currentTarget).attr("id");
    if (craft === "idle") return;
    actionSlotManager.removeID(craft);
})

$(document).on("click",".itemToSacDiv", (e) => {
    //sacrifice items, even partial
    e.preventDefault();
    const divID = $(e.currentTarget).attr("id");
    const workerID = divID.substring(2,6);
    const craftID = divID.substring(6,11);
    const rarity = parseInt(divID.substring(11,12));
    WorkerManager.sacrificeItem(workerID,craftID,rarity);
    refreshWorkers();
});

$(document).on("click",".purchaseWorkerCard",(e) => {
    e.preventDefault();
    WorkerManager.purchaseWorker();
});