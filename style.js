//Scripting for Theme Selection

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

    lightButton.style.display = "none";
    darkButton.style.display = "block";
}

function darkTheme() {
    root.style.setProperty('--theme-bg', '#202020');
    root.style.setProperty('--theme-bg-2', '#151515');
    root.style.setProperty('--theme-bg-3', '#191919');
    root.style.setProperty('--theme-border', '#000');
    root.style.setProperty('--theme-border-2', '#adadad');
    root.style.setProperty('--theme-text', '#fff');
    root.style.setProperty('--theme-text-2', '#fff');
    root.style.setProperty('--theme-text-3', '#909090');
    root.style.setProperty('--theme-link', '#191919');
    root.style.setProperty('--theme-scroll-thumb', 'rgba(255,255,255,0.10)');
    root.style.setProperty('--theme-scroll-track', 'rgba(0,0,0,0.30)');

    darkButton.style.display = "none";
    lightButton.style.display = "block";
}

//