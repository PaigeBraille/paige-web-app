var ESP3D_authentication = false;
var page_id = "";
var convertDHT2Fahrenheit = false;
var ws_source;
var event_source;
var log_off = false;
var async_webcommunication = false;
var websocket_port = 0;
var websocket_ip = "";
var esp_hostname = "ESP3D WebUI";
var EP_HOSTNAME;
var EP_STA_SSID;
var EP_STA_PASSWORD;
var EP_STA_IP_MODE;
var EP_STA_IP_VALUE;
var EP_STA_GW_VALUE;
var EP_STA_MK_VALUE;
var EP_WIFI_MODE;
var EP_AP_SSID;
var EP_AP_PASSWORD;
var EP_AP_IP_VALUE;
var EP_BAUD_RATE = 112;
var EP_AUTH_TYPE = 119;
var EP_TARGET_FW = 461;
var EP_IS_DIRECT_SD = 850;
var EP_PRIMARY_SD = 851;
var EP_SECONDARY_SD = 852;
var EP_DIRECT_SD_CHECK = 853;
var SETTINGS_AP_MODE = 1;
var SETTINGS_STA_MODE = 2;
var interval_ping = -1;
var last_ping = 0;
var enable_ping = true;
var esp_error_message = "";
var esp_error_code = 0;
var PAIGE_POTENT_VALUE = 0;
var paige_keyText = [""];

var paigeClearButton = document.querySelector("#PAIGEClearButton");
var initialInputText = document.querySelector("#initialInputText");
var translatedText = document.querySelector("#translated");

function beep(duration, frequency) {
  var audioCtx;
  if (typeof window.AudioContext !== "undefined") {
    audioCtx = new window.AudioContext();
  } else if (typeof window.webkitAudioContext() !== "undefined") {
    audioCtx = new window.webkitAudioContext();
  } else if (typeof window.audioContext !== "undefined") {
    audioCtx = new window.audioContext();
  }
  // = new (window.AudioContext() || window.webkitAudioContext() || window.audioContext());
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = 1;
  oscillator.frequency.value = frequency;
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, duration);
}

function Init_events(e) {
  page_id = e.data;
  console.log("connection id = " + page_id);
}

function ActiveID_events(e) {
  if (page_id != e.data) {
    Disable_interface();
    console.log("I am disabled");
    event_source.close();
  }
}

function DHT_events(e) {
  Handle_DHT(e.data);
}
//Check for IE
//Edge
//Chrome
function browser_is(bname) {
  var ua = navigator.userAgent;
  switch (bname) {
    case "IE":
      if (ua.indexOf("Trident/") != -1) return true;
      break;
    case "Edge":
      if (ua.indexOf("Edge") != -1) return true;
      break;
    case "Chrome":
      if (ua.indexOf("Chrome") != -1) return true;
      break;
    case "Firefox":
      if (ua.indexOf("Firefox") != -1) return true;
      break;
    case "MacOSX":
      if (ua.indexOf("Mac OS X") != -1) return true;
      break;
    default:
      return false;
  }
  return false;
}

window.onload = function () {
  //to check if javascript is disabled like in anroid preview
  document.getElementById("loadingmsg").style.display = "none";
  console.log("Connect to board");
  connectdlg();
  //ugly hack for IE
  console.log(navigator.userAgent);
  if (browser_is("IE")) {
    document.getElementById("control-body").className = "panel-body";
    document.getElementById("extruder-body").className =
      "panel-body panel-height";
    document.getElementById("command-body").className = "panel-body";
    document.getElementById("file-body").className =
      "panel-body panel-height panel-max-height panel-scroll";
  }
};

var wsmsg = "";

