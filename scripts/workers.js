"use strict";

class Worker {
    constructor(props) {
        Object.assign(this, props);
        this.lvl = 2;
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
        for (let i=0;i<workers.length;i++) {
            if (workers[i].id === id) return workers[i];
        }
    },
    totalProduction(res) {
        return this.resourceCount(res);
    }
}

const $workers = $('#workerList');

function refreshWorkers() {
    $workers.empty();
    WorkerManager.workers.forEach(worker => {
        const workerDiv = $('<div/>').addClass("Worker");
        const d1 = $("<div/>").addClass("WorkerImage").html(worker.pic);
        const d2 = $("<div/>").addClass("WorkerName").html(worker.name);
        const d3 = $('<div/>').addClass("itemSac");
        if (!worker.maxlevel()) {
            for (const [res, amt] of Object.entries(worker.thislvlreq())) {
                const d3a = $("<div/>").addClass("itemToSacDiv");
                if (!ResourceManager.available(res,amt)) d3a.addClass("cantAfford");
                const resIcon = ResourceManager.materialIcon(res);
                const d3b = $('<div/>').addClass("itemToSac tooltip").attr("worker",worker.workerID).attr("item",res).attr("aria-label",ResourceManager.name(res)).html(resIcon+"<br>"+formatToUnits(amt,2));
                d3.append(d3a.append(d3b));
            }
        }
        $workers.append(workerDiv.append(d1,d2,d3))
    });
}

$workers.on("click", ".BuyWorker", (e) => {
    e.preventDefault();
    purchaseWorker($(e.target).attr("data-value"));
    refreshWorkers();
    refreshActionSlots(true);
    refreshUpgrades();
});

function purchaseWorker(name) {
    if (sacrificeCheck(name)) {
        workerProgress[name] += 1;
        ga('send', 'event', 'Workers', 'upgrade', name);
    }
}

function sacrificeCheck(name) {
    const worker = nameToWorker(name);
    const lvl = workerProgress[name];
    for (const [item,amt] of Object.entries(worker.lvlreq[lvl])) {
        const slot = name+"_"+lvl+"_"+item;
        if (amt - workerSacProgress[slot] >= 1) return false;
    }
    return true;
}

$(document).on("click", "a.itemToSac", (e) => {
    e.preventDefault();
    const slot = $(e.currentTarget).attr("href");
    const itemName = $(e.currentTarget).attr("item");
    let needed = $(e.currentTarget).attr("data-value");
    if (e.shiftKey) needed = 1;
    workerSacProgress[slot] += removeFromInventory(itemName,needed);
    refreshWorkers();
});