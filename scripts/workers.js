"use strict";

class Worker {
    constructor(props) {
        Object.assign(this, props);
        this.lvl = 100;
        this.pic = '<img src="workers/'+this.name+'.gif">';
        this.owned = true;
    }
    produces(resource) {
        if (resource in this.resources) return this.resources[resource] * this.lvl;
        return 0;
    }
}

const WorkerManager = {
    workers : [],
    addWorker(worker) {
        this.workers.push(worker);
        console.log("hi");
    },
    resourceCount(resource) {
        console.log(this.workers);
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
    let stopdisplay = false;
    for (let i=0;i<workers.length;i++) {
        const lvl = workerProgress[workers[i].name];
        const worker = $('<div/>').addClass("Worker");
        const d1 = $("<div/>").addClass("WorkerImage");
        const d2 = $("<div/>").addClass("WorkerName");
        const d3 = $("<div/>").addClass("WorkerDesc");
        const d4 = $("<div/>").addClass("workerLvl tooltip").attr("aria-label", "Worker Level");
        const d5 = $('<div/>').addClass("itemSac");
        const d7 = $('<a/>').addClass("workerDialog").attr("href", "#dialog"+ workers[i].name).html("i");
        if (lvl === 0) {
            d1.html(workerImageReference["hidden"]);
            d2.html("<h3>???</h3>");
            d3.html("Purchase this worker to unlock them and their effect!")
            d4.hide();
            d7.hide();
        }
        else {
            d1.html(workerImageReference[workers[i].name]);
            d2.html("<h3>"+workers[i].name+"</h3>");
            d3.html(workers[i].description);
            d4.html(lvl)
        }
        let craftsLeft = false;
        if (lvl < workers[i].lvlreq.length) {
            for (const [itemName, amt] of Object.entries(workers[i].lvlreq[lvl])) {
                const slot = workers[i].name+"_"+lvl+"_"+itemName;
                if (!(slot in workerSacProgress)) workerSacProgress[slot] = 0;
                const adjAmt = Math.floor(amt - workerSacProgress[slot]);
                if (adjAmt > 0) {
                    craftsLeft = true;
                    const d5a = $('<div/>').addClass("itemToSacDiv");
                    const d5b = $('<a/>').addClass("itemToSac tooltip").attr("href",slot).attr("item",itemName).attr("data-value",adjAmt).attr("aria-label",itemName).html(imageReference[itemName]+"<br>"+formatToUnits(adjAmt,2));
                    d5a.append(d5b);
                    d5.append(d5a);
                }
            }
        }
        const b1 = $("<button/>").attr("data-value",workers[i].name);
        if (actionSlotContainsWorker(workers[i].name)) b1.addClass("jobDisable tooltip").attr("aria-label","Already assigned to an action slot.").html("Busy");
        else b1.addClass("HireWorker").html("Hire");
        const b2 = $("<button/>").addClass("BuyWorker").attr("data-value",workers[i].name).html("Upgrade"); 
        if (lvl === 0) b2.html("Buy");
        else b2.html("Upgrade");
        if (craftsLeft) b2.addClass("workerDisable tooltip").attr("aria-label","You must first contribute the items above by clicking on them.");
        const d6 = $("<div/>").addClass("workerButtons");
        if (lvl > 0) d6.append(b1);
        if (lvl < workers[i].lvlreq.length) d6.append(b2);
        else d5.hide();
        worker.append(d1);
        worker.append(d2);
        worker.append(d3);
        worker.append(d4);
        worker.append(d5);
        worker.append(d6);
        worker.append(d7);
        $workers.append(worker);
        if (lvl === 0) break;
    }
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