// Theme Switching for Light and Dark Mode
/*
var root = document.querySelector(":root");
var darkButton = document.querySelector(".dm-btn");
var lightButton = document.querySelector(".lm-btn");

darkButton.addEventListener("click", changeTheme);
lightButton.addEventListener("click", changeTheme);

var themeIndex = findIndex();

function findIndex(){
    if (localStorage.getItem("themeChoice") == null) {
        return 1;
    }
    else {
        return localStorage.getItem("themeChoice");
    }
};

loadTheme();

function changeTheme() {
    if (themeIndex == 0) {
        lightTheme();

        themeIndex = 1;
        localStorage.setItem('themeChoice', themeIndex);
        console.log("Switched to Light Theme");
    } else if (themeIndex == 1) {
        darkTheme();

        themeIndex = 0;
        localStorage.setItem('themeChoice', themeIndex);
        console.log("Switched to Dark Theme");
    }
};

function loadTheme() {
    if (themeIndex == 1) {
        lightTheme();
    } else if (themeIndex == 0) {
        darkTheme();
    }
};

function lightTheme() {
    root.style.setProperty('--theme-bg', '#fff');
    root.style.setProperty('--theme-bg-2', '#f3f3f3');
    root.style.setProperty('--theme-bg-3', '#f9f7f7');
    root.style.setProperty('--theme-border', '#d1d1d1');
    root.style.setProperty('--theme-border-2', '#adadad');
    root.style.setProperty('--theme-text', '#000');
    root.style.setProperty('--theme-text-2', '#fff');
    root.style.setProperty('--theme-text-3', '#909090');
    root.style.setProperty('--theme-link', '#218cff');
    root.style.setProperty('--theme-scroll-thumb', 'rgba(0,0,0,0.10)');
    root.style.setProperty('--theme-scroll-track', 'rgba(0,0,0,0.10)');
    root.style.setProperty('--theme-progressbar', '#218cff;')
    root.style.setProperty('--theme-scheme', 'linear-gradient(-40deg, #0fb898 0%, #1fdb96 51%, #2ce891 75%)')

    lightButton.style.display = "none";
    darkButton.style.display = "block";
};

function darkTheme() {
    root.style.setProperty('--theme-bg', '#202020');
    root.style.setProperty('--theme-bg-2', '#151515');
    root.style.setProperty('--theme-bg-3', '#191919');
    root.style.setProperty('--theme-border', '#2b2b2b');
    root.style.setProperty('--theme-border-2', '#adadad');
    root.style.setProperty('--theme-text', '#fff');
    root.style.setProperty('--theme-text-2', '#fff');
    root.style.setProperty('--theme-text-3', '#909090');
    root.style.setProperty('--theme-link', '#191919');
    root.style.setProperty('--theme-scroll-thumb', 'rgba(255,255,255,0.10)');
    root.style.setProperty('--theme-scroll-track', 'rgba(0,0,0,0.30)');
    root.style.setProperty('--theme-progressbar', '#218cff;')
    root.style.setProperty('--theme-scheme', 'linear-gradient(-40deg, #353535 0%, #545454 51%, #636262 75%)')

    darkButton.style.display = "none";
    lightButton.style.display = "block";
};
*/

// View Selection for Compact and Comfortable

const head = document.getElementsByTagName("head");
const compactButton = document.querySelector(".cp-btn");
const comfortButton = document.querySelector(".cf-btn");

if (compactButton) {
    compactButton.addEventListener("click", changeView);
}

if (comfortButton) {
    comfortButton.addEventListener("click", changeView);
}
/*
compactButton.addEventListener("click", changeView);
comfortButton.addEventListener("click", changeView);*/

let viewIndex = findView();

function findView() {
    if (localStorage.getItem("viewChoice") == null) {
        return 1;
    }
    else {
        return localStorage.getItem("viewChoice");
    }
};

if (compactButton || comfortButton ) {
    loadView();
}

function changeView() {
    if (viewIndex == 0) {
        comfortView();

        viewIndex = 1;
        localStorage.setItem('viewChoice', viewIndex);
        console.log("Switched to Comfortable View");
    } else if (viewIndex == 1) {
        compactView();

        viewIndex = 0;
        localStorage.setItem('viewChoice', viewIndex);
        console.log("Switched to Compact View");
    }
};

function loadView() {
    if (viewIndex == 1) {
        comfortView();
    } else if (viewIndex == 0) {
        compactView();
    }
};

function comfortView() {
    let compactCSS = document.querySelector("#injectedCSS");
    if (compactCSS == null) {

    } else {
        compactCSS.remove();
    }
    
    compactButton.style.display = "block";
    comfortButton.style.display = "none";
};

function compactView() {
    head[0].insertAdjacentHTML('beforeend', '<link id="injectedCSS" href="scripts/compact.css" rel="stylesheet">')
    
    compactButton.style.display = "none";
    comfortButton.style.display = "block";
};

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