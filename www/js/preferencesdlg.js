<<<<<<< HEAD
//Preferences dialog
var preferenceslist = [];
var language_save = language;
var default_preferenceslist = [];
var defaultpreferenceslist =
  '[{\
                                            "language":"en",\
                                            "enable_lock_UI":"false",\
                                            "enable_ping":"true",\
                                            "enable_DHT":"false",\
                                            "enable_camera":"false",\
                                            "auto_load_camera":"false",\
                                            "camera_address":"",\
                                            "number_extruders":"1",\
                                            "is_mixed_extruder":"false",\
                                            "enable_redundant":"false",\
                                            "enable_probe":"false",\
                                            "enable_bed":"false",\
                                            "enable_chamber":"false",\
                                            "enable_fan":"false",\
                                            "enable_control_panel":"true",\
                                            "enable_grbl_panel":"false",\
                                            "interval_positions":"3",\
                                            "interval_temperatures":"3",\
                                            "interval_status":"3",\
                                            "xy_feedrate":"1000",\
                                            "z_feedrate":"100",\
                                            "a_feedrate":"100",\
                                            "b_feedrate":"100",\
                                            "c_feedrate":"100",\
                                            "e_feedrate":"400",\
                                            "e_distance":"5",\
                                            "f_filters":"gco;gcode",\
                                            "enable_temperatures_panel":"true",\
                                            "enable_extruder_panel":"true",\
                                            "enable_files_panel":"true",\
                                            "has_TFT_SD":"false",\
                                            "has_TFT_USB":"false",\
                                            "enable_commands_panel":"true",\
                                            "enable_autoscroll":"true",\
                                            "enable_verbose_mode":"true",\
                                            "enable_grbl_probe_panel":"false",\
                                            "probemaxtravel":"40",\
                                            "probefeedrate":"100",\
                                            "probetouchplatethickness":"0.5"\
                                            }]';
var preferences_file_name = "/preferences.json";

function initpreferences() {
  if (target_firmware == "grbl-embedded" || target_firmware == "grbl") {
    defaultpreferenceslist =
      '[{\
                                            "language":"en",\
                                            "enable_lock_UI":"false",\
                                            "enable_ping":"true",\
                                            "enable_DHT":"false",\
                                            "enable_camera":"false",\
                                            "auto_load_camera":"false",\
                                            "camera_address":"",\
                                            "number_extruders":"1",\
                                            "is_mixed_extruder":"false",\
                                            "enable_redundant":"false",\
                                            "enable_probe":"false",\
                                            "enable_bed":"false",\
                                            "enable_chamber":"false",\
                                            "enable_fan":"false",\
                                            "enable_control_panel":"true",\
                                            "enable_grbl_panel":"true",\
                                            "interval_positions":"3",\
                                            "interval_temperatures":"3",\
                                            "interval_status":"3",\
                                            "xy_feedrate":"1000",\
                                            "z_feedrate":"100",\
                                            "a_feedrate":"100",\
                                            "b_feedrate":"100",\
                                            "c_feedrate":"100",\
                                            "e_feedrate":"400",\
                                            "e_distance":"5",\
                                            "enable_temperatures_panel":"false",\
                                            "enable_extruder_panel":"false",\
                                            "enable_files_panel":"true",\
                                            "has_TFT_SD":"false",\
                                            "has_TFT_USB":"false",\
                                            "f_filters":"g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT",\
                                            "enable_commands_panel":"true",\
                                            "enable_autoscroll":"true",\
                                            "enable_verbose_mode":"true",\
                                            "enable_grbl_probe_panel":"false",\
                                            "probemaxtravel":"40",\
                                            "probefeedrate":"100",\
                                            "probetouchplatethickness":"0.5"\
                                            }]';

    document.getElementById("DHT_pref_panel").style.display = "none";
    document.getElementById("temp_pref_panel").style.display = "none";
    document.getElementById("ext_pref_panel").style.display = "none";
    document.getElementById("grbl_pref_panel").style.display = "block";
    document.getElementById("has_tft_sd").style.display = "table-row";
    document.getElementById("has_tft_usb").style.display = "table-row";
  } else {
    defaultpreferenceslist =
      '[{\
                                            "language":"en",\
                                            "enable_lock_UI":"false",\
                                            "enable_ping":"true",\
                                            "enable_DHT":"false",\
                                            "enable_camera":"false",\
                                            "auto_load_camera":"false",\
                                            "camera_address":"",\
                                            "number_extruders":"1",\
                                            "is_mixed_extruder":"false",\
                                            "enable_redundant":"false",\
                                            "enable_probe":"false",\
                                            "enable_bed":"false",\
                                            "enable_chamber":"false",\
                                            "enable_fan":"false",\
                                            "enable_control_panel":"true",\
                                            "enable_grbl_panel":"true",\
                                            "interval_positions":"3",\
                                            "interval_temperatures":"3",\
                                            "interval_status":"3",\
                                            "xy_feedrate":"1000",\
                                            "z_feedrate":"100",\
                                            "a_feedrate":"100",\
                                            "b_feedrate":"100",\
                                            "c_feedrate":"100",\
                                            "e_feedrate":"400",\
                                            "e_distance":"5",\
                                            "enable_temperatures_panel":"true",\
                                            "enable_extruder_panel":"true",\
                                            "enable_files_panel":"true",\
                                            "has_TFT_SD":"false",\
                                            "has_TFT_USB":"false",\
                                            "f_filters":"g;G;gco;GCO;gcode;GCODE",\
                                            "enable_commands_panel":"true",\
                                            "enable_autoscroll":"true",\
                                            "enable_verbose_mode":"true",\
                                            "enable_grbl_probe_panel":"false",\
                                            "probemaxtravel":"40",\
                                            "probefeedrate":"100",\
                                            "probetouchplatethickness":"0.5"\
                                            }]';

    if (target_firmware == "marlin-embedded")
      document.getElementById("DHT_pref_panel").style.display = "none";
    else document.getElementById("DHT_pref_panel").style.display = "block";

    document.getElementById("temp_pref_panel").style.display = "block";
    document.getElementById("ext_pref_panel").style.display = "block";
    document.getElementById("grbl_pref_panel").style.display = "none";
    document.getElementById("has_tft_sd").style.display = "table-row";
    document.getElementById("has_tft_usb").style.display = "table-row";
  }

  document.getElementById("redundant_controls_option").style.display = "none";
  document.getElementById("probe_controls_option").style.display = "none";
  document.getElementById("chamber_controls_option").style.display = "none";

  default_preferenceslist = JSON.parse(defaultpreferenceslist);
}

function getpreferenceslist() {
  var url = preferences_file_name + "?" + Date.now();
  preferenceslist = [];
  //removeIf(production)
  var response = defaultpreferenceslist;
  processPreferencesGetSuccess(response);
  return;
  //endRemoveIf(production)
  SendGetHttp(url, processPreferencesGetSuccess, processPreferencesGetFailed);
}

function build_extruder_list(forcevalue) {
  var nb = 2;
  var content = "";
  var current_value = document.getElementById(
    "preferences_control_nb_extruders"
  ).value;
  if (document.getElementById("enable_mixed_E_controls").checked) {
    nb = 9;
  }
  if (typeof forcevalue != "undefined") nb = forcevalue;
  for (var i = 1; i <= nb; i++) {
    content += "<option value='" + i + "'>" + i + "</option>";
  }
  document.getElementById("preferences_control_nb_extruders").innerHTML =
    content;
  if (parseInt(current_value) > nb) current_value = 1;
  document.getElementById("preferences_control_nb_extruders").value =
    current_value;
}

function prefs_toggledisplay(id_source, forcevalue) {
  if (typeof forcevalue != "undefined") {
    document.getElementById(id_source).checked = forcevalue;
  }
  switch (id_source) {
    case "show_files_panel":
      if (document.getElementById(id_source).checked)
        document.getElementById("files_preferences").style.display = "block";
      else document.getElementById("files_preferences").style.display = "none";
      break;
    case "show_grbl_panel":
      if (document.getElementById(id_source).checked)
        document.getElementById("grbl_preferences").style.display = "block";
      else document.getElementById("grbl_preferences").style.display = "none";
      break;
    case "show_camera_panel":
      if (document.getElementById(id_source).checked)
        document.getElementById("camera_preferences").style.display = "block";
      else document.getElementById("camera_preferences").style.display = "none";
      break;
    case "show_control_panel":
      if (document.getElementById(id_source).checked)
        document.getElementById("control_preferences").style.display = "block";
      else
        document.getElementById("control_preferences").style.display = "none";
      break;
    case "show_extruder_panel":
      if (document.getElementById(id_source).checked)
        document.getElementById("extruder_preferences").style.display = "block";
      else
        document.getElementById("extruder_preferences").style.display = "none";
      break;
    case "show_temperatures_panel":
      if (document.getElementById(id_source).checked)
        document.getElementById("temperatures_preferences").style.display =
          "block";
      else
        document.getElementById("temperatures_preferences").style.display =
          "none";
      break;
    case "show_commands_panel":
      if (document.getElementById(id_source).checked)
        document.getElementById("cmd_preferences").style.display = "block";
      else document.getElementById("cmd_preferences").style.display = "none";
      break;
    case "show_grbl_probe_tab":
      if (document.getElementById(id_source).checked)
        document.getElementById("grbl_probe_preferences").style.display =
          "block";
      else
        document.getElementById("grbl_probe_preferences").style.display =
          "none";
      break;
  }
}

function processPreferencesGetSuccess(response) {
  if (response.indexOf("<HTML>") == -1) Preferences_build_list(response);
  else Preferences_build_list(defaultpreferenceslist);
}

function processPreferencesGetFailed(errorcode, response) {
  console.log("Error " + errorcode + " : " + response);
  Preferences_build_list(defaultpreferenceslist);
}

function Preferences_build_list(response_text) {
  preferenceslist = [];
  try {
    if (response_text.length != 0) {
      //console.log(response_text);
      preferenceslist = JSON.parse(response_text);
    } else {
      preferenceslist = JSON.parse(defaultpreferenceslist);
    }
  } catch (e) {
    console.error("Parsing error:", e);
    preferenceslist = JSON.parse(defaultpreferenceslist);
  }
  applypreferenceslist();
}

