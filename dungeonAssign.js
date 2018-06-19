//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

const dungeonSlot = [null,null,null];

$dungeonTeams = $("#dungeonTeams");
refreshDungeonSlots();

class Party {
    constructor (hero1,hero2,hero3,dungeon) {
        this.heroes = [hero1,hero2,hero3];
        this.dungeon = dungeon;
        this.floor = 0;
        this.counter = 0;
    }
    get partySize() {
        let count = 0;
        for (let i=0;i<this.heroes.length;i++) {
            if (this.heroes[i]) count += 1;
        }
        return count;
    }
}

function refreshDungeonSlots() {
    $dungeonTeams.empty();
    for (let i=0;i<dungeonSlot.length;i++) {
        if (dungeonSlot[i] !== null) {

        }
        else {
            const d1 = $("<div/>").addClass("partyContainer").attr("id",i).html("Empty");
            $dungeonTeams.append(d1);
        }
    }
}

$dungeonTeams.on('click', '.partyContainer', (e) => {
    const partyID = $(e.target).attr("id");
    $(".partyContainer").removeClass("partyHighlight");
    $(e.target).addClass("partyHighlight");
    loadTeam(partyID);
})

function loadTeam(partyID) {
    const party = dungeonSlot[partyID];
    if (!party) loadBlank(partyID);
    else loadDungeon(partyID);
}

function loadDungeon(partyID) {

}

function loadBlank(partyID) {

}

const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");

function refreshHeroSelect(ID) {
    const party = dungeonSlot[ID];
    
    //builds the div that we hide and can show when we're selecting for that area
    $dtsTop.empty();
    $dtsBottom.empty();
    const d1top = $("<div/>").addClass("dtsTopTitle").html("<h3>Assemble your Team!</h3>");
    for (let i=0;i<party.heroes.length;i++) {
        const d1top1 = $("<div/>").addClass("dtsTopTitleHero").attr("data-value",1).html(characterCard(this.hero1));
        const d1top1 = $("<div/>").addClass("dtsTopTitleHero").attr("data-value",3).html(characterCard(this.hero2));
    }
}