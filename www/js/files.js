var initialInputText = document.querySelector("#initialInputText");
var processedText = document.querySelector("#processedText");

var files_currentPath = "/";
var files_filter_sd_list = false;
var files_file_list = [];
var files_file_list_cache = [];
var files_status_list = [];
var files_current_file_index = -1;
var files_error_status = "";
var tfiles_filters;
var tft_sd = "SD:";
var tft_usb = "U:";
var printer_sd = "SDCARD:";
var current_source = "/";
var last_source = "/";

var delete_button = '<svg width="54" height="41" viewBox="0 0 54 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48.7301 0.390137H5.12012C2.35869 0.390137 0.120117 2.62871 0.120117 5.39014V35.6101C0.120117 38.3716 2.35869 40.6101 5.12012 40.6101H48.7301C51.4915 40.6101 53.7301 38.3716 53.7301 35.6101V5.39014C53.7301 2.62871 51.4915 0.390137 48.7301 0.390137Z" fill="#F44545"/><path d="M20.9099 26.5202L32.9399 14.4902" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/><path d="M20.9099 14.4902L32.9399 26.5202" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg>'
var download_button = '<svg width="29" height="39" viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.3499 38.4098H0.649902C0.517294 38.4098 0.390117 38.3572 0.296349 38.2634C0.20258 38.1696 0.149902 38.0424 0.149902 37.9098V1.08984C0.149902 0.957236 0.20258 0.830058 0.296349 0.73629C0.390117 0.642522 0.517294 0.589844 0.649902 0.589844H18.6499C18.7719 0.592299 18.889 0.638423 18.9799 0.719843L28.6499 9.62984C28.7005 9.67512 28.741 9.73061 28.7685 9.79267C28.7961 9.85473 28.8102 9.92194 28.8099 9.98985V37.9098C28.8103 38.0358 28.7632 38.1573 28.6779 38.25C28.5926 38.3427 28.4755 38.3998 28.3499 38.4098ZM1.1399 37.4098H27.8599V10.2098L18.4999 1.57984H1.1399V37.4098Z" fill="#2A7DE1"/><path d="M23.3 5.55984L18.48 1.08984V10.2498H28.35L23.3 5.55984Z" fill="#2A7DE1"/><path d="M22.8399 17.9997H6.76989C6.71828 18.0084 6.6654 18.0057 6.61493 17.9919C6.56445 17.978 6.5176 17.9533 6.47764 17.9196C6.43768 17.8858 6.40556 17.8437 6.38354 17.7962C6.36151 17.7487 6.3501 17.697 6.3501 17.6447C6.3501 17.5923 6.36151 17.5406 6.38354 17.4932C6.40556 17.4457 6.43768 17.4036 6.47764 17.3698C6.5176 17.336 6.56445 17.3113 6.61493 17.2975C6.6654 17.2836 6.71828 17.281 6.76989 17.2897H22.8399C22.9238 17.3038 23 17.3472 23.055 17.4122C23.1099 17.4772 23.1401 17.5596 23.1401 17.6447C23.1401 17.7298 23.1099 17.8121 23.055 17.8771C23 17.9421 22.9238 17.9855 22.8399 17.9997Z" fill="#2A7DE1"/><path d="M22.8399 22.1198H6.76989C6.71828 22.1285 6.6654 22.1258 6.61493 22.112C6.56445 22.0981 6.5176 22.0735 6.47764 22.0397C6.43768 22.0059 6.40556 21.9638 6.38354 21.9163C6.36151 21.8688 6.3501 21.8171 6.3501 21.7648C6.3501 21.7124 6.36151 21.6607 6.38354 21.6133C6.40556 21.5658 6.43768 21.5237 6.47764 21.4899C6.5176 21.4561 6.56445 21.4314 6.61493 21.4176C6.6654 21.4038 6.71828 21.4011 6.76989 21.4098H22.8399C22.9238 21.4239 23 21.4673 23.055 21.5323C23.1099 21.5973 23.1401 21.6797 23.1401 21.7648C23.1401 21.8499 23.1099 21.9323 23.055 21.9972C23 22.0622 22.9238 22.1056 22.8399 22.1198Z" fill="#2A7DE1"/><path d="M22.8399 26.2497H6.76989C6.71828 26.2584 6.6654 26.2557 6.61493 26.2419C6.56445 26.228 6.5176 26.2033 6.47764 26.1696C6.43768 26.1358 6.40556 26.0937 6.38354 26.0462C6.36151 25.9987 6.3501 25.947 6.3501 25.8947C6.3501 25.8423 6.36151 25.7906 6.38354 25.7432C6.40556 25.6957 6.43768 25.6536 6.47764 25.6198C6.5176 25.586 6.56445 25.5613 6.61493 25.5475C6.6654 25.5336 6.71828 25.531 6.76989 25.5397H22.8399C22.9238 25.5538 23 25.5972 23.055 25.6622C23.1099 25.7272 23.1401 25.8096 23.1401 25.8947C23.1401 25.9798 23.1099 26.0621 23.055 26.1271C23 26.1921 22.9238 26.2355 22.8399 26.2497Z" fill="#2A7DE1"/><path d="M22.8399 30.38H6.76989C6.71828 30.3887 6.6654 30.3861 6.61493 30.3722C6.56445 30.3584 6.5176 30.3337 6.47764 30.2999C6.43768 30.2661 6.40556 30.224 6.38354 30.1766C6.36151 30.1291 6.3501 30.0774 6.3501 30.025C6.3501 29.9727 6.36151 29.921 6.38354 29.8735C6.40556 29.826 6.43768 29.7839 6.47764 29.7502C6.5176 29.7164 6.56445 29.6917 6.61493 29.6778C6.6654 29.664 6.71828 29.6613 6.76989 29.67H22.8399C22.9238 29.6842 23 29.7276 23.055 29.7926C23.1099 29.8576 23.1401 29.9399 23.1401 30.025C23.1401 30.1102 23.1099 30.1925 23.055 30.2575C23 30.3225 22.9238 30.3659 22.8399 30.38Z" fill="#2A7DE1"/></svg>'
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
    files_file_list[i].isprintable = files_showprintbutton(
      file_name,
      isdirectory
    );
  }
  files_build_display_filelist();
}

