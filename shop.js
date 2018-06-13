"use strict";

const $extraInv = $("#extraInv");

const idToName = {
    "DT1":"Dungeon Ticket 1",
}

class ShopItem {
    constructor(id,potentialCosts,count,goldCost) {
        this.id = id;
        this.costs = potentialCosts;
        this.count = count;
        this.currentCost = {};
        this.goldCost = goldCost;
        this.name = idToName[this.id];
        this.image = dungeonImageReference[this.id];
    }
    /*generateCost() {
        const trim = generateUnique(this.costs,this.count);
        for (let i=0;i<trim.length;i++) {
            this.currentcost[trim[i][0]] = trim[i][1];
        }
    }*/
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

const dungeonTicket = new ShopItem("DT1",[],0,500);
shopItems.push(dungeonTicket);



const $tickets = $("#ticketShop");

function refreshTickets() {
    $tickets.empty();
    console.log(shopItems);
    for (let i=0;i<shopItems.length;i++) {
        console.log(shopItems[i]);
        const ticket = $("<div/>").addClass("TicketCard");
        const d1 = $("<div/>").addClass("TicketName").html(shopItems[i].name);
        const d2 = $("<div/>").addClass("TicketImage").html(shopItems[i].image);
        const d3 = $("<div/>").addClass("TicketCost").html(imageReference["Gold"] + "&nbsp;&nbsp;" + shopItems[i].goldCost);
        const b1 = $("<button/>").addClass("buyTicket").html("BUY");
        ticket.append(d1);
        ticket.append(d2);
        ticket.append(d3);
        ticket.append(b1);
        $tickets.append(ticket);
    }
}

$tickets.on("click", ".buyTicket", (e) => {
    e.preventDefault();
    console.log('ticket bought');
    if (player.money > 500) {
        player.money -= 500;
        addExtraInventory("DT1",1);
    }
});


function addExtraInventory(name,amt) {
    amt = amt || 1;
    if (name in player.extraInventory) player.extraInventory[name] += amt;
    else player.extraInventory[name] = amt;
    refreshExtraInventory();
}

function refreshExtraInventory() {
    $extraInv.empty();
    for (const [item, amt] of Object.entries(player.extraInventory)) {
        const d1 = $("<div/>").addClass("extraItem").html(imageReference[item]+"&nbsp;&nbsp;"+amt);
        $extraInv.append(d1);
    }
}