var files_currentPath = "/";
var files_filter_sd_list = false;
var files_file_list = [];
var files_file_list_cache = [];
var files_status_list = [];
var files_current_file_index = -1;
var files_error_status = "";
var tfiles_filters;
var tft_sd = "SD:"
var tft_usb = "U:"
var printer_sd = "SDCARD:"
var current_source = "/"
var last_source = "/"

function build_file_filter_list(filters_list) {
    build_accept(filters_list);
    update_files_list();
}

function update_files_list() {
    //console.log("Updating list");
    if (files_file_list.length == 0) return;
    for (var i = 0; i < files_file_list.length; i++) {
        var isdirectory = files_file_list[i].isdir;
        var file_name = files_file_list[i].name;
        files_file_list[i].isprintable = files_showprintbutton(file_name, isdirectory);
    }
    files_build_display_filelist();
}

function build_accept(file_filters_list) {
    var accept_txt = "";
    if (typeof file_filters_list != 'undefined') {
        tfiles_filters = file_filters_list.trim().split(";");
        for (var i = 0; i < tfiles_filters.length; i++) {
            var v = tfiles_filters[i].trim();
            if (v.length > 0) {
                if (accept_txt.length > 0) accept_txt += ", ";
                accept_txt += "." + v;
            }
        }
    }
    if (accept_txt.length == 0) {
        accept_txt = "*, *.*";
        tfiles_filters = "";
    }
    id('files_input_file').accept = accept_txt;
    console.log(accept_txt);
}

function init_files_panel(dorefresh) {
    displayInline('files_refresh_btn');
    displayNone('files_refresh_primary_sd_btn');
    displayNone('files_refresh_secondary_sd_btn');

    displayNone('files_createdir_btn');
    files_set_button_as_filter(files_filter_sd_list);
    var refreshlist = true;
    if (typeof dorefresh !== 'undefined') refreshlist = dorefresh;
    if (direct_sd && refreshlist) files_refreshFiles(files_currentPath);
}

function files_set_button_as_filter(isfilter) {
    if (!isfilter) {
        id('files_filter_glyph').innerHTML = get_icon_svg("filter", "1em", "1em");
    } else {
        id('files_filter_glyph').innerHTML = get_icon_svg("list-alt", "1em", "1em");
    }
}

function files_filter_button(item) {
    files_filter_sd_list = !files_filter_sd_list;
    files_set_button_as_filter(files_filter_sd_list);
    files_build_display_filelist();
}

function files_build_file_line(index) {
    var content = "";
    var entry = files_file_list[index];
    var is_clickable = files_is_clickable(index);
    if ((files_filter_sd_list && entry.isprintable) || (!files_filter_sd_list)) {
        content += "<li class='list-group-item list-group-hover' >";
        content += "<div class='row'>";
        content += "<div class='col-md-5 col-sm-5 no_overflow' ";
        if (is_clickable) {
            content += "style='cursor:pointer;' onclick='files_click_file(" + index + ")'";
        }
        content += "><table><tr><td><span  style='color:DeepSkyBlue;'>";
        if (entry.isdir == true) content += get_icon_svg("folder-open");
        else content += get_icon_svg("file");
        content += "</span ></td><td>";
        content += entry.name;

        content += "</td></tr></table></div>";
        var sizecol = "col-md-2 col-sm-2";
        var timecol = "col-md-3 col-sm-3";
        var iconcol = "col-md-2 col-sm-2";
        if (!entry.isdir && entry.datetime == "") {
            sizecol = "col-md-4 col-sm-4";
            timecol = "hide_it";
            iconcol = "col-md-3 col-sm-3";
        }
        content += "<div class='" + sizecol + "'";
        if (is_clickable) {
            content += "style='cursor:pointer;' onclick='files_click_file(" + index + ")' ";
        }
        var size= entry.size;
        if (entry.isdir)size="";
        content += ">" +  size + "</div>";
        content += "<div class='" + timecol + "'";
        if (is_clickable) {
            content += "style='cursor:pointer;' onclick='files_click_file(" + index + ")' ";
        }
        content += ">" + entry.datetime + "</div>";
        content += "<div class='" + iconcol + "'>";
        content += "<div class='pull-right'>";
        if (entry.isprintable) {
            content += "<button class='btn btn-xs btn-default'  onclick='files_print(" + index + ")' style='padding-top: 4px;'>";
            content += get_icon_svg("play", "1em", "1em");
            content += "</button>";
        }
        content += "&nbsp;";
        if (files_showdeletebutton(index)) {
            content += "<button class='btn btn-xs btn-danger' onclick='files_delete(" + index + ")'  style='padding-top: 4px;'>" + get_icon_svg("trash", "1em", "1em") + "</button>";
        }
        content += "</div>";
        content += "</div>";
        content += "</div>";
        content += "</li>";
    }
    return content;
}

