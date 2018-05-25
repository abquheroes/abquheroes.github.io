PlayFab.settings.titleId = 7995;

let sessionID = ""

$pfLoginRegister = $("#pfLoginRegister");
$pfImportExport = $("#pfImportExport");
$reg
$("#playfab").click((e) => {
    validateSession();
})

function validateSession() {
    const validateRequest = {
        TitleId: PlayFab.settings.titleId,
        SessionTicket: sessionID,
    }
    PlayFabClientSDK.AuthenticateSessionTicket(validateRequest,validateCallback);
}

const validateCallback = function (result, error) {
    console.log(result);
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
        // Currently, you need to look up the correct format for this object in the API-docs:
        // https://api.playfab.com/documentation/Client/method/LoginWithCustomID
        TitleId: PlayFab.settings.titleId,
        Email : $("#email").val(),
        Password : $("#password").val(),
        RequireBothUsernameAndEmail : false,
    };

    PlayFabClientSDK.RegisterPlayFabUser(registerRequest, registerCallback);
}

const registerCallback = function (result, error) {
    if (result !== null) {
        $("#resultOutput").html("Registration Complete!");
    } else if (error !== null) {
        $("#resultOutput").html(PlayFab.GenerateErrorReport(error));
    }
}

function loginAcct(){
    console.log("success");
    const loginRequest = {
        // Currently, you need to look up the correct format for this object in the API-docs:
        // https://api.playfab.com/documentation/Client/method/LoginWithCustomID
        TitleId: PlayFab.settings.titleId,
        Email : $("#email2").val(),
        Password : $("#password2").val(),
    };

    PlayFabClientSDK.LoginWithEmailAddress(loginRequest, LoginCallback);
}

const LoginCallback = function (result, error) {
    console.log(result);
    if (result !== null) {
        $("#resultOutput2").html("Login Success!");
    } else if (error !== null) {
        $("#resultOutput2").html(PlayFab.GenerateErrorReport(error));
    }
}

$("#register").click(() => {
    registerAcct();
});

$("#login").click(() => {
    loginAcct();
});

$("#clear").click(() => {
    $("#data").val('');
    $("#resultOutput3").empty();
});

$("#save").click(() => {
    console.log('saving...');
    const requestData = {
        TitleId : PlayFab.settings.titleId,
        Data : {
            "savestring" : $("#data").val(),
        }
    } 
    PlayFab.ClientApi.UpdateUserData(requestData,saveCallback);
});

function saveCallback(result,error) {
    console.log("this happened?")
    if (result !== null) {
        $("#resultOutput3").html("Save Sucess!");
    }
    if (error !== null) {
        $("#resultOutput3").html(PlayFab.GenerateErrorReport(error));
    }
}

$("#load").click(() => {
    console.log("load");
    const requestData = {
        Keys : ["savestring"],
    }
    PlayFab.ClientApi.GetUserData(requestData,loadCallback);
})

function loadCallback(result,error) {
    if (error !== null) {
        $("#resultOutput3").html(PlayFab.GenerateErrorReport(error));
    }
    if (result) {
        console.log(result.data.Data);
        $("#data").val(result.data.Data.savestring.Value);
        $("#resultOutput3").html("Load Complete!");
    }
}