"use strict";

function Worker(name,baseTime,description) {
    this.name = name;
    this.image = imageReference[name];
    this.craftTime = baseTime; //this is in miliseconds
    this.description = description;
    this.lvl = 0;
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

const oren = new Worker("Oren",10000,"Oren comes from a long line of miners and specializes in gathering <em>Ore</em>.");
oren.produces = {
    "Ore" : 20,
}
oren.lvlreq = [
    {//unlock
    },
    {//2
        "Knife" : 10,
        "Gold" : 625,
    },
    {//3
        "Knife" : 10,
        "Butter Knife" : 5,
        "Gold" : 781,
    },
    {//4
        "Knife" : 10,
        "Butter Knife" : 10,
        "Gold" : 977,
    },
    {//5
        "Knife" : 10,
        "Butter Knife" : 10,
        "Kitchen Knife" : 5,
        "Gold" : 1221,
    },
    {//6
        "Knife" : 15,
        "Butter Knife" : 10,
        "Kitchen Knife" : 5,
        "Gold" : 1526,
    },
    {//7
        "Knife" : 15,
        "Butter Knife" : 10,
        "Kitchen Knife" : 10,
        "Gold" : 1907,
    },
    {//8
        "Knife" : 15,
        "Butter Knife" : 10,
        "Kitchen Knife" : 10,
        "Chefs Knife" : 5,
        "Gold" : 2384,
    },
    {//9
        "Knife" : 20,
        "Butter Knife" : 10,
        "Kitchen Knife" : 10,
        "Chefs Knife" : 5,
        "Gold" : 2980,
    },
    {//10
        "Knife" : 25,
        "Butter Knife" : 15,
        "Kitchen Knife" : 15,
        "Chefs Knife" : 10,
        "Gold" : 3725,
    },
    {//11
        "Chefs Knife" : 15,
        "Rage Maker" : 5,
        "New Gauntlets" : 5,
        "Standard Helmet" : 5,
        "Gold" : 4657,
    },
    {//12
        "Fishing Knife" : 5,
        "Rage Maker" : 10,
        "New Gauntlets" : 10,
        "Standard Helmet" : 10,
        "Gold" : 5821,
    },
    {//13
        "Fishing Knife" : 10,
        "Fury Bringer" : 5,
        "Shiny Gauntlets" : 5,
        "Cobalt Helmet" : 5,
        "Gold" : 7276,
    },
    {//14
        "Fishing Knife" : 15,
        "Fury Bringer" : 10,
        "Shiny Gauntlets" : 10,
        "Cobalt Helmet" : 10,
        "Gold" : 9095,
    },
    {//15
        "Thats Not A Knife" : 5,
        "Vengeance" : 5,
        "Plain Gauntlets" : 5,
        "Regular Helmet" : 5,
        "Gold" : 11369,
    },
    {//16
        "Thats Not A Knife" : 10,
        "Vengeance" : 10,
        "Plain Gauntlets" : 10,
        "Regular Helmet" : 10,
        "Gold" : 14211,
    },
    {//17
        "Thats Not A Knife" : 15,
        "Pride" : 5,
        "Pristine Gauntlets" : 5,
        "Super Helmet" : 5,
        "Gold" : 17764,
    },
    {//18
        "Thats A Knife" : 10,
        "Pride" : 10,
        "Pristine Gauntlets" : 10,
        "Super Helmet" : 10,
        "Gold" : 22204,
    },
    {//19
        "Thats A Knife" : 15,
        "Greedy Pickaxe" :	5,
        "Challenge Gauntlets" : 5,
        "Mega Helmet" : 5,
        "Gold" : 27756,
    },
    {//20
        "Club Knife" : 10,
        "Greedy Pickaxe" : 10,
        "Challenge Gauntlets" : 10,
        "Mega Helmet" : 10,
        "Gold" : 34694,
    },
    {//21
        "Club Knife" : 15,
        "Slothslayer" : 10,
        "Fancy Gauntlets" : 10,
        "Skull Helmet" : 10,
        "Gold" : 43368,
    },
    {//22
        "Dark Is The Knife" : 10,
        "Lusty Handaxe" : 10,
        "Old Gauntlets" : 10,
        "Dark Helmet" : 10,
        "Gold" : 54210,
        },
    {//23
        "Dark Is The Knife" : 15,
        "Envy" : 10,
        "Dark Gauntlets" :	10,
        "Whimsical Helmet" : 10,
        "Gold" : 67763,
    },
    {//24
        "The Bloopinator" : 10,
        "Gluttonous Axe" : 10,
        "Dandy Gauntlets" : 10,
        "Magnetized Helmet" : 10,
        "Gold" : 84703,
    },
    {//25
        "The Bloopinator" : 15,
        "Wrath" : 10,
        "Cool Gauntlets" : 10,
        "Coal Helmut" : 10,
        "Gold" : 105879,
    },
]
workers.push(oren);

const eryn = new Worker("Eryn",18000,"Eryn carefully chooses which trees to chop down to produce <em>Wood</em>.");
eryn.produces = {
    "Wood" : 28,
}
eryn.lvlreq = [
    {//unlock
        "Chefs Knife" : 5,
        "Gold" : 500,
    },
    {//2
        "Club" : 10,
        "Gold" : 625,
    },
    {//3
        "Club" : 10,
        "Maul" : 5,
        "Gold" : 781,
    },
    {//4
        "Club" : 10,
        "Maul" : 10,
        "Gold" : 977,
    },
    {//5
        "Club" : 10,
        "Maul" : 10,
        "Brawler" : 5,
        "Gold" : 1221,
    },
    {//6
        "Club" : 15,
        "Maul" : 10,
        "Brawler" : 5,
        "Gold" : 1526,
    },
    {//7
        "Club" : 15,
        "Maul" : 10,
        "Brawler" : 10,
        "Gold" : 1907,
    },
    {//8
        "Club" : 15,
        "Maul" : 10,
        "Brawler" : 10,
        "The Broominator" : 5,
        "Gold" : 2384,
    },
    {//9
        "Club" : 20,
        "Maul" : 10,
        "Brawler" : 10,
        "The Broominator" : 5,
        "Gold" : 2980,
    },
    {//10
        "Club" : 25,
        "Maul" : 15,
        "Brawler" : 15,
        "The Broominator" : 10,
        "Gold" : 3725,
    },
    {//11
        "The Broominator" : 15,
        "Rage Maker" : 5,
        "Basic Wand" : 5,
        "Hamster Clogs" : 5,
        "Gold" : 4657,
    },
    {//12
        "Blackjack" : 5,
        "Rage Maker" : 10,
        "Basic Wand" : 10,
        "Hamster Clogs" : 10,
        "Gold" : 5821,
    },
    {//13
        "Blackjack" : 10,
        "Fury Bringer" : 5,
        "Forest Wand" : 5,
        "Mage Moccasins" : 5,
        "Gold" : 7276,
    },
    {//14
        "Blackjack" : 15,
        "Fury Bringer" : 10,
        "Forest Wand" : 10,
        "Mage Moccasins" : 10,
        "Gold" : 9095,
    },
    {//15
        "Bludgeon" : 5,
        "Vengeance" : 5,
        "Wind Wand" : 5,
        "Druidic Boots" : 5,
        "Gold" : 11369,
    },
    {//16
        "Bludgeon" : 10,
        "Vengeance" : 10,
        "Wind Wand" : 10,
        "Druidic Boots" : 10,
        "Gold" : 14211,
    },
    {//17
        "Bludgeon" : 15,
        "Pride" : 5,
        "Soul Wand" : 5,
        "Fighting Stilettos" : 5,
        "Gold" : 17764,
    },
    {//18
        "Striped Club" : 10,
        "Pride" : 10,
        "Soul Wand" : 10,
        "Fighting Stilettos" : 10,
        "Gold" : 22204,
    },
    {//19
        "Striped Club" : 15,
        "Greedy Pickaxe" : 5,
        "Rain Wand" : 5,
        "Bardic Galoshes" : 5,
        "Gold" : 27756,
    },
    {//20
        "Night Club" : 10,
        "Greedy Pickaxe" : 10,
        "Rain Wand" : 10,
        "Bardic Galoshes" : 10,
        "Gold" : 34694,
    },
    {//21
        "Night Club" : 15,
        "Slothslayer" : 10,
        "Frozen Wand" : 10,
        "Master Loafers" : 10,
        "Gold" : 43368,
    },
    {//22
        "Fact Finder" : 10,
        "Lusty Handaxe" : 10,
        "Ocean Wand" : 10,
        "Foxy Slippers" : 10,
        "Gold" : 54210,
    },
    {//23
        "Fact Finder" : 15,
        "Envy" : 10,
        "Thunder Wand" : 10,
        "Hairy Shoes" : 10,
        "Gold" : 67763,
    },
    {//24
        "Knife Club" : 10,
        "Gluttonous Axe" : 10,
        "Hate Wand" : 10,
        "Lunar Whalers" : 10,
        "Gold" : 84703,
    },
    {//25
        "Knife Club" : 15,
        "Wrath" : 10,
        "Love Wand" : 10,
        "Jay Walkers" : 10,
        "Gold" : 105879,
    },
]
workers.push(eryn);

const lakur = new Worker("Lakur",12000,"Lakur is a skilled hunter and earns her living by producing <em>Leather</em>.");
lakur.produces = {
    "Leather" : 45,
}
lakur.lvlreq = [
    {//unlock
        "The Broominator" : 5,
        "Gold" : 500,
    },
    {//2
        "Gardening Gloves" : 10,
        "Gold" : 625,
    },
    {//3
        "Gardening Gloves" : 10,
        "Running Gloves" : 5,
        "Gold" : 781,
    },
    {//4
        "Gardening Gloves" : 10,
        "Running Gloves" : 10,
        "Gold" : 977,
    },
    {//5
        "Gardening Gloves" : 10,
        "Running Gloves" : 10,
        "Fighting Gloves" : 5,
        "Gold" : 1221,
    },
    {//6
        "Gardening Gloves" : 15,
        "Running Gloves" : 10,
        "Fighting Gloves" : 5,
        "Gold" : 1526,
    },
    {//7
        "Gardening Gloves" : 15,
        "Running Gloves" : 10,
        "Fighting Gloves" : 10,
        "Gold" : 1907,
    },
    {//8
        "Gardening Gloves" : 15,
        "Running Gloves" : 10,
        "Fighting Gloves" : 10,
        "Cleaning Gloves" : 5,
        "Gold" : 2384,
    },
    {//9
        "Gardening Gloves" : 20,
        "Running Gloves" : 10,
        "Fighting Gloves" : 10,
        "Cleaning Gloves" : 5,
        "Gold" : 2980,
    },
    {//10
        "Gardening Gloves" : 25,
        "Running Gloves" : 15,
        "Fighting Gloves" : 15,
        "Cleaning Gloves" : 10,
        "Gold" : 3725,
    },
    {//11
        "Cleaning Gloves" : 15,
        "Simple Hat" : 5,
        "New Gauntlets" : 5,
        "Hamster Clogs" : 5,
        "Gold" : 4657,
    },
    {//12
        "Punching Gloves" : 5,
        "Simple Hat" : 10,
        "New Gauntlets" : 10,
        "Hamster Clogs" : 10,
        "Gold" : 5821,
    },
    {//13
        "Punching Gloves" : 10,
        "Hidden Mask" : 5,
        "Shiny Gauntlets" : 5,
        "Mage Moccasins" : 5,
        "Gold" : 7276,
    },
    {//14
        "Punching Gloves" : 15,
        "Hidden Mask" : 10,
        "Shiny Gauntlets" : 10,
        "Mage Moccasins" : 10,
        "Gold" : 9095,
    },
    {//15
        "Hugging Gloves" : 5,
        "Black Hat" : 5,
        "Plain Gauntlets" : 5,
        "Druidic Boots" : 5,
        "Gold" : 11369,
    },
    {//16
        "Hugging Gloves" : 10,
        "Black Hat" : 10,
        "Plain Gauntlets" : 10,
        "Druidic Boots" : 10,
        "Gold" : 14211,
    },
    {//17
        "Hugging Gloves" : 15,
        "Beach Hat" : 5,
        "Pristine Gauntlets" : 5,
        "Fighting Stilettos" : 5,
        "Gold" : 17764,
    },
    {//18
        "Dancing Gloves" : 10,
        "Beach Hat" : 10,
        "Pristine Gauntlets" : 10,
        "Fighting Stilettos" : 10,
        "Gold" : 22204,
    },
    {//19
        "Dancing Gloves" : 15,
        "Green Bay Beret" : 5,
        "Challenge Gauntlets" : 5,
        "Bardic Galoshes" : 5,
        "Gold" : 27756,
    },
    {//20
        "Loving Gloves" : 10,
        "Green Bay Beret" : 10,
        "Challenge Gauntlets" : 10,
        "Bardic Galoshes" : 10,
        "Gold" : 34694,
    },
    {//21
        "Loving Gloves" : 15,
        "The Mind Cap" : 10,
        "Fancy Gauntlets" : 10,
        "Master Loafers" : 10,
        "Gold" : 43368,
    },
    {//22
        "Other Gloves" : 10,
        "Ornate Crown" : 10,
        "Old Gauntlets" : 10,
        "Foxy Slippers" : 10,
        "Gold" : 54210,
    },
    {//23
        "Other Gloves" : 15,
        "Spellcasting Hat" : 10,
        "Dark Gauntlets" : 10,
        "Hairy Shoes" : 10,
        "Gold" : 67763,
    },
    {//24
        "Boxing Gloves" : 10,
        "Spoopy Mask" : 10,
        "Dandy Gauntlets" : 10,
        "Lunar Whalers" : 10,
        "Gold" : 84703,
    },
    {//25
        "Boxing Gloves" : 15,
        "All Folks Hat" : 10,
        "Cool Gauntlets" : 10,
        "Jay Walkers" : 10,
        "Gold" : 105879,
    },
]
workers.push(lakur);

const herbie = new Worker("Herbie",30000,"Herbie is a fledgling botanist and spends his days collecting <em>Herbs</em>.");
herbie.produces = {
    "Herb" : 40,
}
herbie.lvlreq = [
    {//unlock
        "Cleaning Gloves" : 5,
        "Gold" : 500,
    },
    {//2
        "Healing Potion" : 10,
        "Gold" : 625,
    },
    {//3
        "Healing Potion" : 10,
        "Mana Potion": 5,
        "Gold" : 781,
        },
    {//4
        "Healing Potion" : 10,
        "Mana Potion" : 10,
        "Gold" : 977,
    },
    {//5
        "Healing Potion" : 10,
        "Mana Potion" : 10,
        "Sleeping Potion" : 5,
        "Gold" : 1221,
    },
    {//6
        "Healing Potion" : 15,
        "Mana Potion" : 10,
        "Sleeping Potion" : 5,
        "Gold" : 1526,
    },
    {//7
        "Healing Potion" : 15,
        "Mana Potion" : 10,
        "Sleeping Potion" : 10,
        "Gold" : 1907,
    },
    {//8
        "Healing Potion" : 15,
        "Mana Potion" : 10,
        "Sleeping Potion" : 10,
        "Coughing Potion" : 5,
        "Gold" : 2384,
    },
    {//9
        "Healing Potion" : 20,
        "Mana Potion" : 10,
        "Sleeping Potion" : 10,
        "Coughing Potion" : 5,
        "Gold" : 2980,
    },
    {//10
        "Healing Potion" : 25,
        "Mana Potion" : 15,
        "Sleeping Potion" : 15,
        "Coughing Potion" : 10,
        "Gold" : 3725,
    },
    {//11
        "Coughing Potion" : 15,
        "Simple Hat" : 5,
        "Basic Wand" : 5,
        "Standard Helmet" : 5,
        "Gold" : 4657,
    },
    {//12
        "Invincibility Potion" : 5,
        "Simple Hat" : 10,
        "Basic Wand" : 10,
        "Standard Helmet" : 10,
        "Gold" : 5821,
    },
    {//13
        "Invincibility Potion" : 10,
        "Hidden Mask" : 5,
        "Forest Wand" : 5,
        "Cobalt Helmet" : 5,
        "Gold" : 7276,
    },
    {//14
        "Invincibility Potion" : 15,
        "Hidden Mask" : 10,
        "Forest Wand" : 10,
        "Cobalt Helmet" : 10,
        "Gold" : 9095,
    },
    {//15
        "Laughing Potion" : 5,
        "Black Hat" : 5,
        "Wind Wand" : 5,
        "Regular Helmet" : 5,
        "Gold" : 11369,
    },
    {//16
        "Laughing Potion" : 10,
        "Black Hat" : 10,
        "Wind Wand" : 10,
        "Regular Helmet" : 10,
        "Gold" : 14211,
    },
    {//17
        "Laughing Potion" : 15,
        "Beach Hat" : 5,
        "Soul Wand" : 5,
        "Super Helmet" : 5,
        "Gold" : 17764,
    },
    {//18
        "Rejuvenating Potion" : 10,
        "Beach Hat" : 10,
        "Soul Wand" : 10,
        "Super Helmet" : 10,
        "Gold" : 22204,
    },
    {//19
        "Rejuvenating Potion" : 15,
        "Green Bay Beret" : 5,
        "Rain Wand" : 5,
        "Mega Helmet" : 5,
        "Gold" : 27756,
    },
    {//20
        "Like Potion" : 10,
        "Green Bay Beret" : 10,
        "Rain Wand" : 10,
        "Mega Helmet" : 10,
        "Gold" : 34694,
    },
    {//21
        "Like Potion" : 15,
        "The Mind Cap" : 10,
        "Frozen Wand" : 10,
        "Skull Helmet" : 10,
        "Gold" : 43368,
    },
    {//22
        "Bitter Potion" : 10,
        "Ornate Crown" : 10,
        "Ocean Wand" : 10,
        "Dark Helmet" : 10,
        "Gold" : 54210,
    },
    {//23
        "Bitter Potion" : 15,
        "Spellcasting Hat" : 10,
        "Thunder Wand" : 10,
        "Whimsical Helmet" : 10,
        "Gold" : 67763,
    },
    {//24
        "Strength Potion" : 10,
        "Spoopy Mask" : 10,
        "Hate Wand" : 10,
        "Magnetized Helmet" : 10,
        "Gold" : 84703,
    },
    {//25
        "Strength Potion" : 15,
        "All Folks Hat" : 10,
        "Love Wand" : 10,
        "Coal Helmut" : 10,
        "Gold" : 105879,
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
    let stopdisplay = false;
    for (let i=0;i<workers.length;i++) {
        const lvl = workerProgress[workers[i].name];
        const worker = $('<div/>').addClass("Worker");
        const d1 = $("<div/>").addClass("WorkerImage");
        const d2 = $("<div/>").addClass("WorkerName");
        const d3 = $("<div/>").addClass("WorkerDesc");
        const d4 = $("<div/>").addClass("workerLvl tooltip").attr("aria-label", "Worker Level");
        const d5 = $('<div/>').addClass("itemSac");
        /*const d6 = $('<div/>').addClass("InitialCost");*/
        if (lvl === 0) {
            d1.html(workerImageReference["hidden"]);
            d2.html("<h3>???</h3>");
            d3.html("Purchase this worker to unlock it and its effect!")
            d4.html("?")
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
                const adjAmt = amt - workerSacProgress[slot];
                if (adjAmt > 0) {
                    craftsLeft = true;
                    const d5a = $('<div/>').addClass("itemToSacDiv");
                    const d5b = $('<a/>').addClass("itemToSac tooltip").attr("href",slot).attr("item",itemName).attr("data-value",adjAmt).attr("aria-label",itemName).html(imageReference[itemName]+"<br>"+adjAmt);
                    d5a.append(d5b);
                    d5.append(d5a);
                }
            }
        }
        const b1 = $("<button/>").attr("data-value",workers[i].name);
        if (actionSlotContainsWorker(workers[i].name)) b1.addClass("jobDisable").html("Busy");
        else b1.addClass("HireWorker").html("Hire");
        const b2 = $("<button/>").addClass("BuyWorker").attr("data-value",workers[i].name).html("Upgrade"); 
        if (lvl === 0) b2.html("Buy");
        else b2.html("Upgrade");
        if (craftsLeft) b2.addClass("workerDisable tooltip").attr("aria-label","You must first contribute the items above by clicking on them.");
        const d6 = $("<div/>").addClass("workerButtons");
        d6.append(b1);
        d6.append(b2);
        worker.append(d1);
        worker.append(d2);
        worker.append(d3);
        worker.append(d4);
        worker.append(d5);
        worker.append(d6);
        $workers.append(worker);
        if (lvl === 0) break;
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
    purchaseWorker($(e.target).attr("data-value"));
    refreshWorkers();
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
        console.log(slot);
        if (workerSacProgress[slot] < amt) return false;
    }
    return true;
}

const workerImageReference = {
    "Oren" : '<img src="workers/oren.gif">',
    "Eryn" : '<img src="workers/eryn.gif">',
    "Herbie" : '<img src="workers/herbie.gif">',
    "Lakur" : '<img src="workers/lakur.gif">',
    "hidden" : '<img src="workers/blackoutline.png">',
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