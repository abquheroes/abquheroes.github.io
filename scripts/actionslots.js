"use strict";

const slotState = Object.freeze({NEEDMATERIAL:0,CRAFTING:1});

$('#ActionSlots').on("click", "a.ASCancelText", (e) => {
    e.preventDefault();
    const slot = $(e.target).parent().attr("href");
    actionSlotManager.removeSlot(slot);
});

class actionSlot {
    constructor(itemid) {
        this.itemid = itemid;
        this.item = recipeList.idToItem(itemid);
        this.itemname = this.item.name;
        this.craftTime = 0;
        this.maxCraft = this.item.craftTime;
        this.status = slotState.NEEDMATERIAL;
    }
    itemPicName() {
        return this.item.itemPicName();
    }
    craftAdvance(t) {
        if (this.status === slotState.NEEDMATERIAL) this.attemptStart();
        if (this.status !== slotState.CRAFTING) return;
        this.craftTime += t;
        if (this.craftTime > this.maxCraft) {
            this.craftTime = 0;
            Inventory.addToInventory(this.itemid,0);
            this.status = slotState.NEEDMATERIAL;
        }
        this.progress = (this.craftTime/this.maxCraft).toFixed(3)*100+"%";
    }
    timeRemaining() {
        return this.maxCraft-this.craftTime;
    }
    getCost(resource) {
        return this.item.getCost(resource);
    }
    attemptStart() {
        //attempts to consume requried material, if successful start crafting
        if (!ResourceManager.canAffordMaterial(this.item)) return;
        ResourceManager.deductMaterial(this.item);
        this.status = slotState.CRAFTING;
    }
}



const actionSlotManager = {
    maxSlots : 10, /* SET TO 10 FOR TESTING PURPOSES */
    slots : [],
    addSlot(itemid) {
        if (this.slots.length >= this.maxSlots) return;
        if (!ResourceManager.canAffordResources(itemid)) return;
        this.slots.push(new actionSlot(itemid));
        initializeActionSlots();
        refreshResources();
    },
    removeSlot(slot) {
        this.slots.splice(slot,1);
        initializeActionSlots();
        refreshResources();
    },
    hasSlot(slotnum) {
        return this.slots.length > slotnum;
    },
    isEmptySlot() {
        return `<img class='ASEmptyImg' src='images/recipes/noitem.png' /> Empty Slot`;
    },
    asPicName(slotnum) {
        return this.slots[slotnum].itemPicName();
    },
    craftAdvance(t) {
        $.each(this.slots, (i,slot) => {
            slot.craftAdvance(t)
            $("#ASBarFill"+i).css('width', slot.progress);
            if (slot.status === slotState.CRAFTING) $("#ASBar"+i).removeClass("matsNeeded").attr("data-label",msToTime(slot.timeRemaining()));
            else $("#ASBar"+i).addClass("matsNeeded").attr("data-label","Waiting for materials");
        });
    },
    totalCost(resource) {
        if (this.slots.length === 0) return 0;
        return this.slots.map(slot => slot.getCost(resource)).reduce((total,amt) => total + amt);
    }
}

const $ActionSlots = $("#ActionSlots");

function initializeActionSlots() {
    $ActionSlots.empty();
    for (let i=0;i<actionSlotManager.maxSlots;i++) {
        const d = $("<div/>").addClass("ASBlock");
        const d1 = $("<div/>").addClass("ASName");
        if (actionSlotManager.hasSlot(i)) d1.html(actionSlotManager.asPicName(i));
        else d1.html(actionSlotManager.isEmptySlot());
        const d2 = $("<div/>").addClass("ASCancel").attr("id",i);
        const a2 = $("<a/>").addClass("ASCancelText").attr("href",i).html('<i class="tiny material-icons">close</i>')
        if (!actionSlotManager.hasSlot(i)) d2.hide();
        const d3 = $("<div/>").addClass("ASProgressBar").attr("id","ASBar"+i).attr("data-label","");
        const s3 = $("<span/>").addClass("ProgressBarFill").attr("id","ASBarFill"+i);
        d.append(d1,d2.append(a2),d3.append(s3));
        $ActionSlots.append(d);
    }
}