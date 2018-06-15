//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

const dungeonSlot = [null,null,null];

$dungeonLeft = $("#dungeonLeft");
refreshDungeonSlots();

function refreshDungeonSlots() {
    $dungeonLeft.empty();
    for (let i=0;i<dungeonSlot.length;i++) {
        if (dungeonSlot[i] !== null) {

        }
        else {
            const d1 = $("<div/>").addClass("partyContainer").attr("id",i).html("Empty");
            $dungeonLeft.append(d1);
        }
    }
}

$dungeonLeft.on('click', '.partyContainer', (e) => {
    const partyID = $(e.target).attr("id");
    alert(partyID);
})