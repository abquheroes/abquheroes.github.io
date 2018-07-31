"use strict";

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
    }
    itemPicName() {
        return this.item.itemPicName();
    }
    craftAdvance(t) {
        this.craftTime += t;
        if (this.craftTime > this.maxCraft) {
            this.craftTime = 0;
        }
        this.progress = (this.craftTime/this.maxCraft).toFixed(3)*100+"%";
    }
    timeRemaining() {
        return this.maxCraft-this.craftTime;
    }
    getCost(resource) {
        return this.item.getCost(resource);
    }
}



const actionSlotManager = {
    maxSlots : 2,
    slots : [],
    addSlot(itemid) {
        if (this.slots.length >= this.maxSlots) return;
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
    asPicName(slotnum) {
        return this.slots[slotnum].itemPicName();
    },
    craftAdvance(t) {
        $.each(this.slots, (i,slot) => {
            slot.craftAdvance(t)
            $("#ASBarFill"+i).css('width', slot.progress);
            $("#ASBar"+i).attr("data-label",msToTime(slot.timeRemaining()));
        });
    },
    totalCost(resource) {
        if (this.slots.length === 0) return 0;
        return this.slots.map(slot => slot.getCost(resource)).reduce((total,amt) => total + amt);
    }
}


//<a href="1" class="ASCancelText"><i class="tiny material-icons">close</i></a></div>
//<div class="ASCancel" id="ASCancel1">
//<div class="ASName hidden" id="ASName1"></div>
//<div class="ASProgressBar hidden" data-label="Waiting for Resources..." id="c1pbLabel"><span class="ProgressBarFill" id="c1pb"></span></div>
//</div>

const $ActionSlots = $("#ActionSlots");

function initializeActionSlots() {
    $ActionSlots.empty();
    for (let i=0;i<actionSlotManager.maxSlots;i++) {
        const d = $("<div/>").addClass("ASBlock");
        const d1 = $("<div/>").addClass("ASName");
        if (actionSlotManager.hasSlot(i)) d1.html(actionSlotManager.asPicName(i));
        else d1.html("Empty");
        const d2 = $("<div/>").addClass("ASCancel").attr("id",i);
        const a2 = $("<a/>").addClass("ASCancelText").attr("href",i).html('<i class="tiny material-icons">close</i>')
        if (!actionSlotManager.hasSlot(i)) d2.hide();
        const d3 = $("<div/>").addClass("ASProgressBar").attr("id","ASBar"+i).attr("data-label","");
        const s3 = $("<span/>").addClass("ProgressBarFill").attr("id","ASBarFill"+i);
        d.append(d1,d2.append(a2),d3.append(s3));
        $ActionSlots.append(d);
    }
}




/*function refreshActionSlots() {
    for (let i=0;i<actionSlotManager.maxSlots;i++) {

        if (i === asState.length) { //aka we dn't have a state for a slot, probably just bought...
            asState.push("Empty");
            pbValue.push(0);
            pbValueCurrent.push(0);
            pbLabelText.push("");
            pbLabelTextCurrent.push("");
            $asParts[i].block.removeClass("none");
        }
        if (player.actionSlots[i].actionType !== asState[i] || hardRefresh) { //aka we changed states...
            if (player.actionSlots[i].actionType === "Empty") {
                $asParts[i].type.html("Empty");
                $asParts[i].cancel.addClass("hidden");
                $asParts[i].name.addClass("hidden");
                $asParts[i].pbLabel.addClass("hidden");
            }
            else if (player.actionSlots[i].actionType === "Job") {
                $asParts[i].type.html("Job");
                $asParts[i].cancel.removeClass("hidden");
                const name = imageReference[player.actionSlots[i].actionName] + "&nbsp;" + player.actionSlots[i].actionName;
                const resourcesProduced = getJobValue(player.actionSlots[i].actionName);
                let s = ""
                for (const [name,value] of Object.entries(resourcesProduced)) {
                    s += imageReference[name]+" "+value;
                }
                $asParts[i].name.removeClass("hidden").html(name);
                $asParts[i].name.append("</br>"+ s);
                $asParts[i].pbLabel.removeClass("hidden")
            }
            else if (player.actionSlots[i].actionType === "Craft") {
                $asParts[i].type.html("Craft");
                $asParts[i].cancel.removeClass("hidden");
                const name = imageReference[player.actionSlots[i].actionName] + "&nbsp;" + player.actionSlots[i].actionName;
                $asParts[i].name.removeClass("hidden").html(name);
                $asParts[i].pbLabel.removeClass("hidden")
            }
            asState[i] = player.actionSlots[i].actionType;
        }
        if (pbValueCurrent[i] !== pbValue[i]) {
            $asParts[i].pb.css('width', pbValue[i]);
            pbValueCurrent[i] = pbValue[i];
        }
        if (pbLabelTextCurrent[i] !== pbLabelText[i]) {
            $asParts[i].pbLabel.attr("data-label",pbLabelText[i])
            pbLabelTextCurrent[i] = pbLabelText[i];
        }
    }
}*/