"use strict";

function craftAdvance() {
    
}

$('#ActionSlots').on("click", "a.ASCancelText", (e) => {
    e.preventDefault();
    const slot = $(e.target).parent().attr("href")-1;
    if(player.actionSlots[slot].actionType === "Craft" && player.actionSlots[slot].actionTime > 0) itemRefund(player.actionSlots[slot].actionName);
    player.actionSlots[slot].actionTime = 0;
    refreshWorkers();
});

class actionSlot {
    constructor(id,itemid) {
        this.id = id;
        this.itemid = itemid;
        this.item = recipeList.idToItem(id);
        this.itemname = this.item.name;
        this.craftTime = 0;
        this.maxCraft = this.item.craftTime;
    }    
}

const actionSlotManager = {
    maxSlots : 1,
    slots : [],
    addSlot(itemid) {
        if (this.slots.length >= this.maxSlots) return;
        slots.push(new actionSlot("A"+lots.length,itemid));
    },
    removeSlot(slotid) {
        for (let i=0;i<slots.length;i++) {
            if (slots[i].id === slotid) {
                slots.splice(i,1);
                return;
            }
        }
    },
    hasSlot(slotnum) {
        return this.slots.length > slotnum;
    },
    asName(slotnum) {
        return this.slots[slotnum].itemname;
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
        const d = $("<div/>").addClass("ASBlock").attr("id","ASBlock"+i);
        const d1 = $("<div/>").addClass("ASName").attr("id","ASName"+i);
        if (actionSlotManager.hasSlot(i)) d1.html(actionSlotManager.asName(i));
        else d1.html("Empty");
        const d2 = $("<div/>").addClass("ASCancel").attr("id","ASCancel"+i);
        const a2 = $("<a/>").addClass("ASCancelText").attr("href",i).html('<i class="tiny material-icons">close</i>')
        const d3 = $("<div/>").addClass("ASProgressBar").attr("id","ASBar"+i).attr("data-label","Idle");
        const s3 = $("<span/>").addClass("ASProgressBarFill").attr("id","ASBarFill"+i);
        d.append(d1,d2.append(a2),d3.append(d3));
        $ActionSlots.append(d);
    }
}


$('#tabs-1').on("click", "a.addCraft", (e) => {
    e.preventDefault();
    addCraft(e.target.text);
});

function visualActionSlot() {

}

function refreshActionSlots() {
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
}