function applypreferenceslist() {
  //Assign each control state
  translate_text(preferenceslist[0].language);
  build_HTML_setting_list(current_setting_filter);
  // if (preferenceslist[0].enable_grbl_probe_panel === "true") {
  //   document.getElementById("grblprobetablink").style.display = "block";
  // } else {
  //   document.getElementById("grblcontroltablink").click();
  //   document.getElementById("grblprobetablink").style.display = "none";
  // }
  // if (preferenceslist[0].enable_ping === "true") {
  //   ontogglePing(true);
  // } else {
  //   ontogglePing(false);
  // }

  // if (supportsRedundantTemperatures()) {
  //   if (preferenceslist[0].enable_redundant === "true") {
  //     document.getElementById("temperature_redundant").style.display =
  //       "table-row";
  //     temperature_extruder_redundant(true);
  //   } else {
  //     document.getElementById("temperature_redundant").style.display = "none";
  //     temperature_extruder_redundant(false);
  //   }
  // }
  // if (supportsProbeTemperatures()) {
  //   if (preferenceslist[0].enable_probe === "true") {
  //     document.getElementById("temperature_probe").style.display = "table-row";
  //     temperature_probe(true);
  //   } else {
  //     document.getElementById("temperature_probe").style.display = "none";
  //     temperature_probe(false);
  //   }
  // }
  // if (preferenceslist[0].enable_bed === "true") {
  //   document.getElementById("temperature_bed").style.display = "table-row";
  // } else {
  //   document.getElementById("temperature_bed").style.display = "none";
  // }
  // if (supportsChamberTemperatures()) {
  //   if (preferenceslist[0].enable_chamber === "true") {
  //     document.getElementById("temperature_chamber").style.display =
  //       "table-row";
  //     temperature_chamber(true);
  //   } else {
  //     document.getElementById("temperature_chamber").style.display = "none";
  //     temperature_chamber(false);
  //   }
  // }

  // if (
  //   preferenceslist[0].enable_bed === "true" ||
  //   (preferenceslist[0].enable_chamber === "true" &&
  //     supportsChamberTemperatures()) ||
  //   (preferenceslist[0].enable_probe === "true" && supportsProbeTemperatures())
  // ) {
  //   document.getElementById("bedtemperaturesgraphic").style.display = "block";
  // } else {
  //   document.getElementById("bedtemperaturesgraphic").style.display = "none";
  // }

  // if (preferenceslist[0].enable_fan === "true")
  //   document.getElementById("fan_UI").style.display = "block";
  // else document.getElementById("fan_UI").style.display = "none";

  // if (target_firmware == "grbl-embedded" || target_firmware == "grbl") {
  //   if (preferenceslist[0].enable_grbl_panel === "true")
  //     document.getElementById("grblPanel").style.display = "flex";
  //   else {
  //     document.getElementById("grblPanel").style.display = "none";
  //     on_autocheck_status(false);
  //   }
  // } else {
  //   document.getElementById("grblPanel").style.display = "none";
  //   on_autocheck_status(false);
  // }

  // if (preferenceslist[0].enable_control_panel === "true")
  //   document.getElementById("controlPanel").style.display = "flex";
  // else {
  //   document.getElementById("controlPanel").style.display = "none";
  //   on_autocheck_position(false);
  // }
  // if (preferenceslist[0].enable_verbose_mode === "true") {
  //   document.getElementById("monitor_enable_verbose_mode").checked = true;
  //   Monitor_check_verbose_mode();
  // } else document.getElementById("monitor_enable_verbose_mode").checked = false;
  // if (preferenceslist[0].enable_temperatures_panel === "true") {
  //   document.getElementById("temperaturesPanel").style.display = "block";
  // } else {
  //   document.getElementById("temperaturesPanel").style.display = "none";
  //   on_autocheck_temperature(false);
  // }

  // if (preferenceslist[0].enable_extruder_panel === "true")
  //   document.getElementById("extruderPanel").style.display = "flex";
  // else document.getElementById("extruderPanel").style.display = "none";

  if (preferenceslist[0].enable_files_panel === "true")
    document.getElementById("filesPanel").style.display = "flex";
  else document.getElementById("filesPanel").style.display = "none";

  // if (preferenceslist[0].has_TFT_SD === "true") {
  //   document.getElementById("files_refresh_tft_sd_btn").style.display = "flex";
  // } else {
  //   document.getElementById("files_refresh_tft_sd_btn").style.display = "none";
  // }

  // if (preferenceslist[0].has_TFT_USB === "true") {
  //   document.getElementById("files_refresh_tft_usb_btn").style.display = "flex";
  // } else {
  //   document.getElementById("files_refresh_tft_usb_btn").style.display = "none";
  // }

  // if (
  //   preferenceslist[0].has_TFT_SD === "true" ||
  //   preferenceslist[0].has_TFT_USB === "true"
  // ) {
  //   document.getElementById("files_refresh_printer_sd_btn").style.display =
  //     "flex";
  //   document.getElementById("files_refresh_btn").style.display = "none";
  // } else {
  //   document.getElementById("files_refresh_printer_sd_btn").style.display =
  //     "none";
  //   document.getElementById("files_refresh_btn").style.display = "flex";
  // }

  // if (target_firmware == "grbl") {
  //   document.getElementById("files_refresh_printer_sd_btn").style.display =
  //     "none";
  //   document.getElementById("files_refresh_btn").style.display = "none";
  //   document.getElementById("print_upload_btn").style.display = "none";
  //   document.getElementById("files_createdir_btn").style.display = "none";
  // }

  // if (preferenceslist[0].enable_commands_panel === "true") {
  //   document.getElementById("commandsPanel").style.display = "flex";
  //   if (preferenceslist[0].enable_autoscroll === "true") {
  //     document.getElementById("monitor_enable_autoscroll").checked = true;
  //     Monitor_check_autoscroll();
  //   } else document.getElementById("monitor_enable_autoscroll").checked = false;
  // } else document.getElementById("commandsPanel").style.display = "none";

  // document.getElementById("posInterval_check").value = parseInt(
  //   preferenceslist[0].interval_positions
  // );
  // document.getElementById("statusInterval_check").value = parseInt(
  //   preferenceslist[0].interval_status
  // );
  // document.getElementById("control_xy_velocity").value = parseInt(
  //   preferenceslist[0].xy_feedrate
  // );
  // document.getElementById("control_z_velocity").value = parseInt(
  //   preferenceslist[0].z_feedrate
  // );
  // if (target_firmware == "grbl-embedded") {
  //   if (grblaxis > 2) axis_Z_feedrate = parseInt(preferenceslist[0].z_feedrate);
  //   if (grblaxis > 3) axis_A_feedrate = parseInt(preferenceslist[0].a_feedrate);
  //   if (grblaxis > 4) axis_B_feedrate = parseInt(preferenceslist[0].b_feedrate);
  //   if (grblaxis > 5) axis_C_feedrate = parseInt(preferenceslist[0].c_feedrate);

  //   if (grblaxis > 3) {
  //     var letter = document.getElementById("control_select_axis").value;
  //     switch (letter) {
  //       case "Z":
  //         document.getElementById("control_z_velocity").value = axis_Z_feedrate;
  //         break;
  //       case "A":
  //         document.getElementById("control_z_velocity").value = axis_A_feedrate;
  //         break;
  //       case "B":
  //         document.getElementById("control_z_velocity").value = axis_B_feedrate;
  //         break;
  //       case "C":
  //         document.getElementById("control_z_velocity").value = axis_C_feedrate;
  //         break;
  //     }
  //   }
  // }
  // document.getElementById("probemaxtravel").value = parseFloat(
  //   preferenceslist[0].probemaxtravel
  // );
  // document.getElementById("probefeedrate").value = parseInt(
  //   preferenceslist[0].probefeedrate
  // );
  // document.getElementById("probetouchplatethickness").value = parseFloat(
  //   preferenceslist[0].probetouchplatethickness
  // );
  // document.getElementById("tempInterval_check").value = parseInt(
  //   preferenceslist[0].interval_temperatures
  // );
  // document.getElementById("filament_length").value = parseInt(
  //   preferenceslist[0].e_distance
  // );
  // document.getElementById("extruder_velocity").value = parseInt(
  //   preferenceslist[0].e_feedrate
  // );

  // For Paige we disable all the other panels
  document.getElementById("commandsPanel").style.display = "none";
  document.getElementById("extruderPanel").style.display = "none";
  document.getElementById("temperaturesPanel").style.display = "none";
  document.getElementById("grblPanel").style.display = "none";
  document.getElementById("controlPanel").style.display = "none";
  build_file_filter_list(preferenceslist[0].f_filters);
}

function showpreferencesdlg() {
  var modal = setactiveModal("preferencesdlg.html");
  if (modal == null) return;
  language_save = language;
  build_dlg_preferences_list();
  document.getElementById("preferencesdlg_upload_msg").style.display = "none";
  showModal();
}