function startSocket() {
  var returned_value;
  try {
    if (async_webcommunication) {
      ws_source = new WebSocket("ws://" + document.location.host + "/ws", [
        "arduino",
      ]);
    } else {
      console.log("Socket is " + websocket_ip + ":" + websocket_port);
      ws_source = new WebSocket("ws://" + websocket_ip + ":" + websocket_port, [
        "arduino",
      ]);
    }
  } catch (exception) {
    console.error(exception);
  }
  ws_source.binaryType = "arraybuffer";
  ws_source.onopen = function (e) {
    console.log("Connected");
  };
  ws_source.onclose = function (e) {
    console.log("Disconnected");
    //seems sometimes it disconnect so wait 3s and reconnect
    //if it is not a log off
    if (!log_off) setTimeout(startSocket, 3000);
  };
  ws_source.onerror = function (e) {
    //Monitor_output_Update("[#]Error "+ e.code +" " + e.reason + "\n");
    console.log("ws error", e);
  };
  ws_source.onmessage = function (e) {
    var msg = "";
    //bin
    if (e.data instanceof ArrayBuffer) {
      var bytes = new Uint8Array(e.data);
      for (var i = 0; i < bytes.length; i++) {
        msg += String.fromCharCode(bytes[i]);
        if (bytes[i] == 10 || bytes[i] == 13) {
          wsmsg += msg;
          Monitor_output_Update(wsmsg);
          process_socket_response(wsmsg);
          // msg = wsmsg.replace("\n", "");
          if (
            !(
              wsmsg.startsWith("ok T:") ||
              wsmsg.startsWith("X:") ||
              wsmsg.startsWith("FR:") ||
              wsmsg.startsWith("echo:E0 Flow")
            )
          )
            if (wsmsg.startsWith("[MSG:INFO:")) {
              var tval = wsmsg.split(":");
              if (tval[0] == "[MSG") {
                makeTextareaAutoScroll(initialInputText);
                makeTextareaAutoScroll(translatedText);
                if (tval[3] == "ASCII") {
                  returned_value = tval[4][0];
                  paige_keyText = initialInputText.value + returned_value;
                  onPaigeChange(paige_keyText, true);
                } else if (tval[3] == "BACK_SPACE") {
                  returned_value = tval[4][0];
                  paige_keyText = initialInputText.value.slice(0, -1);
                  onPaigeChange(paige_keyText, true);
                } else if (tval[3] == "FILE") {
                  console.log(tval[4]);
                  paige_keyText = tval[4].replace(/A/g, "\n");
                  paige_keyText = paige_keyText.replace(/B/g, ":");
                  paige_keyText = paige_keyText.slice(0, -2);
                  onPaigeChange(paige_keyText, true);
                }
              }

            }
          console.log(wsmsg);
          wsmsg = "";
          msg = "";
        }
      }
      wsmsg += msg;
    } else {
      msg += e.data;
      var tval = msg.split(":");
      if (tval.length >= 2) {
        if (tval[0] == "CURRENT_ID") {
          page_id = tval[1];
          console.log("connection id = " + page_id);
        }
        if (enable_ping) {
          if (tval[0] == "PING") {
            page_id = tval[1];
            console.log("ping from id = " + page_id);
            last_ping = Date.now();
            if (interval_ping == -1)
              interval_ping = setInterval(function () {
                check_ping();
              }, 10 * 1000);
          }
        }
        if (tval[0] == "ACTIVE_ID") {
          if (page_id != tval[1]) {
            Disable_interface();
          }
        }
        if (tval[0] == "DHT") {
          Handle_DHT(tval[1]);
        }
        if (tval[0] == "ERROR") {
          esp_error_message = tval[2];
          esp_error_code = tval[1];
          console.log("ERROR: " + tval[2] + " code:" + tval[1]);
          CancelCurrentUpload();
        }
        if (tval[0] == "MSG") {
          var error_message = tval[2];
          var error_code = tval[1];
          console.log("MSG: " + tval[2] + " code:" + tval[1]);
        }
        if (tval[0] == "PAIGE_POTENT_VALUE") {
          returned_value = tval[1];
          PAIGE_POTENT_VALUE = returned_value;
          if (PAIGE_POTENT_VALUE >= 75) {
            paigeClearButton.disabled = false;
            paigeClearButton.pointerEvents = "auto";
            paigeClearButton.title =
              "Click to clear the display on the the device and the input box";
          } else {
            paigeClearButton.disabled = true;
            paigeClearButton.pointerEvents = "none";
            paigeClearButton.title =
              "Please move the bar to the bottom of the display to be able to clear";
          }
        }
      }
    }
  };
}

function check_ping() {
  //if ((Date.now() - last_ping) > 20000){
  //Disable_interface(true);
  //console.log("No heart beat for more than 20s");
  //}
}

function disable_items(item, state) {
  var liste = item.getElementsByTagName("*");
  for (i = 0; i < liste.length; i++) liste[i].disabled = state;
}

function ontogglePing(forcevalue) {
  if (typeof forcevalue != "undefined") enable_ping = forcevalue;
  else enable_ping = !enable_ping;
  if (enable_ping) {
    if (interval_ping != -1) clearInterval(interval_ping);
    last_ping = Date.now();
    interval_ping = setInterval(function () {
      check_ping();
    }, 10 * 1000);
    console.log("enable ping");
  } else {
    if (interval_ping != -1) clearInterval(interval_ping);
    console.log("disable ping");
  }
}

