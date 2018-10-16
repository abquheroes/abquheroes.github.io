// Tab Selection for Recipes List

var recipeItem = document.querySelectorAll("#RecipeFilter a.recipeSelect");

for (i = 0; i < recipeItem.length; i++) {
    recipeItem[i].addEventListener("click", tabHighlight);
};

function tabHighlight() {
    for (i = 0; i < recipeItem.length; i++) {
        recipeItem[i].classList.remove("selected");
    };
    this.classList.add("selected");
};

// Tab Selection for Navigation

var navTab = document.querySelectorAll(".tablinks");

for (i = 0; i < navTab.length; i++) {
    navTab[i].addEventListener("click", navTabHighlight);
};

function navTabHighlight() {
    for (i = 0; i < navTab.length; i++) {
        navTab[i].classList.remove("tab-selected");
    };
    this.classList.add("tab-selected");
};

// Status Container Expand and Collapse

const sideHeadings = document.querySelectorAll("#side-content .heading");

for (i = 0; i < sideHeadings.length; i++) {
    sideHeadings[i].addEventListener("click", toggleState);
};

function toggleState(e) {
    if (e.currentTarget.parentNode.classList.contains("height-collapse")) {
        e.currentTarget.parentNode.classList.remove("height-collapse");
        let arrow = e.currentTarget.getElementsByClassName("heading-arrow");
        arrow[0].classList.remove("arrow-rotate");
    } else {
        e.currentTarget.parentNode.classList.add("height-collapse");
        let arrow = e.currentTarget.getElementsByClassName("heading-arrow");
        arrow[0].classList.add("arrow-rotate");
    }
};

const versionHeadings = document.querySelectorAll("#cc-container .version-heading");

for (i = 0; i < versionHeadings.length; i++) {
    versionHeadings[i].addEventListener("click", toggleAboutState);
};

function toggleAboutState(e) {
    if (e.currentTarget.nextElementSibling.classList.contains("expanded")) {
        e.currentTarget.nextElementSibling.classList.remove("expanded");
        let arrow = e.currentTarget.getElementsByClassName("heading-arrow");
        arrow[0].classList.remove("arrow-rotate");
    } else {
        e.currentTarget.nextElementSibling.classList.add("expanded");
        let arrow = e.currentTarget.getElementsByClassName("heading-arrow");
        arrow[0].classList.add("arrow-rotate");
    }
};

/* Back To Top Button */

const backToTopButton = document.querySelector(".back-to-top");

function backToTop() {
    if (document.body.scrollTop || document.documentElement.scrollTop > 200) {
        backToTopButton.classList.add("show-button");
    } else {
        backToTopButton.classList.remove("show-button");
    }
}

if (backToTopButton) window.onscroll = () => backToTop();

/* Close Dialogs with Click Outside of Element */

const dialogs = document.querySelectorAll(".dialog");

dialogs.forEach((dialog) => dialog.addEventListener("click", closeDialog));

function closeDialog(dialog) {
    if (this === dialog.target) window.location.assign("#closeDialog");
}

/* Export Copy Click Feedback */

const clipboardButton = document.querySelector("#exportSaveCopy");

function clipboardText() {
    if(document.querySelector(".ClipboardCopy")) {
        document.querySelector(".ClipboardCopy").remove();
    }
    const copyAlert = document.createElement('div');
    copyAlert.innerHTML = "Copied to clipboard.";
    copyAlert.classList.add("ClipboardCopy");
    clipboardButton.insertAdjacentElement("afterend", copyAlert);
}

clipboardButton.addEventListener("click", clipboardText);

// Logo Easter Egg

const $gameLogo = $("#game-logo");
let logoNum = 0;

$gameLogo.click((e) => {
    logoNum += 1;
    if (logoNum === 1) $gameLogo.css("background-image","url('images/site-logo.png')");
    else if (logoNum === 2) $gameLogo.css("background-image","url('images/site-logo2.png')");
    else {
        $gameLogo.css("background-image","none");
        logoNum = 0;
    }
});