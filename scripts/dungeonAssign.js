//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

const DungeonState = Object.freeze({"TEAMSELECT":0,"ADVENTURING":1,"DONE":2});

$dungeonLayout = $("#dungeonLayout");

const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dungeonRun = $("#dungeonRun");
const $dungeonAfter = $("#dungeonAfter");

const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");
const $daTop = $("#daTop");
const $daBottom = $("#daBottom");


const DungeonAssist = {
    floorNum : 0,
    floor : null,
    status : DungeonState.TEAMSELECT,
    addTime(t) {
        if (this.status !== DungeonState.ADVENTURING) return;
        //add time to all combatants, if they're ready for combat execute their attack on the opposing team.
        party.heroList().forEach((hero) => {
            if (hero.addTime(t)) hero.attack(this.floor.monster);
        });
        this.floor.monster.forEach((mob) => {
            if (mob.addTime(t)) mob.attack(party.heroList());
        });
        if (party.isDead()) {
            this.status = DungeonState.DONE;
            loadCorrectDungeonScreen();
        }
        if (this.floor.isDead()) {
            this.advanceFloor();
        }
        refreshDungeonFloor();
    },
    advanceFloor() {
        this.floorNum += 1;
        while (this.floorNum > dungeon.length) {
            generateDungeonFloor();
        }
        this.floor = dungeon[this.floorNum-1];
        refreshDungeonGrid();
        refreshDungeonFloor();
    },
};

loadCorrectDungeonScreen();

function loadCorrectDungeonScreen() {
    if (DungeonAssist.status === DungeonState.TEAMSELECT) {
        $dungeonTeamSelect.show();
        $dungeonRun.hide();
        $dungeonAfter.hide();
        refreshHeroSelect();
    }
    else if (DungeonAssist.status === DungeonState.ADVENTURING) {
        $dungeonTeamSelect.hide();
        $dungeonRun.show();
        $dungeonAfter.hide();
        refreshDungeonFloor();
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

function refreshDungeonComplete(party) {
    $drBottom.empty();
    const dungeon = dungeons[party.id];
    const d1 = $("<div/>").addClass("drBottomTitle").html("<h3>"+dungeon.name+" Complete!</h3>");
    const d2 = $("<div/>").addClass("drBottomText").html("Eventually rewards go here but I haven't figured that out yet...");
    const b1 = $("<button/>").addClass("drBottomCompleteButton").attr("id","partyCollect").html("Collect your heroes!");
    $drBottom.append(d1,d2,b1);
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
    const d1 = $("<div/>").addClass(prefix+"Image").html(heroOwnedbyID(ID).image);
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
        DungeonAssist.status = DungeonState.ADVENTURING;
        DungeonAssist.advanceFloor();
        loadCorrectDungeonScreen();
    }
});

//receives time passed from main loop and rock and rolls
function dungeonAdvance(t) {
    if (party.floor === 0) return;
    DungeonAssist.addTime(t);
}

const log = [];
const $drLog = $("#drLog");

function addLog(f,s) {
    log.unshift(s);
    if (log.length >= 15) {
        log.splice(-1,1)
    }
    $drLog.empty();
    log.forEach((entry) => {
        const d = $("<div/>").addClass("logEntry").html("Floor " + f + ": " + entry);
        $drLog.append(d);
    })
}

function createDungeonCard(hero) {
    const d = $("<div/>").addClass("dhc");
    const d1 = $("<div/>").addClass("dhcName").html(hero.name);
    const d2 = heroBars(hero);
    const s = hero.pic();
    const d3 = $("<div/>").addClass("dhcPic").html(s);
    const d4 = $("<div/>").addClass("dhcPow").html(dungeonIcons[Stat.POW]+"&nbsp;&nbsp;"+hero.power());
    d.append(d1,d2,d3,d4)
    return d;
}

function heroBars(hero) {
    //return a div with bars for HP, AP, and Time
    const hpPercent = hero.hp/hero.hpmax;
    const hpWidth = (hpPercent*100).toFixed(1)+"%";
    const d1 = $("<div/>").addClass("hpBarDiv").html(dungeonIcons[Stat.HP]);
    const d1a = $("<div/>").addClass("hpBar").attr("data-label",hero.hp+"/"+hero.hpmax).attr("id","hp"+hero.id);
    const s1 = $("<span/>").addClass("hpBarFill").attr("id","hpFill"+hero.id).css('width', hpWidth);
    d1.append(d1a,s1);
    //AP
    const apPercent = hero.ap/hero.apmax;
    const apWidth = (apPercent*100).toFixed(1)+"%";
    const d2 = $("<div/>").addClass("apBarDiv").html(dungeonIcons[Stat.AP]);
    const d2a = $("<div/>").addClass("apBar").attr("data-label",hero.ap+"/"+hero.apmax).attr("id","ap"+hero.id);
    const s2 = $("<span/>").addClass("apBarFill").attr("id","apFill"+hero.id).css('width', apWidth);
    d2.append(d2a,s2);
    //Act
    const actPercent = hero.act/hero.actmax;
    const actWidth = (actPercent*100).toFixed(1)+"%";
    const actText = round((hero.actmax-hero.act)/1000,1);
    const d3 = $("<div/>").addClass("actBarDiv").html(dungeonIcons[Stat.ACT]);
    const d3a = $("<div/>").addClass("actBar").attr("data-label",actText).attr("id","act"+hero.id);
    const s3 = $("<span/>").addClass("actBarFill").attr("id","actFill"+hero.id).css('width', actWidth);
    d3.append(d3a,s3);
    return $("<div/>").addClass("heroBars").append(d1,d2,d3);
}

$floorID = $("#floorID");
$dungeonHeroList = $("#dungeonHeroList");
$dungeonMonsterList = $("#dungeonMonsterList");

function refreshDungeonFloor() {
    $floorID.html("Floor "+DungeonAssist.floorNum);
    $dungeonHeroList.empty();
    party.heroList().forEach((hero) => {
        $dungeonHeroList.append(createDungeonCard(hero));
    });
    $dungeonMonsterList.empty();
    DungeonAssist.floor.monster.forEach((mob) => {
        $dungeonMonsterList.append(createDungeonCard(mob));
    });
}

const $floorProgressBar = $("#floorProgressBar");
const $floorProgressBarFill = $("#floorProgressBarFill");

function floorBarProgressUpdate(current,total) {
    //get the time left on the floor, with how much passed
    const p = current/total;
    $floorProgressBar.attr("data-label",msToTime(total-current));
    $floorProgressBarFill.css('width',(100-p*100).toFixed(1)+"%");
}