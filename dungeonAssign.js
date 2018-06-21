//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

const activeTeams = {};

const maxDungeon = 5;

$dungeonTeams = $("#dungeonLeft");
let currentParty = null;

class Party {
    constructor (hero1,hero2,hero3,id) {
        this.heroes = [hero1,hero2,hero3];
        this.floor = 0;
        this.counter = 0;
        this.id = id;
    }
    hasMember(member) {
        for (let i=0;i<this.heroes.length;i++) {
            if (this.heroes[i] === member) return true;
        }
        return false;
    }
    addMember(member) {
        for (let i=0;i<this.heroes.length;i++) {
            if (this.heroes[i] === "H999") {
                this.heroes[i] = member;
                return;
            }
        }
    }
    removeMemberLocation(location) {
        this.heroes.splice(location, 1);
        this.heroes.push("H999");
    }
    heroSort() {
        this.heroes.sort((a, b) => {
            if (a !== "H999" && b === "H999") return -1;
            if (a === "H999" && b !== "H999") return 1;
            return 0;
        });
    }
}

function memberAvailable(member) {
    if (member === "H999") return false;
    for (const [_, team] of Object.entries(activeTeams)) {
        if (team.hasMember(member)) return false;
    }
    if (currentParty.hasMember(member)) return false;
    return true;
}

refreshDungeonSlots();

function refreshDungeonSlots() {
    $dungeonTeams.empty();
    for (let i=0;i<maxDungeon;i++) {
        if (i in activeTeams) {
            const d1 = $("<div/>").addClass("partyContainer").attr("id",i).html("Dungeon " + i);
            $dungeonTeams.append(d1);
        }
        else {
            const d1 = $("<div/>").addClass("partyContainer").attr("id",i).html("Dungeon " + i+ " (Empty)");
            $dungeonTeams.append(d1);
        }
    }
}

$dungeonTeams.on('click', '.partyContainer', (e) => {
    const partyID = $(e.target).attr("id");
    $(".partyContainer").removeClass("partyHighlight");
    $(e.target).addClass("partyHighlight");
    if (partyID in activeTeams) refreshHeroSelect(activeTeams[partyID]);
    else refreshHeroSelect(new Party("H999","H999","H999",partyID))
})

const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");

function refreshHeroSelect(party) {
    currentParty = party; //we need this for when we click stuff to know what we're modifying...
    //builds the div that we hide and can show when we're selecting for that area
    $dtsTop.empty();
    const d1top = $("<div/>").addClass("dtsTopTitle").html("<h3>Assemble your Team!</h3>");
    $dtsTop.append(d1top);
    for (let i=0;i<party.heroes.length;i++) {
        const d = characterCard(party.heroes[i],"dungeonTeam",i);
        $dtsTop.append(d);
    }
    $dtsBottom.empty();
    const d1bot = $("<div/>").addClass("dtsBotTitle").html("<h3>Available Heroes:</h3>");
    $dtsBottom.append(d1bot);
    for (const [heroID, heroProps] of Object.entries(heroBase)) {
        if (memberAvailable(heroID)) {
            const d = characterCard(heroID,"dungeonAvailable",heroID);
            $dtsBottom.append(d);
        }
    }
}

function characterCard(ID,prefix,dv) {
    const d = $("<div/>").addClass(prefix+"Card").attr("data-value",dv);
    const d1 = $("<div/>").addClass(prefix+"Image").html(heroImageReference[ID]);
    const d2 = $("<div/>").addClass(prefix+"Name").html(heroBase[ID][0]);
    d.append(d1,d2);
    return d;
}

$(document).on('click', "div.dungeonTeamCard", (e) => {
    e.preventDefault();
    const arrayLocation = $(e.currentTarget).attr("data-value");
    currentParty.removeMemberLocation(arrayLocation);
    refreshHeroSelect(currentParty);
});

$(document).on('click', "div.dungeonAvailableCard", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("data-value");
    currentParty.addMember(ID);
    refreshHeroSelect(currentParty);
});