/*Dungeons consist of three sets of screens:
Clicking on the "Adventures" tab will relocate to the dungeon screen.
This screen JUST has a list of dungeons on it. You can see the progress
of any dungeon (as well as which are available).

Clicking on a dungeon WITHOUT a team brings you to the party selection
screen, where you can select party members for this dungeon. Confirming
a party locks it in and begins the dungeon and brings you to third screen

Adventure screen! Get here by clicking on a dungeon with a group or confirming
a group...
*/

const $dungeonSelect = $("#dungeonSelect");
const $dungeonTeamSelect = $("#dungeonTeamSelect");
const $dungeonRun = $("#dungeonRun");

const $dtsTop = $("#dtsTop");
const $dtsBottom = $("#dtsBottom");
const $daTop = $("#daTop");
const $daBottom = $("#daBottom");

const $DungeonSideBarStatus = $("#DungeonSideBarStatus");
const $DungeonSideBarTeam = $("#DungeonSideBarTeam");

const $dsd1 = $("#dsd1");

//click on a dungeon to start making a team!
$(document).on("click", "#dungeon1", (e) => {
    e.preventDefault();
    $dungeonSelect.hide();
    if (DungeonManager.dungeonStatus("d1")) {
        DungeonManager.dungeonView = "d1";
        initiateDungeonFloor();
        $dungeonRun.show();
    }
    else {
        refreshHeroSelect("d1");
        DungeonManager.dungeonCreatingID = "d1";
        $dungeonTeamSelect.show();
    }
});

//clicking a hero to remove them from your party
$(document).on('click', "div.dungeonTeamCardClick", (e) => {
    e.preventDefault();
    const heroID = $(e.currentTarget).attr("heroID");
    PartyCreator.removeMember(heroID);
    refreshHeroSelect();
});

//clicking a hero to add them to your party
$(document).on('click', "div.dungeonAvailableCardClick", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("heroid");
    PartyCreator.addMember(ID);
    refreshHeroSelect();
});

//locking in a team to start a dungeon
$(document).on('click', "#dungeonTeamButton", (e) => {
    e.preventDefault();
    if (PartyCreator.validTeam()) {
        DungeonManager.createDungeon();
        DungeonManager.dungeonView = "d1";
        initiateDungeonFloor();
        $dungeonTeamSelect.hide();
        $dungeonRun.show();
    }
    else {
        Notifications.noPartySelected();
    }
});

//pay for heal
$(document).on('click', ".healHero", (e) => {
    e.preventDefault();
    const ID = $(e.currentTarget).attr("id").substring(2);
    HeroManager.idToHero(ID).healPay();
});

function refreshHeroSelect() {
    //builds the div that we hide and can show when we're selecting for that area
    $dtsTop.empty();
    const d1top = $("<div/>").addClass("dtsTopTitle").html("<h3>Assemble your Team!</h3>");
    $dtsTop.append(d1top);
    const d = $("<div/>").addClass("dungeonTeamCollection");
    PartyCreator.heroes.forEach((hero,i) => {
        const d1 = characterCard("dungeonTeam",i,hero);
        d.append(d1);
    });
    for (let i=0;i<PartyCreator.emptyPartySlots();i++) {
        const d1a = characterCard("dungeonTeam",i).addClass("noHeroDungeonSelect");
        d.append(d1a);
    }
    $dtsTop.append(d);
    const dbutton = $("<div/>").attr("id","dungeonTeamButton").html("Launch Adventure");
    if (PartyCreator.heroes.length === 0) dbutton.addClass('dungeonStartNotAvailable')
    $dtsTop.append(dbutton);
    $dtsBottom.empty();
    const d1bot = $("<div/>").addClass("dtsBotTitle").html("<h3>Your Available Heroes</h3>");
    $dtsBottom.append(d1bot);
    const d2 = $("<div/>").addClass("dungeonAvailableCollection");
    HeroManager.ownedHeroes().forEach(hero => {
        if (!hero.inDungeon && !PartyCreator.heroes.includes(hero.id)) {
            const d3 = characterCard("dungeonAvailable",hero.id,hero.id);
            d2.append(d3);  
        }
    });
    $dtsBottom.append(d2);
    /*//update the sidebar!
    $DungeonSideBarTeam.empty();
    PartyCreator.heroes.forEach(hero => {
        const d3 = $("<div/>").addClass("dungeonSideBarMember");
        const d3a = $("<div/>").addClass("dungeonSideBarMemberIcon").html(hero.head);
        const d3b = $("<div/>").addClass("dungeonSideBarMemberHP").html(sidebarHP(hero));
        d3.append(d3a,d3b);
        $DungeonSideBarTeam.append(d3);
    });*/
}

