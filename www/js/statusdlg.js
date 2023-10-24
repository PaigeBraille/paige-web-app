var statuspage = 0;
var statuscontent = "";
//status dialog
function statusdlg() {
    var modal = setactiveModal('statusdlg.html');
    if (modal == null) return;
    showModal();
    refreshstatus();
    update_btn_status(0);
}

function next_status() {
    var modal = getactiveModal();
    var text = modal.element.getElementsByClassName("modal-text")[0];
    if (statuspage == 0) {
        text.innerHTML = statuscontent;
    } else {
        text.innerHTML = "<table><tr><td width='auto' style='vertical-align:top;'><label translate>Browser:</label></td><td>&nbsp;</td><td width='100%'><span class='text-info'><strong>" + navigator.userAgent + "</strong></span></td></tr></table>";
    }
    update_btn_status();
}

function update_btn_status(forcevalue) {
    if (typeof forcevalue !== 'undefined') {
        statuspage = forcevalue;
    }
    if (statuspage == 0) {
        statuspage = 1;
        id('next_status_btn').innerHTML = get_icon_svg("triangle-right", "1em", "1em")
    } else {
        statuspage = 0;
        id('next_status_btn').innerHTML = get_icon_svg("triangle-left", "1em", "1em")
    }
}

function statussuccess(response) {
    displayBlock('refreshstatusbtn');
    displayNone('status_loader');
    var modal = getactiveModal();
    if (modal == null) return;
    var text = modal.element.getElementsByClassName("modal-text")[0];
    var tresponse = response.split("\n");
    statuscontent = "";
    for (var i = 0; i < tresponse.length; i++) {
        var data = tresponse[i].split(":");
        if (data.length >= 2) {
            statuscontent += "<label>" + translate_text_item(data[0]) + ": </label>&nbsp;<span class='text-info'><strong>";
            var data2 = data[1].split(" (")
            statuscontent += translate_text_item(data2[0].trim());
            for (v = 1; v < data2.length; v++) {
                statuscontent += " (" + data2[v];
            }
            for (v = 2; v < data.length; v++) {
                statuscontent += ":" + data[v];
            }
            statuscontent += "</strong></span><br>";
        } //else statuscontent += tresponse[i] + "<br>";
    }
    statuscontent += "<label>" + translate_text_item("WebUI version") + ": </label>&nbsp;<span class='text-info'><strong>";
    statuscontent += web_ui_version
    statuscontent += "</strong></span><br>";
    text.innerHTML = statuscontent;
    update_btn_status(0);
    //console.log(response);
}

function statusfailed(errorcode, response) {
    displayBlock('refreshstatusbtn');
    displayNone('status_loader');
    displayBlock('status_msg');
    console.log("Error " + errorcode + " : " + response);
    id('status_msg').innerHTML = "Error " + errorcode + " : " + response;
}

function refreshstatus() {
    displayNone('refreshstatusbtn');
    displayBlock('status_loader');
    var modal = getactiveModal();
    if (modal == null) return;
    var text = modal.element.getElementsByClassName("modal-text")[0];
    text.innerHTML = "";
    displayNone('status_msg');
    var url = "/command?plain=" + encodeURIComponent("[ESP420]plain");;
    SendGetHttp(url, statussuccess, statusfailed)
}
