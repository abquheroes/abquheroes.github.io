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
            else if($(ui.newTab).index() === 2) {
                refreshRecipes();
            }
        }
    })

    const $craftTab = $('#tabs-1');
    const $workerTab = $('#tabs-2');
    const $recipeTab = $('#tabs-3');
    
    const $knife = $('#Knives');
    const $mace = $('#Maces');
    const $axe = $('#Axes');

    function refreshRecipes() {
        $knife.empty();
        $mace.empty();
        $axe.empty();
        if (player.status === GameState.CRAFT1) {
            $recipeTab.append("(Assigning to Slot 1...)<p>")
        }
        if (player.status === GameState.CRAFT2) {
            $recipeTab.append("(Assigning to Slot 2...)<p>")
        }
        if (player.status === GameState.CRAFT3) {
            $recipeTab.append("(Assigning to Slot 3...)<p>")
        }
        for (let i=0;i<blueprints.length;i++) {
            console.log(blueprints[i].type);
            if (blueprints[i].type === "knives") $knife.append(itemHTML(blueprints[i]));
            else if (blueprints[i].type === "maces") $mace.append(itemHTML(blueprints[i]));
            else if (blueprints[i].type === "axes") $axe.append(itemHTML(blueprints[i]));           
        }
    }
    
    window.refreshWorkers = () => {
        $("#oreWorker").text(workerLevels["Ore"]);
        $("#increaseOreLevel").text("Increase lvl - "+getOreWorkerCost()+"g")
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

    function itemHTML(item) {
        let s = "<div id='";
        s += item.name;
        s += "'>";
        s += imageReference[item.name];
        s += "&nbsp;&nbsp;<a class='craft' href='#"
        s += item.name;
        s += "'>";
        s += item.name;
        s += "</a>&nbsp;";
        for (const [type, amt] of Object.entries(item.cost)) {
            s += "&nbsp;&nbsp;"
            s += amt;
            s += imageReference[type];
        }
        s += " <i><b>Crafted</b></i>: "
        s += '<span id="' + item.name + "_count" + '">' + itemCount[item.name] + "</span>";
        s += "</div>"
        return s
    }
});



