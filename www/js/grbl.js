<<<<<<< HEAD
var interval_status = -1;
var probe_progress_status = 0;
var grbl_error_msg = "";
var gotWCO = false;
var WCOx = 0;
var WCOy = 0;
var WCOz = 0;
var WCOa = 0;
var WCOb = 0;
var WCOc = 0;
var grblaxis = 3;
var grblzerocmd = 'X0 Y0 Z0';
var axis_Z_feedrate = 0;
var axis_A_feedrate = 0;
var axis_B_feedrate = 0;
var axis_C_feedrate = 0;
var last_axis_letter = "Z";

function build_axis_selection(){
    var html = "<select class='form-control wauto' id='control_select_axis' onchange='control_changeaxis()' >";
    for (var i = 3; i <= grblaxis; i++) {
        var letter;
        if (i == 3) letter = "Z";
        else if (i == 4) letter = "A";
        else if (i == 5) letter = "B";
        else if (i == 6) letter = "C";
        html += "<option value='" + letter + "'";
        if (i == 3) html += " selected ";
        html += ">";
        html += letter;
        html += "</option>\n";
    }
    html += "</select>\n";
   if(grblaxis > 3) {
       document.getElementById('axis_selection').innerHTML = html;
       document.getElementById('axis_label').innerHTML = translate_text_item("Axis") + ":";
       document.getElementById('axis_selection').style.display = "table-row"
   }
}

function control_changeaxis(){
    var letter = document.getElementById('control_select_axis').value;
    document.getElementById('axisup').innerHTML = '+'+letter;
    document.getElementById('axisdown').innerHTML = '-'+letter;
    document.getElementById('homeZlabel').innerHTML = ' '+letter+' ';
    switch(last_axis_letter) {
        case "Z":
            axis_Z_feedrate = document.getElementById('control_z_velocity').value;
        break;
        case "A":
            axis_A_feedrate = document.getElementById('control_z_velocity').value;
        break;
        case "B":
            axis_B_feedrate = document.getElementById('control_z_velocity').value;
        break;
        case "C":
            axis_C_feedrate = document.getElementById('control_z_velocity').value;
        break;
    }
    
    last_axis_letter = letter;
     switch(last_axis_letter) {
        case "Z":
            document.getElementById('control_z_velocity').value = axis_Z_feedrate;
        break;
        case "A":
            document.getElementById('control_z_velocity').value = axis_A_feedrate;
        break;
        case "B":
            document.getElementById('control_z_velocity').value = axis_B_feedrate;
        break;
        case "C":
            document.getElementById('control_z_velocity').value = axis_C_feedrate;
        break;
    }
}

function init_grbl_panel() {
    grbl_set_probe_detected(false);
    if (target_firmware == "grbl-embedded") {
        on_autocheck_status(true);
    }
}

function grbl_clear_status() {
    grbl_set_probe_detected(false);
    grbl_error_msg = "";
    document.getElementById('grbl_status_text').innerHTML = grbl_error_msg;
    document.getElementById('grbl_status').innerHTML = "";
}

function grbl_set_probe_detected(state) {
    if (state) {
        document.getElementById('touch_status_icon').innerHTML = get_icon_svg("ok-circle", "1.3em", "1.2em", "green");
    } else {
        document.getElementById('touch_status_icon').innerHTML = get_icon_svg("record", "1.3em", "1.2em", "grey");
    }
}

function onprobemaxtravelChange() {
    var travel = parseFloat(document.getElementById('probemaxtravel').value);
    if (travel > 9999 || travel <= 0 || isNaN(travel) || (travel === null)) {
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of maximum probe travel must be between 1 mm and 9999 mm !"));
        return false;
    }
    return true;
}

function onprobefeedrateChange() {
    var feedratevalue = parseInt(document.getElementById('probefeedrate').value);
    if (feedratevalue <= 0 || feedratevalue > 9999 || isNaN(feedratevalue) || (feedratevalue === null)) {
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of probe feedrate must be between 1 mm/min and 9999 mm/min !"));
        return false
    }
    return true
}

function onprobetouchplatethicknessChange() {
    var thickness = parseFloat(document.getElementById('probetouchplatethickness').value);
    if (thickness <= 0 || thickness > 999 || isNaN(thickness) || (thickness === null)) {
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of probe touch plate thickness must be between 0 mm and 9999 mm !"));
        return false;
    }
    return true;
}

