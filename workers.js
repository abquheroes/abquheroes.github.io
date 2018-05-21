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
    {//unlock
    },
    {//2
        "Knife" : 10,
    },
    {//3
        "Knife" : 10,
        "Butter Knife" : 5,
    },
    {//4
        "Knife" : 10,
        "Butter Knife" : 10,
    },
    {//5
        "Knife" : 10,
        "Butter Knife" : 10,
        "Kitchen Knife" : 5,
    },
    {//6
        "Knife" : 15,
        "Butter Knife" : 10,
        "Kitchen Knife" : 5,
    },
    {//7
        "Knife" : 15,
        "Butter Knife" : 10,
        "Kitchen Knife" : 10,
    },
    {//8
        "Knife" : 15,
        "Butter Knife" : 10,
        "Kitchen Knife" : 10,
        "Chefs Knife" : 5,
    },
    {//9
        "Knife" : 20,
        "Butter Knife" : 10,
        "Kitchen Knife" : 10,
        "Chefs Knife" : 5,
    },
    {//10
        "Knife" : 25,
        "Butter Knife" : 15,
        "Kitchen Knife" : 15,
        "Chefs Knife" : 10,
    },
    {//11
        "Chefs Knife" : 15,
        "Rage Maker" : 5,
        "New Gauntlets" : 5,
        "Standard Helmet" : 5,
    },
    {//12
        "Fishing Knife" : 5,
        "Rage Maker" : 10,
        "New Gauntlets" : 10,
        "Standard Helmet" : 10,
    },
    {//13
        "Fishing Knife" : 10,
        "Fury Bringer" : 5,
        "Shiny Gauntlets" : 5,
        "Cobalt Helmet" : 5,
    },
    {//14
        "Fishing Knife" : 15,
        "Fury Bringer" : 10,
        "Shiny Gauntlets" : 10,
        "Cobalt Helmet" : 10,
    },
    {//15
        "Thats Not A Knife" : 5,
        "Vengance" : 5,
        "Plain Gauntlets" : 5,
        "Regular Helmet" : 5,
    },
    {//16
        "Thats Not A Knife" : 10,
        "Vengance" : 10,
        "Plain Gauntlets" : 10,
        "Regular Helmet" : 10,
    },
    {//17
        "Thats Not A Knife" : 15,
        "Pride" : 5,
        "Pristine Gauntlets" : 5,
        "Super Helmet" : 5,
    },
    {//18
        "Thats A Knife" : 10,
        "Pride" : 10,
        "Pristine Gauntlets" : 10,
        "Super Helmet" : 10,
    },
    {//19
        "Thats A Knife" : 15,
        "Greedy Pickaxe" :	5,
        "Challenge Gauntlets" : 5,
        "Mega Helmet" : 5,
    },
    {//20
        "Club Knife" : 10,
        "Greedy Pickaxe" : 10,
        "Challenge Gauntlets" : 10,
        "Mega Helmet" : 10,
    },
    {//21
        "Club Knife" : 15,
        "Slothslayer" : 10,
        "Fancy Gauntlets" : 10,
        "Skull Helmet" : 10,
    },
    {//22
        "Dark Is The Knife" : 10,
        "Lusty Handaxe" : 10,
        "Old Gauntlets" : 10,
        "Dark Helmet" : 10,
        },
    {//23
        "Dark Is The Knife" : 15,
        "Envy" : 10,
        "Dark Gauntlets" :	10,
        "Whimsical Helmet" : 10,
    },
    {//24
        "The Bloopinator" : 10,
        "Gluttonous Axe" : 10,
        "Dandy Gauntlets" : 10,
        "Magnetized Helmet" : 10,
    },
    {//25
        "The Bloopinator" : 15,
        "Wrath" : 10,
        "Cool Gauntlets" : 10,
        "Coal Helmut" : 10,
    },
]
workers.push(oren);

