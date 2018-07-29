"use strict";

function openTab(tabName) {
    // Declare all variables
    $(".tabcontent").hide();
    $("#"+tabName).show();
}