function on_autocheck_status(use_value) {
    if (probe_progress_status != 0) {
        document.getElementById('autocheck_status').checked = true;
        return;
    }
    if (typeof(use_value) !== 'undefined') document.getElementById('autocheck_status').checked = use_value;
    if (document.getElementById('autocheck_status').checked) {
        var interval = parseInt(document.getElementById('statusInterval_check').value);
        if (!isNaN(interval) && interval > 0 && interval < 100) {
            if (interval_status != -1) clearInterval(interval_status);
            interval_status = setInterval(function() {
                get_status()
            }, interval * 1000);
        } else {
            document.getElementById('autocheck_status').checked = false;
            document.getElementById('statusInterval_check').value = 0;
            if (interval_status != -1) clearInterval(interval_status);
            interval_status = -1;
        }
    } else {
        if (interval_status != -1) clearInterval(interval_status);
        interval_status = -1;
    }

    if (document.getElementById('autocheck_status').checked == false) {
        grbl_clear_status();
    }
}

function onstatusIntervalChange() {
    var interval = parseInt(document.getElementById('statusInterval_check').value);
    if (!isNaN(interval) && interval > 0 && interval < 100) {
        on_autocheck_status();
    } else {
        document.getElementById('autocheck_status').checked = false;
        document.getElementById('statusInterval_check').value = 0;
        if (interval != 0) alertdlg(translate_text_item("Out of range"), translate_text_item("Value of auto-check must be between 0s and 99s !!"));
        on_autocheck_status();
    }
}

//TODO handle authentication issues
//errorfn cannot be NULL
function get_status() {
    var command = "?";
    if ((target_firmware == "grbl") || (target_firmware == "grbl-embedded")) command = "?";
    //ID 114 is same as M114 as '?' cannot be an ID
    SendPrinterCommand(command, false, null, null, 114, 1);
}

function process_grbl_position(response) {
    var tab1 = response.split("WCO:");
    if (tab1.length > 1) {
        var tab2 = tab1[1].split("|");
        var tab1 = tab2[0].split(">");
        var tab3 = tab1[0].split(",");
        WCOx = parseFloat(tab3[0]);
        if (tab3.length > 1) {
            WCOy = parseFloat(tab3[1]);
        } else {
            WCOy = 0;
        }
        if ((tab3.length > 2) && (grblaxis > 2)) {
            WCOz = parseFloat(tab3[2]);
        } else {
            WCOz = 0;
        }
         if ((tab3.length > 3) && (grblaxis > 3)) {
            WCOa = parseFloat(tab3[3]);
        } else {
            WCOa = 0;
        }
         if ((tab3.length > 4) && (grblaxis > 4)){
            WCOb = parseFloat(tab3[4]);
        } else {
            WCOb = 0;
        }
         if ((tab3.length > 5) && (grblaxis > 5)) {
            WCOc = parseFloat(tab3[5]);
        } else {
            WCOc = 0;
        }
        gotWCO = true;
    }
    tab1 = response.split("WPos:");
    if (tab1.length > 1) {
        var tab2 = tab1[1].split("|");
        var tab3 = tab2[0].split(",");
        document.getElementById('control_x_position').innerHTML = tab3[0];
        if (gotWCO) document.getElementById('control_xm_position').innerHTML = (WCOx + parseFloat(tab3[0])).toFixed(3);
        if (tab3.length > 1) {
            document.getElementById('control_y_position').innerHTML = tab3[1];
            if (gotWCO) document.getElementById('control_ym_position').innerHTML = (WCOy + parseFloat(tab3[1])).toFixed(3);
        }
        if ((tab3.length > 2) && (grblaxis > 2)) {
            document.getElementById('control_z_position').innerHTML = tab3[2];
            if (gotWCO) document.getElementById('control_zm_position').innerHTML = (WCOz + parseFloat(tab3[2])).toFixed(3);
        }
        if ((tab3.length > 3) && (grblaxis > 3)) {
            document.getElementById('control_a_position').innerHTML = tab3[3];
            if (gotWCO) document.getElementById('control_am_position').innerHTML = (WCOa + parseFloat(tab3[3])).toFixed(3);
        }
        if ((tab3.length > 4) && (grblaxis > 4)) {
            document.getElementById('control_b_position').innerHTML = tab3[4];
            if (gotWCO) document.getElementById('control_bm_position').innerHTML = (WCOb + parseFloat(tab3[4])).toFixed(3);
        }
        if ((tab3.length > 5) && (grblaxis > 5)) {
            document.getElementById('control_c_position').innerHTML = tab3[5];
            if (gotWCO) document.getElementById('control_cm_position').innerHTML = (WCOc + parseFloat(tab3[5])).toFixed(3);
        }

    } else {
        tab1 = response.split("MPos:");
        if (tab1.length > 1) {
            var tab2 = tab1[1].split("|");
            var tab3 = tab2[0].split(",");
            document.getElementById('control_xm_position').innerHTML = tab3[0];
            if (gotWCO) document.getElementById('control_x_position').innerHTML = (parseFloat(tab3[0]) - WCOx).toFixed(3);
            if (tab3.length > 1) {
                document.getElementById('control_ym_position').innerHTML = tab3[1];
                if (gotWCO) document.getElementById('control_y_position').innerHTML = (parseFloat(tab3[1]) - WCOy).toFixed(3);
            }
            if ((tab3.length > 2) && (grblaxis > 2)) {
                document.getElementById('control_zm_position').innerHTML = tab3[2];
                if (gotWCO) document.getElementById('control_z_position').innerHTML = (parseFloat(tab3[2]) - WCOz).toFixed(3);
            }
            if ((tab3.length > 3) && (grblaxis > 3)) {
                document.getElementById('control_am_position').innerHTML = tab3[3];
                if (gotWCO) document.getElementById('control_a_position').innerHTML = (parseFloat(tab3[3]) - WCOa).toFixed(3);
            }
            if ((tab3.length > 4) && (grblaxis > 4)) {
                document.getElementById('control_bm_position').innerHTML = tab3[4];
                if (gotWCO) document.getElementById('control_b_position').innerHTML = (parseFloat(tab3[4]) - WCOb).toFixed(3);
            }
            if ((tab3.length > 5) && (grblaxis > 5)) {
                document.getElementById('control_cm_position').innerHTML = tab3[5];
                if (gotWCO) document.getElementById('control_c_position').innerHTML = (parseFloat(tab3[5]) - WCOc).toFixed(3);
            }
        }
    }
}