const eryn = new Worker("Eryn",18000,"Job: Produces Wood");
eryn.produces = {
    "Wood" : 28,
}
eryn.lvlreq = [
    {//unlock
        "Chefs Knife" : 5,
    },
    {//2
        "Club" : 10,
    },
    {//3
        "Club" : 10,
        "Maul" : 5,
    },
    {//4
        "Club" : 10,
        "Maul" : 10,
    },
    {//5
        "Club" : 10,
        "Maul" : 10,
        "Brawler" : 5,
    },
    {//6
        "Club" : 15,
        "Maul" : 10,
        "Brawler" : 5,
    },
    {//7
        "Club" : 15,
        "Maul" : 10,
        "Brawler" : 10,
    },
    {//8
        "Club" : 15,
        "Maul" : 10,
        "Brawler" : 10,
        "The Broominator" : 5,
    },
    {//9
        "Club" : 20,
        "Maul" : 10,
        "Brawler" : 10,
        "The Broominator" : 5,
    },
    {//10
        "Club" : 25,
        "Maul" : 15,
        "Brawler" : 15,
        "The Broominator" : 10,
    },
    {//11
        "The Broominator" : 15,
        "Rage Maker" : 5,
        "Basic Wand" : 5,
        "Hamster Clogs" : 5,
    },
    {//12
        "Blackjack" : 5,
        "Rage Maker" : 10,
        "Basic Wand" : 10,
        "Hamster Clogs" : 10,
    },
    {//13
        "Blackjack" : 10,
        "Fury Bringer" : 5,
        "Forest Wand" : 5,
        "Mage Moccasins" : 5,
    },
    {//14
        "Blackjack" : 15,
        "Fury Bringer" : 10,
        "Forest Wand" : 10,
        "Mage Moccasins" : 10,
    },
    {//15
        "Bludgeon" : 5,
        "Vengance" : 5,
        "Wind Wand" : 5,
        "Druidic Boots" : 5,
    },
    {//16
        "Bludgeon" : 10,
        "Vengance" : 10,
        "Wind Wand" : 10,
        "Druidic Boots" : 10,
    },
    {//17
        "Bludgeon" : 15,
        "Pride" : 5,
        "Soul Wand" : 5,
        "Fighting Stilettos" : 5,
    },
    {//18
        "Striped Club" : 10,
        "Pride" : 10,
        "Soul Wand" : 10,
        "Fighting Stilettos" : 10,
    },
    {//19
        "Striped Club" : 15,
        "Greedy Pickaxe" : 5,
        "Rain Wand" : 5,
        "Bardic Galoshes" : 5,
    },
    {//20
        "Night Club" : 10,
        "Greedy Pickaxe" : 10,
        "Rain Wand" : 10,
        "Bardic Galoshes" : 10,
    },
    {//21
        "Night Club" : 15,
        "Slothslayer" : 10,
        "Frozen Wand" : 10,
        "Master Loafers" : 10,
    },
    {//22
        "Fact Finder" : 10,
        "Lusty Handaxe" : 10,
        "Ocean Wand" : 10,
        "Foxy Slippers" : 10,
    },
    {//23
        "Fact Finder" : 15,
        "Envy" : 10,
        "Thunder Wand" : 10,
        "Hairy Shoes" : 10,
    },
    {//24
        "Knife Club" : 10,
        "Gluttonous Axe" : 10,
        "Hate Wand" : 10,
        "Lunar Whalers" : 10,
    },
    {//25
        "Knife Club" : 15,
        "Wrath" : 10,
        "Love Wand" : 10,
        "Jay Walkers" : 10,
    },
]
workers.push(eryn);