function build_dlg_preferences_list() {
  //use preferenceslist to set dlg status
  var content = "<table><tr><td>";
  content += get_icon_svg("flag") + "&nbsp;</td><td>";
  content += build_language_list("language_preferences");
  content += "</td></tr></table>";
  document.getElementById("preferences_langage_list").innerHTML = content;
  //camera
  if (typeof preferenceslist[0].enable_camera !== "undefined") {
    document.getElementById("show_camera_panel").checked =
      preferenceslist[0].enable_camera === "true";
  } else document.getElementById("show_camera_panel").checked = false;
  //autoload camera
  if (typeof preferenceslist[0].auto_load_camera !== "undefined") {
    document.getElementById("autoload_camera_panel").checked =
      preferenceslist[0].auto_load_camera === "true";
  } else document.getElementById("autoload_camera_panel").checked = false;
  //camera address
  if (typeof preferenceslist[0].camera_address !== "undefined") {
    document.getElementById("preferences_camera_webaddress").value =
      decode_entitie(preferenceslist[0].camera_address);
  } else document.getElementById("preferences_camera_webaddress").value = "";
  //DHT
  if (typeof preferenceslist[0].enable_DHT !== "undefined") {
    document.getElementById("enable_DHT").checked =
      preferenceslist[0].enable_DHT === "true";
  } else document.getElementById("enable_DHT").checked = false;
  //lock UI
  if (typeof preferenceslist[0].enable_lock_UI !== "undefined") {
    document.getElementById("enable_lock_UI").checked =
      preferenceslist[0].enable_lock_UI === "true";
  } else document.getElementById("enable_lock_UI").checked = false;
  //Monitor connection
  if (typeof preferenceslist[0].enable_ping !== "undefined") {
    document.getElementById("enable_ping").checked =
      preferenceslist[0].enable_ping === "true";
  } else document.getElementById("enable_ping").checked = false;
  //is mixed extruder
  if (typeof preferenceslist[0].is_mixed_extruder !== "undefined") {
    document.getElementById("enable_mixed_E_controls").checked =
      preferenceslist[0].is_mixed_extruder === "true";
  } else document.getElementById("enable_mixed_E_controls").checked = false;
  //build list of possible value accordingly
  build_extruder_list();

  //number of extruders
  if (typeof preferenceslist[0].number_extruders !== "undefined") {
    var val = preferenceslist[0].number_extruders;
    if (val > 2 && !document.getElementById("enable_mixed_E_controls").checked)
      val = 1;
    document.getElementById("preferences_control_nb_extruders").value = val;
  } else
    document.getElementById("preferences_control_nb_extruders").value = "1";

  //heater t0 redundant
  if (typeof preferenceslist[0].enable_redundant !== "undefined") {
    document.getElementById("enable_redundant_controls").checked =
      preferenceslist[0].enable_redundant === "true";
  } else document.getElementById("enable_redundant_controls").checked = false;
  //probe
  if (typeof preferenceslist[0].enable_probe !== "undefined") {
    document.getElementById("enable_probe_controls").checked =
      preferenceslist[0].enable_probe === "true";
  } else document.getElementById("enable_probe_controls").checked = false;
  //bed
  if (typeof preferenceslist[0].enable_bed !== "undefined") {
    document.getElementById("enable_bed_controls").checked =
      preferenceslist[0].enable_bed === "true";
  } else document.getElementById("enable_bed_controls").checked = false;
  //chamber
  if (typeof preferenceslist[0].enable_chamber !== "undefined") {
    document.getElementById("enable_chamber_controls").checked =
      preferenceslist[0].enable_chamber === "true";
  } else document.getElementById("enable_chamber_controls").checked = false;
  //fan
  if (typeof preferenceslist[0].enable_fan !== "undefined") {
    document.getElementById("enable_fan_controls").checked =
      preferenceslist[0].enable_fan === "true";
  } else document.getElementById("enable_fan_controls").checked = false;
  //grbl panel
  if (typeof preferenceslist[0].enable_grbl_panel !== "undefined") {
    document.getElementById("show_grbl_panel").checked =
      preferenceslist[0].enable_grbl_panel === "true";
  } else document.getElementById("show_grbl_panel").checked = false;
  //grbl probe panel
  if (typeof preferenceslist[0].enable_grbl_probe_panel !== "undefined") {
    document.getElementById("show_grbl_probe_tab").checked =
      preferenceslist[0].enable_grbl_probe_panel === "true";
  } else document.getElementById("show_grbl_probe_tab").checked = false;
  //control panel
  if (typeof preferenceslist[0].enable_control_panel !== "undefined") {
    document.getElementById("show_control_panel").checked =
      preferenceslist[0].enable_control_panel === "true";
  } else document.getElementById("show_control_panel").checked = false;
  //temperatures panel
  if (typeof preferenceslist[0].enable_temperatures_panel !== "undefined") {
    document.getElementById("show_temperatures_panel").checked =
      preferenceslist[0].enable_temperatures_panel === "true";
  } else document.getElementById("show_temperatures_panel").checked = false;
  //extruders
  if (typeof preferenceslist[0].enable_extruder_panel !== "undefined") {
    document.getElementById("show_extruder_panel").checked =
      preferenceslist[0].enable_extruder_panel === "true";
  } else document.getElementById("show_extruder_panel").checked = false;
  //files panel
  if (typeof preferenceslist[0].enable_files_panel !== "undefined") {
    document.getElementById("show_files_panel").checked =
      preferenceslist[0].enable_files_panel === "true";
  } else document.getElementById("show_files_panel").checked = false;
  //TFT SD
  if (typeof preferenceslist[0].has_TFT_SD !== "undefined") {
    document.getElementById("has_tft_sd").checked =
      preferenceslist[0].has_TFT_SD === "true";
  } else document.getElementById("has_tft_sd").checked = false;
  //TFT USB
  if (typeof preferenceslist[0].has_TFT_USB !== "undefined") {
    document.getElementById("has_tft_usb").checked =
      preferenceslist[0].has_TFT_USB === "true";
  } else document.getElementById("has_tft_usb").checked = false;
  //commands
  if (typeof preferenceslist[0].enable_commands_panel !== "undefined") {
    document.getElementById("show_commands_panel").checked =
      preferenceslist[0].enable_commands_panel === "true";
  } else document.getElementById("show_commands_panel").checked = false;
  //interval positions
  if (typeof preferenceslist[0].interval_positions !== "undefined") {
    document.getElementById("preferences_pos_Interval_check").value = parseInt(
      preferenceslist[0].interval_positions
    );
  } else
    document.getElementById("preferences_pos_Interval_check").value = parseInt(
      default_preferenceslist[0].interval_positions
    );
  //interval status
  if (typeof preferenceslist[0].interval_status !== "undefined") {
    document.getElementById("preferences_status_Interval_check").value =
      parseInt(preferenceslist[0].interval_status);
  } else
    document.getElementById("preferences_status_Interval_check").value =
      parseInt(default_preferenceslist[0].interval_status);
  //xy feedrate
  if (typeof preferenceslist[0].xy_feedrate !== "undefined") {
    document.getElementById("preferences_control_xy_velocity").value = parseInt(
      preferenceslist[0].xy_feedrate
    );
  } else
    document.getElementById("preferences_control_xy_velocity").value = parseInt(
      default_preferenceslist[0].xy_feedrate
    );
  if (target_firmware != "grbl-embedded" || grblaxis > 2) {
    //z feedrate
    if (typeof preferenceslist[0].z_feedrate !== "undefined") {
      document.getElementById("preferences_control_z_velocity").value =
        parseInt(preferenceslist[0].z_feedrate);
    } else
      document.getElementById("preferences_control_z_velocity").value =
        parseInt(default_preferenceslist[0].z_feedrate);
  }
  if (target_firmware == "grbl-embedded") {
    if (grblaxis > 3) {
      //a feedrate
      if (typeof preferenceslist[0].a_feedrate !== "undefined") {
        document.getElementById("preferences_control_a_velocity").value =
          parseInt(preferenceslist[0].a_feedrate);
      } else
        document.getElementById("preferences_control_a_velocity").value =
          parseInt(default_preferenceslist[0].a_feedrate);
    }
    if (grblaxis > 4) {
      //b feedrate
      if (typeof preferenceslist[0].b_feedrate !== "undefined") {
        document.getElementById("preferences_control_b_velocity").value =
          parseInt(preferenceslist[0].b_feedrate);
      } else
        document.getElementById("preferences_control_b_velocity").value =
          parseInt(default_preferenceslist[0].b_feedrate);
    }
    if (grblaxis > 5) {
      //c feedrate
      if (typeof preferenceslist[0].c_feedrate !== "undefined") {
        document.getElementById("preferences_control_c_velocity").value =
          parseInt(preferenceslist[0].c_feedrate);
      } else
        document.getElementById("preferences_control_c_velocity").value =
          parseInt(default_preferenceslist[0].c_feedrate);
    }
  }
  //probemaxtravel
  if (
    typeof preferenceslist[0].probemaxtravel !== "undefined" &&
    preferenceslist[0].probemaxtravel.length != 0
  ) {
    document.getElementById("preferences_probemaxtravel").value = parseFloat(
      preferenceslist[0].probemaxtravel
    );
  } else {
    document.getElementById("preferences_probemaxtravel").value = parseFloat(
      default_preferenceslist[0].probemaxtravel
    );
  }
  //probefeedrate
  if (
    typeof preferenceslist[0].probefeedrate !== "undefined" &&
    preferenceslist[0].probefeedrate.length != 0
  ) {
    document.getElementById("preferences_probefeedrate").value = parseInt(
      preferenceslist[0].probefeedrate
    );
  } else
    document.getElementById("preferences_probefeedrate").value = parseInt(
      default_preferenceslist[0].probefeedrate
    );
  //probetouchplatethickness
  if (
    typeof preferenceslist[0].probetouchplatethickness !== "undefined" &&
    preferenceslist[0].probetouchplatethickness.length != 0
  ) {
    document.getElementById("preferences_probetouchplatethickness").value =
      parseFloat(preferenceslist[0].probetouchplatethickness);
  } else
    document.getElementById("preferences_probetouchplatethickness").value =
      parseFloat(default_preferenceslist[0].probetouchplatethickness);
  //interval temperatures
  if (typeof preferenceslist[0].interval_temperatures !== "undefined") {
    document.getElementById("preferences_tempInterval_check").value = parseInt(
      preferenceslist[0].interval_temperatures
    );
  } else
    document.getElementById("preferences_tempInterval_check").value = parseInt(
      default_preferenceslist[0].interval_temperatures
    );
  //e feedrate
  if (typeof preferenceslist[0].e_feedrate !== "undefined") {
    document.getElementById("preferences_e_velocity").value = parseInt(
      preferenceslist[0].e_feedrate
    );
  } else
    document.getElementById("preferences_e_velocity").value = parseInt(
      default_preferenceslist[0].e_feedrate
    );
  //e distance
  if (typeof preferenceslist[0].e_distance !== "undefined") {
    document.getElementById("preferences_filament_length").value = parseInt(
      preferenceslist[0].e_distance
    );
  } else
    document.getElementById("preferences_filament_length").value = parseInt(
      default_preferenceslist[0].e_distance
    );
  //autoscroll
  if (typeof preferenceslist[0].enable_autoscroll !== "undefined") {
    document.getElementById("preferences_autoscroll").checked =
      preferenceslist[0].enable_autoscroll === "true";
  } else document.getElementById("preferences_autoscroll").checked = false;
  //Verbose Mode
  if (typeof preferenceslist[0].enable_verbose_mode !== "undefined") {
    document.getElementById("preferences_verbose_mode").checked =
      preferenceslist[0].enable_verbose_mode === "true";
  } else document.getElementById("preferences_verbose_mode").checked = false;
  //file filters
  if (typeof preferenceslist[0].f_filters != "undefined") {
    console.log("Use prefs filters");
    document.getElementById("preferences_filters").value =
      preferenceslist[0].f_filters;
  } else {
    console.log("Use default filters");
    document.getElementById("preferences_filters").value = String(
      default_preferenceslist[0].f_filters
    );
  }

  prefs_toggledisplay("show_camera_panel");
  prefs_toggledisplay("show_grbl_panel");
  prefs_toggledisplay("show_control_panel");
  prefs_toggledisplay("show_extruder_panel");
  prefs_toggledisplay("show_temperatures_panel");
  prefs_toggledisplay("show_commands_panel");
  prefs_toggledisplay("show_files_panel");
  prefs_toggledisplay("show_grbl_probe_tab");
}