function process_grbl_status(response) {

    var tab1 = response.split("|");
    if (tab1.length > 1) {
        var tab2 = tab1[0].replace("<", "");
        document.getElementById("grbl_status").innerHTML = tab2;
        if (tab2.toLowerCase().startsWith("run")) {
            grbl_error_msg = "";
            document.getElementById('sd_resume_btn').style.display = "none";
            document.getElementById('sd_pause_btn').style.display = "table-row";
            document.getElementById('sd_reset_btn').style.display = "table-row";

        } else if (tab2.toLowerCase().startsWith("hold")) {
            grbl_error_msg = tab2;
            document.getElementById('sd_pause_btn').style.display = "none";
            document.getElementById('sd_resume_btn').style.display = "table-row";
            document.getElementById('sd_reset_btn').style.display = "table-row";

        } else if (tab2.toLowerCase().startsWith("alarm")) {
            if (probe_progress_status != 0) {
                probe_failed_notification();
            }
            //grbl_error_msg = "";
            //check we are printing or not 
            if (response.indexOf("|SD:") != -1) {
                //guess print is stopped because of alarm so no need to pause
                document.getElementById('sd_pause_btn').style.display = "none";
                document.getElementById('sd_resume_btn').style.display = "table-row";
                document.getElementById('sd_reset_btn').style.display = "none";
            }
        } else { //TBC for others status
            document.getElementById('sd_pause_btn').style.display = "none";
            document.getElementById('sd_resume_btn').style.display = "none";
            document.getElementById('sd_reset_btn').style.display = "none";
        }
        if (tab2.toLowerCase().startsWith("idle")) {
            grbl_error_msg = "";
        }
        document.getElementById('grbl_status_text').innerHTML = translate_text_item(grbl_error_msg);
        if (tab2.toLowerCase().startsWith("alarm")) document.getElementById('clear_status_btn').style.display = "table-row";
        else document.getElementById('clear_status_btn').style.display = "none";
    }
}

function finalize_probing() {
    probe_progress_status = 0;
    document.getElementById("probingbtn").style.display = "table-row";
    document.getElementById("probingtext").style.display = "none";
    document.getElementById('sd_pause_btn').style.display = "none";
    document.getElementById('sd_resume_btn').style.display = "none";
    document.getElementById('sd_reset_btn').style.display = "none";
}

function process_grbl_SD(response) {
    var tab1 = response.split("|SD:");
    if (tab1.length > 1) {
        var tab2 = tab1[1].split("|");
        var tab3 = tab2[0].split(",");
        //TODO
        var progress = tab3[0];
        var sdname = "???";
        if (tab3.length > 1) {
            sdname = tab3[1].replace(">", "");
        } else {
            progress = progress.replace(">", "");
        }
        document.getElementById('grbl_SD_status').innerHTML = sdname + "&nbsp;<progress id='print_prg' value=" + progress + " max='100'></progress>" + progress + "%";
    } else { //no SD printing
        //TODO     
        document.getElementById('grbl_SD_status').innerHTML = "";
    }
}

