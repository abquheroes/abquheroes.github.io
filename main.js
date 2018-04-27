const player = {
    money: 0,
    workers: 0,
    ore : 0,
}

$(document).ready(() => {
    const $recipeTab = $('#tabs-3')
    function mainLoop() {

    }

    $("#craft1").click((e) => {
        console.log("test");
        $("#tabs").tabs({active:2});
        refreshRecipes();
        e.preventDefault();
    });


    function refreshRecipes() {
        $recipeTab.empty();
        blueprints.forEach(item => {
            $recipeTab.append(itemHTML(item));
        });
    }

    function itemHTML(item) {
        //let s = "<div id='" + item.name + "'>"
        return "s"
    }

    //setInterval(mainLoop,10);
});


imageReference = {
    "Coin" : "PixelItem/CoinsGold5.png",
    "Ore" : "PixelItem/Ore.png"
}