function files_print(index) {
    files_print_filename(files_currentPath + files_file_list[index].name);
}

function files_print_filename(filename) {
    var cmd = "";
    get_status();
    if (reportType == 'none') {
        tryAutoReport(); // will fall back to polled if autoreport fails
    }
    cmd = "$SD/Run=" + filename;
    SendPrinterCommand(cmd);
}

function files_Createdir() {
    inputdlg(translate_text_item("Please enter directory name"), translate_text_item("Name:"), process_files_Createdir);
}

function process_files_Createdir(answer) {
    if (answer.length > 0) files_create_dir(answer.trim());
}

function files_create_dir(name) {
    if (direct_sd) {
        var cmdpath = files_currentPath;
        var url = "/upload?path=" + encodeURIComponent(cmdpath) + "&action=createdir&filename=" + encodeURIComponent(name);
        displayBlock('files_nav_loader');
        SendGetHttp(url, files_directSD_list_success, files_directSD_list_failed);
    }
}

function files_delete(index) {
    files_current_file_index = index;
    var msg = translate_text_item("Confirm deletion of directory: ");
    if (!files_file_list[index].isdir) msg = translate_text_item("Confirm deletion of file: ");
    confirmdlg(translate_text_item("Please Confirm"), msg + files_file_list[index].name, process_files_Delete);
}

function process_files_Delete(answer) {
    if (answer == "yes" && files_current_file_index != -1) files_delete_file(files_current_file_index);
    files_current_file_index = -1;
}

function files_delete_file(index) {
    files_error_status = "Delete " + files_file_list[index].name;
    if (direct_sd) {
        var cmdpath = files_currentPath;
        var url = "/upload?path=" + encodeURIComponent(cmdpath) + "&action=";
        if (files_file_list[index].isdir) {
            url += "deletedir&filename=";
        } else {
            url += "delete&filename=";
        }
        url += encodeURIComponent(files_file_list[index].sdname);
        displayBlock('files_nav_loader');
        SendGetHttp(url, files_directSD_list_success, files_directSD_list_failed);
    }
}

function files_proccess_and_update(answer) {
    displayBlock('files_navigation_buttons');
    if (answer.startsWith("{") && answer.endsWith("}")) {
        try {
            response = JSON.parse(answer);
            if (typeof response.status != 'undefined') {
                Monitor_output_Update(response.status + "\n");
                files_error_status = response.status;
                //console.log(files_error_status);
            }
        } catch (e) {
            console.error("Parsing error:", e);
            response = "Error";
        }

    } else {
        if (answer[answer.length - 1] != '\n') Monitor_output_Update(answer + "\n");
        else Monitor_output_Update(answer);
        answer = answer.replace("\nok", "");
        answer = answer.replace(/\n/gi, "");
        answer = answer.replace(/\r/gi, "");
        answer = answer.trim();
        console.log(answer)
        if (answer.length > 0) files_error_status = answer;
        else if (files_error_status.length == 0) files_error_status = "Done";
    }
    //console.log("error status:" + files_error_status);
    files_refreshFiles(files_currentPath);
}