function process_grbl_probe_status(response) {
    var tab1 = response.split("|Pn:");
    if (tab1.length > 1) {
        var tab2 = tab1[1].split("|");
        if (tab2[0].indexOf("P") != -1) { //probe touch
            grbl_set_probe_detected(true);
        } else { //Probe did not touched
            grbl_set_probe_detected(false);
        }
    } else { //no info 
        grbl_set_probe_detected(false);
    }
}

function SendRealtimeCmd(cmd) {
    SendPrinterCommand(cmd, false, null, null, cmd.charCodeAt(0), 1);
}

function grbl_process_status(response) {
    process_grbl_position(response);
    process_grbl_status(response);
    process_grbl_SD(response);
    process_grbl_probe_status(response);
}

function grbl_reset_detected(msg) {
    console.log("Reset detected");
}

function grbl_process_msg(response) {
    if (grbl_error_msg.length == 0) grbl_error_msg = translate_text_item(response.trim());
}

function grbl_reset() {
    if (probe_progress_status != 0) probe_failed_notification();
    SendRealtimeCmd(String.fromCharCode(0x18));
}

function grbl_GetProbeResult(response) {
    console.log("yes");
    var tab1 = response.split(":");
    if (tab1.length > 2) {
        var status = tab1[2].replace("]", "");
        if (parseInt(status.trim()) == 1) {
            if (probe_progress_status != 0) {
                var cmd = "G53 G0 Z";
                var tab2 = tab1[1].split(",");
                var v = 0.0;
                v = parseFloat(tab2[2]);
                console.log("z:" + v.toString());
                cmd += v;
                SendPrinterCommand(cmd, true, null, null, 53, 1);
                cmd = "G10 L20 P0 Z" + document.getElementById('probetouchplatethickness').value;;
                SendPrinterCommand(cmd, true, null, null, 10, 1);
                cmd = "G90";
                SendPrinterCommand(cmd, true, null, null, 90, 1);
                finalize_probing();
            }
        } else {
            probe_failed_notification();
        }
    }
}

function probe_failed_notification() {
    finalize_probing();
    alertdlg(translate_text_item("Error"), translate_text_item("Probe failed !"));
    beep(70, 261);
}

function StartProbeProcess() {
    var cmd = "G38.2 G91 Z-";
    if (!onprobemaxtravelChange() ||
        !onprobefeedrateChange() ||
        !onprobetouchplatethicknessChange()) {
        return;
    }
    cmd += parseFloat(document.getElementById('probemaxtravel').value) + " F" + parseInt(document.getElementById('probefeedrate').value);
    console.log(cmd);
    probe_progress_status = 1;
    on_autocheck_status(true);
    SendPrinterCommand(cmd, true, null, null, 38.2, 1);
    document.getElementById("probingbtn").style.display = "none";
    document.getElementById("probingtext").style.display = "table-row";
    grbl_error_msg = "";
    document.getElementById('grbl_status_text').innerHTML = grbl_error_msg;
}
=======
var interval_status = -1;
var probe_progress_status = 0;
var grbl_error_msg = '';
var WCO = undefined;
var OVR = { feed: undefined, rapid: undefined, spindle: undefined };
var MPOS = [0, 0, 0];
var WPOS = [0, 0, 0];
var grblaxis = 3;
var grblzerocmd = 'X0 Y0 Z0';
var feedrate = [0, 0, 0, 0, 0, 0];
var last_axis_letter = 'Z';

var axisNames = ['x', 'y', 'z', 'a', 'b', 'c'];

var modal = { modes: "", plane: 'G17', units: 'G21', wcs: 'G54', distance: 'G90' };

function setClickability(element, visible) {
    setDisplay(element, visible ? 'table-row' : 'none');
}

var autocheck = 'report_auto';
function getAutocheck() {
    return getChecked(autocheck);
}
function setAutocheck(flag) {
    setChecked(autocheck, flag);
}

function build_axis_selection(){
    var html = "<select class='form-control wauto' id='control_select_axis' onchange='control_changeaxis()' >";
    for (var i = 3; i <= grblaxis; i++) {
        var letter;
        if (i == 3) letter = "Z";
        else if (i == 4) letter = "A";
        else if (i == 5) letter = "B";
        else if (i == 6) letter = "C";
        html += "<option value='" + letter + "'";
        if (i == 3) html += " selected ";
        html += ">";
        html += letter;
        html += "</option>\n";
    }

    html += "</select>\n";
    if(grblaxis > 3) {
        setHTML("axis_selection", html);
        setHTML("axis_label", translate_text_item("Axis") + ":");
        setClickability("axis_selection", true)
    }
}

