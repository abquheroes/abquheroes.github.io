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
        this.thislvlreq().forEach(r => this.donated[r[0]] = 0)
    }
    numToDonate(craftID) {
        return this.thislvlreq().find(l => l[0] === craftID)[2];
    }
    sacRemaining(craftID) {
        const needed = this.numToDonate(craftID);
        const have = this.donated[craftID];
        console.log(needed,have);
        return needed-have;
    }
    canUpgrade() {
        let result = true;
        this.thislvlreq().forEach(req => {
            if (this.donated[req[0]] < req[2]) result = false;
        })
        return result;
    }
}

const WorkerManager = {
    workers : [],
    addWorker(worker) {
        this.workers.push(worker);
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
    },
    gainWorker(workerID) {
        const worker = this.workerByID(workerID);
        worker.owned = true;
        worker.clearDonation();
        refreshWorkers();
        refreshSideWorkers();
        refreshRecipeFilters();
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
        const canProduce = this.workers.filter(w=> w.lvl >= item.lvl && w.owned && w.status === "idle").map(w=>w.production);
        const difference = item.rcost.filter(x => !canProduce.includes(x));
        return difference.length === 0;
    },
    partialsacrifice(workerID,craftID,rarity) {
        const worker = this.workerByID(workerID);
        const amt = Inventory.itemCount(craftID,rarity);
        const needed = worker.numToDonate(craftID);
        const adjamt = Math.min(amt,needed);
        Inventory.removeFromInventory(craftID,rarity,adjamt);
        if (craftID in worker.donated) worker.donated[craftID] += adjamt;
        else worker.donated[craftID] = adjamt;
    },
}

const $workers = $('#workerList');
const $workersUse = $("#workersUse");

function refreshSideWorkers() {
    $workersUse.empty();
    WorkerManager.reallocate();
    WorkerManager.workers.filter(w=>w.owned).forEach(worker => {
        const d = $("<div/>").addClass("workerSideBar").attr("id",worker.status);
        const d1 = $("<div/>").addClass("wsbLvl").html(worker.lvl);
        const d2 = $("<div/>").addClass("wsbType").html(worker.prodpic+"&nbsp;"+worker.name);
        const d3 = $("<div/>").addClass("wsbCraft");
        if (worker.status === "idle") {
            d.addClass("wsbIdle");
            d3.html("Idle");
        }
        else {
            const item = recipeList.idToItem(worker.status);
            d.addClass("wsbActive");
            d3.html(item.itemPic()).addClass("tooltip").attr("data-tooltip",item.name);
        }
        d.append(d1,d2,d3);
        $workersUse.append(d);
    })
}

function refreshWorkers() {
    $workers.empty();
    WorkerManager.workers.forEach(worker => {
        if (!worker.owned) return;
        const workerDiv = $('<div/>').addClass("Worker");
        const workerDetails = $('<div/>').addClass("WorkerDetails");
            const d1 = $("<div/>").addClass("WorkerImage").html(worker.pic);
        const workerNameProduction = $('<div/>').addClass("WorkerNameAndProduction");
            const d2 = $("<div/>").addClass("WorkerName").html(worker.name);
                const d2a = $("<div/>").addClass("WorkerDesc tooltip").html("<i class='tiny material-icons'>info_outline</i>").attr("data-tooltip", worker.description);
            d2.append(d2a);
            const d3 = $("<div/>").addClass("WorkerProduction").html(worker.productionText());
        workerNameProduction.append(d2, d3);
        workerDetails.append(d1, workerNameProduction);
        const d4 = $("<div/>").addClass("WorkerLvl").html("Level " + worker.lvl);
        const d5 = $('<div/>').addClass("itemSac");
        workerDiv.append(workerDetails,d4,d5)
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
                if (Inventory.itemCount(res,0) === 0) d5a.addClass("cantAfford");
                const resIcon = ResourceManager.materialIcon(res);
                const d5b = $('<div/>').addClass("itemToSac tooltip").attr("data-tooltip",ResourceManager.nameForWorkerSac(res)).html(resIcon+"<br>"+formatToUnits(adjamt,2));
                d5.append(d5a.append(d5b));
            });
            const b1 = $("<button/>").addClass("WorkerUpgrade").attr("data-value",worker.workerID).html("Upgrade&nbsp;&nbsp;" + money);
            if (!worker.canUpgrade()) b1.addClass("workerUpgradeDisable tooltip").attr("data-tooltip","You must first contribute the items above by clicking on them.")
            workerDiv.append(b1);
        }
        $workers.append(workerDiv)
    });
}

function refreshWorkerAmts() {
    //loop through JUST the worker resource costs to update "cantAffords"
    WorkerManager.workers.forEach(worker => {
        if (worker.maxlevel()) return;
        worker.thislvlreq().forEach(reqs => {
            if (Inventory.itemCount(reqs[0],reqs[1]) === 0) $("#ws"+worker.workerID+reqs[0]+reqs[1]).addClass("cantAfford");
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
    const rarity = divID.substring(11,12);
    WorkerManager.partialsacrifice(workerID,craftID,rarity);
    refreshWorkers();
});