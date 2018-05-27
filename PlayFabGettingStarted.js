PlayFab.settings.titleId = 7995;

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

$("#cloudSave").click((e) => {
    $pfLoginRegister.show();
    $pfImportExport.hide();
    $loadSure.hide();
})

$register.click((e) => {
    registerAcct();
})

$login.click((e) => {
    loginAcct();
})

$pfSave.click((e) => {
    saveToCloud();
})

$pfLoad.click((e) => {
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
        $pfStatus.html(PlayFab.GenerateErrorReport(error)+"<p>If you're having trouble logging in, email us at support@abquheroes.com and we'll help you out!");
    }
}

function saveToCloud() {
    $pfStatusSave.html("Saving...");
    saveGame();
    const input =JSON.stringify(createSave());
    var output = pako.gzip(input,{ to: 'string' });
    const requestData = {
        TitleId : PlayFab.settings.titleId,
        Data : {
            "savestring" : output,
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
    getSaveFromCloud()
    if (saveFile) {
        localStorage.setItem('gameSave3', JSON.stringify(saveFile));
        location.href = 'index.html#closeDialog';
        location.reload(true);
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
            saveFile = JSON.parse(pako.ungzip(result.data.Data.savestring.Value,{ to: 'string' }));
            const date = saveFile.playerSave.lastSave;
            const dateString = new Date(date).toString();
            $pfStatusSave.html("Last save:</br>"+dateString);
        }
        else {
            saveFile = null;
            $pfStatusSave.text("No save uploaded");
        }
    }
}