function control_changeaxis(){
    var letter = getValue('control_select_axis');
    setHTML('axisup', '+'+letter);
    setHTML('axisdown', '-'+letter);
    setHTML('homeZlabel', ' '+letter+' ');
    switch(last_axis_letter) {
        case 'Z':
            axis_feedrate[2] = getValue('control_z_velocity');
            break;
        case 'A':
            axis_feedrate[3] = getValue('control_a_velocity');
            break;
        case 'B':
            axis_feedrate[4] = getValue('control_b_velocity');
            break;
        case 'C':
            axis_feedrate[5] = getValue('control_c_velocity');
            break;
    }
    
    last_axis_letter = letter;
    switch(last_axis_letter) {
        case 'Z':
            setValue('control_z_velocity', axis_feedrate[2]);
            break;
        case 'A':
            setValue('control_a_velocity', axis_feedrate[3]);
            break;
        case 'B':
            setValue('control_b_velocity', axis_feedrate[4]);
            break;
        case 'C':
            setValue('control_c_velocity', axis_feedrate[5]);
            break;
    }
}


function init_grbl_panel() {
    grbl_set_probe_detected(false);
    tryAutoReport();
}

function grbl_clear_status() {
    grbl_set_probe_detected(false);
    grbl_error_msg = "";
    setHTML("grbl_status_text", grbl_error_msg);
    setHTML("grbl_status", "");
}

function grbl_set_probe_detected(state) {
    var color = state ? "green" : "grey";
    var glyph = state ? "ok-circle" : "record";
    setHTML("touch_status_icon", get_icon_svg(glyph, "1.3em", "1.3em", color));
}

function onprobemaxtravelChange() {
    var travel = parseFloat(getValue('probemaxtravel'));
    if (travel > 9999 || travel <= 0 || isNaN(travel) || (travel === null)) {
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of maximum probe travel must be between 1 mm and 9999 mm !"));
        return false;
    }
    return true;
}

function onprobefeedrateChange() {
    var feedratevalue = parseInt(getValue('probefeedrate'));
    if (feedratevalue <= 0 || feedratevalue > 9999 || isNaN(feedratevalue) || (feedratevalue === null)) {
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of probe feedrate must be between 1 mm/min and 9999 mm/min !"));
        return false
    }
    return true;
}

function onproberetractChange() {
    var thickness = parseFloat(getValue('proberetract'));
    if (thickness < 0 || thickness > 999 || isNaN(thickness) || (thickness === null)) {
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of probe retract must be between 0 mm and 9999 mm !"));
        return false;
    }
    return true;
}

function onprobetouchplatethicknessChange() {
    var thickness = parseFloat(getValue('probetouchplatethickness'));
    if (thickness < 0 || thickness > 999 || isNaN(thickness) || (thickness === null)) {
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of probe touch plate thickness must be between 0 mm and 9999 mm !"));
        return false;
    }
    return true;
}

var reportType = 'none';

function disablePolling() {
    setAutocheck(false);
    // setValue('statusInterval_check', 0);
    if (interval_status != -1) {
        clearInterval(interval_status);
        interval_status = -1;
    }

    grbl_clear_status();
    reportType = 'none';
}

function enablePolling() {
    var interval = parseFloat(getValue('statusInterval_check'));
    if (!isNaN(interval) && interval > 0 && interval < 100) {
        if (interval_status != -1) {
            clearInterval(interval_status);
        }
        interval_status = setInterval(function() {
            get_status()
        }, interval * 1000);
        reportType = 'polled';
        setChecked('report_poll', true);
    } else {
        setValue("statusInterval_check", 0);
        alertdlg(translate_text_item("Out of range"), translate_text_item("Value of auto-check must be between 0s and 99s !!"));
        disablePolling();
    }
}

function tryAutoReport() {
    if (reportType == 'polled') {
        disablePolling();
    }
    reportType == 'auto';
    interval = id('autoReportInterval').value;
    setChecked('report_auto', true);
    reportType = 'auto';
    SendPrinterCommand("$Report/Interval="+interval, true,
                       // Do nothing more on success
                       function() {},

                       // Fall back to polling if the firmware does not support auto-reports
                       function() {    
                           enablePolling();
                       },

                       99.1, 1);
}
function onAutoReportIntervalChange() {
    tryAutoReport();
}

function disableAutoReport() {
    SendPrinterCommand("$Report/Interval=0", true, null, null, 99.0, 1);
    setChecked('report_auto', false);
}

function reportNone() {
    switch (reportType) {
        case 'polled':
            disablePolling();
            break;
        case 'auto':
            disableAutoReport();
            break;
    }
    setChecked('report_none', true);
    reportType = 'none';
}

function reportPolled() {
    if (reportType == 'auto') {
        disableAutoReport();
    }
    enablePolling();
}

function onReportType(e) {
    switch (e.value) {
        case 'none':
            reportNone();
            break;
        case 'auto':
            tryAutoReport()
            break;
        case 'poll':
            reportPolled();
            break;
    }
}


