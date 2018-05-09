"use strict";

function Worker(name,baseTime,unlockCost,description) {
    this.name = name;
    this.image = imageReference[name];
    this.craftTime = baseTime; //this is in miliseconds
    this.description = description;
    this.lvl = 0;
    this.xp = 0;
    this.xpReq = [0,100,300,500,750,1000,1250,1750,2750,5000];
    this.cost = [unlockCost,250,500,750,1000,1500,2000,2500,3500,5000];
    this.multiplier = [1,1.1,1.3,1.5,1.75,2,2.25,2.75,3.5,5];
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

const oren = new Worker("Oren",5000,0,"Job: Produces Ore");
oren.produces = {
    "Ore" : 1,
}
workers.push(oren);

const eryn = new Worker("Eryn",6500,300,"Job: Produces Wood");
eryn.produces = {
    "Wood" : 0.75,
}
workers.push(eryn);

const lakur = new Worker("Lakur",5000,300,"Job: Produces Leather");
lakur.produces = {
    "Leather" : 1.25,
}
workers.push(lakur);

const herbie = new Worker("Herbie",9000,300,"Job: Produces Herbs");
herbie.produces = {
    "Herb" : 1.25,
}
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
        const worker = $('<div/>').addClass("Worker");
        const d1 = $("<div/>").addClass("WorkerImage").html(imageReference[workers[i].name]);
        const d2 = $("<div/>").addClass("WorkerName").html("<h3>"+workers[i].name+"</h3>");
        const d3 = $("<div/>").addClass("WorkerDesc").html(workers[i].description);
        const d4 = $("<div/>").addClass("WorkerXP").html("XP: "+workers[i].xp+"/"+workers[i].xpReq[workers[i].lvl+1])
        const d5 = $('<div/>').addClass("InitialCost").html("Cost: "+workers[i].cost[0]+"&nbsp;"+imageReference["Gold"]);
        const b1 = $("<button/>").addClass("BuyWorker").attr("id",workers[i].name).html("PURCHASE"); 
        worker.append(d1);
        worker.append(d2);
        worker.append(d3);
        worker.append(d4);
        worker.append(d5);
        worker.append(b1);
        $workers.append(worker);
    }
}

$workers.on("click", ".BuyWorker", (e) => {
    e.preventDefault();
    const showID = "#Bought"+e.target.id;
    console.log(showID);
    $(showID).removeClass("hidden");
});