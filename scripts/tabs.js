"use strict";

function openTab(tabName) {
    // Declare all variables
    DungeonManager.dungeonView = null;
    HeroManager.heroView = null;
    if (tabName === "heroesTab") {
        clearExaminePossibleEquip();
       $(".heroExamineEquipment").removeClass("hEEactive");
    }
    if (tabName === "dungeonsTab") {
        $dungeonSelect.show();
        refreshDungeonSelect();
        $dungeonTeamSelect.hide();
        $dungeonRun.hide();
    }
    $(".tabcontent").hide();
    $("#"+tabName).show();
}