function onstatusIntervalChange() {
    enablePolling();
}

//TODO handle authentication issues
//errorfn cannot be NULL
function get_status() {
    //ID 114 is same as M114 as '?' cannot be an ID
    SendPrinterCommand("?", false, null, null, 114, 1);
}

function parseGrblStatus(response) {
    var grbl = {
        stateName: '',
        message: '',
        wco: undefined,
        mpos: undefined,
        wpos: undefined,
        feedrate: 0,
        spindle: undefined,
        spindleSpeed: undefined,
        ovr: undefined,
        lineNumber: undefined,
        flood: undefined,
        mist: undefined,
        pins: undefined
    };
    response = response.replace('<','').replace('>','');
    var fields = response.split('|');
    fields.forEach(function(field) {
        var tv = field.split(':');
        var tag = tv[0];
        var value = tv[1];
        switch(tag) {
            case "Door":
                grbl.stateName = tag;
                grbl.message = field;
                break;
            case "Hold":
                grbl.stateName = tag;
                grbl.message = field;
                break;
            case "Run":
            case "Jog":
            case "Idle":
            case "Home":
            case "Alarm":
            case "Check":
            case "Sleep":
                grbl.stateName = tag;
                break;

            case "Ln":
                grbl.lineNumber = parseInt(value);
                break;
            case "MPos":
                grbl.mpos = value.split(',').map( function(v) { return parseFloat(v); } );
                break;
            case "WPos":
                grbl.wpos = value.split(',').map( function(v) { return parseFloat(v); } );
                break;
            case "WCO":
                grbl.wco = value.split(',').map( function(v) { return parseFloat(v); } );
                break;
            case "FS":
                var rates = value.split(',');
                grbl.feedrate = parseFloat(rates[0]);
                grbl.spindleSpeed = parseInt(rates[1]);
                break;
            case "Ov":
                var rates = value.split(',');
                grbl.ovr = {
                    feed: parseInt(rates[0]),
                    rapid: parseInt(rates[1]),
                    spindle: parseInt(rates[2])
                }
                break;
            case "A":
                grbl.spindleDirection = 'M5';
                Array.from(value).forEach(
                    function(v) {
                        switch (v) {
                            case 'S':
                                grbl.spindleDirection = 'M3';
                                break;
                            case 'C':
                                grbl.spindleDirection = 'M4';
                                break;
                            case 'F':
                                grbl.flood = true;
                                break;
                            case 'M':
                                grbl.mist = true;
                                break;
                        }
                    }
                );
                break;
            case "SD":
                var sdinfo = value.split(',');
                grbl.sdPercent = parseFloat(sdinfo[0]);
                grbl.sdName = sdinfo[1];
                break;
            case "Pn":
                // pin status
                grbl.pins = value;
                break;
            default:
                // ignore other fields that might happen to be present
                break;
        }
    });
    return grbl;
}

function clickableFromStateName(state, hasSD) {
    var clickable = {
        resume: false,
        pause: false,
        reset: false
    }
    switch(state) {
        case 'Run':
            clickable.pause = true;
            clickable.reset = true;
            break;
        case 'Hold':
            clickable.resume = true;
            clickable.reset = true;
            break;
        case 'Alarm':
            if (hasSD) {
                //guess print is stopped because of alarm so no need to pause
                clickable.resume = true;
            }
            break;
        case 'Idle':
        case 'Jog':
        case 'Home':
        case 'Check':
        case 'Sleep':
            break;
    }
    return clickable;
}

function show_grbl_position(wpos, mpos) {
    if (wpos) {
        wpos.forEach(function(pos, axis) {
            var element =  'control_' + axisNames[axis] + '_position';
            setHTML(element, pos.toFixed(3));
        });
    }
    if (mpos) {
        mpos.forEach(function(pos, axis) {
            var element = 'control_' + axisNames[axis] + 'm_position';
            setHTML(element, pos.toFixed(3));
        });
    }
}

function show_grbl_status(stateName, message, hasSD) {
    if (stateName) {
        var clickable = clickableFromStateName(stateName, hasSD);
        setHTML('grbl_status', stateName);
        setClickability('sd_resume_btn', clickable.resume);
        setClickability('sd_pause_btn', clickable.pause);
        setClickability('sd_reset_btn', clickable.reset);
        if (stateName == 'Hold' && probe_progress_status != 0) {
            probe_failed_notification();
        }
    }

    setHTML('grbl_status_text', translate_text_item(message));
    setClickability('clear_status_btn', stateName == 'Alarm');
}

function finalize_probing() {
    SendPrinterCommand("G90", true, null, null, 90, 1);
    probe_progress_status = 0;
    setClickability('probingbtn', true);
    setClickability('probingtext', false);
    setClickability('sd_pause_btn', false);
    setClickability('sd_resume_btn', false);
    setClickability('sd_reset_btn', false);
}

