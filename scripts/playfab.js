PlayFab.settings.titleId = "D765";

let sessionID = ""
let saveFile = 0;


$pfLoginRegister = $("#pfLoginRegister");
$pfImportExport = $("#pfImportExport");
$register = $("#register");
$login = $("#login");
$pfStatus = $("#pfStatus");
$pfStatusSave = $("#pfStatusSave");
$pfSave = $("#pfSave");
$pfLoad = $("#pfLoad");
$loadSure = $("#loadSure");
$pfloadYes = $("#pfloadYes");
$pfloadNo = $("#pfloadNo")

$pfLoginRegister.show();
$pfImportExport.hide();
$loadSure.hide();

$("#cloudSave").click((e) => {
    //clicked on the "Cloud Save" button
    $pfLoginRegister.show();
    $pfImportExport.hide();
    $loadSure.hide();
})

$register.click((e) => {
    e.preventDefault();
    registerAcct();
})

$login.click((e) => {
    e.preventDefault();
    loginAcct();
})

$pfSave.click((e) => {
    e.preventDefault();
    saveToCloud();
})

$pfLoad.click((e) => {
    e.preventDefault();
    $loadSure.show();
    $pfImportExport.hide();
})

$pfloadYes.click(() => {
    loadFromCloud();
})

$pfloadNo.click(() => {
    $pfLoginRegister.show();
    $pfImportExport.hide();
    $loadSure.hide();
})

const validateCallback = function (result, error) {
    if (error !== null) {
        $pfLoginRegister.show();
        $pfImportExport.hide();
    }
    else {
        $pfLoginRegister.hide();
        $pfImportExport.show();
    }
}

function registerAcct(){
    const registerRequest = {
        TitleId: PlayFab.settings.titleId,
        Email : $("#email").val(),
        Password : $("#password").val(),
        RequireBothUsernameAndEmail : false,
    };
    PlayFabClientSDK.RegisterPlayFabUser(registerRequest, registerCallback);
}

const registerCallback = function (result, error) {
    if (result !== null) {
        loginAcct();
    } else if (error !== null) {
        $pfStatus.html(PlayFab.GenerateErrorReport(error));
    }
}

function loginAcct(){
    const loginRequest = {
        TitleId: PlayFab.settings.titleId,
        Email : $("#email").val(),
        Password : $("#password").val(),
    };
    PlayFabClientSDK.LoginWithEmailAddress(loginRequest, LoginCallback);
}

const LoginCallback = function (result, error) {
    if (result !== null) {
        sessionID = result.data.SessionTicket;
        $pfLoginRegister.hide();
        $pfImportExport.show();
        getSaveFromCloud();       

    } else if (error !== null) {
        $pfStatus.html(PlayFab.GenerateErrorReport(error));
    }
}

function saveToCloud() {
    $pfStatusSave.html("Saving...");
    forceSave();
    const requestData = {
        TitleId : PlayFab.settings.titleId,
        Data : {
            "savestring" : createSaveExport(),
        }
    }
    PlayFab.ClientApi.UpdateUserData(requestData,saveCallback);
};

function saveCallback(result,error) {
    if (result !== null) {
        getSaveFromCloud();
    }
    if (error !== null) {
        $pfStatusSave.html(PlayFab.GenerateErrorReport(error));
    }
}

function loadFromCloud() {
    getSaveFromCloud();
    if (saveFile) {
        localStorage.setItem('ffgs1', JSON.stringify(saveFile));
        location.replace('/');
    }
}

function getSaveFromCloud() {
    const requestData = {
        Keys : ["savestring"],
    }
    PlayFab.ClientApi.GetUserData(requestData,loadCallback);
};

function loadCallback(result,error) {
    if (error !== null) {
        $pfStatusSave.html(PlayFab.GenerateErrorReport(error));        
    }
    if (result) {
        if (result.data.Data !== null) {
            saveFile = JSON.parse(JSON.parse(pako.ungzip(atob(result.data.Data.savestring.Value),{ to: 'string' })));
            const date = saveFile["saveTime"];
            const dateString = new Date(date).toString();
            $pfStatusSave.html("Last save:</br>"+dateString);
        }
        else {
            saveFile = null;
            $pfStatusSave.text("No save uploaded");
        }
    }
}