function build_accept(file_filters_list) {
  var accept_txt = "";
  if (typeof file_filters_list != "undefined") {
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
  document.getElementById("files_input_file").accept = accept_txt + ", text/plain, .txt, .brf";
  console.log(accept_txt);
}

function init_files_panel(dorefresh) {
  files_set_button_as_filter(files_filter_sd_list);
  var refreshlist = true;
  if (typeof dorefresh !== "undefined") refreshlist = dorefresh;
  if (direct_sd && refreshlist) files_refreshFiles(files_currentPath);
}

function files_set_button_as_filter(isfilter) {
  if (!isfilter) {
    document.getElementById("files_filter_glyph").innerHTML = get_icon_svg(
      "filter",
      "1em",
      "1em"
    );
  } else {
    document.getElementById("files_filter_glyph").innerHTML = get_icon_svg(
      "list-alt",
      "1em",
      "1em"
    );
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
  if ((files_filter_sd_list && entry.isprintable) || !files_filter_sd_list) {
    content += "<li class='list-group-item list-group-hover file-item' tabindex='0'>";
    content += "<button class='download-button' aria-label='Download " + entry.name + "'";
    if (is_clickable) {
      content +=
        "onclick='files_click_file(" + index + ")' ";
    }
    content += ">";
    if (entry.isdir == true) content += get_icon_svg("folder-open");
    else content += '<!-- replaceSVG --><object data="images/Files.svg" type="image/svg+xml" ></object><!-- /replaceSVG -->';
    content += "</button>";
    if (
      direct_sd &&
      target_firmware == "marlin" &&
      typeof entry.sdname !== "undefined"
    ) {
      content += "<span class='filename-text'>" + entry.sdname + "</span>";
    } else {
      content += "<span class='filename-text'>" + entry.name + "</span>";
    }
    content += "<div class='file-buttons' style='display:inline-flex;'>";
    if (files_showdeletebutton(index)) {
      content +=
        "<button class='delete-button' aria-label='Delete " +
        entry.name +
        "' onclick='files_delete(" +
        index +
        ")'>" +
        delete_button +
        "</button>";
    }
    content += "</div>";
    content += "</li>";
  }
  return content;
}


function PAIGE_files_load(index) {
  var filePath = "SD" + files_currentPath + files_file_list[index].name;
  if (files_currentPath[0] !== "/") {
    filePath = "SD/" + files_currentPath + files_file_list[index].name;
  }
  try {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filePath, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status === 200) {
        var allText = rawFile.responseText;
        openPaigeTab();
        if (files_file_list[index].name.includes(".brf")) {
          // Braille file -> put directly into input textarea
          onPaigeChange(allText, false);
        } else {
          // Translate from english to braille first
          updateTextFromEnglishFileUpload(allText);
        }

      } else {
        console.error("Error loading file from", filePath);
        console.error("Ready state", rawFile.readyState);
        console.error("Status", rawFile.status);
      }
    };
    rawFile.send(null);
  } catch (e) {
    console.log(e);
  }
}

function readTextFile(file) {
  var needsToPrintLine1 = 0;
  var needsToPrintLine2 = 0;
  var needsToPrintLine3 = 0;
  var needsToPrintLine4 = 0;
  var needsToPrintLine5 = 0;


  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        console.log("this is the content of the file");
        console.log(allText);
        var lines = allText.split("\n");
        // Populate which lines need to run
        if (lines.length === 1) {
          needsToPrintLine1 = 1
        }
        if (lines.length === 2) {
          needsToPrintLine1 = 1
          needsToPrintLine2 = 1;
        }
        if (lines.length === 3) {
          needsToPrintLine1 = 1
          needsToPrintLine2 = 1;
          needsToPrintLine3 = 1;
        }
        if (lines.length === 4) {
          needsToPrintLine1 = 1
          needsToPrintLine2 = 1;
          needsToPrintLine3 = 1;
          needsToPrintLine4 = 1;
        }
        if (lines.length === 5 || lines.length === 6) {
          needsToPrintLine1 = 1
          needsToPrintLine2 = 1;
          needsToPrintLine3 = 1;
          needsToPrintLine4 = 1;
          needsToPrintLine5 = 1;
        }
        // Check the position every 500 milliseconds
        var myInterval = setInterval(function () {
          if (needsToPrintLine1 === 1 && checkPotentiometerValue(1)) {
            console.log("Printing the Line 1")
            var line1 = lines[0]
            var line1Split = line1.split("");
            line1Split.forEach(function (el, index) {
              var AsciiBase10 = lines[0].charCodeAt(index);
              var fileName = getAsciiFileName(AsciiBase10);
              var gcodeFileName = fileName + ".gcode";
              PAIGESimpleReadSPIFFFile(gcodeFileName)
            })
            needsToPrintLine1 = 0
            if (line1.length === 15) {
              PAIGESimpleReadSPIFFFile("A.gcode")
            }
          } else if (needsToPrintLine2 === 1 && checkPotentiometerValue(2)) {
            console.log("Printing the Line 2")
            var line2 = lines[1]
            var line2Split = line2.split("");
            line2Split.forEach(function (el, index) {
              var AsciiBase10 = lines[1].charCodeAt(index);
              var fileName = getAsciiFileName(AsciiBase10);
              var gcodeFileName = fileName + ".gcode";
              PAIGESimpleReadSPIFFFile(gcodeFileName)
            })
            needsToPrintLine2 = 0
            if (line2.length === 15) {
              PAIGESimpleReadSPIFFFile("A.gcode")
            }
          } else if (needsToPrintLine3 === 1 && checkPotentiometerValue(3)) {
            console.log("Printing the Line 3")
            var line3 = lines[2]
            var line3Split = line3.split("");
            line3Split.forEach(function (el, index) {
              var AsciiBase10 = lines[2].charCodeAt(index);
              var fileName = getAsciiFileName(AsciiBase10);
              var gcodeFileName = fileName + ".gcode";
              PAIGESimpleReadSPIFFFile(gcodeFileName)
            })
            needsToPrintLine3 = 0
            if (line3.length === 15) {
              PAIGESimpleReadSPIFFFile("A.gcode")
            }
          } else if (needsToPrintLine4 === 1 && checkPotentiometerValue(4)) {
            console.log("Printing the Line 4")
            var line4 = lines[3]
            var line4Split = line4.split("");
            line4Split.forEach(function (el, index) {
              var AsciiBase10 = lines[3].charCodeAt(index);
              var fileName = getAsciiFileName(AsciiBase10);
              var gcodeFileName = fileName + ".gcode";
              PAIGESimpleReadSPIFFFile(gcodeFileName)
            })
            needsToPrintLine4 = 0
            if (line4.length === 15) {
              PAIGESimpleReadSPIFFFile("A.gcode")
            }
          } else if (needsToPrintLine5 === 1 && checkPotentiometerValue(5)) {
            console.log("Printing the Line 5")
            var line5 = lines[4]
            var line5Split = line5.split("");
            line5Split.forEach(function (el, index) {
              var AsciiBase10 = lines[4].charCodeAt(index);
              var fileName = getAsciiFileName(AsciiBase10);
              var gcodeFileName = fileName + ".gcode";
              PAIGESimpleReadSPIFFFile(gcodeFileName)
            })
            needsToPrintLine5 = 0
            if (line5.length === 15) {
              PAIGESimpleReadSPIFFFile("A.gcode")
            }
          } else if (needsToPrintLine1 === 0 && needsToPrintLine2 === 0 && needsToPrintLine3 === 0 && needsToPrintLine4 === 0 && needsToPrintLine5 === 0) {
            clearInterval(myInterval);
            console.log("Printing has finished")
            initialInputText.value = allText;
            processedText.value = allText;
          }
        }, 500);
      }
    }
  };
  rawFile.send(null);
}

