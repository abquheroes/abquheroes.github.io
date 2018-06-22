//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

const PartyState = Object.freeze({"IDLE":0, "CLEARING":1,});

const activeTeams = {};

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
    timePulse(t) {
        this.counter += t;
        if (this.counter >= 2000) {
            this.counter -= 2000;
            return true;
        }
        return false;
    }
    partyRoll(stat) {
        let total = 0;
        this.heroList().forEach((hero) => {
            total += hero.roll(stat);
        });
        return total;
    }
    damageParty(dmg) {
        this.heroList().forEach((hero) => {
            hero.takeDamage(dmg);
        })
    }
    heroList() {
        const hList = [];
        this.heroes.forEach((heroID) => {
            if (heroID !== "H999") hList.push(heroOwnedbyID(heroID));
        });
        return hList
    }
    getFloor() {
        return dungeons[this.id].floors[this.floor];
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
    for (let i=0;i<dungeons.length;i++) {
        if (i in activeTeams) {
            const d1 = $("<div/>").addClass("partyContainer").attr("id",i).html(dungeons[i].name);
            $dungeonTeams.append(d1);
        }
        else {
            const d1 = $("<div/>").addClass("partyContainer").attr("id",i).html(dungeons[i].name+ " (Empty)");
            $dungeonTeams.append(d1);
        }
    }
}

$dungeonTeams.on('click', '.partyContainer', (e) => {
    const partyID = $(e.target).attr("id");
    $(".partyContainer").removeClass("partyHighlight");
    $(e.target).addClass("partyHighlight");
    if (partyID in activeTeams) refreshHeroSelect(activeTeams[partyID]);
    else refreshHeroSelect(partyID);
})

const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");

function refreshHeroSelect(partyID) {
    if (partyID) currentParty = new Party("H999","H999","H999",partyID);
     //we need this for when we click stuff to know what we're modifying...
    //builds the div that we hide and can show when we're selecting for that area
    $dtsTop.empty();
    const d1top = $("<div/>").addClass("dtsTopTitle").html("<h3>Assemble your Team!</h3>");
    $dtsTop.append(d1top);
    for (let i=0;i<currentParty.heroes.length;i++) {
        const d = characterCard(currentParty.heroes[i],"dungeonTeam",i);
        $dtsTop.append(d);
    }
    const dbutton = $("<div/>").attr("id","dungeonTeamButton").html("LAUNCH");
    $dtsTop.append(dbutton);
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
    refreshHeroSelect();
});

$(document).on('click', "div.dungeonAvailableCard", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("data-value");
    currentParty.addMember(ID);
    refreshHeroSelect();
});

$(document).on('click',"#dungeonTeamButton",(e)=> {
    e.preventDefault();
    activeTeams[currentParty.id] = currentParty;
    currentParty = null;
    refreshDungeonSlots();
})

//receives time passed from main loop and rock and rolls
function dungeonAdvance(t) {
    for (const [_, party] of Object.entries(activeTeams)) {
        if (party.timePulse(t)) {
            party.getFloor().attempt(party);
        }
    }
}

function randomNormal(a,b) {
    const adj = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3
    const adjFull = (b*(1+adj)+a*(1-adj))/2
    return Math.round(adjFull);
}