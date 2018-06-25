//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

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
        if (this.dungeonComplete()) return false;
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
    advanceFloor() {
        this.floor += 1;
    }
    dungeonComplete() {
        return dungeons[this.id].floors.length == this.floor;
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
            const party = activeTeams[i];
            if (party.dungeonComplete()) {
                const d1a = $("<div/>").addClass("partyContainer").attr("id",i).html(dungeons[i].name+" (Complete!)");
                $dungeonTeams.append(d1a);
            }
            else {
                const d1b = $("<div/>").addClass("partyContainer").attr("id",i).html(dungeons[i].name);
                $dungeonTeams.append(d1b);
            }
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
    if (partyID in activeTeams) refreshDungeonRun(activeTeams[partyID]);
    else refreshHeroSelect(partyID);
})

const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");
const $drTop = $("#drTop");
const $drBottom = $("#drBottom");

function refreshDungeonRunHeroes(party) {
    $drTop.empty();
    const d1top = $("<div/>").addClass("drTopTitle").html("<h3>Current Team</h3>");
    $drTop.append(d1top);
    party.heroList().forEach((hero) => {
        const d = characterCardHP(hero);
        $drTop.append(d);
    })
}

function refreshDungeonRunDungeon(party,floorID) {
    if (party.dungeonComplete()) {
        refreshDungeonComplete(party);
        return;
    }
    //make the fucking dungeon jesus
    const dungeon = dungeons[party.id];
    floorID = floorID || party.floor;
    const floor =  dungeon.floors[floorID];
    const d1bot = $("<div/>").addClass("drBottomTitle").html("<h3>"+dungeon.name+"</h3>");
    $drBottom.empty();
    $drBottom.append(d1bot);
    dungeon.floors.forEach((floor,count) => {
        const d = $("<div/>").addClass("floorCard").attr("floor-id",count).html(dungeonImageReference[floor.type]);
        if (count === party.floor) d.addClass("floorCurrent");
        else if (count > party.floor) d.addClass("floorPast");
        $drBottom.append(d);
    });
    const d2bot = $("<div/>").addClass("drBottomFloorTitle").html("<h3>Floor "+floorID+" - " + floor.type+"</h3>");
    const d3bot = $("<div/>").addClass("drBottomFloorDesc").html("Stat: "+floor.content+" Difficulty: "+floor.difficulty);
    $drBottom.append(d2bot,d3bot);
}

function refreshDungeonComplete(party) {
    $drBottom.empty();
    const dungeon = dungeons[party.id];
    const d1 = $("<div/>").addClass("drBottomTitle").html("<h3>"+dungeon.name+" Complete!</h3>");
    const d2 = $("<div/>").addClass("drBottomText").html("Eventually rewards go here but I haven't figured that out yet...");
    const b1 = $("<button/>").addClass("drBottomCompleteButton").attr("id","partyCollect").html("Collect your heroes!");
    $drBottom.append(d1,d2,b1);
}


function refreshDungeonRun(party) {
    $("#dungeonTeamSelect").hide();
    $("#dungeonRun").show();
    refreshDungeonRunHeroes(party);
    refreshDungeonRunDungeon(party);
}


function refreshHeroSelect(partyID) {
    $("#dungeonTeamSelect").show();
    $("#dungeonRun").hide();
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

function characterCardHP(hero) {
    const d = $("<div/>").addClass("drHeroCard").attr("data-value",hero.id);
    const d1 = $("<div/>").addClass("drHeroName").html(hero.name);
    const d2 = $("<div/>").addClass("drHeroImage").html(heroImageReference[hero.id]);
    const d3 = $("<div/>").addClass("drHeroHP").html("HP: " + hero.hp);
    d.append(d1,d2,d3);
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
    refreshDungeonRun(currentParty)
    refreshDungeonSlots();
})

$(document).on('click','#partyCollect',(e)=> {
    //delete the party and release everyone back in the wild! refresh dungeon, and also refresh party screen for nothing there
    e.preventDefault();
    const partyID = currentParty.id;
    currentParty = null;
    delete activeTeams[partyID];
    refreshDungeonSlots();
    refreshHeroSelect(partyID);
})

//code to look at other floors if you're so inclined....
/*$(document).on('click',"div.floorCard",(e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("floor-id");
    refreshDungeonRunDungeon(currentParty,ID);
})*/

//receives time passed from main loop and rock and rolls
function dungeonAdvance(t) {
    for (const [_, party] of Object.entries(activeTeams)) {
        if (party.timePulse(t)) {
            if(party.getFloor().attempt(party)) { //attempts the floor, returns true if we proceed
                party.advanceFloor();
            }
            if (currentParty === party) refreshDungeonRunDungeon(party);
            refreshDungeonSlots();
        }
    }
}

function randomNormal(a,b) {
    const adj = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3
    const adjFull = (b*(1+adj)+a*(1-adj))/2
    return Math.round(adjFull);
}