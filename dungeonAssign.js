//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

$dungeonLayout = $("#dungeonLayout");
const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dungeonRun = $("#dungeonRun");
const $dungeonAfter = $("#dungeonAfter");

const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");
const $drTop = $("#drTop");
const $drBottom = $("#drBottom");
const $daTop = $("#daTop");
const $daBottom = $("#daBottom");

class Party {
    constructor (hero1,hero2,hero3) {
        this.heroes = [hero1,hero2,hero3]
        this.floor = 0;
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
    adventuring() {
        return true;
    }
    validTeam() {
        return this.heroList().length > 0;
    }
    advanceFloor() {
        this.floor += 1;
        DungeonAssist.initFloor();
        refreshDungeonGrid();
    }
}

const party = new Party("H999","H999","H999");

loadCorrectDungeonScreen();

function loadCorrectDungeonScreen() {
    if (party.floor === 0) {
        $dungeonTeamSelect.show();
        $dungeonRun.hide();
        $dungeonAfter.hide();
        refreshHeroSelect();
    }
    else if (party.adventuring()) {
        $dungeonTeamSelect.hide();
        $dungeonRun.show();
        $dungeonAfter.hide();
    }
    else {
        $dungeonTeamSelect.hide();
        $dungeonRun.hide();
        $dungeonAfter.show();        
    }
}

function refreshDungeonGrid() {
    $dungeonLayout.empty();
    dungeon.forEach((floor,i) => {
        const d = $("<div/>").addClass("dungeonFloor").html(floor.icon + "&nbsp;&nbsp;Floor "+(i+1));
        if (party.floor < i) d.addClass("dungeonFloorClear");
        else if (party.floor == i) d.addClass("dungeonFloorCurrent");
        $dungeonLayout.append(d);
    });
}

generateDungeon();

function refreshDungeonRunDungeon(party,floorID) {
    /*//make the fucking dungeon jesus
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
    $drBottom.append(d2bot,d3bot);*/
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

function refreshHeroSelect() {
    //builds the div that we hide and can show when we're selecting for that area
    $dtsTop.empty();
    const d1top = $("<div/>").addClass("dtsTopTitle").html("<h3>Assemble your Team!</h3>");
    $dtsTop.append(d1top);
    const d = $("<div/>").addClass("dungeonTeamCollection");
    party.heroes.forEach((hero,i) => {
        const d1 = characterCard(hero,"dungeonTeam",i);
        d.append(d1);
    });
    $dtsTop.append(d);
    const dbutton = $("<div/>").attr("id","dungeonTeamButton").html("LAUNCH");
    $dtsTop.append(dbutton);
    $dtsBottom.empty();
    const d1bot = $("<div/>").addClass("dtsBotTitle").html("<h3>Available Heroes:</h3>");
    $dtsBottom.append(d1bot);
    const d2 = $("<div/>").addClass("dungeonAvailableCollection");
    for (const [heroID, _] of Object.entries(heroBase)) {
        if (memberAvailable(heroID)) {
            const d3 = characterCard(heroID,"dungeonAvailable",heroID);
            d2.append(d3);
        }
    };
    $dtsBottom.append(d2);
}

function characterCard(ID,prefix,dv) {
    const d = $("<div/>").addClass(prefix+"Card").attr("data-value",dv);
    const d1 = $("<div/>").addClass(prefix+"Image").html(heroImageReference[ID]);
    const d2 = $("<div/>").addClass(prefix+"Name").html(heroBase[ID][0]);
    d.append(d1,d2);
    return d;
}

//clicking a hero to remove them from your party
$(document).on('click', "div.dungeonTeamCard", (e) => {
    e.preventDefault();
    const arrayLocation = $(e.currentTarget).attr("data-value");
    party.removeMemberLocation(arrayLocation);
    refreshHeroSelect();
});

//clicking a hero to add them to your party
$(document).on('click', "div.dungeonAvailableCard", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("data-value");
    party.addMember(ID);
    refreshHeroSelect();
});

//locking in a team to start a dungeon
$(document).on('click', "#dungeonTeamButton", (e) => {
    e.preventDefault();
    if (party.validTeam()) {
        party.advanceFloor();
        loadCorrectDungeonScreen();
    }
});

//receives time passed from main loop and rock and rolls
function dungeonAdvance(t) {
    if (party.floor === 0) return;
    DungeonAssist.addTime(t);
}

const DungeonAssist = {
    time : 0,
    beat : 0,
    floor : null,
    initFloor : () => {
        if (party.floor > dungeon.length) {
            this.floor = generateDungeonFloor();
            console.log(this.floor);
        }
        else {
            console.log(dungeon[party.floor]);
            this.floor = dungeon[party.floor-1];
        }
        this.beat = 0;
        this.time = 0;
    },
    addTime : (t) => {
        this.time += t
        if (this.time >= this.floor.beatTime) {
            this.time -= this.floor.beatTime;
            floor.executeBeat(this.beat,party);
            this.beat += 1;
            if (this.beat === floor.beatTotal) party.advanceFloor();
        }
    }
};

const log = [];
const $drLog = $("#drLog");

function addLog(s) {
    log.unshift(s);
    console.log(log);
    if (log.length >= 15) {
        log.splice(-1,1)
    }
    $drLog.empty();
    log.forEach((entry) => {
        const d = $("<div/>").addClass("logEntry").html(entry);
        $drLog.append(d);
    })
}