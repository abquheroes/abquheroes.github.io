"use strict";

function openTab(tabName) {
    // Declare all variables
    if (tabName === "heroesTab") {
        clearExaminePossibleEquip();
       $(".heroExamineEquipment").removeClass("hEEactive");
    }
    $(".tabcontent").hide();
    $("#"+tabName).show();
}