const lakur = new Worker("Lakur",12000,"Job: Produces Leather");
lakur.produces = {
    "Leather" : 45,
}
lakur.lvlreq = [
    {//unlock
        "The Broominator" : 5,
    },
    {//2
        "Gardening Gloves" : 10,
    },
    {//3
        "Gardening Gloves" : 10,
        "Running Gloves" : 5,
    },
    {//4
        "Gardening Gloves" : 10,
        "Running Gloves" : 10,
    },
    {//5
        "Gardening Gloves" : 10,
        "Running Gloves" : 10,
        "Fighting Gloves" : 5,
    },
    {//6
        "Gardening Gloves" : 15,
        "Running Gloves" : 10,
        "Fighting Gloves" : 5,
    },
    {//7
        "Gardening Gloves" : 15,
        "Running Gloves" : 10,
        "Fighting Gloves" : 10,
    },
    {//8
        "Gardening Gloves" : 15,
        "Running Gloves" : 10,
        "Fighting Gloves" : 10,
        "Cleaning Gloves" : 5,
    },
    {//9
        "Gardening Gloves" : 20,
        "Running Gloves" : 10,
        "Fighting Gloves" : 10,
        "Cleaning Gloves" : 5,
    },
    {//10
        "Gardening Gloves" : 25,
        "Running Gloves" : 15,
        "Fighting Gloves" : 15,
        "Cleaning Gloves" : 10,
    },
    {//11
        "Cleaning Gloves" : 15,
        "Simple Hat" : 5,
        "New Gauntlets" : 5,
        "Hamster Clogs" : 5,
    },
    {//12
        "Punching Gloves" : 5,
        "Simple Hat" : 10,
        "New Gauntlets" : 10,
        "Hamster Clogs" : 10,
    },
    {//13
        "Punching Gloves" : 10,
        "Hidden Mask" : 5,
        "Shiny Gauntlets" : 5,
        "Mage Moccasins" : 5,
    },
    {//14
        "Punching Gloves" : 15,
        "Hidden Mask" : 10,
        "Shiny Gauntlets" : 10,
        "Mage Moccasins" : 10,
    },
    {//15
        "Hugging Gloves" : 5,
        "Black Hat" : 5,
        "Plain Gauntlets" : 5,
        "Druidic Boots" : 5,
    },
    {//16
        "Hugging Gloves" : 10,
        "Black Hat" : 10,
        "Plain Gauntlets" : 10,
        "Druidic Boots" : 10,
    },
    {//17
        "Hugging Gloves" : 15,
        "Beach Hat" : 5,
        "Pristine Gauntlets" : 5,
        "Fighting Stilettos" : 5,
    },
    {//18
        "Dancing Gloves" : 10,
        "Beach Hat" : 10,
        "Pristine Gauntlets" : 10,
        "Fighting Stilettos" : 10,
    },
    {//19
        "Dancing Gloves" : 15,
        "Green Bay Beret" : 5,
        "Challenge Gauntlets" : 5,
        "Bardic Galoshes" : 5,
    },
    {//20
        "Loving Gloves" : 10,
        "Green Bay Beret" : 10,
        "Challenge Gauntlets" : 10,
        "Bardic Galoshes" : 10,
    },
    {//21
        "Loving Gloves" : 15,
        "The Mind Cap" : 10,
        "Fancy Gauntlets" : 10,
        "Master Loafers" : 10,
    },
    {//22
        "Other Gloves" : 10,
        "Ornate Crown" : 10,
        "Old Gauntlets" : 10,
        "Foxy Slippers" : 10,
    },
    {//23
        "Other Gloves" : 15,
        "Spellcasting Hat" : 10,
        "Dark Gauntlets" : 10,
        "Hairy Shoes" : 10,
    },
    {//24
        "Boxing Gloves" : 10,
        "Spoopy Mask" : 10,
        "Dandy Gauntlets" : 10,
        "Lunar Whalers" : 10,
    },
    {//25
        "Boxing Gloves" : 15,
        "All Folks Hat" : 10,
        "Cool Gauntlets" : 10,
        "Jay Walkers" : 10,
    },
]
workers.push(lakur);

