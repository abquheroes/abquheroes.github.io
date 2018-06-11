"use strict";

const $extraInv = $("#extraInv");

class ShopItem {
    constructor(name,id,potentialCosts,count) {
        this.id = id;
        this.costs = potentialCosts;
        this.count = count;
        this.currentCost = {};
    }
    generateCost() {
        const trim = generateUnique(this.costs,this.count);
        for (let i=0;i<trim.length;i++) {
            this.currentcost[trim[i][0]] = trim[i][1];
        }
    }
    get Name() {
        return idToName[this.id];
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

const dungeonTicket = new ShopItem("DT1",[["Knife",5],["Butter Knife",5],["Club",5]],2)

const idToName = {
    "DT1":"Dungeon Ticket 1",
}

const $tickets = $("#ticketShop");

function refreshTickets() {
    $tickets.empty();
    const ticket = $("<div/>").addClass("TicketCard");
    const d1 = $("<div/>").addClass("TicketName").html("Dungeon Ticket 1");
    const d2 = $("<div/>").addClass("TicketImage").html(dungeonImageReference["ticket1"]);
    const d3 = $("<div/>").addClass("TicketCostHeader").html("Cost:");
    const d4 = $("<div/>").addClass("TicketCost").html("500G");
    const b1 = $("<button/>").addClass("buyTicket").html("BUY");
    ticket.append(d1);
    ticket.append(d2);
    ticket.append(d3);
    ticket.append(d4);
    ticket.append(b1);
    $tickets.append(ticket);
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