function PAIGESimpleReadSPIFFFile(file) {
  if (file === "A.gcode") { // New line
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 Y-6.5");
    PAIGE_SendGrblCommand("G0 X-120");
    PAIGE_SendGrblCommand("G0 Y-6.5");
  }
  if (file === "clear.gcode") { // Clear
    PAIGE_SendGrblCommand("G90");
    PAIGE_SendGrblCommand("G0 Y-150");
    PAIGE_SendGrblCommand("G1 X150 F3000");
    PAIGE_SendGrblCommand("G0 X0");
    PAIGE_SendGrblCommand("G0 Y0");
  }
  if (file === "initial.gcode") { // Initial
    PAIGE_SendGrblCommand("G90");
    PAIGE_SendGrblCommand("G0 X23.8 Y-4.5");
  }
  if (file === "20.gcode") { // Space
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 Y1.5");
    PAIGE_SendGrblCommand("G0 X8");
    PAIGE_SendGrblCommand("G0 Y-1.5");
  }
  if (file === "21.gcode") { // !
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 X-3 Y-3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "22.gcode") { // "
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y1.5");
    PAIGE_SendGrblCommand("G0 X3 Y-1.5");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "23.gcode") { // #
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "24.gcode") { // $
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X-3 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "25.gcode") { // %
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X-2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "26.gcode") { // &
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X-3 Y-3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "27.gcode") { // '
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y1.5");
  }
  if (file === "28.gcode") { // (
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 Y-6");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "29.gcode") { // )
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "2A.gcode") { // *
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X1.5 Y-3");
    PAIGE_SendGrblCommand("G0 X1.5 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "2B.gcode") { // +
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X-2.5 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "2C.gcode") { // ,
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-1.5");
    PAIGE_SendGrblCommand("G0 X3 Y-1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "2D.gcode") { // -
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "2E.gcode") { // .
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-1.5");
    PAIGE_SendGrblCommand("G0 X3 Y-1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X-2.5 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "2F.gcode") { // /
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X1.5 Y3");
    PAIGE_SendGrblCommand("G0 X1.5 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "30.gcode") { // 0
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "31.gcode") { // 1
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 X3 Y1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y-1.5");
  }
  if (file === "32.gcode") { // 2
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y1.5");
  }
  if (file === "33.gcode") { // 3
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X8");
  }
  if (file === "34.gcode") { // 4
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X5.5");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "35.gcode") { // 5
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "36.gcode") { // 6
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X5.5");
  }
  if (file === "37.gcode") { // 7
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "38.gcode") { // 8
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "39.gcode") { // 9
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "3A.gcode") { // :
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "3B.gcode") { // ;
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y1.5");
    PAIGE_SendGrblCommand("G0 X3 Y-1.5");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "3C.gcode") { // <
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "3D.gcode") { // =
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-6");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "3E.gcode") { // >
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "3F.gcode") { // ?
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-6");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "40.gcode") { // @
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y1.5");
    PAIGE_SendGrblCommand("G0 X3 Y1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "41.gcode") { // A
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y-1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y-1.5");
  }
  if (file === "42.gcode") { // B
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y-1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y-1.5");
  }
  if (file === "43.gcode") { // C
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "44.gcode") { // D
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "45.gcode") { // E
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "46.gcode") { // F
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "47.gcode") { // G
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "48.gcode") { // H
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "49.gcode") { // I
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "4A.gcode") { // J
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X5.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "4B.gcode") { // K
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X-2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y1.5");
  }
  if (file === "4C.gcode") { // L
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 Y-6");
    PAIGE_SendGrblCommand("G0 X3 Y1.5");
    PAIGE_SendGrblCommand("G0 X2.5 Y1.5");
  }
  if (file === "4D.gcode") { // M
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X-2.5 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "4E.gcode") { // N
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X-3 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "4F.gcode") { // O
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X-3 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "50.gcode") { // P
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "51.gcode") { // Q
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "52.gcode") { // R
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5");
  }
  if (file === "53.gcode") { // S
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "54.gcode") { // T
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "55.gcode") { // U
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X-2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "56.gcode") { // V
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 Y-6");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "57.gcode") { // W
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "58.gcode") { // X
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X-3");
    PAIGE_SendGrblCommand("G0 X-2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "59.gcode") { // Y
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-6");
    PAIGE_SendGrblCommand("G0 X-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "5A.gcode") { // Z
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "5B.gcode") { // [
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 X3 Y3");
    PAIGE_SendGrblCommand("G0 X-3 Y-3");
    PAIGE_SendGrblCommand("G0 X3 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "5C.gcode") { // \
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-3");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "5D.gcode") { // ]
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X3");
    PAIGE_SendGrblCommand("G0 Y-6");
    PAIGE_SendGrblCommand("G0 X2.5 Y3");
  }
  if (file === "5E.gcode") { // ^
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-1.5");
    PAIGE_SendGrblCommand("G0 X3 Y1.5");
    PAIGE_SendGrblCommand("G0 Y3");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
  if (file === "5F.gcode") { // _
    PAIGE_SendGrblCommand("G91");
    PAIGE_SendGrblCommand("G0 X2.5 Y-1.5");
    PAIGE_SendGrblCommand("G0 X3 Y-1.5");
    PAIGE_SendGrblCommand("G0 Y6");
    PAIGE_SendGrblCommand("G0 X2.5 Y-3");
  }
}

// Feed hold is "!"
// Cycle start is ~

function PAIGE_SendGrblCommand(cmd) {
  var url = "/command?commandText=";
  cmd = cmd.trim();
  if (cmd.trim().length == 0) return;
  CustomCommand_history.push(cmd);
  CustomCommand_history.slice(-40);
  CustomCommand_history_index = CustomCommand_history.length;
  document.getElementById("custom_cmd_txt").value = "";
  Monitor_output_Update(cmd + "\n");
  cmd = encodeURI(cmd);
  //because # is not encoded
  cmd = cmd.replace("#", "%23");
  SendGetHttp(url + cmd, SendCustomCommandSuccess, SendCustomCommandFailed);
}

function files_print(index) {
  files_print_filename(files_currentPath + files_file_list[index].name);
}

function files_print_filename(filename) {
  var cmd = "";
  if (target_firmware == "smoothieware") {
    cmd = "play " + filename;
  } else if (target_firmware == "grbl-embedded") {
    SendPrinterCommand("?", false, null, null, 114, 1);
    on_autocheck_status(true);
    cmd = "[ESP220]" + filename;
  } else {
    var newfilename = filename;
    if (current_source == tft_sd || current_source == tft_usb)
      newfilename = current_source + filename;
    cmd = "M23 " + newfilename + "\nM24";
  }
  if (target_firmware == "grbl-embedded") SendPrinterCommand(cmd);
  else SendPrinterSilentCommand(cmd);
}

function files_Createdir() {
  inputdlg(
    "Please enter folder name",
    translate_text_item("Name:"),
    process_files_Createdir
  );
}

function process_files_Createdir(answer) {
  if (answer.length > 0) files_create_dir(answer.trim());
}

function files_create_dir(name) {
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  ) {
    var cmdpath = files_currentPath;
    if (target_firmware == "smoothieware")
      cmdpath = files_currentPath.substring(primary_sd.length);
    var url =
      "/upload?path=" +
      encodeURIComponent(cmdpath) +
      "&action=createdir&filename=" +
      encodeURIComponent(name);
    document.getElementById("files_nav_loader").style.display = "inline-flex";
    SendGetHttp(url, files_directSD_list_success, files_directSD_list_failed);
  } else {
    var command = "";
    if (target_firmware == "smoothieware") {
      command = "mkdir " + files_currentPath + name;
    } else {
      command = "M32 " + files_currentPath + name;
    }
    SendPrinterCommand(command, true, files_proccess_and_update);
  }
}

function files_delete(index) {
  console.log("Delete pressed");
  files_current_file_index = index;
  var msg = translate_text_item("Confirm deletion of directory: ");
  if (!files_file_list[index].isdir)
    msg = translate_text_item("Confirm deletion of file: ");
  confirmdlg(
    translate_text_item("Please Confirm"),
    msg + files_file_list[index].name,
    process_files_Delete
  );
}

function process_files_Delete(answer) {
  if (answer == "yes" && files_current_file_index != -1)
    files_delete_file(files_current_file_index);
  files_current_file_index = -1;
}

function files_delete_file(index) {
  files_error_status = "Delete " + files_file_list[index].name;
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  ) {
    var cmdpath = files_currentPath;
    if (target_firmware == "smoothieware")
      cmdpath = files_currentPath.substring(primary_sd.length);
    var url = "/upload?path=" + encodeURIComponent(cmdpath) + "&action=";
    if (files_file_list[index].isdir) {
      url += "deletedir&filename=";
    } else {
      url += "delete&filename=";
    }
    url += encodeURIComponent(files_file_list[index].sdname);
    document.getElementById("files_nav_loader").style.display = "inline-flex";
    SendGetHttp(url, files_directSD_list_success, files_directSD_list_failed);
  } else {
    var command = "";
    if (target_firmware == "smoothieware") {
      command = "rm " + files_currentPath + files_file_list[index].name;
    } else {
      command = "M30 ";
      if (current_source == tft_usb || current_source == tft_sd)
        command += current_source;
      command += files_currentPath + files_file_list[index].name;
    }
    SendPrinterCommand(command, true, files_proccess_and_update);
  }
}

function files_proccess_and_update(answer) {
  document.getElementById("files_navigation_buttons").style.display = "inline-flex";
  if (answer.startsWith("{") && answer.endsWith("}")) {
    try {
      response = JSON.parse(answer);
      if (typeof response.status != "undefined") {
        Monitor_output_Update(response.status + "\n");
        files_error_status = response.status;
        //console.log(files_error_status);
      }
    } catch (e) {
      console.error("Parsing error:", e);
      response = "Error";
    }
  } else {
    if (answer[answer.length - 1] != "\n") Monitor_output_Update(answer + "\n");
    else Monitor_output_Update(answer);
    answer = answer.replace("\nok", "");
    answer = answer.replace(/\n/gi, "");
    answer = answer.replace(/\r/gi, "");
    answer = answer.trim();
    console.log(answer);
    if (answer.length > 0) files_error_status = answer;
    else if (files_error_status.length == 0) files_error_status = "Done";
  }
  //console.log("error status:" + files_error_status);
  files_refreshFiles(files_currentPath);
}

function files_is_clickable(index) {
  var entry = files_file_list[index];
  if (entry.isdir) return true;
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  )
    return true;
  //not yet implemented but possible with cat command ?
  //if ( (target_firmware == "smoothieware") && entry.isprintable) return true;
  return false;
}

function files_click_file(index) {
  var entry = files_file_list[index];

  // Skip directories
  if (entry.isdir) {
    var path = files_currentPath + entry.name + "/";
    files_refreshFiles(path, true);
    return;
  }

  if (
    direct_sd &&
    (!(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    ) ||
      target_firmware != "smoothieware")
  ) {
    // File on direct SD
    var url = "";
    if (target_firmware == "smoothieware") {
      url = files_currentPath.replace(primary_sd, "/SD/") + entry.sdname;
    } else {
      url = "/SD/" + files_currentPath + entry.sdname;
    }

    // Create a new anchor element, set the href and download attributes, and click it
    var a = document.createElement('a');
    a.href = url.replace("//", "/");
    a.download = entry.sdname || '';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return;
  }

  if (target_firmware == "smoothieware" && entry.isprintable) {
    // File on smoothie SD
    // todo: use a cat command?
    return;
  }
}

function files_showprintbutton(filename, isdir) {
  if (isdir == true) return false;
  if (target_firmware == "grbl") {
    var path = files_currentPath + filename.trim();
    if (
      path.indexOf(" ") != -1 ||
      path.indexOf("?") != -1 ||
      path.indexOf("!") != -1 ||
      path.indexOf("~") != -1
    ) {
      return false;
    }
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
  //if (direct_sd && !( target_firmware == "smoothieware"  && files_currentPath.startsWith(secondary_sd))) return true;
  //if (!entry.isdir) return true;
  //if ( target_firmware == "smoothieware"  && files_currentPath.startsWith("/sd/")) return true
  return true;
}

function cleanpath(path) {
  var p = path;
  p.trim();
  if (p[0] != "/") p = "/" + p;
  if (p != "/") {
    if (p.endsWith("/")) {
      p = p.substr(0, p.length - 1);
    }
  }
  return p;
}

function files_refreshFiles(path, usecache) {
  //console.log("refresh requested " + path);
  var cmdpath = path;
  files_currentPath = path;
  if (current_source != last_source) {
    files_currentPath = "/";
    path = "/";
    last_source = current_source;
  }
  // if (current_source == tft_sd || current_source == tft_usb) {
  //   document.getElementById("print_upload_btn").style.display = "none";
  // } else {
  //   document.getElementById("print_upload_btn").style.display = "inline-flex";
  // }
  document.getElementById("print_upload_btn").style.display = "none";
  if (typeof usecache === "undefined") usecache = false;
  document.getElementById("files_currentPath").innerHTML = files_currentPath;
  files_file_list = [];
  files_status_list = [];
  files_build_display_filelist(false);
  document.getElementById("files_list_loader").style.display = "inline-flex";
  document.getElementById("files_nav_loader").style.display = "inline-flex";
  //this is pure direct SD
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  ) {
    if (target_firmware == "smoothieware") cmdpath = path.substring(4);
    var url = "/upload?path=" + encodeURI(cmdpath);
    //removeIf(production)
    var response =
      '{"files":[{"name":"test2.gco","shortname":"test2.gco","size":"992 B","datetime":"2000-01-01 01:00:00"},{"name":"simpl3d.gcode","shortname":"SIMPL3~1.GCO","size":"0 B","datetime":"2000-01-01 01:00:00"},{"name":"patt2.g","shortname":"patt2.g","size":"9.73 MB","datetime":"2000-01-01 01:00:00"},{"name":"myfolder","shortname":"myfolder","size":"-1","datetime":"2016-08-01 18:15:00"},{"name":"wconfig.ok","shortname":"wconfig.ok","size":"1.10 KB","datetime":"2017-01-06 14:35:54"},{"name":"gpl.txt","shortname":"gpl.txt","size":"34.98 KB","datetime":"2017-04-17 20:22:32"},{"name":"m1.g","shortname":"m1.g","size":"17 B","datetime":"2000-01-01 01:00:00"},{"name":"m2.g","shortname":"m2.g","size":"17 B","datetime":"2000-01-01 01:00:00"},{"name":"Test4.g","shortname":"TEST4.G","size":"20.47 KB","datetime":"2000-01-01 01:00:00"},{"name":"README.md","shortname":"README.md","size":"11.83 KB","datetime":"2017-04-17 20:25:08"},{"name":"test file.gcode","shortname":"TESTFI~1.GCO","size":"11 B","datetime":"2000-01-01 01:00:00"},{"name":"M3.g","shortname":"M3.g","size":"32 B","datetime":"2000-01-01 01:00:00"}],"path":"/","total":"14 GB","used":"28 MB","occupation":"1","mode":"direct","status":"Ok"}';
    files_directSD_list_success(response);
    return;
    //endRemoveIf(production)
    SendGetHttp(url, files_directSD_list_success, files_directSD_list_failed);
  } else {
    //use ls or M20
    if (target_firmware == "smoothieware") {
      //workaround as ls do not like dirname ending with /
      var command = "ls -s " + cleanpath(files_currentPath);
      SendPrinterCommand(
        command,
        false,
        files_serial_ls_list_success,
        files_serial_ls_list_failed
      );
      //
    } else {
      var command = "M20";
      if (current_source == "SD:") {
        document.getElementById("fileSource").innerHTML = "TFT SD";
        if (path.endsWith("/")) {
          var newpath = path.substring(0, path.length - 1);
          path = newpath;
        }
        command = "M20 SD:" + path;

        usecache = false;
      } else if (current_source == "U:") {
        document.getElementById("fileSource").innerHTML = "TFT USB";
        if (path.endsWith("/")) {
          var newpath = path.substring(0, path.length - 1);
          path = newpath;
        }
        command = "M20 U:" + path;
        usecache = false;
      } else {
        //Standard M20
        current_source = "/";
        document.getElementById("fileSource").innerHTML =
          translate_text_item("SD Files");
      }
      //to avoid to query when we already have the list
      if (usecache) {
        files_serial_M20_list_display();
      } else {
        SendPrinterCommand(
          command,
          false,
          files_serial_M20_list_success,
          files_serial_M20_list_failed
        );
      }
    }
  }
}

function files_format_size(size) {
  var lsize = parseInt(size);
  var value = 0.0;
  var tsize = "";
  if (lsize < 1024) {
    tsize = lsize + " B";
  } else if (lsize < 1024 * 1024) {
    value = lsize / 1024.0;
    tsize = value.toFixed(2) + " KB";
  } else if (lsize < 1024 * 1024 * 1024) {
    value = lsize / 1024.0 / 1024.0;
    tsize = value.toFixed(2) + " MB";
  } else {
    value = lsize / 1024.0 / 1024.0 / 1024.0;
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
    if (
      file_name.startsWith(path) ||
      current_source == tft_usb ||
      current_source == tft_sd
    ) {
      //console.log("need display " + file_name)
      if (!(current_source == tft_usb || current_source == tft_sd))
        file_name = file_name.substring(path.length);
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
          isprintable: isprint,
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
    if (
      !(
        line.length == 0 ||
        line.indexOf("egin file list") > 0 ||
        line.indexOf("nd file list") > 0 ||
        line.startsWith("ok ") > 0 ||
        line.indexOf(":") > 0 ||
        line == "ok" ||
        line == "wait"
      )
    ) {
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
        if (
          target_firmware == "repetier" ||
          target_firmware == "repetier4davinci" ||
          target_firmware == "marlin"
        ) {
          var pos = line.lastIndexOf(" ");
          if (pos != -1) {
            file_name = line.substr(0, pos);
            fsize = files_format_size(parseInt(line.substr(pos + 1)));
          } else {
            file_name = line;
            fsize = "";
          }
        } else file_name = line;
      }
      //console.log("pushing " + file_name );
      var isprint = files_showprintbutton(file_name, isdirectory);
      //var tag = "*" + file_name + "*";
      var file_entry = {
        name: file_name,
        size: fsize,
        isdir: isdirectory,
        datetime: d,
        isprintable: isprint,
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
  answer = rg1.test(file_name) && !rg2.test(file_name) && !rg3.test(file_name);
  if (
    s_name.length == 0 ||
    s_name.indexOf(":") != -1 ||
    s_name.indexOf("..") != -1
  )
    answer = false;

  return answer;
}

function files_serial_ls_list_success(response_text) {
  var tlist = response_text.split("\n");
  for (var i = 0; i < tlist.length; i++) {
    var line = tlist[i].trim();
    var isdirectory = false;
    var file_name = "";
    var fsize = "";
    var d = "";
    var command = "ls -s " + cleanpath(files_currentPath);
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
          isprintable: isprint,
        };
        files_file_list.push(file_entry);
      }
    }
  }
  files_build_display_filelist();
}

function files_directSD_list_success(response_text) {
  var error = false;
  var response;
  document.getElementById("files_navigation_buttons").style.display = "inline-flex";
  try {
    response = JSON.parse(response_text);
  } catch (e) {
    console.error("Parsing error:", e);
    error = true;
  }
  if (error || typeof response.status == "undefined") {
    files_directSD_list_failed(406, translate_text_item("Wrong data", true));
    return;
  }
  files_file_list = [];
  files_status_list = [];
  if (typeof response.files != "undefined") {
    for (var i = 0; i < response.files.length; i++) {
      var file_name = "";
      var isdirectory = false;
      var fsize = "";
      if (response.files[i].size == "-1") isdirectory = true;
      else fsize = response.files[i].size;
      if (target_firmware == "marlin") {
        file_name = response.files[i].shortname;
      } else {
        file_name = response.files[i].name;
      }
      var isprint = files_showprintbutton(file_name, isdirectory);
      var file_entry = {
        name: file_name,
        sdname: response.files[i].name,
        size: fsize,
        isdir: isdirectory,
        datetime: response.files[i].datetime,
        isprintable: isprint,
      };
      files_file_list.push(file_entry);
    }
  }
  var vtotal = "-1";
  var vused = "-1";
  var voccupation = "-1";
  if (typeof response.total != "undefined") vtotal = response.total;
  if (typeof response.used != "undefined") vused = response.used;
  if (typeof response.occupation != "undefined")
    voccupation = response.occupation;
  files_status_list.push({
    status: translate_text_item(response.status),
    path: response.path,
    used: vused,
    total: vtotal,
    occupation: voccupation,
  });
  files_build_display_filelist();
}

function files_serial_M20_list_failed(error_code, response) {
  document.getElementById("files_navigation_buttons").style.display = "inline-flex";
  if (esp_error_code != 0) {
    alertdlg(
      translate_text_item("Error") + " (" + esp_error_code + ")",
      esp_error_message
    );
    esp_error_code = 0;
  } else {
    alertdlg(
      translate_text_item("Error"),
      translate_text_item("No connection")
    );
  }
  files_build_display_filelist(false);
}

function files_serial_ls_list_failed(error_code, response) {
  files_serial_M20_list_failed(error_code, response);
}

function files_directSD_list_failed(error_code, response) {
  files_serial_M20_list_failed(error_code, response);
}

function need_up_level() {
  if (
    target_firmware == "smoothieware" &&
    (files_currentPath == primary_sd || files_currentPath == secondary_sd)
  )
    return false;
  if (files_currentPath == "/") return false;
  return true;
}

function files_go_levelup() {
  var tlist = files_currentPath.split("/");
  var path = "/";
  var nb = 1;
  while (nb < tlist.length - 2) {
    path += tlist[nb] + "/";
    nb++;
  }
  files_refreshFiles(path, true);
}

function files_build_display_filelist(displaylist) {
  var content = "";
  document.getElementById("files_uploading_msg").style.display = "none";
  if (typeof displaylist == "undefined") displaylist = true;
  document.getElementById("files_list_loader").style.display = "none";
  document.getElementById("files_nav_loader").style.display = "none";
  if (!displaylist) {
    document.getElementById("files_status_sd_status").style.display = "none";
    document.getElementById("files_space_sd_status").style.display = "none";
    document.getElementById("files_fileList").innerHTML = "";
    document.getElementById("files_fileList").style.display = "none";
    return;
  }
  if (need_up_level()) {
    content +=
      "<li class='list-group-item list-group-hover' style='cursor:pointer' onclick='files_go_levelup()''>";
    content +=
      "<span >" +
      get_icon_svg("level-up") +
      "</span>&nbsp;&nbsp;<span translate>Up...</span>";
    content += "</li>";
  }
  files_file_list.sort(function (a, b) {
    return compareStrings(a.name, b.name);
  });
  for (var index = 0; index < files_file_list.length; index++) {
    if (files_file_list[index].isdir == false)
      content += files_build_file_line(index);
  }
  for (index = 0; index < files_file_list.length; index++) {
    if (files_file_list[index].isdir) content += files_build_file_line(index);
  }
  document.getElementById("files_fileList").style.display = "block";
  document.getElementById("files_fileList").innerHTML = content;
  if (files_status_list.length == 0 && files_error_status != "") {
    files_status_list.push({
      status: files_error_status,
      path: files_currentPath,
      used: "-1",
      total: "-1",
      occupation: "-1",
    });
  }
  if (files_status_list.length > 0) {
    // if (files_status_list[0].total != "-1") {
    //   document.getElementById("files_sd_status_total").innerHTML =
    //     files_status_list[0].total;
    //   document.getElementById("files_sd_status_used").innerHTML =
    //     files_status_list[0].used;
    //   document.getElementById("files_sd_status_occupation").value =
    //     files_status_list[0].occupation;
    //   document.getElementById("files_sd_status_percent").innerHTML =
    //     files_status_list[0].occupation;
    //   document.getElementById("files_space_sd_status").style.display =
    //     "table-row";
    // } else {
    //   document.getElementById("files_space_sd_status").style.display = "none";
    // }
    document.getElementById("files_space_sd_status").style.display = "none";
    if (
      files_error_status != "" &&
      (files_status_list[0].status.toLowerCase() == "ok" ||
        files_status_list[0].status.length == 0)
    ) {
      files_status_list[0].status = files_error_status;
    }
    files_error_status = "";
    if (files_status_list[0].status.toLowerCase() != "ok") {
      document.getElementById("files_sd_status_msg").innerHTML =
        translate_text_item(files_status_list[0].status, true);
      document.getElementById("files_status_sd_status").style.display =
        "table-row";
    } else {
      document.getElementById("files_status_sd_status").style.display = "none";
    }
  } else
    document.getElementById("files_space_sd_status").style.display = "none";
}

function files_progress() {
  var command = "progress";
  if (target_firmware != "smoothieware") command = "M27";
  SendPrinterCommand(command);
}

function files_abort() {
  var command = "abort";
  if (target_firmware != "smoothieware") {
    if (target_firmware == "marlin" || target_firmware == "marlinkimbra") {
      command = "M108\nM108\nM108\nM524\nM27";
    }
    if (target_firmware == "marlin-embedded") {
      command = "M108\nM108\nM108\nM524\nM27";
    } else command = "M112";
  }
  SendPrinterCommand(command);
}

function files_select_upload() {
  document.getElementById("files_input_file").click();
}

function files_check_if_upload() {
  var canupload = true;
  var files = document.getElementById("files_input_file").files;
  if (target_firmware == "marlin" && !direct_sd) {
    for (var i = 0; i < files.length; i++) {
      var filename = files[i].name;
      //check base name can only by 8
      var sizename = filename.indexOf(".");
      if (sizename == -1) sizename = filename.length;
      if (sizename > 8) canupload = false;
      //check extension cano be more than 4 ".xxx"
      if (filename.length - sizename > 4) canupload = false;
      //check only one dot
      if (filename.indexOf(".") != filename.lastIndexOf(".")) canupload = false;
    }
    if (canupload == false) {
      alertdlg(
        translate_text_item("Error"),
        translate_text_item("Please use 8.3 filename only.")
      );
      return;
    }
  }
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  ) {
    SendPrinterCommand("[ESP200]", false, process_check_sd_presence);
  } else {
    //try ls
    if (target_firmware == "smoothieware") {
      var cmd = "ls " + cleanpath(files_currentPath);
      SendPrinterCommand(cmd, false, process_check_sd_presence);
    } else {
      //no reliable way to know SD is present or not so let's upload
      files_start_upload();
    }
  }
}

function process_check_sd_presence(answer) {
  //console.log(answer);
  //for direct SD there is a SD check
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  ) {
    if (answer.indexOf("o SD card") > -1) {
      alertdlg(
        translate_text_item("Upload failed"),
        translate_text_item("No SD card detected")
      );
      files_error_status = "No SD card";
      files_build_display_filelist(false);
      document.getElementById("files_sd_status_msg").innerHTML =
        translate_text_item(files_error_status, true);
      document.getElementById("files_status_sd_status").style.display =
        "table-row";
    } else files_start_upload();
  } else {
    //for smoothiware ls say no directory
    if (target_firmware == "smoothieware") {
      if (answer.indexOf("ould not open directory") > -1) {
        alertdlg(
          translate_text_item("Upload failed"),
          translate_text_item("No SD card detected")
        );
        files_error_status = "No SD card";
        files_build_display_filelist(false);
        document.getElementById("files_sd_status_msg").innerHTML =
          translate_text_item(files_error_status, true);
        document.getElementById("files_status_sd_status").style.display =
          "table-row";
      } else files_start_upload();
    } else files_start_upload();
  }
  //no check for marlin / repetier as no reliable test IFAIK
}

function PAIGE_files_start_upload(fileName, text) {
  if (http_communication_locked) {
    alertdlg(
      translate_text_item("Busy..."),
      translate_text_item(
        "Communications are currently locked, please wait and retry."
      )
    );
    console.log("communication locked");
    return;
  }
  var url = "/upload";
  var path = files_currentPath;
  if (
    direct_sd &&
    target_firmware == "smoothieware" &&
    files_currentPath.startsWith(primary_sd)
  ) {
    path = files_currentPath.substring(primary_sd.length);
  }
  if (
    !direct_sd ||
    (target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd))
  ) {
    url = "/upload_serial";
    if (target_firmware == "smoothieware") {
      if (files_currentPath.startsWith(secondary_sd))
        path = files_currentPath.substring(secondary_sd.length);
      else path = files_currentPath.substring(primary_sd.length);
    }
  }
  //console.log("upload from " + path );

  var formData = new FormData();
  console.log("uploadPath", path);
  formData.append("path", path);

  var data = new Blob([text], { type: "text/plain" });
  var file = window.URL.createObjectURL(data);

  var arg = path + fileName + "S";
  //append file size first to check updload is complete
  formData.append(arg, file.size);
  formData.append("myfile[]", data, path + fileName);

  files_error_status = "Upload " + fileName;
  document.getElementById("files_currentUpload_msg").innerHTML = fileName;
  document.getElementById("files_uploading_msg").style.display = "block";
  document.getElementById("files_navigation_buttons").style.display = "none";
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  ) {
    SendFileHttp(
      url,
      formData,
      FilesUploadProgressDisplay,
      files_directSD_list_success,
      files_directSD_list_failed
    );
    //console.log("send file");
  } else {
    SendFileHttp(
      url,
      formData,
      FilesUploadProgressDisplay,
      files_proccess_and_update,
      files_serial_M20_list_failed
    );
  }
  document.getElementById("files_input_file").value = "";
}

function files_start_upload() {
  if (http_communication_locked) {
    alertdlg(
      translate_text_item("Busy..."),
      translate_text_item(
        "Communications are currently locked, please wait and retry."
      )
    );
    console.log("communication locked");
    return;
  }
  var url = "/upload";
  var path = files_currentPath;
  if (
    direct_sd &&
    target_firmware == "smoothieware" &&
    files_currentPath.startsWith(primary_sd)
  ) {
    path = files_currentPath.substring(primary_sd.length);
  }
  if (
    !direct_sd ||
    (target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd))
  ) {
    url = "/upload_serial";
    if (target_firmware == "smoothieware") {
      if (files_currentPath.startsWith(secondary_sd))
        path = files_currentPath.substring(secondary_sd.length);
      else path = files_currentPath.substring(primary_sd.length);
    }
  }
  //console.log("upload from " + path );
  var files = document.getElementById("files_input_file").files;

  if (files.value == "" || typeof files[0].name === "undefined") {
    console.log("nothing to upload");
    return;
  }
  var formData = new FormData();
  console.log("uploadPath", path);
  formData.append("path", path);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var arg = path + file.name + "S";
    //append file size first to check updload is complete
    formData.append(arg, file.size);
    formData.append("myfile[]", file, path + file.name);
    //console.log( path +file.name);
  }
  files_error_status = "Upload " + file.name;
  document.getElementById("files_currentUpload_msg").innerHTML = file.name;
  document.getElementById("files_uploading_msg").style.display = "inline-flex";
  document.getElementById("files_navigation_buttons").style.display = "none";
  if (
    direct_sd &&
    !(
      target_firmware == "smoothieware" &&
      files_currentPath.startsWith(secondary_sd)
    )
  ) {
    SendFileHttp(
      url,
      formData,
      FilesUploadProgressDisplay,
      files_directSD_list_success,
      files_directSD_list_failed
    );
    //console.log("send file");
  } else {
    SendFileHttp(
      url,
      formData,
      FilesUploadProgressDisplay,
      files_proccess_and_update,
      files_serial_M20_list_failed
    );
  }
  document.getElementById("files_input_file").value = "";
}

function FilesUploadProgressDisplay(oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = (oEvent.loaded / oEvent.total) * 100;
    document.getElementById("files_prg").value = percentComplete;
    document.getElementById("files_percent_upload").innerHTML =
      percentComplete.toFixed(0);
  } else {
    // Impossible because size is unknown
  }
}