function show_grbl_SD(sdName, sdPercent) {
    var status = sdName ? sdName + '&nbsp;<progress id="print_prg" value=' + sdPercent + ' max="100"></progress>' + sdPercent + '%' : '';
    setHTML('grbl_SD_status', status);
}

function show_grbl_probe_status(probed) {
    grbl_set_probe_detected(probed);
}

function SendRealtimeCmd(code) {
    var cmd = String.fromCharCode(code)
    SendPrinterCommand(cmd, false, null, null, code, 1);
}

function pauseGCode() {
    SendRealtimeCmd(0x21); // '!'
}

function resumeGCode() {
    SendRealtimeCmd(0x7e);
}

function stopGCode() {
    grbl_reset();
}

function grblProcessStatus(response) {
    var grbl = parseGrblStatus(response);

    // Record persistent values of data
    if (grbl.wco) {
        WCO = grbl.wco;
    }
    if (grbl.ovr) {
        OVR = grbl.ovr;
    }
    if (grbl.mpos) {
        MPOS = grbl.mpos;
        if (WCO) {
            WPOS = grbl.mpos.map( function(v,index) { return v - WCO[index]; } );
        }
    } else if (grbl.wpos) {
        WPOS = grbl.wpos;
        if (WCO) {
            MPOS = grbl.wpos.map( function(v,index) { return v + WCO[index]; } );
        }
    }

    show_grbl_position(WPOS, MPOS);
    show_grbl_status(grbl.stateName, grbl.message, grbl.sdName);
    show_grbl_SD(grbl.sdName, grbl.sdPercent);
    show_grbl_probe_status(grbl.pins && (grbl.pins.indexOf('P') != -1));
    tabletGrblState(grbl, response);
}

function grbl_reset() {
    if (probe_progress_status != 0)
        probe_failed_notification();
    SendRealtimeCmd(0x18);
}

function grblGetProbeResult(response) {
    var tab1 = response.split(":");
    if (tab1.length > 2) {
        var status = tab1[2].replace("]", "");
        if (parseInt(status.trim()) == 1) {
            if (probe_progress_status != 0) {
                var cmd = "G53 G0 Z";
                var tab2 = tab1[1].split(",");
                var v = 0.0;
                v = parseFloat(tab2[2]);
                cmd += v;
                SendPrinterCommand(cmd, true, null, null, 53, 1);
                // cmd = 'G10 L20 P0 Z' + getValue('probetouchplatethickness');
                // SendPrinterCommand(cmd, true, null, null, 10, 1);
                SendPrinterCommand('G0 Z' + getValue('proberetract'), true, null, null, 0, 1);
                finalize_probing();
            }
        } else {
            probe_failed_notification();
        }
    }
}

function probe_failed_notification() {
    finalize_probing();
    alertdlg(translate_text_item("Error"), translate_text_item("Probe failed !"));
    beep(70, 261);
}
var modalModes = [
    { name: 'motion', values: [ "G80",  "G0",  "G1",  "G2",  "G3",  "G38.1",  "G38.2",  "G38.3",  "G38.4"] },
    { name: 'wcs', values: [ "G54", "G55", "G56", "G57", "G58", "G59"] },
    { name: 'plane', values: [ "G17", "G18", "G19"] },
    { name: 'units', values: [ "G20", "G21"] },
    { name: 'distance', values: [ "G90", "G91"] },
    { name: 'arc_distance', values: [ "G90.1", "G91.1"] },
    { name: 'feed', values: [ "G93", "G94"] },
    { name: 'program', values: [ "M0", "M1", "M2", "M30"] },
    { name: 'spindle', values: [ "M3", "M4", "M5"] },
    { name: 'mist', values: [ "M7"] },  // Also M9, handled separately
    { name: 'flood', values: [ "M8"] }, // Also M9, handled separately
    { name: 'parking', values: [ "M56"] }
];

function grblGetModal(msg) {
    modal.modes = msg.replace("[GC:", '').replace(']', '');
    var modes = modal.modes.split(' ');
    modal.parking = undefined;  // Otherwise there is no way to turn it off
    modal.program = '';  // Otherwise there is no way to turn it off
    modes.forEach(function(mode) {
        if (mode == 'M9') {
            modal.flood = mode;
            modal.mist = mode;
        } else {
            if (mode.charAt(0) === 'T') {
                modal.tool = mode.substring(1);
            } else if (mode.charAt(0) === 'F') {
                modal.feedrate = mode.substring(1);
            } else if (mode.charAt(0) === 'S') {
                modal.spindle = mode.substring(1);
            } else {
                modalModes.forEach(function(modeType) {
                    modeType.values.forEach(function(s) {
                        if (mode == s) {
                            modal[modeType.name] = mode;
                        }
                    });
                });
            }
        }
    });
    tabletUpdateModal();
}