function closePreferencesDialog() {
  var modified = false;
  if (preferenceslist[0].length != 0) {
    //check dialog compare to global state
    if (
      typeof preferenceslist[0].language === "undefined" ||
      typeof preferenceslist[0].enable_camera === "undefined" ||
      typeof preferenceslist[0].auto_load_camera === "undefined" ||
      typeof preferenceslist[0].camera_address === "undefined" ||
      typeof preferenceslist[0].enable_DHT === "undefined" ||
      typeof preferenceslist[0].number_extruders === "undefined" ||
      typeof preferenceslist[0].is_mixed_extruder === "undefined" ||
      typeof preferenceslist[0].enable_lock_UI === "undefined" ||
      typeof preferenceslist[0].enable_ping === "undefined" ||
      typeof preferenceslist[0].enable_redundant === "undefined" ||
      typeof preferenceslist[0].enable_probe === "undefined" ||
      typeof preferenceslist[0].enable_bed === "undefined" ||
      typeof preferenceslist[0].enable_chamber === "undefined" ||
      typeof preferenceslist[0].enable_fan === "undefined" ||
      typeof preferenceslist[0].xy_feedrate === "undefined" ||
      typeof preferenceslist[0].z_feedrate === "undefined" ||
      typeof preferenceslist[0].e_feedrate === "undefined" ||
      typeof preferenceslist[0].e_distance === "undefined" ||
      typeof preferenceslist[0].enable_control_panel === "undefined" ||
      typeof preferenceslist[0].enable_grbl_panel === "undefined" ||
      typeof preferenceslist[0].enable_grbl_probe_panel === "undefined" ||
      typeof preferenceslist[0].enable_temperatures_panel === "undefined" ||
      typeof preferenceslist[0].probemaxtravel === "undefined" ||
      typeof preferenceslist[0].probefeedrate === "undefined" ||
      typeof preferenceslist[0].probetouchplatethickness === "undefined" ||
      typeof preferenceslist[0].enable_extruder_panel === "undefined" ||
      typeof preferenceslist[0].enable_files_panel === "undefined" ||
      typeof preferenceslist[0].has_TFT_SD === "undefined" ||
      typeof preferenceslist[0].has_TFT_USB === "undefined" ||
      typeof preferenceslist[0].interval_positions === "undefined" ||
      typeof preferenceslist[0].interval_temperatures === "undefined" ||
      typeof preferenceslist[0].interval_status === "undefined" ||
      typeof preferenceslist[0].enable_autoscroll === "undefined" ||
      typeof preferenceslist[0].enable_verbose_mode === "undefined" ||
      typeof preferenceslist[0].enable_commands_panel === "undefined"
    ) {
      modified = true;
    } else {
      //camera
      if (
        document.getElementById("show_camera_panel").checked !=
        (preferenceslist[0].enable_camera === "true")
      )
        modified = true;
      //Autoload
      if (
        document.getElementById("autoload_camera_panel").checked !=
        (preferenceslist[0].auto_load_camera === "true")
      )
        modified = true;
      //camera address
      if (
        document.getElementById("preferences_camera_webaddress").value !=
        decode_entitie(preferenceslist[0].camera_address)
      )
        modified = true;
      //DHT
      if (
        document.getElementById("enable_DHT").checked !=
        (preferenceslist[0].enable_DHT === "true")
      )
        modified = true;
      //Lock UI
      if (
        document.getElementById("enable_lock_UI").checked !=
        (preferenceslist[0].enable_lock_UI === "true")
      )
        modified = true;
      //Monitor connection
      if (
        document.getElementById("enable_ping").checked !=
        (preferenceslist[0].enable_ping === "true")
      )
        modified = true;
      //number extruders
      if (
        document.getElementById("preferences_control_nb_extruders").value !=
        parseInt(preferenceslist[0].number_extruders)
      )
        modified = true;
      //is mixed extruder
      if (
        document.getElementById("enable_mixed_E_controls").checked !=
        (preferenceslist[0].is_mixed_extruder === "true")
      )
        modified = true;
      //heater t0 redundant
      if (
        document.getElementById("enable_redundant_controls").checked !=
        (preferenceslist[0].enable_redundant === "true")
      )
        modified = true;
      //probe
      if (
        document.getElementById("enable_probe_controls").checked !=
        (preferenceslist[0].enable_probe === "true")
      )
        modified = true;
      //bed
      if (
        document.getElementById("enable_bed_controls").checked !=
        (preferenceslist[0].enable_bed === "true")
      )
        modified = true;
      //chamber
      if (
        document.getElementById("enable_chamber_controls").checked !=
        (preferenceslist[0].enable_chamber === "true")
      )
        modified = true;
      //fan.
      if (
        document.getElementById("enable_fan_controls").checked !=
        (preferenceslist[0].enable_fan === "true")
      )
        modified = true;
      //control panel
      if (
        document.getElementById("show_control_panel").checked !=
        (preferenceslist[0].enable_control_panel === "true")
      )
        modified = true;
      //temperatures panel
      if (
        document.getElementById("show_temperatures_panel").checked !=
        (preferenceslist[0].enable_temperatures_panel === "true")
      )
        modified = true;
      //grbl panel
      if (
        document.getElementById("show_grbl_panel").checked !=
        (preferenceslist[0].enable_grbl_panel === "true")
      )
        modified = true;
      //grbl probe panel
      if (
        document.getElementById("show_grbl_probe_tab").checked !=
        (preferenceslist[0].enable_grbl_probe_panel === "true")
      )
        modified = true;
      //extruder panel
      if (
        document.getElementById("show_extruder_panel").checked !=
        (preferenceslist[0].enable_extruder_panel === "true")
      )
        modified = true;
      //files panel
      if (
        document.getElementById("show_files_panel").checked !=
        (preferenceslist[0].enable_files_panel === "true")
      )
        modified = true;
      //TFT SD
      if (
        document.getElementById("has_tft_sd").checked !=
        (preferenceslist[0].has_TFT_SD === "true")
      )
        modified = true;
      //TFT USB
      if (
        document.getElementById("has_tft_usb").checked !=
        (preferenceslist[0].has_TFT_USB === "true")
      )
        modified = true;
      //commands
      if (
        document.getElementById("show_commands_panel").checked !=
        (preferenceslist[0].enable_commands_panel === "true")
      )
        modified = true;
      //interval positions
      if (
        document.getElementById("preferences_pos_Interval_check").value !=
        parseInt(preferenceslist[0].interval_positions)
      )
        modified = true;
      //interval status
      if (
        document.getElementById("preferences_status_Interval_check").value !=
        parseInt(preferenceslist[0].interval_status)
      )
        modified = true;
      //xy feedrate
      if (
        document.getElementById("preferences_control_xy_velocity").value !=
        parseInt(preferenceslist[0].xy_feedrate)
      )
        modified = true;
      if (target_firmware != "grbl-embedded" || grblaxis > 2) {
        //z feedrate
        if (
          document.getElementById("preferences_control_z_velocity").value !=
          parseInt(preferenceslist[0].z_feedrate)
        )
          modified = true;
      }
      if (target_firmware == "grbl-embedded") {
        if (grblaxis > 3) {
          //a feedrate
          if (
            document.getElementById("preferences_control_a_velocity").value !=
            parseInt(preferenceslist[0].a_feedrate)
          )
            modified = true;
        }
        if (grblaxis > 4) {
          //b feedrate
          if (
            document.getElementById("preferences_control_b_velocity").value !=
            parseInt(preferenceslist[0].b_feedrate)
          )
            modified = true;
        }
        if (grblaxis > 5) {
          //c feedrate
          if (
            document.getElementById("preferences_control_c_velocity").value !=
            parseInt(preferenceslist[0].c_feedrate)
          )
            modified = true;
        }
      }
      //interval temperatures
      if (
        document.getElementById("preferences_tempInterval_check").value !=
        parseInt(preferenceslist[0].interval_temperatures)
      )
        modified = true;
      //e feedrate
      if (
        document.getElementById("preferences_e_velocity").value !=
        parseInt(preferenceslist[0].e_feedrate)
      )
        modified = true;
      //e distance
      if (
        document.getElementById("preferences_filament_length").value !=
        parseInt(preferenceslist[0].e_distance)
      )
        modified = true;
      //autoscroll
      if (
        document.getElementById("preferences_autoscroll").checked !=
        (preferenceslist[0].enable_autoscroll === "true")
      )
        modified = true;
      //Verbose Mode
      if (
        document.getElementById("preferences_verbose_mode").checked !=
        (preferenceslist[0].enable_verbose_mode === "true")
      )
        modified = true;
      //file filters
      if (
        document.getElementById("preferences_filters").value !=
        preferenceslist[0].f_filters
      )
        modified = true;
      //probemaxtravel
      if (
        document.getElementById("preferences_probemaxtravel").value !=
        parseFloat(preferenceslist[0].probemaxtravel)
      )
        modified = true;
      //probefeedrate
      if (
        document.getElementById("preferences_probefeedrate").value !=
        parseInt(preferenceslist[0].probefeedrate)
      )
        modified = true;
      //probetouchplatethickness
      if (
        document.getElementById("preferences_probetouchplatethickness").value !=
        parseFloat(preferenceslist[0].probetouchplatethickness)
      )
        modified = true;
    }
  } else modified = true;
  if (language_save != language) modified = true;
  if (modified) {
    confirmdlg(
      translate_text_item("Data mofified"),
      translate_text_item("Do you want to save?"),
      process_preferencesCloseDialog
    );
  } else {
    closeModal("cancel");
  }
}

function process_preferencesCloseDialog(answer) {
  if (answer == "no") {
    //console.log("Answer is no so exit");
    translate_text(language_save);
    closeModal("cancel");
  } else {
    // console.log("Answer is yes so let's save");
    SavePreferences();
  }
}

