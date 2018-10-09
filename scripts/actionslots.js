"use strict";

const slotState = Object.freeze({NEEDMATERIAL:0,CRAFTING:1});

$('#ActionSlots').on("click", "a.ASCancelText", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const slot = parseInt($(e.target).parent().attr("href"));
    actionSlotManager.removeSlot(slot);
});

$(document).on("click", ".ASBuySlot", (e) => {
    e.preventDefault();
    actionSlotManager.upgradeSlot();
})

$(document).on("click", ".ASauto", (e) => {
    e.preventDefault();
    const slot = $(e.currentTarget).attr("id");
    actionSlotManager.toggleAuto(slot);
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
    createSave() {
        const save = {};
        save.itemid = this.itemid;
        save.craftTime = this.craftTime;
        save.status = this.status;
        return save;
    }
    loadSave(save) {
        this.craftTime = save.craftTime;
        this.status = save.status;
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
            Inventory.craftToInventory(this.itemid);
            this.status = slotState.NEEDMATERIAL;
            this.attemptStart();
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
        if (this.item.isMastered()) {
            this.status = slotState.CRAFTING;
            return;
        }
        if (!ResourceManager.canAffordMaterial(this.item)) return;
        ResourceManager.deductMaterial(this.item);
        this.status = slotState.CRAFTING;
    }
    autoSellToggle() {
        return this.item.autoSellToggle();
    }
    autoSell() {
        return this.item.autoSell;
    }
    refundMaterial() {
        if (this.status !== slotState.CRAFTING) return;
        ResourceManager.refundMaterial(this.item);
    }
}

const actionSlotManager = {
    maxSlots : 1,
    slots : [],
    createSave() {
        const save = {};
        save.maxSlots = this.maxSlots;
        save.slots = [];
        this.slots.forEach(s => {
            save.slots.push(s.createSave());
        })
        return save;
    },
    loadSave(save) {
        this.maxSlots = save.maxSlots;
        save.slots.forEach(s => {
            const slot = new actionSlot(s.itemid)
            slot.loadSave(s);
            this.slots.push(slot);
        });
    },
    addSlot(itemid) {
        if (this.slots.length >= this.maxSlots) {
            Notifications.slotsFull();
            return;
        }
        const item = recipeList.idToItem(itemid);
        if (!WorkerManager.canCurrentlyCraft(item)) {
            Notifications.craftWarning();
            return;
        }
        this.slots.push(new actionSlot(itemid));
        initializeActionSlots();
        refreshSideWorkers();
        recipeCanCraft();
    },
    removeSlot(slot) {
        this.slots[slot].refundMaterial();
        this.slots.splice(slot,1);
        initializeActionSlots();
        refreshSideWorkers();
        recipeCanCraft();
    },
    removeID(itemID) {
        const num = this.slots.findIndex(a=>a.itemid === itemID);
        this.slots.splice(num, 1);
        refreshSideWorkers();
        initializeActionSlots();
        recipeCanCraft();
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
    itemList() {
        return this.slots.map(slot => slot.item);
    },
    upgradeSlot() {
        if (this.maxSlots === 5) return;
        const amt = miscLoadedValues.asCost[actionSlotManager.maxSlots];
        if (ResourceManager.materialAvailable("M001") < amt) {
            Notifications.cantAffordSlot();
            return;
        }
        ResourceManager.deductMoney(amt);
        this.maxSlots += 1;
        initializeActionSlots();
    },
    autoSell(i) {
        if (this.slots.length <= i) return "";
        return this.slots[i].autoSell();
    },
    toggleAuto(i) {
        this.slots[i].autoSellToggle();
        initializeActionSlots();
    },
    isMastered(i) {
        if (i >= this.slots.length) return false;
        return this.slots[i].item.isMastered();
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
        const a2 = $("<a/>").addClass("ASCancelText").attr("href",i).html('<i class="fas fa-times"></i>')
        if (!actionSlotManager.hasSlot(i)) d2.hide();
        const d3 = $("<div/>").addClass("ASProgressBar").attr("id","ASBar"+i).attr("data-label","");
        const s3 = $("<span/>").addClass("ProgressBarFill").attr("id","ASBarFill"+i);
        if (actionSlotManager.isMastered(i)) s3.addClass("ProgressBarFillMaster");
        let autoSellTooltip;
        actionSlotManager.autoSell(i) !== "None" ? autoSellTooltip = actionSlotManager.autoSell(i) + " and lesser rarities" : autoSellTooltip = "None";
        const d4 = $("<div/>").addClass("ASauto tooltip").attr("data-tooltip", `Toggle Autosell: ${autoSellTooltip}`).attr("id",i).html(`<i class="fas fa-dollar-sign"></i>`);
        if (actionSlotManager.autoSell(i) !== "None") d4.addClass("ASautoEnabled"+actionSlotManager.autoSell(i));
        if (!actionSlotManager.hasSlot(i)) d4.hide();
        d.append(d1,d2.append(a2),d3.append(s3),d4);
        $ActionSlots.append(d);
    }
    if (actionSlotManager.maxSlots < 5) {
        const d4 = $("<div/>").addClass("ASBuySlot");
        const amt = miscLoadedValues.asCost[actionSlotManager.maxSlots];
        const d5 = $("<div/>").addClass("ASBuySlotText").html(`Purchase Action Slot`);
        const d6 = $("<div/>").addClass("ASBuySlotCost").html(`${miscIcons.gold}&nbsp;&nbsp;${amt}`);
        d4.append(d5, d6);
        $ActionSlots.append(d4);
    }
}