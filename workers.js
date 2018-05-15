"use strict";

function Worker(name,baseTime,description) {
    this.name = name;
    this.image = imageReference[name];
    this.craftTime = baseTime; //this is in miliseconds
    this.description = description;
    this.lvl = 0;
    this.cost = [500,625,781,977,1221,1526,1907,2384,2980,3725,4657,5821,7276,9095,11369,14211,17764,22204,27756,34694,43368,54210,67763,84703,105879];
    this.multiplier = [1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.5,2.6,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,4,4.1,4.2,4.3,4.4,5];
}

Worker.prototype.production = function() {
    return this.baseValue*this.multiplier[this.lvl];
}

Worker.prototype.getCost = () => {
    return this.cost[this.lvl+1];
}

function getProduction(type) {
    let sum = 0;
    for (let i=0;i<workers.length;i++) {
        if (workers[i].produces === type) {
            sum += workers[i].production();
        }
    }
    return sum;
}

const workers = [];

const oren = new Worker("Oren",10000,"Job: Produces Ore");
oren.produces = {
    "Ore" : 20,
}
oren.lvlreq = [
    {//lv1
        "Knife" : 50
    },
    {//lv2
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
    },
    {//lv3
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv4
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv5
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv6
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv7
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv8
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv9
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv10
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
]
workers.push(oren);

const eryn = new Worker("Eryn",18000,"Job: Produces Wood");
eryn.produces = {
    "Wood" : 28,
}
eryn.lvlreq = [
    {//lv1
        "Knife" : 3,
    },
    {//lv2
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
    },
    {//lv3
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv4
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv5
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv6
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv7
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv8
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv9
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv10
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
]
workers.push(eryn);

const lakur = new Worker("Lakur",12000,"Job: Produces Leather");
lakur.produces = {
    "Leather" : 45,
}
lakur.lvlreq = [
    {//lv1
        "Knife" : 50
    },
    {//lv2
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
    },
    {//lv3
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv4
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv5
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv6
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv7
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv8
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv9
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv10
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
]
workers.push(lakur);

const herbie = new Worker("Herbie",30000,"Job: Produces Herbs");
herbie.produces = {
    "Herb" : 40,
}
herbie.lvlreq = [
    {//lv1
        "Knife" : 50
    },
    {//lv2
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
    },
    {//lv3
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv4
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv5
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv6
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv7
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv8
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv9
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
    {//lv10
        "Knife" : 100,
        "Butter Knife" : 25,
        "Chefs Knife" : 10,
        "Dark Is The Knife" : 30,
    },
]
workers.push(herbie);

function nameToWorker(name) {
    for (let i=0;i<workers.length;i++) {
        if (workers[i].name == name) {
            return workers[i];
        }
    }
    return null;
}

const $workers = $('#workerList');

function refreshWorkers() {
    $workers.empty();
    for (let i=0;i<workers.length;i++) {
        const lvl = workerProgress[workers[i].name];
        const worker = $('<div/>').addClass("Worker");
        const d1 = $("<div/>").addClass("WorkerImage").html(workerImageReference[workers[i].name]);
        const d2 = $("<div/>").addClass("WorkerName").html("<h3>"+workers[i].name+"</h3>");
        const d3 = $("<div/>").addClass("WorkerDesc").html(workers[i].description);
        const d4 = $("<div/>").addClass("workerLvl").html("Lvl. " + lvl)
        if (lvl === 0) d4.addClass("hidden");
        const d5 = $('<div/>').addClass("InitialCost").html("Cost: "+workers[i].cost[lvl]+"&nbsp;"+imageReference["Gold"]);
        const d6 = $('<div/>').addClass("itemSac");
        let craftsLeft = false;
        if (lvl < 10) {
            for (const [itemName, amt] of Object.entries(workers[i].lvlreq[lvl])) {
                const slot = workers[i].name+"_"+lvl+"_"+itemName;
                if (!(slot in workerProgress)) workerProgress[slot] = 0;
                const adjAmt = amt - workerProgress[slot];
                if (adjAmt > 0) {
                    craftsLeft = true;
                    const d6a = $('<div/>').addClass("itemToSacDiv");
                    const d6b = $('<a/>').addClass("itemToSac tooltip").attr("href",slot).attr("item",itemName).attr("aria-label",itemName).html(imageReference[itemName]+"<br>"+adjAmt);
                    d6a.append(d6b);
                    d6.append(d6a);
                }
            }
        }
        const b1 = $("<button/>").addClass("BuyWorker").attr("id",workers[i].name).html("PURCHASE"); 
        if (player.money < workers[i].cost[lvl] || craftsLeft) b1.addClass("workerDisable");
        if (lvl === workers[i].cost.length) {
            d5.addClass("hidden");
            b1.addClass("hidden");
        }
        worker.append(d1);
        worker.append(d2);
        worker.append(d3);
        worker.append(d4);
        worker.append(d5);
        worker.append(d6);
        worker.append(b1);
        $workers.append(worker);
    }
}

function getJobValue(name) {
    const workerObj = nameToWorker(name);
    const lvl = workerProgress[name];
    const toexport = {}
    for (const [resource, amt] of Object.entries(workerObj.produces)) {
        toexport[resource] = parseInt((amt*workerObj.multiplier[lvl]).toFixed(2));
    };
    return toexport;
}


$workers.on("click", ".BuyWorker", (e) => {
    e.preventDefault();
    purchaseWorker(e.target.id);
    refreshWorkers();
});

function purchaseWorker(name) {
    const worker = nameToWorker(name);
    const cost = worker.cost[workerProgress[name]];
    if (player.money >= cost) {
        player.money -= cost;
        workerProgress[name] += 1;
    }
}

const workerImageReference = {
    "Oren" : '<img src="workers/oren.gif">',
    "Eryn" : '<img src="workers/eryn.gif">',
    "Herbie" : '<img src="workers/herbie.gif">',
    "Lakur" : '<img src="workers/lakur.gif">',
}

$(document).on("click", "a.itemToSac", (e) => {
    e.preventDefault();
    const slot = $(e.target).attr("href");
    const itemName = $(e.target).attr("item");
    const success = removeFromInventory(itemName);
    if (success) {
        workerProgress[slot] += 1;
        refreshWorkers();
    }
});