function SavePreferences(current_preferences) {
  if (http_communication_locked) {
    alertdlg(
      translate_text_item("Busy..."),
      translate_text_item(
        "Communications are currently locked, please wait and retry."
      )
    );
    return;
  }
  console.log("save prefs");
  if (
    (typeof current_preferences != "undefined" && !current_preferences) ||
    typeof current_preferences == "undefined"
  ) {
    if (
      !Checkvalues("preferences_pos_Interval_check") ||
      !Checkvalues("preferences_status_Interval_check") ||
      !Checkvalues("preferences_control_xy_velocity") ||
      !Checkvalues("preferences_e_velocity") ||
      !Checkvalues("preferences_tempInterval_check") ||
      !Checkvalues("preferences_filters") ||
      !Checkvalues("preferences_filament_length") ||
      !Checkvalues("preferences_probemaxtravel") ||
      !Checkvalues("preferences_probefeedrate") ||
      !Checkvalues("preferences_probetouchplatethickness")
    )
      return;
    if (target_firmware != "grbl-embedded" || grblaxis > 2) {
      if (!Checkvalues("preferences_control_z_velocity")) return;
    }
    if (target_firmware == "grbl-embedded") {
      if (grblaxis > 3 && !Checkvalues("preferences_control_a_velocity"))
        return;
      if (grblaxis > 4 && !Checkvalues("preferences_control_b_velocity"))
        return;
      if (grblaxis > 5 && !Checkvalues("preferences_control_c_velocity"))
        return;
    }
    preferenceslist = [];
    var saveprefs = '[{"language":"' + language;
    saveprefs +=
      '","enable_camera":"' +
      document.getElementById("show_camera_panel").checked;
    saveprefs +=
      '","auto_load_camera":"' +
      document.getElementById("autoload_camera_panel").checked;
    saveprefs +=
      '","camera_address":"' +
      HTMLEncode(
        document.getElementById("preferences_camera_webaddress").value
      );
    saveprefs +=
      '","enable_DHT":"' + document.getElementById("enable_DHT").checked;
    saveprefs +=
      '","enable_lock_UI":"' +
      document.getElementById("enable_lock_UI").checked;
    saveprefs +=
      '","enable_ping":"' + document.getElementById("enable_ping").checked;
    saveprefs +=
      '","is_mixed_extruder":"' +
      document.getElementById("enable_mixed_E_controls").checked;
    saveprefs +=
      '","number_extruders":"' +
      document.getElementById("preferences_control_nb_extruders").value;
    saveprefs +=
      '","enable_redundant":"' +
      document.getElementById("enable_redundant_controls").checked;
    saveprefs +=
      '","enable_probe":"' +
      document.getElementById("enable_probe_controls").checked;
    saveprefs +=
      '","enable_bed":"' +
      document.getElementById("enable_bed_controls").checked;
    saveprefs +=
      '","enable_chamber":"' +
      document.getElementById("enable_chamber_controls").checked;
    saveprefs +=
      '","enable_fan":"' +
      document.getElementById("enable_fan_controls").checked;
    saveprefs +=
      '","enable_control_panel":"' +
      document.getElementById("show_control_panel").checked;
    saveprefs +=
      '","enable_grbl_probe_panel":"' +
      document.getElementById("show_grbl_probe_tab").checked;
    saveprefs +=
      '","enable_temperatures_panel":"' +
      document.getElementById("show_temperatures_panel").checked;
    saveprefs +=
      '","enable_extruder_panel":"' +
      document.getElementById("show_extruder_panel").checked;
    saveprefs +=
      '","enable_grbl_panel":"' +
      document.getElementById("show_grbl_panel").checked;
    saveprefs +=
      '","enable_files_panel":"' +
      document.getElementById("show_files_panel").checked;
    saveprefs +=
      '","has_TFT_SD":"' + document.getElementById("has_tft_sd").checked;
    saveprefs +=
      '","has_TFT_USB":"' + document.getElementById("has_tft_usb").checked;
    saveprefs +=
      '","probemaxtravel":"' +
      document.getElementById("preferences_probemaxtravel").value;
    saveprefs +=
      '","probefeedrate":"' +
      document.getElementById("preferences_probefeedrate").value;
    saveprefs +=
      '","probetouchplatethickness":"' +
      document.getElementById("preferences_probetouchplatethickness").value;
    saveprefs +=
      '","interval_positions":"' +
      document.getElementById("preferences_pos_Interval_check").value;
    saveprefs +=
      '","interval_status":"' +
      document.getElementById("preferences_status_Interval_check").value;
    saveprefs +=
      '","xy_feedrate":"' +
      document.getElementById("preferences_control_xy_velocity").value;
    if (target_firmware != "grbl-embedded" || grblaxis > 2) {
      saveprefs +=
        '","z_feedrate":"' +
        document.getElementById("preferences_control_z_velocity").value;
    }
    if (target_firmware == "grbl-embedded") {
      if (grblaxis > 3) {
        saveprefs +=
          '","a_feedrate":"' +
          document.getElementById("preferences_control_a_velocity").value;
      }
      if (grblaxis > 4) {
        saveprefs +=
          '","b_feedrate":"' +
          document.getElementById("preferences_control_b_velocity").value;
      }
      if (grblaxis > 5) {
        saveprefs +=
          '","c_feedrate":"' +
          document.getElementById("preferences_control_c_velocity").value;
      }
    }
    saveprefs +=
      '","interval_temperatures":"' +
      document.getElementById("preferences_tempInterval_check").value;
    saveprefs +=
      '","e_feedrate":"' +
      document.getElementById("preferences_e_velocity").value;
    saveprefs +=
      '","e_distance":"' +
      document.getElementById("preferences_filament_length").value;
    saveprefs +=
      '","f_filters":"' + document.getElementById("preferences_filters").value;
    saveprefs +=
      '","enable_autoscroll":"' +
      document.getElementById("preferences_autoscroll").checked;
    saveprefs +=
      '","enable_verbose_mode":"' +
      document.getElementById("preferences_verbose_mode").checked;
    saveprefs +=
      '","enable_commands_panel":"' +
      document.getElementById("show_commands_panel").checked +
      '"}]';
    preferenceslist = JSON.parse(saveprefs);
  }
  var blob = new Blob([JSON.stringify(preferenceslist, null, " ")], {
    type: "application/json",
  });
  var file;
  if (browser_is("IE") || browser_is("Edge")) {
    file = blob;
    file.name = preferences_file_name;
    file.lastModifiedDate = new Date();
  } else file = new File([blob], preferences_file_name);
  var formData = new FormData();
  var url = "/files";
  formData.append("path", "/");
  formData.append("myfile[]", file, preferences_file_name);
  if (typeof current_preferences != "undefined" && current_preferences)
    SendFileHttp(url, formData);
  else
    SendFileHttp(
      url,
      formData,
      preferencesdlgUploadProgressDisplay,
      preferencesUploadsuccess,
      preferencesUploadfailed
    );
}

function preferencesdlgUploadProgressDisplay(oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = (oEvent.loaded / oEvent.total) * 100;
    document.getElementById("preferencesdlg_prg").value = percentComplete;
    document.getElementById("preferencesdlg_upload_percent").innerHTML =
      percentComplete.toFixed(0);
    document.getElementById("preferencesdlg_upload_msg").style.display =
      "block";
  } else {
    // Impossible because size is unknown
  }
}

function preferencesUploadsuccess(response) {
  document.getElementById("preferencesdlg_upload_msg").style.display = "none";
  applypreferenceslist();
  closeModal("ok");
}

function preferencesUploadfailed(errorcode, response) {
  alertdlg(
    translate_text_item("Error"),
    translate_text_item("Save preferences failed!")
  );
}

function Checkvalues(id_2_check) {
  var status = true;
  var value = 0;
  switch (id_2_check) {
    case "preferences_status_Interval_check":
    case "preferences_tempInterval_check":
    case "preferences_pos_Interval_check":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 1 && value <= 100)) {
        error_message = translate_text_item(
          "Value of auto-check must be between 0s and 99s !!"
        );
        status = false;
      }
      break;
    case "preferences_control_xy_velocity":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 1)) {
        error_message = translate_text_item(
          "XY Feedrate value must be at least 1 mm/min!"
        );
        status = false;
      }
      break;
    case "preferences_control_z_velocity":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 1)) {
        error_message = translate_text_item(
          "Z Feedrate value must be at least 1 mm/min!"
        );
        status = false;
      }
      break;
    case "preferences_control_a_velocity":
    case "preferences_control_b_velocity":
    case "preferences_control_c_velocity":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 1)) {
        error_message = translate_text_item(
          "Axis Feedrate value must be at least 1 mm/min!"
        );
        status = false;
      }
      break;
    case "preferences_tempInterval_check":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value > 0 && value < 100)) {
        error_message = translate_text_item(
          "Value of auto-check must be between 0s and 99s !!"
        );
        status = false;
      }
      break;
    case "preferences_e_velocity":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
        error_message = translate_text_item(
          "Value of extruder velocity must be between 1 mm/min and 9999 mm/min !"
        );
        status = false;
      }
      break;
    case "preferences_probefeedrate":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
        error_message = translate_text_item(
          "Value of probe feedrate must be between 1 mm/min and 9999 mm/min !"
        );
        status = false;
      }
      break;
    case "preferences_probemaxtravel":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
        error_message = translate_text_item(
          "Value of maximum probe travel must be between 1 mm and 9999 mm !"
        );
        status = false;
      }
      break;
    case "preferences_probetouchplatethickness":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 0 && value <= 9999)) {
        error_message = translate_text_item(
          "Value of probe touch plate thickness must be between 0 mm and 9999 mm !"
        );
        status = false;
      }
      break;
    case "preferences_filament_length":
      value = parseInt(document.getElementById(id_2_check).value);
      if (!(!isNaN(value) && value >= 0.001 && value <= 9999)) {
        error_message = translate_text_item(
          "Value of filament length must be between 0.001 mm and 9999 mm !"
        );
        status = false;
      }
      break;
    case "preferences_filters":
      //TODO a regex would be better
      value = document.getElementById(id_2_check).value;
      if (value.indexOf(".") != -1 || value.indexOf("*") != -1) {
        error_message = translate_text_item(
          "Only alphanumeric chars separated by ; for extensions filters"
        );
        status = false;
      }
      break;
  }
  if (status) {
    document
      .getElementById(id_2_check + "_group")
      .classList.remove("has-feedback");
    document
      .getElementById(id_2_check + "_group")
      .classList.remove("has-error");
    document.getElementById(id_2_check + "_icon").innerHTML = "";
  } else {
    document
      .getElementById(id_2_check + "_group")
      .classList.add("has-feedback");
    document.getElementById(id_2_check + "_group").classList.add("has-error");
    document.getElementById(id_2_check + "_icon").innerHTML =
      get_icon_svg("remove");
    alertdlg(translate_text_item("Out of range"), error_message);
  }
  return status;
}
=======
//Preferences dialog
var preferenceslist = [];
var language_save = language;
var default_preferenceslist = [];
var defaultpreferenceslist = "[{\
                                            \"language\":\"en\",\
                                            \"enable_lock_UI\":\"false\",\
                                            \"enable_ping\":\"true\",\
                                            \"enable_DHT\":\"false\",\
                                            \"enable_camera\":\"false\",\
                                            \"auto_load_camera\":\"false\",\
                                            \"camera_address\":\"\",\
                                            \"enable_redundant\":\"false\",\
                                            \"enable_probe\":\"false\",\
                                            \"enable_control_panel\":\"true\",\
                                            \"enable_grbl_panel\":\"false\",\
                                            \"autoreport_interval\":\"50\",\
                                            \"interval_positions\":\"3\",\
                                            \"interval_status\":\"3\",\
                                            \"xy_feedrate\":\"1000\",\
                                            \"z_feedrate\":\"100\",\
                                            \"a_feedrate\":\"100\",\
                                            \"b_feedrate\":\"100\",\
                                            \"c_feedrate\":\"100\",\
                                            \"e_feedrate\":\"400\",\
                                            \"e_distance\":\"5\",\
                                            \"f_filters\":\"gco;gcode\",\
                                            \"enable_files_panel\":\"true\",\
                                            \"has_TFT_SD\":\"false\",\
                                            \"has_TFT_USB\":\"false\",\
                                            \"enable_commands_panel\":\"true\",\
                                            \"enable_autoscroll\":\"true\",\
                                            \"enable_verbose_mode\":\"true\",\
                                            \"enable_grbl_probe_panel\":\"false\",\
                                            \"probemaxtravel\":\"40\",\
                                            \"probefeedrate\":\"100\",\
                                            \"proberetract\":\"1.0\",\
                                            \"probetouchplatethickness\":\"0.5\"\
                                            }]";
var preferences_file_name = '/preferences.json';

