//screen has "party slots"
//first you assign from a dungeon you have access to
//then you assign heroes by clicking on the slot?
//build adventure groups so dungeons.js can automate it

const DungeonState = Object.freeze({"TEAMSELECT":0,"ADVENTURING":1});

const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dungeonRun = $("#dungeonRun");
const $dungeonAfter = $("#dungeonAfter");

const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");
const $daTop = $("#daTop");
const $daBottom = $("#daBottom");

const $DungeonSideBarStatus = $("#DungeonSideBarStatus");
const $DungeonSideBarTeam = $("#DungeonSideBarTeam");

const DungeonAssist = {
    floorNum : 0,
    maxfloor : -1,
    floor : null,
    dropList : [],
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
            this.status = DungeonState.TEAMSELECT;
            EventManager.addEventDungeon(this.dropList);
            this.resetDungeon();
            loadCorrectDungeonScreen();
            $DungeonSideBarStatus.html("Status: Idle");
            return;
        }
        else if (this.floor.isDead()) {
            this.advanceFloor();
        }
        refreshDungeonFloorBars();
    },
    advanceFloor() {
        //if (this.maxfloor === this.floorNum) DungeonAssist.checkOneTimeDrops(this.floorNum);
        this.floorNum += 1;
        this.maxfloor = Math.max(this.maxfloor,this.floorNum);
        this.floor = new Floor(this.floorNum);
        initiateDungeonFloor();
        $DungeonSideBarStatus.html("Status: Floor " + this.floorNum);
    },
    isActive() {
        return this.status === DungeonState.ADVENTURING;
    },
    resetDungeon() {
        this.floor = null;
        this.floorNum = 0;
        this.dropList = [];
    },
    addDungeonDrop(drop,amt) {
        const found = this.dropList.find(d => d.id === drop)
        if (found === undefined) this.dropList.push({"id":drop,"amt":amt});
        else found.amt += amt;
    }
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
        initiateDungeonFloor();
    }
}


function refreshHeroSelect() {
    //builds the div that we hide and can show when we're selecting for that area
    $dtsTop.empty();
    const d1top = $("<div/>").addClass("dtsTopTitle").html("<h3>Assemble your Team!</h3>");
    $dtsTop.append(d1top);
    const d = $("<div/>").addClass("dungeonTeamCollection");
    party.heroes.forEach((hero,i) => {
        const d1 = characterCard("dungeonTeam",i,hero);
        d.append(d1);
    });
    for (let i=0;i<party.emptyPartySlots();i++) {
        const d1a = characterCard("dungeonTeam",i);
        d.append(d1a);
    }
    $dtsTop.append(d);
    const dbutton = $("<div/>").attr("id","dungeonTeamButton").html("LAUNCH");
    $dtsTop.append(dbutton);
    $dtsBottom.empty();
    const d1bot = $("<div/>").addClass("dtsBotTitle").html("<h3>Available Heroes:</h3>");
    $dtsBottom.append(d1bot);
    const d2 = $("<div/>").addClass("dungeonAvailableCollection");
    HeroManager.ownedHeroes().forEach(hero => {
        if (!party.hasMember(hero.id)) {
            const d3 = characterCard("dungeonAvailable",hero.id,hero.id);
            d2.append(d3);  
        }
    });
    $dtsBottom.append(d2);
    //update the sidebar!
    $DungeonSideBarTeam.empty();
    party.heroList().forEach(hero => {
        const d3 = $("<div/>").addClass("dungeonSideBarMember");
        const d3a = $("<div/>").addClass("dungeonSideBarMemberIcon").html(hero.head);
        const d3b = $("<div/>").addClass("dungeonSideBarMemberHP").html(sidebarHP(hero));
        d3.append(d3a,d3b);
        $DungeonSideBarTeam.append(d3);
    });
}

