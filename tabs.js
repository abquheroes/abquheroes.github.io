"use strict";

$(document).ready( () => {
    $("#tabs").tabs({
        activate: function( evt, ui ) {
            if ($(ui.newTab).index() === 0) {
                refreshRecipeSelector();
            }
            else if($(ui.newTab).index() === 1) {
                refreshWorkers();
            }
            else if ($(ui.newTab).index() === 4) {
                refreshProgress();
            }
        }
    })
});



