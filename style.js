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
        console.log("Switch to Light");
    } else if (themeIndex == 1) {
        darkTheme();

        themeIndex = 0;
        localStorage.setItem('themeChoice', themeIndex);
        console.log("Switch to Dark");
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
    root.style.setProperty('--theme-border', '#d1d1d1');
    root.style.setProperty('--theme-text', '#000');

    lightButton.style.display = "none";
    darkButton.style.display = "block";
}

function darkTheme() {
    root.style.setProperty('--theme-bg', '#202020');
    root.style.setProperty('--theme-bg-2', '#151515');
    root.style.setProperty('--theme-border', '#000');
    root.style.setProperty('--theme-text', '#fff');

    darkButton.style.display = "none";
    lightButton.style.display = "block";
}