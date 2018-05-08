"use strict";

$(document).ready( () => {
    $("#tabs").tabs({
        activate: function( evt, ui ) {
            if ($(ui.newTab).index() === 0) {
                //
            }
            else if($(ui.newTab).index() === 1) {
                refreshWorkers();
            }
        }
    })
});



