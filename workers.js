"use strict";

function Worker(name,baseValue,baseTime,unlockCost,produces) {
    this.name = name;
    this.image = imageReference[name];
    this.baseValue = baseValue;
    this.baseTime = baseTime; //this is in miliseconds
    this.produces = produces;
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
workers.push(new Worker("Oren",1,1,0,"Ore"));
workers.push(new Worker("Woodra",0.75,1,300,"Wood"));

/*function nameToWorker(name) {
    for (let i=0;i<workers.length;i++) {
        if (workers[i].name == name) {
            return workers[i];
        }
    }
    return null;
}*/

const $workers = $('#workerList');

function refreshWorkers() {
    console.log("THEFUCK")
    $workers.empty();
    for (let i=0;i<workers.length;i++) {
        const worker = $('<div/>').addClass("Worker");
        const unbought = $('<div/>').addClass("Unbought").attr("id",workers[i].name);
        const p1 = $('<p/>').addClass("WorkerName").html("Worker: "+workers[i].name);
        const p2 = $('<p/>').addClass("WorkerType").html("Produces: "+imageReference[workers[i].produces]);
        const p3 = $('<p/>').addClass("InitialCost").html("Cost: "+workers[i].cost[0]+"&nbsp;"+imageReference["Gold"]);
        const b1 = $("<button/>").addClass("BuyWorker").attr("id",workers[i].name).html("PURCHASE");
        unbought.append(p1);
        unbought.append(p2);
        unbought.append(p3);
        unbought.append(b1);
        $workers.append(unbought);
        const bought = $('<div/>').addClass("Bought").addClass("hidden").attr("id","Bought"+workers[i].name);
        const d1 = $("<div/>").addClass("WorkerImage").html(imageReference[workers[i].name]);
        const d2 = $("<div/>").addClass("WorkerBoughtName").html("<h3>"+workers[i].name+"</h3>");
        const d3 = $("<div/>").addClass("WorkerXP").html("XP: "+workers[i].xp+"/"+workers[i].xpReq[workers[i].lvl+1])
        const d4 = $("<div/>").addClass("workerProduces").html("Produces: "+workers[i].production().toFixed(2)+"&nbsp;"+imageReference[workers[i].produces]+"/s");
        bought.append(d1);
        bought.append(d2);
        bought.append(d3);
        bought.append(d4);
        $workers.append(bought);
    }
}

$workers.on("click", ".BuyWorker", (e) => {
    e.preventDefault();
    const showID = "#Bought"+e.target.id;
    console.log(showID);
    $(showID).removeClass("hidden");
});