function characterCard(prefix,dv,ID) {
    const d = $("<div/>").addClass(prefix+"Card").attr("data-value",dv);
    if (!ID) {
        const d1a = $("<div/>").addClass(prefix+"Image").html('<img src="images/heroes/blank.png">');
        const d2a = $("<div/>").addClass(prefix+"Name").html("Empty");
        return d.append(d1a,d2a);
    }
    const hero = HeroManager.idToHero(ID);
    const d1 = $("<div/>").addClass(prefix+"Image").html(hero.image);
    const d2 = $("<div/>").addClass(prefix+"Name").html(hero.name);
    const d3 = createHPBar(hero,"Party");    
    return d.append(d1,d2,d3);
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

const $floorID = $("#floorID");
const $dungeonHeroList = $("#dungeonHeroList");
const $dungeonMobList = $("#dungeonMobList");
const $drStatsHero = $("#drStatsHero");
const $drStatsMob = $("#drStatsMob");

function initiateDungeonFloor() {
    $floorID.html("Floor "+DungeonAssist.floorNum);
    $dungeonHeroList.empty();
    $dungeonMobList.empty();
    $drStatsHero.empty();
    $drStatsMob.empty();
    party.heroList().forEach((hero) => {
        const d1 = $("<div/>").addClass("dfc");
        const d1c = $("<div/>").addClass("dfcName").html(hero.name);
        const d1b = $("<div/>").addClass("dfcImage").html(hero.image);
        const d1a = $("<div/>").addClass("dfcBar").html(createActBar(hero))
        d1.append(d1a,d1b,d1c);
        $dungeonHeroList.append(d1);
        const d2 = $("<div/>").addClass("dsc");
        const d2a = $("<div/>").addClass("dscPic").html(hero.head);
        const d2b = $("<div/>").addClass("dscName").html(hero.name);
        const d2c = $("<div/>").addClass("dscHP").html(createHPBar(hero,"Dung"));
        const d2d = $("<div/>").addClass("dscAP").html(createAPBar(hero,"Dung"));
        d2.append(d2a,d2b,d2c,d2d);
        $drStatsHero.append(d2);
    });
    DungeonAssist.floor.monster.forEach((mob) => {
        const d3 = $("<div/>").addClass("dfm");
        const d3c = $("<div/>").addClass("dfmName").html(mob.name);
        const d3b = $("<div/>").addClass("dfmImage").html(mob.image);
        const d3a = $("<div/>").addClass("dfmBar").html(createActBar(mob))
        d3.append(d3a,d3b,d3c);
        $dungeonMobList.append(d3);
        const d4 = $("<div/>").addClass("dsm");
        const d4a = $("<div/>").addClass("dsmPic").html(mob.head);
        const d4b = $("<div/>").addClass("dsmName").html(mob.name);
        const d4c = $("<div/>").addClass("dsmHP").html(createHPBar(mob,"Dung"));
        const d4d = $("<div/>").addClass("dsmAP").html(createAPBar(mob,"Dung"));
        d4.append(d4a,d4b,d4c,d4d);
        $drStatsMob.append(d4);
    });
}

function refreshDungeonFloorBars() {
    party.heroList().forEach((hero) => {
        refreshAPBar(hero);
        refreshActBar(hero);
    });
    DungeonAssist.floor.monster.forEach((mob) => {
        refreshAPBar(mob);
        refreshActBar(mob);
    });
}

function sidebarHP(hero) {
    const hpPercent = hero.hp/hero.maxHP();
    const hpWidth = (hpPercent*100).toFixed(1)+"%";
    const d1 = $("<div/>").addClass("dsbhpBarDiv").html(dungeonIcons[Stat.HP]);
    const d1a = $("<div/>").addClass("dsbhpBar").attr("data-label",hero.hp+"/"+hero.maxHP()).attr("id","hpSide"+hero.id);
    const s1 = $("<span/>").addClass("dsbhpBarFill").attr("id","hpFillSide"+hero.id).css('width', hpWidth);
    return d1.append(d1a,s1);
}

function createHPBar(hero,tag) {
    const hpPercent = hero.hp/hero.maxHP();
    const hpWidth = (hpPercent*100).toFixed(1)+"%";
    const d1 = $("<div/>").addClass("hpBarDiv").html(dungeonIcons[Stat.HP]);
    const d1a = $("<div/>").addClass("hpBar").attr("data-label",hero.hp+"/"+hero.maxHP()).attr("id","hp"+tag+hero.id);
    const s1 = $("<span/>").addClass("hpBarFill").attr("id","hpFill"+tag+hero.id).css('width', hpWidth);
    return d1.append(d1a,s1);
}

function createActBar(hero) {
    const actPercent = hero.act/hero.actmax();
    const actWidth = (actPercent*100).toFixed(1)+"%";
    const actText = round((hero.actmax()-hero.act)/1000,1);
    const d = $("<div/>").addClass("actBarDiv").html(dungeonIcons[Stat.ACT]);
    const d1 = $("<div/>").addClass("actBar").attr("data-label",actText).attr("id","act"+hero.id);
    const s1 = $("<span/>").addClass("actBarFill").attr("id","actFill"+hero.id).css('width', actWidth);
    return d.append(d1,s1);
}

function createAPBar(hero) {
    const apPercent = hero.ap/hero.apmax;
    const apWidth = (apPercent*100).toFixed(1)+"%";
    const d = $("<div/>").addClass("apBarDiv").html(dungeonIcons[Stat.AP]);
    const d1 = $("<div/>").addClass("apBar").attr("data-label",hero.ap+"/"+hero.apmax).attr("id","ap"+hero.id);
    const s1 = $("<span/>").addClass("apBarFill").attr("id","apFill"+hero.id).css('width', apWidth);
    return d.append(d1,s1);
}

function refreshHPBar(hero) {
    const hpPercent = hero.hp/hero.maxHP();
    const hpWidth = (hpPercent*100).toFixed(1)+"%";
    $("#hpParty"+hero.id).attr("data-label",hero.hp+"/"+hero.maxHP());
    $("#hpFillParty"+hero.id).css('width', hpWidth);
    $("#hpDung"+hero.id).attr("data-label",hero.hp+"/"+hero.maxHP());
    $("#hpFillDung"+hero.id).css('width', hpWidth);
    $("#hpSide"+hero.id).attr("data-label",hero.hp+"/"+hero.maxHP());
    $("#hpFillSide"+hero.id).css('width', hpWidth);
}

function refreshAPBar(hero) {
    const apPercent = hero.ap/hero.apmax;
    const apWidth = (apPercent*100).toFixed(1)+"%";
    const d = $("<div/>").addClass("apBarDiv").html(dungeonIcons[Stat.AP]);
    const d1 = $("<div/>").addClass("apBar").attr("data-label",hero.ap+"/"+hero.apmax).attr("id","ap"+hero.id);
    const s1 = $("<span/>").addClass("apBarFill").attr("id","apFill"+hero.id).css('width', apWidth);
    $("#ap"+hero.id).attr("data-label",hero.ap+"/"+hero.apmax);
    $("#apFill"+hero.id).css('width', apWidth);
}

function refreshActBar(hero) {
    const actPercent = hero.act/hero.actmax();
    const actWidth = (actPercent*100).toFixed(1)+"%";
    const actText = round((hero.actmax()-hero.act)/1000,1);
    $("#act"+hero.id).attr("data-label",actText);
    $("#actFill"+hero.id).css('width', actWidth);
}