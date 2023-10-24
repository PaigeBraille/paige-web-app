var grbl_processfn = null;
var grbl_errorfn = null;

function noop() {}
function SendPrinterCommand(cmd, echo_on, processfn, errorfn, id, max_id, extra_arg) {
    var url = "/command?commandText=";
    var push_cmd = true;
    if (typeof echo_on !== 'undefined') {
        push_cmd = echo_on;
    }
    if (cmd.trim().length == 0) return;
    if (push_cmd) Monitor_output_Update("[#]" + cmd + "\n");
    //removeIf(production)
    console.log(cmd);
    if (typeof processfn !== 'undefined') processfn("Test response");
    else SendPrinterCommandSuccess("Test response");
    return;
    //endRemoveIf(production)
    if (typeof processfn === 'undefined' || processfn == null) processfn = SendPrinterCommandSuccess;
    if (typeof errorfn === 'undefined' || errorfn == null) errorfn = SendPrinterCommandFailed;
    if (!cmd.startsWith("[ESP")) {
        grbl_processfn = processfn;
        grbl_errorfn = errorfn;
        processfn = noop;
        errorfn = noop;
    }
    cmd = encodeURI(cmd);
    cmd = cmd.replace("#", "%23");
    if (extra_arg) {
        cmd += "&" + extra_arg;
    }
    SendGetHttp(url + cmd, processfn, errorfn, id, max_id);
    //console.log(cmd);
}

function SendPrinterSilentCommand(cmd, processfn, errorfn, id, max_id) {
    var url = "/command_silent?commandText=";
    if (cmd.trim().length == 0) return;
    //removeIf(production)
    console.log(cmd);
    if (typeof processfn !== 'undefined') processfn("Test response");
    else SendPrinterCommandSuccess("Test response");
    return;
    //endRemoveIf(production)
    if (typeof processfn === 'undefined' || processfn == null) processfn = SendPrinterSilentCommandSuccess;
    if (typeof errorfn === 'undefined' || errorfn == null) errorfn = SendPrinterCommandFailed;
    cmd = encodeURI(cmd);
    cmd = cmd.replace("#", "%23");
    SendGetHttp(url + cmd, processfn, errorfn, id, max_id);
    //console.log(cmd);
}

function SendPrinterSilentCommandSuccess(response) {
    //console.log(response);
}

function SendPrinterCommandSuccess(response) {
}

function SendPrinterCommandFailed(error_code, response) {
    if (error_code == 0) {
        Monitor_output_Update(translate_text_item("Connection error") + "\n");
    } else {
         Monitor_output_Update(translate_text_item("Error : ") + error_code + " :" + decode_entitie(response) + "\n");
    }
    console.log("printer cmd Error " + error_code + " :" + decode_entitie(response));
}
