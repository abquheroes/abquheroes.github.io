"use strict";

$(document).ready( () => {
    $( "#c1pb" ).progressbar();
    $( "#c2pb" ).progressbar();
    $( "#c3pb" ).progressbar();

    $("#tabs").tabs({
        activate: function( evt, ui ) {
            if ($(ui.newTab).index() === 0) {
                refreshCrafts();
            }
            else if($(ui.newTab).index() === 1) {
                refreshWorkers();
            }
        }
    })

    const $craftTab = $('#tabs-1');
    const $workerTab = $('#tabs-2');
    
    window.refreshWorkers = () => {
        $("#oreWorker").text(workerLevels["Ore"]);
        $("#increaseOreLevel").text("Increase lvl - "+Math.floor(getOreWorkerCost())+"g")
        $("#woodWorker").text(workerLevels["Wood"]);
        $("#increaseWoodLevel").text("Increase lvl - "+Math.floor(getWoodWorkerCost())+"g")
    }


    const $c1Image = $("#c1Image");
    const $c2Image = $("#c2Image");
    const $c3Image = $("#c3Image");

    const $c1Name = $("#c1Name")
    const $c2Name = $("#c2Name")
    const $c3Name = $("#c3Name")

    const $c1pb = $("#c1pb");
    const $c2pb = $("#c2pb");
    const $c3pb = $("#c3pb");

    const $c1Clear = $("#craft1Clear");
    const $c2Clear = $("#craft2Clear");
    const $c3Clear = $("#craft3Clear");

    window.refreshCrafts = () => {
        if (player.craft1 === null) {
            $c1Image.empty();
            $c1Name.html('<a id="craft1" href="craft1">Empty</a>');
            $c1pb.addClass("hidden");
            $c1Clear.addClass("hidden");
        }
        else {
            $c1Image.html(imageReference[player.craft1]);
            $c1Name.html('<a id="craft1 href="craft1">' + player.craft1 + '</a>');
            $c1pb.removeClass("hidden");
            $c1Clear.removeClass("hidden");
        }   
        if (player.craft2 === null) {
            $c2Image.empty();
            $c2Name.html('<a id="craft2" href="craft2">Empty</a>');
            $c2pb.addClass("hidden");
            $c2Clear.addClass("hidden");
        }
        else {
            $c2Image.html(imageReference[player.craft2]);
            $c2Name.html('<a id="craft2 href="craft2">' + player.craft2 + '</a>');
            $c2pb.removeClass("hidden");
            $c2Clear.removeClass("hidden");
        }  
        if (player.craft3 === null) {
            $c3Image.empty();
            $c3Name.html('<a id="craft3" href="craft3">Empty</a>');
            $c3pb.addClass("hidden");
            $c3Clear.addClass("hidden");
        }
        else {
            $c3Image.html(imageReference[player.craft3]);
            $c3Name.html('<a id="craft3 href="craft3">' + player.craft3 + '</a>');
            $c3pb.removeClass("hidden");
            $c3Clear.removeClass("hidden");
        }    
    }
});



