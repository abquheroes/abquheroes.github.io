"use strict";

class Worker {
    constructor(props) {
        Object.assign(this, props);
        this.lvl = 1;
        this.pic = '<img src="images/workers/'+this.name+'.gif">';
        this.owned = true;
    }
    produces(resource) {
        if (resource in this.production) return this.production[resource] * this.lvl;
        return 0;
    }
    maxlevel() {
        return this.lvl > this.lvlreq.length;
    }
    thislvlreq() {
        return this.lvlreq[this.lvl];
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
        console.log("we're upgrading!");
        ResourceManager.deductUpgradeCosts(this.thislvlreq());
        this.lvl += 1;
        refreshWorkers();
    }
    productionText() {
        let s = "Produces:&nbsp;&nbsp;";
        $.each(this.production, (res,amt) => {
            s += ResourceManager.materialIcon(res) + ","
        })
        return s.slice(0, -1)
    }
}

const WorkerManager = {
    workers : [],
    addWorker(worker) {
        this.workers.push(worker);
    },
    resourceCount(resource) {
        return this.workers.map(el=>el.produces(resource)).reduce((total,amt) => total + amt)
    },
    workerByID(id) {
        for (let i=0;i<this.workers.length;i++) {
            if (this.workers[i].workerID === id) return this.workers[i];
        }
    },
    totalProduction(res) {
        return this.resourceCount(res);
    },
    upgrade(workerID) {
        const worker = this.workerByID(workerID);
        console.log(worker);
        worker.upgrade();
    }
}

const $workers = $('#workerList');

function refreshWorkers() {
    $workers.empty();
    WorkerManager.workers.forEach(worker => {
        const workerDiv = $('<div/>').addClass("Worker");
        const workerDetails = $('<div/>').addClass("WorkerDetails");
            const d1 = $("<div/>").addClass("WorkerImage").html(worker.pic);
        const workerNameProduction = $('<div/>').addClass("WorkerNameAndProduction");
            const d2 = $("<div/>").addClass("WorkerName").html(worker.name);
            const d3 = $("<div/>").addClass("WorkerProduction").html(worker.productionText());
                const d3a = $("<div/>").addClass("WorkerDesc tooltip").html("<i class='tiny material-icons'>info_outline</i>").attr("data-tooltip", worker.description);
            d3.append(d3a);
        workerNameProduction.append(d2, d3);
        workerDetails.append(d1, workerNameProduction);
        const d4 = $("<div/>").addClass("WorkerLvl").html("Level " + worker.lvl);
        const d5 = $('<div/>').addClass("itemSac");
        if (!worker.maxlevel()) {
            for (const [res, amt] of Object.entries(worker.thislvlreq())) {
                const d5a = $("<div/>").addClass("itemToSacDiv");
                if (!ResourceManager.available(res,amt)) d5a.addClass("cantAfford");
                const resIcon = ResourceManager.materialIcon(res);
                const d5b = $('<div/>').addClass("itemToSac tooltip").attr("data-tooltip",ResourceManager.name(res)).html(resIcon+"<br>"+formatToUnits(amt,2));
                d5.append(d5a.append(d5b));
            }
        }
        const b1 = $("<button/>").addClass("WorkerUpgrade").attr("data-value",worker.workerID).html("Upgrade");
        if (!worker.canUpgrade()) b1.addClass("workerUpgradeDisable tooltip").attr("data-tooltip","You must first contribute the items above by clicking on them.")
        $workers.append(workerDiv.append(workerDetails,d4,d5,b1))
    });
}

$(document).on("click", ".WorkerUpgrade", (e) => {
    console.log('trigger')
    e.preventDefault();
    const worker = $(e.currentTarget).attr("data-value");
    WorkerManager.upgrade(worker);
});