function ontoggleLock(forcevalue) {
  if (typeof forcevalue != "undefined")
    document.getElementById("lock_UI").checked = forcevalue;
  if (document.getElementById("lock_UI").checked) {
    document.getElementById("lock_UI_btn_txt").innerHTML =
      translate_text_item("Unlock interface");
    disable_items(document.getElementById("maintab"), true);
    disable_items(document.getElementById("configtab"), true);
    // document.getElementById("progress_btn").disabled = false;
    document.getElementById("clear_monitor_btn").disabled = false;
    document.getElementById("monitor_enable_verbose_mode").disabled = false;
    document.getElementById("monitor_enable_autoscroll").disabled = false;
    document.getElementById("settings_update_fw_btn").disabled = true;
    document.getElementById("settings_restart_btn").disabled = true;
    disable_items(document.getElementById("JogUI"), false);
    document.getElementById("JogUI").style.pointerEvents = "none";
  } else {
    document.getElementById("lock_UI_btn_txt").innerHTML =
      translate_text_item("Lock interface");
    disable_items(document.getElementById("maintab"), false);
    disable_items(document.getElementById("configtab"), false);
    document.getElementById("settings_update_fw_btn").disabled = false;
    document.getElementById("settings_restart_btn").disabled = false;
    document.getElementById("JogUI").style.pointerEvents = "auto";
  }
}

function Handle_DHT(data) {
  var tdata = data.split(" ");
  if (tdata.length != 2) {
    console.log("DHT data invalid: " + data);
    return;
  }
  var temp = convertDHT2Fahrenheit ? (parseFloat(tdata[0]) * 1.8 + 32) : parseFloat(tdata[0]);
  document.getElementById("DHT_humidity").innerHTML =
    parseFloat(tdata[1]).toFixed(2).toString() + "%";
  var temps = temp.toFixed(2).toString() + "&deg;";
  if (convertDHT2Fahrenheit) temps += "F";
  else temps += "C";
  document.getElementById("DHT_temperature").innerHTML = temps;
}
//window.addEventListener("resize", OnresizeWindow);

//function OnresizeWindow(){
//}
var total_boot_steps = 5;
var current_boot_steps = 0;

function display_boot_progress(step) {
  var val = 1;
  if (typeof step != "undefined") val = step;
  current_boot_steps += val;
  //console.log(current_boot_steps);
  //console.log(Math.round((current_boot_steps*100)/total_boot_steps));
  document.getElementById("load_prg").value = Math.round(
    (current_boot_steps * 100) / total_boot_steps
  );
}

function Disable_interface(lostconnection) {
  var lostcon = false;
  if (typeof lostconnection != "undefined") lostcon = lostconnection;
  //block all communication
  http_communication_locked = true;
  log_off = true;
  if (interval_ping != -1) clearInterval(interval_ping);
  //clear all waiting commands
  clear_cmd_list();
  //no camera
  document.getElementById("camera_frame").src = "";
  //No auto check
  on_autocheck_position(false);
  on_autocheck_temperature(false);
  on_autocheck_status(false);
  if (async_webcommunication) {
    event_source.removeEventListener("ActiveID", ActiveID_events, false);
    event_source.removeEventListener("InitID", Init_events, false);
    event_source.removeEventListener("DHT", DHT_events, false);
  }
  ws_source.close();
  document.title += "(" + decode_entitie(translate_text_item("Disabled")) + ")";
  UIdisableddlg(lostcon);
}