// Whenever [MSG: BeginData] is seen, subsequent lines are collected
// in collectedData, until [MSG: EndData] is seen.  Then collectHander()
// is called, if it is defined.
// To run a command that generates such data, first set collectHandler
// to a callback function to receive the data, then issue the command.
var collecting = false;
var collectedData = '';
var collectHandler = undefined;

// Settings are collected separately because they bracket the data with
// the legacy protocol messages  $0= ... ok
var collectedSettings = null;

function grblHandleMessage(msg) {
    tabletShowMessage(msg, collecting);

    // We handle these two before collecting data because they can be
    // sent at any time, maybe requested by a timer.
    if (msg.startsWith('<')) {
        grblProcessStatus(msg);
        return;
    }
    if (msg.startsWith('[GC:')) {
        grblGetModal(msg);
        console.log(msg);
        return;
    }

    // Block data collection
    if (collecting) {
        if (msg.startsWith('[MSG: EndData]')) {
            collecting = false;
            // Finish collecting data
            if (collectHandler) {
                collectHandler(collectedData);
                collectHandler = undefined;
            }
            collectedData = '';
        } else {
            // Continue collecting data
            collectedData += msg;
        }
        return;
    }
    if (msg.startsWith('[MSG: BeginData]')) {
        // Start collecting data
        collectedData = '';
        collecting = true;
        return;
    }

    // Setting collection
    if (collectedSettings) {
        if (msg.startsWith('ok')) {
            // Finish collecting settings
            getESPconfigSuccess(collectedSettings);
            collectedSettings = null;
            if (grbl_errorfn) {
                grbl_errorfn();
                grbl_errorfn = null;
                grbl_processfn = null;
            }
        } else {
            // Continue collecting settings
            collectedSettings += msg;
        }
        return;
    }
    if (msg.startsWith('$0=') || msg.startsWith('$10=')) {
        // Start collecting settings
        collectedSettings = msg;
        return;
    }

    // Handlers for standard Grbl protocol messages

    if (msg.startsWith('ok')) {
        if (grbl_processfn) {
            grbl_processfn();
            grbl_processfn = null;
            grbl_errorfn = null;
        }
        return;
    }
    if (msg.startsWith('[PRB:')) {
        grblGetProbeResult(msg);
        return;
    }
    if (msg.startsWith('[MSG:')) {
        return;
    }
    if (msg.startsWith('error:')) {
        if (grbl_errorfn) {
            grbl_errorfn();
            grbl_errorfn = null;
            grbl_processfn = null;
        }
    }
    if (msg.startsWith('error:') || msg.startsWith('ALARM:') || msg.startsWith('Hold:') || msg.startsWith('Door:')) {
        if (probe_progress_status != 0) {
            probe_failed_notification();
        }
        if (grbl_error_msg.length == 0) {
            grbl_error_msg = translate_text_item(msg.trim());
        }
        return;
    }
    if (msg.startsWith('Grbl ')) {
        console.log('Reset detected');
        return;
    }
}

function StartProbeProcess() {
    var cmd = "G38.2 G91 Z-";
    if (!onprobemaxtravelChange() ||
        !onprobefeedrateChange() ||
        !onproberetractChange() ||
        !onprobetouchplatethicknessChange()) {
        return;
    }
    cmd += parseFloat(getValue('probemaxtravel')) + ' F' + parseInt(getValue('probefeedrate')) + ' P' + getValue('probetouchplatethickness');
    console.log(cmd);
    probe_progress_status = 1;
    var restoreReport = false;
    if (reportType == 'none') {
        tryAutoReport(); // will fall back to polled if autoreport fails
        restoreReport = true;
    }
    SendPrinterCommand(cmd, true, null, null, 38.2, 1);
    setClickability('probingbtn', false);
    setClickability('probingtext', true);
    grbl_error_msg = '';
    setHTML('grbl_status_text', grbl_error_msg);
    if (restoreReport) {
        reportNone();
    }
}

var spindleSpeedSetTimeout;
var spindleTabSpindleSpeed = 1;

function setSpindleSpeed(speed){
    if(spindleSpeedSetTimeout) clearTimeout(spindleSpeedSetTimeout)
    if(speed >= 1) {
        spindleTabSpindleSpeed = speed
        spindleSpeedSetTimeout = setTimeout(() => SendPrinterCommand('S' + spindleTabSpindleSpeed, false, null, null, 1, 1), 500)
    }
}
>>>>>>> upstream/revamp