const herbie = new Worker("Herbie",30000,"Job: Produces Herbs");
herbie.produces = {
    "Herb" : 40,
}
herbie.lvlreq = [
    {//unlock
        "Cleaning Gloves" : 5,
    },
    {//2
        "Healing Potion" : 10,
    },
    {//3
        "Healing Potion" : 10,
        "Mana Potion": 5,
        },
    {//4
        "Healing Potion" : 10,
        "Mana Potion" : 10,
    },
    {//5
        "Healing Potion" : 10,
        "Mana Potion" : 10,
        "Sleeping Potion" : 5,
    },
    {//6
        "Healing Potion" : 15,
        "Mana Potion" : 10,
        "Sleeping Potion" : 5,
    },
    {//7
        "Healing Potion" : 15,
        "Mana Potion" : 10,
        "Sleeping Potion" : 10,
    },
    {//8
        "Healing Potion" : 15,
        "Mana Potion" : 10,
        "Sleeping Potion" : 10,
        "Coughing Potion" : 5,
    },
    {//9
        "Healing Potion" : 20,
        "Mana Potion" : 10,
        "Sleeping Potion" : 10,
        "Coughing Potion" : 5,
    },
    {//10
        "Healing Potion" : 25,
        "Mana Potion" : 15,
        "Sleeping Potion" : 15,
        "Coughing Potion" : 10,
    },
    {//11
        "Coughing Potion" : 15,
        "Simple Hat" : 5,
        "Basic Wand" : 5,
        "Standard Helmet" : 5,
    },
    {//12
        "Invincibility Potion" : 5,
        "Simple Hat" : 10,
        "Basic Wand" : 10,
        "Standard Helmet" : 10,
    },
    {//13
        "Invincibility Potion" : 10,
        "Hidden Mask" : 5,
        "Forest Wand" : 5,
        "Cobalt Helmet" : 5,
    },
    {//14
        "Invincibility Potion" : 15,
        "Hidden Mask" : 10,
        "Forest Wand" : 10,
        "Cobalt Helmet" : 10,
    },
    {//15
        "Laughing Potion" : 5,
        "Black Hat" : 5,
        "Wind Wand" : 5,
        "Regular Helmet" : 5,
    },
    {//16
        "Laughing Potion" : 10,
        "Black Hat" : 10,
        "Wind Wand" : 10,
        "Regular Helmet" : 10,
    },
    {//17
        "Laughing Potion" : 15,
        "Beach Hat" : 5,
        "Soul Wand" : 5,
        "Super Helmet" : 5,
    },
    {//18
        "Rejuvenating Potion" : 10,
        "Beach Hat" : 10,
        "Soul Wand" : 10,
        "Super Helmet" : 10,
    },
    {//19
        "Rejuvenating Potion" : 15,
        "Green Bay Beret" : 5,
        "Rain Wand" : 5,
        "Mega Helmet" : 5,
    },
    {//20
        "Like Potion" : 10,
        "Green Bay Beret" : 10,
        "Rain Wand" : 10,
        "Mega Helmet" : 10,
    },
    {//21
        "Like Potion" : 15,
        "The Mind Cap" : 10,
        "Frozen Wand" : 10,
        "Skull Helmet" : 10,
    },
    {//22
        "Bitter Potion" : 10,
        "Ornate Crown" : 10,
        "Ocean Wand" : 10,
        "Dark Helmet" : 10,
    },
    {//23
        "Bitter Potion" : 15,
        "Spellcasting Hat" : 10,
        "Thunder Wand" : 10,
        "Whimsical Helmet" : 10,
    },
    {//24
        "Strength Potion" : 10,
        "Spoopy Mask" : 10,
        "Hate Wand" : 10,
        "Magnetized Helmet" : 10,
    },
    {//25
        "Strength Potion" : 15,
        "All Folks Hat" : 10,
        "Love Wand" : 10,
        "Coal Helmut" : 10,
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
        const d4 = $("<div/>").addClass("workerLvl");
        const d5 = $('<div/>').addClass("InitialCost");
        const d6 = $('<div/>').addClass("itemSac");
        if (lvl === 0) {
            d1.html(workerImageReference["hidden"]);
            d2.html("<h3>???</h3>");
            d3.html("Job: ???")
            d4.html("Purchase to unlock!")
        }
        else {
            d1.html(workerImageReference[workers[i].name]);
            d2.html("<h3>"+workers[i].name+"</h3>");
            d3.html(workers[i].description);
            d4.html("Lvl. " + lvl)
        }
        d5.html("Cost: "+workers[i].cost[lvl]+"&nbsp;"+imageReference["Gold"]);
        let craftsLeft = false;
        if (lvl < workers[i].lvlreq.length) {
            for (const [itemName, amt] of Object.entries(workers[i].lvlreq[lvl])) {
                const slot = workers[i].name+"_"+lvl+"_"+itemName;
                if (!(slot in workerSacProgress)) workerSacProgress[slot] = 0;
                const adjAmt = amt - workerSacProgress[slot];
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
    purchaseWorker(e.target.id);
    populateJob();
});

function purchaseWorker(name) {
    const worker = nameToWorker(name);
    const cost = worker.cost[workerProgress[name]];
    if (player.money >= cost) {
        player.money -= cost;
        workerProgress[name] += 1;
        ga('send', 'event', 'Workers', 'upgrade', name);
    }
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
    const success = removeFromInventory(itemName);
    if (success) {
        console.log(workerSacProgress[slot]);
        workerSacProgress[slot] += 1;
        refreshWorkers();
        populateJob();
    }
});