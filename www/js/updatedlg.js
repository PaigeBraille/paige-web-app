var update_ongoing = false;
var current_update_filename = "";
//update dialog
function updatedlg() {
    var modal = setactiveModal('updatedlg.html');
    if (modal == null) return;
    id("fw_file_name").innerHTML = translate_text_item("No file chosen");
    displayNone('prgfw');
    displayNone('uploadfw-button');
    id('updatemsg').innerHTML = "";
    id('fw-select').value = "";
    id('fw_update_dlg_title').innerHTML = translate_text_item("ESP3D Update").replace("ESP3D", "FluidNC");
    showModal();
}

function closeUpdateDialog(msg) {
    if (update_ongoing) {
        alertdlg(translate_text_item("Busy..."), translate_text_item("Update is ongoing, please wait and retry."));
        return;
    }
    closeModal(msg);
}

function checkupdatefile() {
    var files = id('fw-select').files;
    displayNone('updatemsg');
    if (files.length == 0) displayNone('uploadfw-button');
    else displayBlock('uploadfw-button');
    if (files.length > 0) {
        if (files.length == 1) {
            id("fw_file_name").innerHTML = files[0].name;
        } else {
            var tmp = translate_text_item("$n files");
            id("fw_file_name").innerHTML = tmp.replace("$n", files.length);
        }
    } else {
        id("fw_file_name").innerHTML = translate_text_item("No file chosen");
    }
}


function UpdateProgressDisplay(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        id('prgfw').value = percentComplete;
        id('updatemsg').innerHTML = translate_text_item("Uploading ") + current_update_filename + " " + percentComplete.toFixed(0) + "%";
    } else {
        // Impossible because size is unknown
    }
}

function UploadUpdatefile() {
    confirmdlg(translate_text_item("Please confirm"), translate_text_item("Update Firmware ?"), StartUploadUpdatefile)
}



function StartUploadUpdatefile(response) {
    if (response != "yes") return;
    if (http_communication_locked) {
        alertdlg(translate_text_item("Busy..."), translate_text_item("Communications are currently locked, please wait and retry."));
        return;
    }
    var files = id('fw-select').files
    var formData = new FormData();
    var url = "/updatefw";
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var arg = "/" + file.name + "S";
        //append file size first to check updload is complete
        formData.append(arg, file.size);
        formData.append('myfile[]', file, "/" + file.name);
    }
    displayNone('fw-select_form');
    displayNone('uploadfw-button');
    update_ongoing = true;
    displayBlock('updatemsg');
    displayBlock('prgfw');
    if (files.length == 1) current_update_filename = files[0].name;
    else current_update_filename = "";
    id('updatemsg').innerHTML = translate_text_item("Uploading ") + current_update_filename;
    SendFileHttp(url, formData, UpdateProgressDisplay, updatesuccess, updatefailed)
}

function updatesuccess(response) {
    id('updatemsg').innerHTML = translate_text_item("Restarting, please wait....");
    id("fw_file_name").innerHTML = "";
    var i = 0;
    var interval;
    var x = id("prgfw");
    x.max = 10;
    interval = setInterval(function() {
        i = i + 1;
        var x = id("prgfw");
        x.value = i;
        id('updatemsg').innerHTML = translate_text_item("Restarting, please wait....") + (41 - i) + translate_text_item(" seconds");
        if (i > x.max) {
            update_ongoing = false;
            clearInterval(interval);
            location.reload();
        }
    }, 1000);
    //console.log(response);
}

function updatefailed(errorcode, response) {
    displayBlock('fw-select_form');
    displayNone('prgfw');
    id("fw_file_name").innerHTML = translate_text_item("No file chosen");
    displayNone('uploadfw-button');
    //id('updatemsg').innerHTML = "";
    id('fw-select').value = "";
    if (esp_error_code !=0){
        alertdlg (translate_text_item("Error") + " (" + esp_error_code + ")", esp_error_message);
        id('updatemsg').innerHTML = translate_text_item("Upload failed : ") + esp_error_message;
        esp_error_code = 0;
    } else {
       alertdlg (translate_text_item("Error"), "Error " + errorcode + " : " + response);
       id('updatemsg').innerHTML = translate_text_item("Upload failed : ") + errorcode + " :" + response;
    }
    console.log("Error " + errorcode + " : " + response);
    update_ongoing = false;
    SendGetHttp("/updatefw");
}