function update_UI_firmware_target() {
  var fwName;
  initpreferences();
  if (target_firmware == "repetier") {
    fwName = "Repetier";
  } else if (target_firmware == "repetier4davinci") {
    fwName = "Repetier for Davinci";
  } else if (target_firmware == "smoothieware") {
    fwName = "Smoothieware";
  } else if (target_firmware == "grbl-embedded") {
    fwName = "GRBL ESP32";
  } else if (target_firmware == "marlin-embedded") {
    fwName = "Marlin ESP32";
  } else if (target_firmware == "marlin") {
    fwName = "Marlin";
  } else if (target_firmware == "marlinkimbra") {
    fwName = "Marlin Kimbra";
  } else if (target_firmware == "grbl") {
    fwName = "Grbl";
  } else {
    fwName = "Unknown";
  }
  if (
    target_firmware == "grbl-embedded" ||
    target_firmware == "marlin-embedded"
  ) {
    EP_HOSTNAME = "ESP_HOSTNAME";
    EP_STA_SSID = "STA_SSID";
    EP_STA_PASSWORD = "STA_PWD";
    EP_STA_IP_MODE = "STA_IP_MODE";
    EP_STA_IP_VALUE = "STA_IP";
    EP_STA_GW_VALUE = "STA_GW";
    EP_STA_MK_VALUE = "STA_MK";
    if (target_firmware == "grbl-embedded") {
      EP_WIFI_MODE = "RADIO_MODE";
    } else {
      EP_WIFI_MODE = "WIFI_MODE";
    }
    EP_AP_SSID = "AP_SSID";
    EP_AP_PASSWORD = "AP_PWD";
    EP_AP_IP_VALUE = "AP_IP";
    SETTINGS_AP_MODE = 2;
    SETTINGS_STA_MODE = 1;
  } else {
    EP_HOSTNAME = 130;
    EP_STA_SSID = 1;
    EP_STA_PASSWORD = 34;
    EP_STA_IP_MODE = 99;
    EP_STA_IP_VALUE = 100;
    EP_STA_MK_VALUE = 104;
    EP_STA_GW_VALUE = 108;
    EP_WIFI_MODE = 0;
    EP_AP_SSID = 218;
    EP_AP_PASSWORD = 251;
    EP_AP_IP_VALUE = 316;
    SETTINGS_AP_MODE = 1;
    SETTINGS_STA_MODE = 2;
  }
  return fwName;
}

function overrideBackButton() {
  // Show a confirmation dialog if the user presses the browser's back button
  window.addEventListener("popstate", function (e) {
    if (confirm("Are you sure you want to leave this page?")) {
      window.location.href = "/";
    } else {
      history.pushState(null, null, window.location.href);
    }
  });
}

function Set_page_title(page_title) {
  if (typeof page_title != "undefined") esp_hostname = page_title;
  document.title = esp_hostname;
}

function initUI() {
  console.log("Init UI");
  overrideBackButton();
  // Prevent scrolling while we load
  window.onscroll = function () {
    window.scrollTo(0, 0);
  };
  if (ESP3D_authentication) connectdlg(false);
  AddCmd(display_boot_progress);
  //initial check
  if (
    typeof target_firmware == "undefined" ||
    typeof web_ui_version == "undefined" ||
    typeof direct_sd == "undefined"
  )
    alert("Missing init data!");
  //check FW
  update_UI_firmware_target();
  //set title using hostname
  Set_page_title();
  //removeIf(production)
  console.log(JSON.stringify(translated_list));
  //endRemoveIf(production)
  initUI_2();
}

function initUI_2() {
  AddCmd(display_boot_progress);
  //get all settings from ESP3D
  console.log("Get settings");
  //query settings but do not update list in case wizard is showed
  refreshSettings(true);
  initUI_3();
}

function initUI_3() {
  AddCmd(display_boot_progress);
  //init panels
  console.log("Get macros");
  init_controls_panel();
  init_grbl_panel();
  console.log("Get preferences");
  getpreferenceslist();
  initUI_4();
}

function hideSplashScreen() {
  document.getElementById("loading-splash-screen").style.display = "none";
  document.getElementById("loading-splash-screen").ariaHidden = true;
  window.onscroll = undefined;
}

function initUI_4() {
  AddCmd(display_boot_progress);
  // init_temperature_panel();
  // init_extruder_panel();
  init_command_panel();
  init_files_panel(false);
  setupGradeButtons();
  //check if we need setup
  console.log("Launch Setup");
  AddCmd(display_boot_progress);
  closeModal("Connection successful");

  if (IS_UI_TEST) {
    // Always show setup wizard in test mode
    hideSplashScreen();
    setupdlg();
  } else if (IS_UI_DEMO) {
    // Never show setup wizard in demo mode
    hideSplashScreen();
    setupdone();
  } else {
    showSetupWizardIfAP();
  }
}

function initDemo() {
  // For Demo Build, we hide files and settings tabs
  document.getElementById("maintablink").style.display = "none";
  document.getElementById("settingtablink").style.display = "none";
  document.getElementById("files-footer-link").style.display = "none";
  document.getElementById("settings-footer-link").style.display = "none";
  // Swap titles and fonts as translation is going the other way (Print -> Braille)
  document.getElementById("textarea-label-1").innerHTML = "Print";
  document.getElementById("textarea-label-2").innerHTML = "Braille";
  document.getElementById("initialInputText").style.fontFamily = '"Inter", sans-serif';
  document.getElementById("translated").style.fontFamily = '"aph_braille_shadowsregular"';
}