function files_is_clickable(index) {
    var entry = files_file_list[index];
    if (entry.isdir) return true;
    return direct_sd;
}

function files_click_file(index) {
    var entry = files_file_list[index];
    if (entry.isdir) {
        var path = files_currentPath + entry.name + "/";
        files_refreshFiles(path, true);
        return;
    }
    if (direct_sd) {
        //console.log("file on direct SD");
        var url = "SD/" + files_currentPath + entry.sdname;
        window.location.href = encodeURIComponent(url.replace("//", "/"));
        return;
    }
}

function files_showprintbutton(filename, isdir) {
    if (isdir == true) return false;
    // This can happen if files_showprintbutton is called before the
    // files panel has been created
    if (typeof tfiles_filters == 'undefined') {
        return false;
    }
    if (tfiles_filters.length == 0) {
        return true;
    }
    for (var i = 0; i < tfiles_filters.length; i++) {
        var v = "." + tfiles_filters[i].trim();
        if (filename.endsWith(v)) return true;
    }
    return false;
}

function files_showdeletebutton(index) {
    //can always deleted dile or dir ?
    //if /ext/ is serial it should failed as fw does not support it
    //var entry = files_file_list[index];    
    //if (direct_sd) return true;
    //if (!entry.isdir) return true;
    return true;
}

function cleanpath(path){
    var p = path;
    p.trim();
    if (p[0]!='/')p="/"+p;
    if (p!="/"){
        if (p.endsWith("/")){
            p = p .substr(0, p.length - 1);
        }
    }
    return p;
}

function files_refreshFiles(path, usecache) {
    //console.log("refresh requested " + path);
    var cmdpath = path;
    files_currentPath = path;
    if (current_source != last_source){
        files_currentPath = "/";
        path="/";
        last_source = current_source;
    }
    if ((current_source==tft_sd) || (current_source==tft_usb)){
     displayNone('print_upload_btn');
    } else {
     displayBlock('print_upload_btn');
    }
    if (typeof usecache === 'undefined') usecache = false;
    id('files_currentPath').innerHTML = files_currentPath;
    files_file_list = [];
    files_status_list = [];
    files_build_display_filelist(false);
    displayBlock('files_list_loader');
    displayBlock('files_nav_loader');
    //this is pure direct SD
    if (direct_sd) {
        var url = "/upload?path=" + encodeURI(cmdpath);
        SendGetHttp(url, files_directSD_list_success, files_directSD_list_failed);
    }
}

function files_format_size(size) {
    var lsize = parseInt(size);
    var value = 0.0;
    var tsize = "";
    if (lsize < 1024) {
        tsize = lsize + " B";
    } else if (lsize < (1024 * 1024)) {
        value = (lsize / 1024.0);
        tsize = value.toFixed(2) + " KB";
    } else if (lsize < (1024 * 1024 * 1024)) {
        value = ((lsize / 1024.0) / 1024.0);
        tsize = value.toFixed(2) + " MB";
    } else {
        value = (((lsize / 1024.0) / 1024.0) / 1024.0);
        tsize = value.toFixed(2) + " GB";
    }
    return tsize;
}