function initpreferences() {
    defaultpreferenceslist = "[{\
                                            \"language\":\"en\",\
                                            \"enable_lock_UI\":\"false\",\
                                            \"enable_ping\":\"true\",\
                                            \"enable_DHT\":\"false\",\
                                            \"enable_camera\":\"false\",\
                                            \"auto_load_camera\":\"false\",\
                                            \"camera_address\":\"\",\
                                            \"number_extruders\":\"1\",\
                                            \"is_mixed_extruder\":\"false\",\
                                            \"enable_redundant\":\"false\",\
                                            \"enable_probe\":\"false\",\
                                            \"enable_control_panel\":\"true\",\
                                            \"enable_grbl_panel\":\"true\",\
                                            \"autoreport_interval\":\"50\",\
                                            \"interval_positions\":\"3\",\
                                            \"interval_status\":\"3\",\
                                            \"xy_feedrate\":\"1000\",\
                                            \"z_feedrate\":\"100\",\
                                            \"a_feedrate\":\"100\",\
                                            \"b_feedrate\":\"100\",\
                                            \"c_feedrate\":\"100\",\
                                            \"e_feedrate\":\"400\",\
                                            \"e_distance\":\"5\",\
                                            \"enable_files_panel\":\"true\",\
                                            \"has_TFT_SD\":\"false\",\
                                            \"has_TFT_USB\":\"false\",\
                                            \"f_filters\":\"g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT\",\
                                            \"enable_commands_panel\":\"true\",\
                                            \"enable_autoscroll\":\"true\",\
                                            \"enable_verbose_mode\":\"true\",\
                                            \"enable_grbl_probe_panel\":\"false\",\
                                            \"probemaxtravel\":\"40\",\
                                            \"probefeedrate\":\"100\",\
                                            \"proberetract\":\"1.0\",\
                                            \"probetouchplatethickness\":\"0.5\"\
                                            }]";

    displayNone('DHT_pref_panel');
    displayBlock('grbl_pref_panel');
    displayTable('has_tft_sd');
    displayTable('has_tft_usb');
        
    default_preferenceslist = JSON.parse(defaultpreferenceslist);
}

function getpreferenceslist() {
    var url = preferences_file_name;
    preferenceslist = [];
    //removeIf(production)
    var response = defaultpreferenceslist;
    processPreferencesGetSuccess(response);
    return;
    //endRemoveIf(production)
    SendGetHttp(url, processPreferencesGetSuccess, processPreferencesGetFailed);
}

function prefs_toggledisplay(id_source, forcevalue) {
    if (typeof forcevalue != 'undefined') {
        id(id_source).checked = forcevalue;
    }
    switch (id_source) {
        case 'show_files_panel':
            if (id(id_source).checked) displayBlock("files_preferences");
            else displayNone("files_preferences");
            break;
        case 'show_grbl_panel':
            if (id(id_source).checked) displayBlock("grbl_preferences");
            else displayNone("grbl_preferences");
            break;
        case 'show_camera_panel':
            if (id(id_source).checked) displayBlock("camera_preferences");
            else displayNone("camera_preferences");
            break;
        case 'show_control_panel':
            if (id(id_source).checked) displayBlock("control_preferences");
            else displayNone("control_preferences");
            break;
        case 'show_commands_panel':
            if (id(id_source).checked) displayBlock("cmd_preferences");
            else displayNone("cmd_preferences");
            break;
        case 'show_grbl_probe_tab':
            if (id(id_source).checked) displayBlock("grbl_probe_preferences");
            else displayNone("grbl_probe_preferences");
            break;
    }
}

function processPreferencesGetSuccess(response) {
    if (response.indexOf("<HTML>") == -1) Preferences_build_list(response);
    else Preferences_build_list(defaultpreferenceslist);
}

function processPreferencesGetFailed(errorcode, response) {
    console.log("Error " + errorcode + " : " + response);
    Preferences_build_list(defaultpreferenceslist);
}

function Preferences_build_list(response_text) {
    preferenceslist = [];
    try {
        if (response_text.length != 0) {
            //console.log(response_text);  
            preferenceslist = JSON.parse(response_text);
        } else {
            preferenceslist = JSON.parse(defaultpreferenceslist);
        }
    } catch (e) {
        console.error("Parsing error:", e);
        preferenceslist = JSON.parse(defaultpreferenceslist);
    }
    applypreferenceslist();
}

function applypreferenceslist() {
    //Assign each control state
    translate_text(preferenceslist[0].language);
    build_HTML_setting_list(current_setting_filter);
    if (typeof id('camtab') != "undefined") {
        var camoutput = false;
        if (typeof(preferenceslist[0].enable_camera) !== 'undefined') {
            if (preferenceslist[0].enable_camera === 'true') {
                displayBlock('camtablink');
                camera_GetAddress();
                if (typeof(preferenceslist[0].auto_load_camera) !== 'undefined') {
                    if (preferenceslist[0].auto_load_camera === 'true') {
                        var saddress = id('camera_webaddress').value
                        camera_loadframe();
                        camoutput = true;
                    }
                }
            } else {
                id("maintablink").click();
                displayNone('camtablink');
            }
        } else {
            id("maintablink").click();
            displayNone('camtablink');
        }
        if (!camoutput) {
            id('camera_frame').src = "";
            displayNone('camera_frame_display');
            displayNone('camera_detach_button');
        }
    }
    if (preferenceslist[0].enable_grbl_probe_panel === 'true') {
        displayBlock('grblprobetablink');
    } else {
        id("grblcontroltablink").click();
        displayNone('grblprobetablink');
    }

    if (preferenceslist[0].enable_DHT === 'true') {
        displayBlock('DHT_humidity');
        displayBlock('DHT_temperature');
    } else {
        displayNone('DHT_humidity');
        displayNone('DHT_temperature');
    }
    if (preferenceslist[0].enable_lock_UI === 'true') {
        displayBlock('lock_ui_btn');
        ontoggleLock(true);
    } else {
        displayNone('lock_ui_btn');
        ontoggleLock(false);
    }
    if (preferenceslist[0].enable_ping === 'true') {
        ontogglePing(true);
    } else {
        ontogglePing(false);
    }

    if (preferenceslist[0].enable_grbl_panel === 'true') displayFlex('grblPanel');
    else {
        displayNone('grblPanel');
        reportNone(false);
    }

    if (preferenceslist[0].enable_control_panel === 'true') displayFlex('controlPanel');
    else {
        displayNone('controlPanel');
        on_autocheck_position(false);
    }
    if (preferenceslist[0].enable_verbose_mode === 'true') {
        id('monitor_enable_verbose_mode').checked = true;
        Monitor_check_verbose_mode();
    } else id('monitor_enable_verbose_mode').checked = false;

    if (preferenceslist[0].enable_files_panel === 'true') displayFlex('filesPanel');
    else displayNone('filesPanel');
    
    if (preferenceslist[0].has_TFT_SD === 'true'){
         displayFlex('files_refresh_tft_sd_btn');
     }
    else {
        displayNone('files_refresh_tft_sd_btn');
    }
    
    if (preferenceslist[0].has_TFT_USB === 'true') {
        displayFlex('files_refresh_tft_usb_btn');
    }
    else {
        displayNone('files_refresh_tft_usb_btn');
    }
    
    if ((preferenceslist[0].has_TFT_SD === 'true') || (preferenceslist[0].has_TFT_USB === 'true')){
        displayFlex('files_refresh_printer_sd_btn');
        displayNone('files_refresh_btn');
    } else {
        displayNone('files_refresh_printer_sd_btn');
        displayFlex('files_refresh_btn');
    }
    
    if (preferenceslist[0].enable_commands_panel === 'true') {
        displayFlex('commandsPanel');
        if (preferenceslist[0].enable_autoscroll === 'true') {
            id('monitor_enable_autoscroll').checked = true;
            Monitor_check_autoscroll();
        } else id('monitor_enable_autoscroll').checked = false;
    } else displayNone('commandsPanel');

    id('autoReportInterval').value = parseInt(preferenceslist[0].autoreport_interval);
    id('posInterval_check').value = parseInt(preferenceslist[0].interval_positions);
    id('statusInterval_check').value = parseInt(preferenceslist[0].interval_status);
    id('control_xy_velocity').value = parseInt(preferenceslist[0].xy_feedrate);
    id('control_z_velocity').value = parseInt(preferenceslist[0].z_feedrate);

    if (grblaxis > 2 )axis_Z_feedrate = parseInt(preferenceslist[0].z_feedrate);
    if (grblaxis > 3 )axis_A_feedrate = parseInt(preferenceslist[0].a_feedrate);
    if (grblaxis > 4 )axis_B_feedrate = parseInt(preferenceslist[0].b_feedrate);
    if (grblaxis > 5 )axis_C_feedrate = parseInt(preferenceslist[0].c_feedrate);
        
    if (grblaxis > 3 ){
        var letter = id('control_select_axis').value;
        switch(letter) {
            case "Z":
                id('control_z_velocity').value = axis_Z_feedrate;
                break;
            case "A":
                id('control_z_velocity').value = axis_A_feedrate;
                break;
            case "B":
                id('control_z_velocity').value = axis_B_feedrate;
                break;
            case "C":
                id('control_z_velocity').value = axis_C_feedrate;
                break;
            }
    }

    id('probemaxtravel').value = parseFloat(preferenceslist[0].probemaxtravel);
    id('probefeedrate').value = parseInt(preferenceslist[0].probefeedrate);
    id('proberetract').value = parseFloat(preferenceslist[0].proberetract);
    id('probetouchplatethickness').value = parseFloat(preferenceslist[0].probetouchplatethickness);
    build_file_filter_list(preferenceslist[0].f_filters);
}

function showpreferencesdlg() {
    var modal = setactiveModal('preferencesdlg.html');
    if (modal == null) return;
    language_save = language;
    build_dlg_preferences_list();
    displayNone('preferencesdlg_upload_msg');
    showModal();
}

