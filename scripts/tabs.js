"use strict";

function openTab(tabName) {
    // Declare all variables
    if (tabName === "heroesTab") {
        clearExaminePossibleEquip();
    }
    $(".tabcontent").hide();
    $("#"+tabName).show();
}