function files_serial_M20_list_display() {
    var path = "";
    if (files_currentPath.length > 1) path = files_currentPath.substring(1);
    var folderlist = "";
    for (var i = 0; i < files_file_list_cache.length; i++) {
        //console.log("processing " + files_file_list_cache[i].name)
        var file_name = files_file_list_cache[i].name;
        if (file_name.startsWith(path) || (current_source == tft_usb)|| (current_source == tft_sd)) {
            //console.log("need display " + file_name)
            if (!((current_source == tft_usb)|| (current_source == tft_sd)))file_name = file_name.substring(path.length);
            //console.log ("file name is :" + file_name)
            if (file_name.length > 0) {
                var endpos = file_name.indexOf("/");
                if (endpos > -1) file_name = file_name.substring(0, endpos + 1);
                var isdirectory = files_file_list_cache[i].isdir;
                var isprint = files_file_list_cache[i].isprintable;
                //to workaround the directory is not listed on its own like in marlin
                if (file_name.endsWith("/")) {
                    isdirectory = true;
                    isprint = false;
                    file_name = file_name.substring(0, file_name.length - 1);
                }
                var file_entry = {
                    name: file_name,
                    size: files_file_list_cache[i].size,
                    isdir: isdirectory,
                    datetime: files_file_list_cache[i].datetime,
                    isprintable: isprint
                };
                var tag = "*" + file_name + "*";
                if ((isdirectory && folderlist.indexOf(tag) == -1) || !isdirectory) {
                    //console.log("add to list " + file_name)
                    files_file_list.push(file_entry);
                    if (isdirectory) {
                        folderlist += tag;
                    }
                }
            }
        }
    }
    files_build_display_filelist();
}

function files_serial_M20_list_success(response_text) {
    var path = "";
    var tlist = response_text.split("\n");
    if (files_currentPath.length > 1) path = files_currentPath.substring(1);
    var folderlist = "";
    files_file_list_cache = [];
    for (var i = 0; i < tlist.length; i++) {
        var line = tlist[i].trim();
        var isdirectory = false;
        var file_name = "";
        var fsize = "";
        var d = "";
        line = line.replace("\r", "");
        if (!((line.length == 0) || (line.indexOf("egin file list") > 0) || (line.indexOf("nd file list") > 0) || (line.startsWith("ok ") > 0)|| (line.indexOf(":") > 0) || (line == "ok")  || (line == "wait"))) {
            //for marlin
            if (line.startsWith("/")) {
                line = line.substring(1);
            }
            //if directory it is ending with /
            if (line.endsWith("/")) {
                isdirectory = true;
                file_name = line;
                //console.log(file_name + " is a dir");
            } else {
                //console.log(line + " is a file");
                file_name = line;
            }
            //console.log("pushing " + file_name );
            var isprint = files_showprintbutton(file_name, isdirectory);
            //var tag = "*" + file_name + "*";
            var file_entry = {
                name: file_name,
                size: fsize,
                isdir: isdirectory,
                datetime: d,
                isprintable: isprint
            };
            files_file_list_cache.push(file_entry);
        }
    }
    files_serial_M20_list_display();
}

function files_is_filename(file_name) {
    var answer = true;
    var s_name = String(file_name);
    var rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
    var rg2 = /^\./; // cannot start with dot (.)
    var rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
    //a 
    answer = rg1.test(file_name) && !rg2.test(file_name) && !rg3.test(file_name)
    if ((s_name.length == 0) || (s_name.indexOf(":") != -1) || (s_name.indexOf("..") != -1)) answer = false;

    return answer;
}

function files_serial_ls_list_success(response_text) {
    var tlist = response_text.split("\n");
    for (var i = 0; i < tlist.length; i++) {
        var line = tlist[i].trim();
        var isdirectory = false;
        var file_name = "";
        var fsize = "";
        var d = ""
        var command = "ls -s " +  cleanpath(files_currentPath);
        if (line == command) continue;
        if (line.length != 0) {
            if (line.endsWith("/")) {
                isdirectory = true;
                file_name = line.substring(0, line.length - 1);
            } else {
                var pos = line.lastIndexOf(" ");
                file_name = line.substr(0, pos);
                fsize = files_format_size(parseInt(line.substr(pos + 1)));
            }
            var isprint = files_showprintbutton(file_name, isdirectory);
            if (files_is_filename(file_name)) {
                var file_entry = {
                    name: file_name,
                    size: fsize,
                    isdir: isdirectory,
                    datetime: d,
                    isprintable: isprint
                };
                files_file_list.push(file_entry);
            }
        }
    }
    files_build_display_filelist();
}