function build_dlg_preferences_list() {
    //use preferenceslist to set dlg status
    var content = "<table><tr><td>";
    content += get_icon_svg("flag") + "&nbsp;</td><td>";
    content += build_language_list("language_preferences");
    content += "</td></tr></table>";
    id("preferences_langage_list").innerHTML = content;
    //camera
    if (typeof(preferenceslist[0].enable_camera) !== 'undefined') {
        id('show_camera_panel').checked = (preferenceslist[0].enable_camera === 'true');
    } else id('show_camera_panel').checked = false;
    //autoload camera
    if (typeof(preferenceslist[0].auto_load_camera) !== 'undefined') {
        id('autoload_camera_panel').checked = (preferenceslist[0].auto_load_camera === 'true');
    } else id('autoload_camera_panel').checked = false;
    //camera address
    if (typeof(preferenceslist[0].camera_address) !== 'undefined') {
        id('preferences_camera_webaddress').value = decode_entitie(preferenceslist[0].camera_address);
    } else id('preferences_camera_webaddress').value = "";
    //DHT
    if (typeof(preferenceslist[0].enable_DHT) !== 'undefined') {
        id('enable_DHT').checked = (preferenceslist[0].enable_DHT === 'true');
    } else id('enable_DHT').checked = false;
    //lock UI
    if (typeof(preferenceslist[0].enable_lock_UI) !== 'undefined') {
        id('enable_lock_UI').checked = (preferenceslist[0].enable_lock_UI === 'true');
    } else id('enable_lock_UI').checked = false;
    //Monitor connection
    if (typeof(preferenceslist[0].enable_ping) !== 'undefined') {
        id('enable_ping').checked = (preferenceslist[0].enable_ping === 'true');
    } else id('enable_ping').checked = false;

    //grbl panel
    if (typeof(preferenceslist[0].enable_grbl_panel) !== 'undefined') {
        id('show_grbl_panel').checked = (preferenceslist[0].enable_grbl_panel === 'true');
    } else id('show_grbl_panel').checked = false;
    //grbl probe panel
    if (typeof(preferenceslist[0].enable_grbl_probe_panel) !== 'undefined') {
        id('show_grbl_probe_tab').checked = (preferenceslist[0].enable_grbl_probe_panel === 'true');
    } else id('show_grbl_probe_tab').checked = false;
    //control panel
    if (typeof(preferenceslist[0].enable_control_panel) !== 'undefined') {
        id('show_control_panel').checked = (preferenceslist[0].enable_control_panel === 'true');
    } else id('show_control_panel').checked = false;
    //files panel
    if (typeof(preferenceslist[0].enable_files_panel) !== 'undefined') {
        id('show_files_panel').checked = (preferenceslist[0].enable_files_panel === 'true');
    } else id('show_files_panel').checked = false;
    //TFT SD
    if (typeof(preferenceslist[0].has_TFT_SD) !== 'undefined') {
        id('has_tft_sd').checked = (preferenceslist[0].has_TFT_SD === 'true');
    } else id('has_tft_sd').checked = false;
    //TFT USB
    if (typeof(preferenceslist[0].has_TFT_USB) !== 'undefined') {
        id('has_tft_usb').checked = (preferenceslist[0].has_TFT_USB === 'true');
    } else id('has_tft_usb').checked = false;
    //commands
    if (typeof(preferenceslist[0].enable_commands_panel) !== 'undefined') {
        id('show_commands_panel').checked = (preferenceslist[0].enable_commands_panel === 'true');
    } else id('show_commands_panel').checked = false;
    //autoreport interval
    if (typeof(preferenceslist[0].autoreport_interval) !== 'undefined') {
        id('preferences_autoReport_Interval').value = parseInt(preferenceslist[0].autoreport_interval);
    } else id('preferences_autoReport_Interval').value = parseInt(default_preferenceslist[0].autoreport_interval);
    //interval positions
    if (typeof(preferenceslist[0].interval_positions) !== 'undefined') {
        id('preferences_pos_Interval_check').value = parseInt(preferenceslist[0].interval_positions);
    } else id('preferences_pos_Interval_check').value = parseInt(default_preferenceslist[0].interval_positions);
    //interval status
    if (typeof(preferenceslist[0].interval_status) !== 'undefined') {
        id('preferences_status_Interval_check').value = parseInt(preferenceslist[0].interval_status);
    } else id('preferences_status_Interval_check').value = parseInt(default_preferenceslist[0].interval_status);
    //xy feedrate
    if (typeof(preferenceslist[0].xy_feedrate) !== 'undefined') {
        id('preferences_control_xy_velocity').value = parseInt(preferenceslist[0].xy_feedrate);
    } else id('preferences_control_xy_velocity').value = parseInt(default_preferenceslist[0].xy_feedrate);
    if (grblaxis > 2) {
        //z feedrate
        if (typeof(preferenceslist[0].z_feedrate) !== 'undefined') {
            id('preferences_control_z_velocity').value = parseInt(preferenceslist[0].z_feedrate);
        } else id('preferences_control_z_velocity').value = parseInt(default_preferenceslist[0].z_feedrate);
    }
    if (grblaxis > 3) {
        //a feedrate
        if (typeof(preferenceslist[0].a_feedrate) !== 'undefined') {
            id('preferences_control_a_velocity').value = parseInt(preferenceslist[0].a_feedrate);
        } else id('preferences_control_a_velocity').value = parseInt(default_preferenceslist[0].a_feedrate);
    }
    if (grblaxis > 4) {
        //b feedrate
        if (typeof(preferenceslist[0].b_feedrate) !== 'undefined') {
            id('preferences_control_b_velocity').value = parseInt(preferenceslist[0].b_feedrate);
        } else id('preferences_control_b_velocity').value = parseInt(default_preferenceslist[0].b_feedrate);
    }
    if (grblaxis > 5) {
        //c feedrate
        if (typeof(preferenceslist[0].c_feedrate) !== 'undefined') {
            id('preferences_control_c_velocity').value = parseInt(preferenceslist[0].c_feedrate);
        } else id('preferences_control_c_velocity').value = parseInt(default_preferenceslist[0].c_feedrate);
    }

    //probemaxtravel
    if ((typeof(preferenceslist[0].probemaxtravel) !== 'undefined') && (preferenceslist[0].probemaxtravel.length != 0)) {
        id('preferences_probemaxtravel').value = parseFloat(preferenceslist[0].probemaxtravel);
    } else {
        id('preferences_probemaxtravel').value = parseFloat(default_preferenceslist[0].probemaxtravel);
    }
    //probefeedrate
    if ((typeof(preferenceslist[0].probefeedrate) !== 'undefined') && (preferenceslist[0].probefeedrate.length != 0)) {
        id('preferences_probefeedrate').value = parseInt(preferenceslist[0].probefeedrate);
    } else id('preferences_probefeedrate').value = parseInt(default_preferenceslist[0].probefeedrate);
    //proberetract
    if ((typeof(preferenceslist[0].proberetract) !== 'undefined') && (preferenceslist[0].proberetract.length != 0)) {
        id('preferences_proberetract').value = parseFloat(preferenceslist[0].proberetract);
    } else id('preferences_proberetract').value = parseFloat(default_preferenceslist[0].proberetract);
    //probetouchplatethickness
    if ((typeof(preferenceslist[0].probetouchplatethickness) !== 'undefined') && (preferenceslist[0].probetouchplatethickness.length != 0)) {
        id('preferences_probetouchplatethickness').value = parseFloat(preferenceslist[0].probetouchplatethickness);
    } else id('preferences_probetouchplatethickness').value = parseFloat(default_preferenceslist[0].probetouchplatethickness);
    //autoscroll
    if (typeof(preferenceslist[0].enable_autoscroll) !== 'undefined') {
        id('preferences_autoscroll').checked = (preferenceslist[0].enable_autoscroll === 'true');
    } else id('preferences_autoscroll').checked = false;
    //Verbose Mode
    if (typeof(preferenceslist[0].enable_verbose_mode) !== 'undefined') {
        id('preferences_verbose_mode').checked = (preferenceslist[0].enable_verbose_mode === 'true');
    } else id('preferences_verbose_mode').checked = false;
    //file filters
    if (typeof(preferenceslist[0].f_filters) != 'undefined') {
        console.log("Use prefs filters");
        id('preferences_filters').value = preferenceslist[0].f_filters;
    } else {
        console.log("Use default filters");
        id('preferences_filters').value = String(default_preferenceslist[0].f_filters);
    }

    prefs_toggledisplay('show_camera_panel');
    prefs_toggledisplay('show_grbl_panel');
    prefs_toggledisplay('show_control_panel');
    prefs_toggledisplay('show_commands_panel');
    prefs_toggledisplay('show_files_panel');
    prefs_toggledisplay('show_grbl_probe_tab');
}

function closePreferencesDialog() {
    var modified = false;
    if (preferenceslist[0].length != 0) {
        //check dialog compare to global state
        if ((typeof(preferenceslist[0].language) === 'undefined') ||
            (typeof(preferenceslist[0].enable_camera) === 'undefined') ||
            (typeof(preferenceslist[0].auto_load_camera) === 'undefined') ||
            (typeof(preferenceslist[0].camera_address) === 'undefined') ||
            (typeof(preferenceslist[0].enable_DHT) === 'undefined') ||
            (typeof(preferenceslist[0].enable_lock_UI) === 'undefined') ||
            (typeof(preferenceslist[0].enable_ping) === 'undefined') ||
            (typeof(preferenceslist[0].enable_redundant) === 'undefined') ||
            (typeof(preferenceslist[0].enable_probe) === 'undefined') ||
            (typeof(preferenceslist[0].xy_feedrate) === 'undefined') ||
            (typeof(preferenceslist[0].z_feedrate) === 'undefined') ||
            (typeof(preferenceslist[0].e_feedrate) === 'undefined') ||
            (typeof(preferenceslist[0].e_distance) === 'undefined') ||
            (typeof(preferenceslist[0].enable_control_panel) === 'undefined') ||
            (typeof(preferenceslist[0].enable_grbl_panel) === 'undefined') ||
            (typeof(preferenceslist[0].enable_grbl_probe_panel) === 'undefined') ||
            (typeof(preferenceslist[0].probemaxtravel) === 'undefined') ||
            (typeof(preferenceslist[0].probefeedrate) === 'undefined') ||
            (typeof(preferenceslist[0].proberetract) === 'undefined') ||
            (typeof(preferenceslist[0].probetouchplatethickness) === 'undefined') ||
            (typeof(preferenceslist[0].enable_files_panel) === 'undefined') ||
            (typeof(preferenceslist[0].has_TFT_SD) === 'undefined') ||
            (typeof(preferenceslist[0].has_TFT_USB) === 'undefined') ||
            (typeof(preferenceslist[0].autoreport_interval) === 'undefined') ||
            (typeof(preferenceslist[0].interval_positions) === 'undefined') ||
            (typeof(preferenceslist[0].interval_status) === 'undefined') ||
            (typeof(preferenceslist[0].enable_autoscroll) === 'undefined') ||
            (typeof(preferenceslist[0].enable_verbose_mode) === 'undefined') ||
            (typeof(preferenceslist[0].enable_commands_panel) === 'undefined')) {
            modified = true;
        } else {
            //camera
            if (id('show_camera_panel').checked != (preferenceslist[0].enable_camera === 'true')) modified = true;
            //Autoload
            if (id('autoload_camera_panel').checked != (preferenceslist[0].auto_load_camera === 'true')) modified = true;
            //camera address
            if (id('preferences_camera_webaddress').value != decode_entitie(preferenceslist[0].camera_address)) modified = true;
            //DHT
            if (id('enable_DHT').checked != (preferenceslist[0].enable_DHT === 'true')) modified = true;
            //Lock UI
            if (id('enable_lock_UI').checked != (preferenceslist[0].enable_lock_UI === 'true')) modified = true;
            //Monitor connection
            if (id('enable_ping').checked != (preferenceslist[0].enable_ping === 'true')) modified = true;
            //probe
            if (id('enable_probe_controls').checked != (preferenceslist[0].enable_probe === 'true')) modified = true;
            //control panel
            if (id('show_control_panel').checked != (preferenceslist[0].enable_control_panel === 'true')) modified = true;
            //grbl panel
            if (id('show_grbl_panel').checked != (preferenceslist[0].enable_grbl_panel === 'true')) modified = true;
            //grbl probe panel
            if (id('show_grbl_probe_tab').checked != (preferenceslist[0].enable_grbl_probe_panel === 'true')) modified = true;
            //files panel
            if (id('show_files_panel').checked != (preferenceslist[0].enable_files_panel === 'true')) modified = true;
            //TFT SD
            if (id('has_tft_sd').checked != (preferenceslist[0].has_TFT_SD === 'true')) modified = true;
            //TFT USB
            if (id('has_tft_usb').checked != (preferenceslist[0].has_TFT_USB === 'true')) modified = true;
            //commands
            if (id('show_commands_panel').checked != (preferenceslist[0].enable_commands_panel === 'true')) modified = true;
            //interval positions
            if (id('preferences_autoReport_Interval').value != parseInt(preferenceslist[0].autoReport_interval)) modified = true;
            if (id('preferences_pos_Interval_check').value != parseInt(preferenceslist[0].interval_positions)) modified = true;
            //interval status
            if (id('preferences_status_Interval_check').value != parseInt(preferenceslist[0].interval_status)) modified = true;
            //xy feedrate
            if (id('preferences_control_xy_velocity').value != parseInt(preferenceslist[0].xy_feedrate)) modified = true;
            if (grblaxis > 2) {
                //z feedrate
                if (id('preferences_control_z_velocity').value != parseInt(preferenceslist[0].z_feedrate)) modified = true;
            }
            if (grblaxis > 3) {
                //a feedrate
                if (id('preferences_control_a_velocity').value != parseInt(preferenceslist[0].a_feedrate)) modified = true;
            }
            if (grblaxis > 4) {
                //b feedrate
                if (id('preferences_control_b_velocity').value != parseInt(preferenceslist[0].b_feedrate)) modified = true;
            }
            if (grblaxis > 5) {
                //c feedrate
                if (id('preferences_control_c_velocity').value != parseInt(preferenceslist[0].c_feedrate)) modified = true;
            }
        }
        //autoscroll
        if (id('preferences_autoscroll').checked != (preferenceslist[0].enable_autoscroll === 'true')) modified = true;
        //Verbose Mode
        if (id('preferences_verbose_mode').checked != (preferenceslist[0].enable_verbose_mode === 'true')) modified = true;
        //file filters
        if (id('preferences_filters').value != preferenceslist[0].f_filters) modified = true;
        //probemaxtravel
        if (id('preferences_probemaxtravel').value != parseFloat(preferenceslist[0].probemaxtravel)) modified = true;
        //probefeedrate
        if (id('preferences_probefeedrate').value != parseInt(preferenceslist[0].probefeedrate)) modified = true;
        //proberetract
        if (id('preferences_proberetract').value != parseFloat(preferenceslist[0].proberetract)) modified = true;
        //probetouchplatethickness
        if (id('preferences_probetouchplatethickness').value != parseFloat(preferenceslist[0].probetouchplatethickness)) modified = true;
    }

    if (language_save != language) modified = true;
    if (modified) {
        confirmdlg(translate_text_item("Data mofified"), translate_text_item("Do you want to save?"), process_preferencesCloseDialog)
    } else {
        closeModal('cancel');
    }
}

