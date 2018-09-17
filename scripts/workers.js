"use strict";

class Worker {
    constructor(props) {
        Object.assign(this, props);
        this.lvl = 1;
        this.pic = '<img src="images/workers/'+this.name+'.gif">';
        this.prodpic = '<img src="images/resources/'+this.production+'.png">';
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
    canUpgrade() {
        let result = true;
        $.each(this.thislvlreq(),(item,amt) => {
            if (!ResourceManager.available(item,amt)) {
                result = false;
            }
        })
        return result;
    }
    upgrade() {
        if (!this.canUpgrade()) return;
        ResourceManager.deductUpgradeCosts(this.thislvlreq());
        this.lvl += 1;
        refreshWorkers();
    }
    productionText() {
        return "Produces:&nbsp;&nbsp;"+ResourceManager.materialIcon(this.production);
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
    }
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
        if (!worker.maxlevel()) {
            for (const [res, amt] of Object.entries(worker.thislvlreq())) {
                const d5a = $("<div/>").addClass("itemToSacDiv").attr("id",worker.workerID+res);
                if (Inventory.itemCount(res,0) === 0) d5a.addClass("cantAfford");
                const resIcon = ResourceManager.materialIcon(res);
                const d5b = $('<div/>').addClass("itemToSac tooltip").attr("data-tooltip",ResourceManager.nameForWorkerSac(res)).html(resIcon+"<br>"+formatToUnits(amt,2));
                d5.append(d5a.append(d5b));
            }
        }
        const b1 = $("<button/>").addClass("WorkerUpgrade").attr("data-value",worker.workerID).html("Upgrade");
        if (!worker.canUpgrade()) b1.addClass("workerUpgradeDisable tooltip").attr("data-tooltip","You must first contribute the items above by clicking on them.")
        $workers.append(workerDiv.append(workerDetails,d4,d5,b1))
    });
}

function refreshWorkerAmts() {
    //loop through JUST the worker resource costs to update "cantAffords"
    WorkerManager.workers.forEach(worker => {
        if (worker.maxlevel()) return;
        for (const [res, amt] of Object.entries(worker.thislvlreq())) {
            if (Inventory.itemCount(res,0) === 0) $("#"+worker.workerID+res).addClass("cantAfford");
            else $("#"+worker.workerID+res).removeClass("cantAfford");
        }
    }
}

$(document).on("click", ".WorkerUpgrade", (e) => {
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