function isWiFiInAPMode(response) {
  var tresponse = response.split("\n");

  for (var i = 0; i < tresponse.length; i++) {
    var data = tresponse[i].split(":");
    if (data.length >= 2) {
      var settingName = data[0].trim().toLowerCase();
      var settingValue = data[1].trim().toLowerCase();
      console.log(settingName + " = " + settingValue);
      if ((settingName === 'current wifi mode' || settingName === 'active mode') && (settingValue.includes('access point') || settingValue.includes('ap'))) {
        return true;
      }
    }
  }
  return false;
}

function showSetupWizardIfAP() {
  var url = "/command?plain=" + encodeURIComponent("[ESP420]plain");;
  SendGetHttp(url, function (response) {
    var isApMode = isWiFiInAPMode(response);
    hideSplashScreen();
    if (isApMode) {
      setupdlg();
    } else {
      setupdone();
    }
  }, function () { setupdone(); })
}


function compareStrings(a, b) {
  // case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a < b ? -1 : a > b ? 1 : 0;
}

function compareInts(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function HTMLEncode(str) {
  var i = str.length,
    aRet = [];

  while (i--) {
    var iC = str[i].charCodeAt();
    if (iC < 65 || iC > 127 || (iC > 90 && iC < 97)) {
      if (iC == 65533) iC = 176;
      aRet[i] = "&#" + iC + ";";
    } else {
      aRet[i] = str[i];
    }
  }
  return aRet.join("");
}

function decode_entitie(str_text) {
  var tmpelement = document.createElement("div");
  tmpelement.innerHTML = str_text;
  str_text = tmpelement.textContent;
  tmpelement.textContent = "";
  return str_text;
}

var socket_response = "";
var socket_is_settings = false;

function process_socket_response(msg) {
  if (target_firmware == "grbl-embedded" || target_firmware == "grbl") {
    if (msg.startsWith("<")) {
      grbl_process_status(msg);
    } else if (msg.startsWith("[PRB:")) {
      grbl_GetProbeResult(msg);
    } else if (msg.startsWith("[GC:")) {
      console.log(msg);
    } else if (
      msg.startsWith("error:") ||
      msg.startsWith("ALARM:") ||
      msg.startsWith("Hold:") ||
      msg.startsWith("Door:")
    ) {
      grbl_process_msg(msg);
    } else if (msg.startsWith("Grbl 1.1f [")) {
      grbl_reset_detected(msg);
    } else if (socket_is_settings) socket_response += msg;

    if (!socket_is_settings && msg.startsWith("$0=")) {
      socket_is_settings = true;
      socket_response = msg;
    }

    if (msg.startsWith("ok")) {
      if (socket_is_settings) {
        //update settings
        getESPconfigSuccess(socket_response);
        socket_is_settings = false;
      }
    }
  } else {
    if (target_firmware == "marlin-embedded") {
      if (
        socket_is_settings &&
        !(
          msg.startsWith("echo:Unknown command:") ||
          msg.startsWith("echo:enqueueing")
        )
      )
        socket_response += msg + "\n";
      if (
        !socket_is_settings &&
        (msg.startsWith("  G21") ||
          msg.startsWith("  G20") ||
          msg.startsWith("echo:  G21") ||
          msg.startsWith("echo:  G20"))
      ) {
        socket_is_settings = true;
        socket_response = msg + "\n";
        //to stop waiting for data
        console.log("Got settings Start");
      }
    }
    if (
      msg.startsWith("ok T:") ||
      msg.startsWith(" T:") ||
      msg.startsWith("T:")
    ) {
      if (!graph_started) start_graph_output();
      process_Temperatures(msg);
    }
    if (msg.startsWith("X:")) {
      process_Position(msg);
    }
    if (msg.startsWith("FR:")) {
      process_feedRate(msg);
    }

    if (msg.startsWith("echo:E") && msg.indexOf("Flow:") != -1) {
      process_flowdRate(msg);
    }

    if (msg.startsWith("[esp3d]")) {
      process_Custom(msg); // handles custom messages sent via M118
    }
    if (msg.startsWith("ok")) {
      if (socket_is_settings) {
        //update settings
        console.log("Got settings End");
        console.log(socket_response);
        getESPconfigSuccess(socket_response);
        socket_is_settings = false;
      }
    }
  }
}