function files_directSD_list_success(response_text) {
    displayBlock('files_navigation_buttons');
    var error = false;
    var response;
    try {
        response = JSON.parse(response_text);
    } catch (e) {
        console.error("Parsing error:", e);
        error = true;
    }
    if (error || typeof response.status == 'undefined') {
        files_directSD_list_failed(406, translate_text_item("Wrong data", true));
        return;
    }
    populateTabletFileSelector(response);
    files_file_list = [];
    files_status_list = [];
    if (typeof response.files != 'undefined') {
        for (var i = 0; i < response.files.length; i++) {
            var file_name = "";
            var isdirectory = false;
            var fsize = "";
            if (response.files[i].size == "-1") isdirectory = true;
            else fsize = response.files[i].size;
            file_name = response.files[i].name;
            var isprint = files_showprintbutton(file_name, isdirectory);
            var file_entry = {
                name: file_name,
                sdname: response.files[i].name,
                size: fsize,
                isdir: isdirectory,
                datetime: response.files[i].datetime,
                isprintable: isprint
            };
            files_file_list.push(file_entry);
        }
    }
    var vtotal = "-1";
    var vused = "-1";
    var voccupation = "-1";
    if (typeof response.total != 'undefined') vtotal = response.total;
    if (typeof response.used != 'undefined') vused = response.used;
    if (typeof response.occupation != 'undefined') voccupation = response.occupation;
    files_status_list.push({
        status: translate_text_item(response.status),
        path: response.path,
        used: vused,
        total: vtotal,
        occupation: voccupation
    });
    files_build_display_filelist();
}

function files_serial_M20_list_failed(error_code, response) {
    displayBlock('files_navigation_buttons');
    if (esp_error_code !=0){
         alertdlg (translate_text_item("Error") + " (" + esp_error_code + ")", esp_error_message);
         esp_error_code = 0;
    } else {
        alertdlg (translate_text_item("Error"), translate_text_item("No connection"));
    }
    files_build_display_filelist(false);
}

function files_serial_ls_list_failed(error_code, response) {
    files_serial_M20_list_failed(error_code, response);
}

function files_directSD_list_failed(error_code, response) {
    files_serial_M20_list_failed(error_code, response);
}

function files_directSD_upload_failed(error_code, response) {
    if (esp_error_code !=0){
         alertdlg (translate_text_item("Error") + " (" + esp_error_code + ")", esp_error_message);
         esp_error_code = 0;
    } else {
        alertdlg (translate_text_item("Error"), translate_text_item("Upload failed"));
    }
    displayNone('files_uploading_msg');
    displayBlock('files_navigation_buttons');
}

function need_up_level() {
    return files_currentPath != "/";
}

function files_go_levelup() {
    var tlist = files_currentPath.split("/");
    var path = "/";
    var nb = 1;
    while (nb < (tlist.length - 2)) {
        path += tlist[nb] + "/";
        nb++;
    }
    files_refreshFiles(path, true);
}

