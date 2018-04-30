$(document).ready( () => {
    $("#tabs").tabs({
        activate: function( evt, ui ) {
            if($(ui.newTab).index() === 2) {
                refreshRecipes();
            }
            else if ($(ui.newTab).index() === 0) {
                refreshCrafts();
            }
        }
    })

    const $recipeTab = $('#tabs-3');
    const $craftTab = $('#tabs-1');

    function refreshRecipes() {
        $recipeTab.empty();
        $recipeTab.append("<h3>Recipes</h3>");
        if (player.status === GameState.CRAFT1) {
            $recipeTab.append("(Assigning to Slot 1...)<p>")
        }
        if (player.status === GameState.CRAFT2) {
            $recipeTab.append("(Assigning to Slot 2...)<p>")
        }
        if (player.status === GameState.CRAFT3) {
            $recipeTab.append("(Assigning to Slot 3...)<p>")
        }
        blueprints.forEach(item => {
            $recipeTab.append(itemHTML(item));
        });
    }

    function refreshCrafts() {
        $craftTab.empty();
        if (player.craft1 === null) {
            $craftTab.append("Crafting Slot 1: <a id='craft1' href='craft1'>Empty</a></br>");
        }
        else {
            let s = "Crafting Slot 1: " + imageReference[player.craft1]
            s += " <a id='craft1' href='craft1'>" + player.craft1 + "</a>"
            s += ' <div class="progressOuter" id="craftProgress1"><div class="progressText" id="craftTime1">10:00</div></div></br>'
            $craftTab.append(s);
            const $progressbar1 = $("#craftProgress1").progressbar();
        }   
        if (player.craft2 === null) {
            $craftTab.append("Crafting Slot 2: <a id='craft2' href='craft2'>Empty</a></br>");
        }
        else {
            let s = "Crafting Slot 2: " + imageReference[player.craft2]
            s += " <a id='craft2' href='craft2'>" + player.craft2 + "</a>"
            s += ' <div class="progressOuter" id="craftProgress2"><div class="progressText" id="craftTime2">10:00</div></div></br>'
            $craftTab.append(s);
            const $progressbar2 = $("#craftProgress2").progressbar();
        }   
        if (player.craft3 === null) {
            $craftTab.append("Crafting Slot 3: <a id='craft3' href='craft3'>Empty</a></br>");
        }
        else {
            let s = "Crafting Slot 3: " + imageReference[player.craft3]
            s += " <a id='craft3' href='craft3'>" + player.craft3 + "</a>"
            s += ' <div class="progressOuter" id="craftProgress3"><div class="progressText" id="craftTime3">10:00</div></div></br>'
            $craftTab.append(s);
            const $progressbar3 = $("#craftProgress3").progressbar();
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
        item.cost.for
        for (const [type, amt] of Object.entries(item.cost)) {
            s += "&nbsp;&nbsp;"
            s += amt;
            s += imageReference[type];
        }
        s += " <i><b>Crafted</b></i>: "
        s += item.count;
        s += "</div></br>"
        return s
    }
});