function refreshDungeonSelect() {
    //shows each dungeon so you can select that shit...
    if (DungeonManager.dungeonStatus("d1")) $dsd1.html("In Progress");
    else $dsd1.html("Idle");
}

function characterCard(prefix,dv,ID) {
    const d = $("<div/>").addClass(prefix+"Card").attr("data-value",dv);
    const dclick = $("<div/>").addClass(prefix+"CardClick").attr("heroID",dv);
    if (!ID) {
        const d1a = $("<div/>").addClass(prefix+"Image").html('<img src="images/heroes/blank.png">');
        const d2a = $("<div/>").addClass(prefix+"Name").html("Empty");
        return d.append(d1a,d2a);
    }
    const hero = HeroManager.idToHero(ID);
    const d1 = $("<div/>").addClass(prefix+"Image").html(hero.image);
    const d2 = $("<div/>").addClass(prefix+"Name").html(hero.name);
    const d3 = $("<div/>").addClass(prefix+"Lvl").html("Level "+hero.lvl);
    const d4 = $("<div/>").addClass(prefix+"Pow").html(miscIcons.pow+"&nbsp;"+hero.getPow())
    const d5 = createHPBar(hero,"Party");    
    const d6 = $("<div/>").addClass("healHero").attr("id","hh"+hero.id).html(`Heal - <div class="healHeroCost">${miscIcons.gold} ${hero.healCost()}</div>`);
    if (hero.healCost() === 0) d6.hide();
    dclick.append(d1,d2,d3,d4,d5);
    return d.append(dclick,d6);
}

const $floorID = $("#floorID");
const $dungeonHeroList = $("#dungeonHeroList");
const $dungeonMobList = $("#dungeonMobList");
const $drStatsHero = $("#drStatsHero");
const $drStatsMob = $("#drStatsMob");

function floorStateChange(dungeonID) {
    if (dungeonID === DungeonManager.dungeonView) initiateDungeonFloor();
}

function initiateDungeonFloor() {
    const dungeon = DungeonManager.getCurrentDungeon();
    $floorID.html("Floor "+dungeon.floorNum);
    $dungeonHeroList.empty();
    $dungeonMobList.empty();
    $drStatsHero.empty();
    $drStatsMob.empty();
    dungeon.party.heroes.forEach((hero) => {
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
    dungeon.mobs.forEach((mob) => {
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
    BattleLog.clear();
}

function refreshDungeonFloorBars() {
    const dungeon = DungeonManager.getCurrentDungeon();
    dungeon.party.heroes.forEach((hero) => {
        refreshActBar(hero);
    });
    dungeon.mobs.forEach((mob) => {
        refreshActBar(mob);
    });
}

function sidebarHP(hero) {
    /*const hpPercent = hero.hp/hero.maxHP();
    const hpWidth = (hpPercent*100).toFixed(1)+"%";
    const d1 = $("<div/>").addClass("dsbhpBarDiv").html(dungeonIcons[Stat.HP]);
    const d1a = $("<div/>").addClass("dsbhpBar").attr("data-label",hero.hp+"/"+hero.maxHP()).attr("id","hpSide"+hero.id);
    const s1 = $("<span/>").addClass("dsbhpBarFill").attr("id","hpFillSide"+hero.id).css('width', hpWidth);
    return d1.append(d1a,s1);*/
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
    const $hh = $("#hh"+hero.id)
    $hh.html(`Heal - <div class="healHeroCost">${miscIcons.gold} ${hero.healCost()}</div>`);
    if (hero.healCost() > 0) $hh.show();
    else $hh.hide();
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