function files_build_display_filelist(displaylist) {
    var content = "";
    displayNone('files_uploading_msg');
    if (typeof displaylist == 'undefined') displaylist = true;
    displayNone('files_list_loader');
    displayNone('files_nav_loader');
    if (!displaylist) {
        displayNone('files_status_sd_status');
        displayNone('files_space_sd_status');
        id('files_fileList').innerHTML = "";
        displayNone('files_fileList');
        return;
    }
    if (need_up_level()) {
        content += "<li class='list-group-item list-group-hover' style='cursor:pointer' onclick='files_go_levelup()''>";
        content += "<span >" + get_icon_svg("level-up") + "</span>&nbsp;&nbsp;<span translate>Up...</span>";
        content += "</li>";
    }
    files_file_list.sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });
    for (var index = 0; index < files_file_list.length; index++) {
        if (files_file_list[index].isdir == false) content += files_build_file_line(index);
    }
    for (index = 0; index < files_file_list.length; index++) {
        if (files_file_list[index].isdir) content += files_build_file_line(index);
    }
    displayBlock('files_fileList');
    id('files_fileList').innerHTML = content;
    if ((files_status_list.length == 0) && (files_error_status != "")) {
        files_status_list.push({
            status: files_error_status,
            path: files_currentPath,
            used: "-1",
            total: "-1",
            occupation: "-1"
        });
    }
    if (files_status_list.length > 0) {
        if (files_status_list[0].total != "-1") {
            id('files_sd_status_total').innerHTML = files_status_list[0].total;
            id('files_sd_status_used').innerHTML = files_status_list[0].used;
            id('files_sd_status_occupation').value = files_status_list[0].occupation;
            id('files_sd_status_percent').innerHTML = files_status_list[0].occupation;
            displayTable('files_space_sd_status');
        } else {
            displayNone('files_space_sd_status');
        }
        if ((files_error_status != "") && ((files_status_list[0].status.toLowerCase() == "ok") || (files_status_list[0].status.length == 0))) {
            files_status_list[0].status = files_error_status;
        }
        files_error_status = "";
        if (files_status_list[0].status.toLowerCase() != "ok") {
            id('files_sd_status_msg').innerHTML = translate_text_item(files_status_list[0].status, true);
            displayTable('files_status_sd_status');
        } else {
            displayNone('files_status_sd_status');
        }
    } else displayNone('files_space_sd_status');
}

function files_abort() {
    SendPrinterCommand("abort");
}

function files_select_upload() {
    id('files_input_file').click();
}

function files_check_if_upload() {
    var canupload = true;
    var files = id("files_input_file").files;
    if (direct_sd) {
        SendPrinterCommand("[ESP200]", false, process_check_sd_presence);
    } else {
        //no reliable way to know SD is present or not so let's upload
        files_start_upload();
    }
}

function process_check_sd_presence(answer) {
    //console.log(answer);
    //for direct SD there is a SD check
    if (direct_sd) {
        if (answer.indexOf("o SD card") > -1) {
            alertdlg(translate_text_item("Upload failed"), translate_text_item("No SD card detected"));
            files_error_status = "No SD card"
            files_build_display_filelist(false);
            id('files_sd_status_msg').innerHTML = translate_text_item(files_error_status, true);
            displayTable('files_status_sd_status');
        } else files_start_upload();
    } else { //for smoothiware ls say no directory
        files_start_upload();
    }
}

function files_start_upload() {
    if (http_communication_locked) {
        alertdlg(translate_text_item("Busy..."), translate_text_item("Communications are currently locked, please wait and retry."));
        console.log("communication locked");
        return;
    }
    var url = "/upload";
    var path = files_currentPath;
    if (direct_sd) {
        path = files_currentPath.substring(primary_sd.length);
    } else {
        url = "/upload_serial";
    }
    //console.log("upload from " + path );
    var files = id("files_input_file").files;

    if (files.value == "" || typeof files[0].name === 'undefined') {
        console.log("nothing to upload");
        return;
    }
    var formData = new FormData();

    formData.append('path', path);
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var arg = path + file.name + "S";
        //append file size first to check updload is complete
        formData.append(arg, file.size);
        formData.append('myfile[]', file, path + file.name);
        //console.log( path +file.name);
    }
    files_error_status = "Upload " + file.name;
    id('files_currentUpload_msg').innerHTML = file.name;
    displayBlock('files_uploading_msg');
    displayNone('files_navigation_buttons');
    if (direct_sd) {
        SendFileHttp(url, formData, FilesUploadProgressDisplay, files_directSD_list_success, files_directSD_upload_failed);
        //console.log("send file");
    }
    id("files_input_file").value = "";
}


function FilesUploadProgressDisplay(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        id('files_prg').value = percentComplete;
        id('files_percent_upload').innerHTML = percentComplete.toFixed(0);
    } else {
        // Impossible because size is unknown
    }
}
