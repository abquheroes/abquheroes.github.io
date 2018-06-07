"use strict";

class ShopItem {
    constructor(name,id,potentialCosts,count) {
        this.name = name;
        this.id = id;
        this.costs = potentialCosts;
        this.count = costs;
        this.currentCost = {};
    }
    generateCost() {
        const trim = generateUnique(this.costs,this.count);
        for (let i=0;i<trim.length;i++) {
            this.currentcost[trim[i][0]] = trim[i][1];
        }
    }
    get Name() {
        return this.name;
    }
}

function generateUnique(list,count) {
    //take a list of length A, and reduce the list to size count with a look of length A-count
    const a = list.length;
    for (let i=0;i<a-count;i++) {
        const num = Math.floor(Math.random() * list.length);
        list.splice(num,1);
    }
    return list;
}

const shopItems = [];

const dungeonTicket = new ShopItem("Dungeon Ticket 1","DT1",[["Knife",5],["Butter Knife",5],["Club",5]],2)