function process_preferencesCloseDialog(answer) {
    if (answer == 'no') {
        //console.log("Answer is no so exit");
        translate_text(language_save);
        closeModal('cancel');
    } else {
        // console.log("Answer is yes so let's save");
        SavePreferences();
    }
}

function SavePreferences(current_preferences) {
    if (http_communication_locked) {
        alertdlg(translate_text_item("Busy..."), translate_text_item("Communications are currently locked, please wait and retry."));
        return;
    }
    console.log("save prefs");
    if (((typeof(current_preferences) != 'undefined') && !current_preferences) || (typeof(current_preferences) == 'undefined')) {
        if (!Checkvalues("preferences_autoReport_Interval") ||
            !Checkvalues("preferences_pos_Interval_check") ||
            !Checkvalues("preferences_status_Interval_check") ||
            !Checkvalues("preferences_control_xy_velocity") ||
            !Checkvalues("preferences_filters") ||
            !Checkvalues("preferences_probemaxtravel") ||
            !Checkvalues("preferences_probefeedrate") ||
            !Checkvalues("preferences_proberetract") ||
            !Checkvalues("preferences_probetouchplatethickness")
        ) return;
        if (grblaxis > 2) {
            if(!Checkvalues("preferences_control_z_velocity")) return;
        }
        if( (grblaxis > 3) && (!Checkvalues("preferences_control_a_velocity"))) return;
        if( (grblaxis > 4) && (!Checkvalues("preferences_control_b_velocity"))) return;
        if( (grblaxis > 5) && (!Checkvalues("preferences_control_c_velocity"))) return;

        preferenceslist = [];
        var saveprefs = "[{\"language\":\"" + language;
        saveprefs += "\",\"enable_camera\":\"" + id('show_camera_panel').checked;
        saveprefs += "\",\"auto_load_camera\":\"" + id('autoload_camera_panel').checked;
        saveprefs += "\",\"camera_address\":\"" + HTMLEncode(id('preferences_camera_webaddress').value);
        saveprefs += "\",\"enable_DHT\":\"" + id('enable_DHT').checked;
        saveprefs += "\",\"enable_lock_UI\":\"" + id('enable_lock_UI').checked;
        saveprefs += "\",\"enable_ping\":\"" + id('enable_ping').checked;
        saveprefs += "\",\"enable_control_panel\":\"" + id('show_control_panel').checked;
        saveprefs += "\",\"enable_grbl_probe_panel\":\"" + id('show_grbl_probe_tab').checked;
        saveprefs += "\",\"enable_grbl_panel\":\"" + id('show_grbl_panel').checked;
        saveprefs += "\",\"enable_files_panel\":\"" + id('show_files_panel').checked;
        saveprefs += "\",\"has_TFT_SD\":\"" + id('has_tft_sd').checked;
        saveprefs += "\",\"has_TFT_USB\":\"" + id('has_tft_usb').checked;
        saveprefs += "\",\"probemaxtravel\":\"" + id('preferences_probemaxtravel').value;
        saveprefs += "\",\"probefeedrate\":\"" + id('preferences_probefeedrate').value;
        saveprefs += "\",\"proberetract\":\"" + id('preferences_proberetract').value;
        saveprefs += "\",\"probetouchplatethickness\":\"" + id('preferences_probetouchplatethickness').value;
        saveprefs += "\",\"autoreport_interval\":\"" + id('preferences_autoReport_Interval').value;
        saveprefs += "\",\"interval_positions\":\"" + id('preferences_pos_Interval_check').value;
        saveprefs += "\",\"interval_status\":\"" + id('preferences_status_Interval_check').value;
        saveprefs += "\",\"xy_feedrate\":\"" + id('preferences_control_xy_velocity').value;
        if (grblaxis > 2) {
            saveprefs += "\",\"z_feedrate\":\"" + id('preferences_control_z_velocity').value;
        }
        if (grblaxis > 3){
            saveprefs += "\",\"a_feedrate\":\"" + id('preferences_control_a_velocity').value;
        }
        if (grblaxis > 4){
            saveprefs += "\",\"b_feedrate\":\"" + id('preferences_control_b_velocity').value;
        }
        if (grblaxis > 5){
            saveprefs += "\",\"c_feedrate\":\"" + id('preferences_control_c_velocity').value;
        }

        saveprefs += "\",\"f_filters\":\"" + id('preferences_filters').value;
        saveprefs += "\",\"enable_autoscroll\":\"" + id('preferences_autoscroll').checked;
        saveprefs += "\",\"enable_verbose_mode\":\"" + id('preferences_verbose_mode').checked;
        saveprefs += "\",\"enable_commands_panel\":\"" + id('show_commands_panel').checked + "\"}]";
        preferenceslist = JSON.parse(saveprefs);
    }
    var blob = new Blob([JSON.stringify(preferenceslist, null, " ")], {
        type: 'application/json'
    });
    var file;
    if (browser_is("IE") || browser_is("Edge")) {
        file = blob;
        file.name = preferences_file_name;
        file.lastModifiedDate = new Date();
    } else file = new File([blob], preferences_file_name);
    var formData = new FormData();
    var url = "/files";
    formData.append('path', '/');
    formData.append('myfile[]', file, preferences_file_name);
    if ((typeof(current_preferences) != 'undefined') && current_preferences) SendFileHttp(url, formData);
    else SendFileHttp(url, formData, preferencesdlgUploadProgressDisplay, preferencesUploadsuccess, preferencesUploadfailed);
}

function preferencesdlgUploadProgressDisplay(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        id('preferencesdlg_prg').value = percentComplete;
        id('preferencesdlg_upload_percent').innerHTML = percentComplete.toFixed(0);
        displayBlock('preferencesdlg_upload_msg');
    } else {
        // Impossible because size is unknown
    }
}

function preferencesUploadsuccess(response) {
    displayNone('preferencesdlg_upload_msg');
    applypreferenceslist();
    closeModal('ok');
}

function preferencesUploadfailed(errorcode, response) {
    alertdlg(translate_text_item("Error"), translate_text_item("Save preferences failed!"));
}


function Checkvalues(id_2_check) {
    var status = true;
    var value = 0;
    switch (id_2_check) {
        case "preferences_autoReport_Interval":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 50 && value <= 30000)) {
                error_message = translate_text_item("Value of auto-report must be between 50ms and 30000ms !!");
                status = false;
            }
            break;
        case "preferences_status_Interval_check":
        case "preferences_pos_Interval_check":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 100)) {
                error_message = translate_text_item("Value of auto-check must be between 0s and 99s !!");
                status = false;
            }
            break;
        case "preferences_control_xy_velocity":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("XY Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
        case "preferences_control_z_velocity":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("Z Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
        case "preferences_control_a_velocity":
        case "preferences_control_b_velocity":
        case "preferences_control_c_velocity":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("Axis Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
        case "preferences_probefeedrate":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of probe feedrate must be between 1 mm/min and 9999 mm/min !");
                status = false;
            }
            break;
        case "preferences_probemaxtravel":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of maximum probe travel must be between 1 mm and 9999 mm !");
                status = false;
            }
            break;
        case "preferences_proberetract":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 0 && value <= 9999)) {
                error_message = translate_text_item("Value of probe retract must be between 0 mm and 9999 mm !");
                status = false;
            }
            break;
        case "preferences_probetouchplatethickness":
            value = parseInt(id(id_2_check).value);
            if (!(!isNaN(value) && value >= 0 && value <= 9999)) {
                error_message = translate_text_item("Value of probe touch plate thickness must be between 0 mm and 9999 mm !");
                status = false;
            }
            break;
        case "preferences_filters":
            //TODO a regex would be better
            value = id(id_2_check).value;
            if ((value.indexOf(".") != -1) ||
                (value.indexOf("*") != -1)) {
                error_message = translate_text_item("Only alphanumeric chars separated by ; for extensions filters");
                status = false;
            }
            break;
    }
    if (status) {
        id(id_2_check + "_group").classList.remove("has-feedback");
        id(id_2_check + "_group").classList.remove("has-error");
        id(id_2_check + "_icon").innerHTML = "";
    } else {
        // has-feedback hides the value so it is hard to fix it
        // id(id_2_check + "_group").classList.add("has-feedback");
        id(id_2_check + "_group").classList.add("has-error");
        // id(id_2_check + "_icon").innerHTML = get_icon_svg("remove");
        alertdlg(translate_text_item("Out of range"), error_message);
    }
    return status;
}
>>>>>>> upstream/revamp
