var active_wizard_page = 0;

var end_content = "Setup is finished. After closing, you will still be able to change or to fine tune your settings in main interface anytime. You may need to restart the board to apply the new settings and connect again.";

function continue_setup_wizard() {
    active_wizard_page++;
    switch (active_wizard_page) {
        case 1:
            enablestep1();
            break;
        case 2:
            enablestep2();
            break;
        case 3:
            enablestep3();
            break;
        case 4:
            closeModal('ok')
            break;
        default:
            console.log("wizard page out of range");
    }
}

function setupdone(response) {
    setup_is_done = true;
    do_not_build_settings = false;
    build_HTML_setting_list(current_setting_filter);
    document.getElementById('main_ui').style.display = 'flex';
    closeModal("setup done");
    SendHomeCommand();
    document.getElementById("main_ui").style.display = "flex";
    // If demo, change to demo settings
    if (IS_UI_DEMO) {
        initDemo();
    }
    // Default to Paige tab
    if (!USES_PAIGE_DISPLAY) {
        document.getElementById("braille-pagination").style.display = "none";
        document.getElementById("pagination-text").style.display = "none";
    }
    openPaigeTab();
}

function setupdlg() {
    setup_is_done = false;
    document.getElementById('main_ui').style.display = 'none';
    document.getElementById('settings_list_data').innerHTML = "";
    setactiveModal('setupdlg.html', setupdone);
    document.getElementById("startsteplink").style.color = "var(--paige-blue)";
    showModal();
}

function enableStep( title, components, buttonTitle) {
    var content = "<h4>" + title + "</h4><hr>";
    document.getElementById("wizard_button").innerHTML = buttonTitle;
    content += components;
    document.getElementById("stepcontent").innerHTML = content;
}

function enablestep1() {
    document.getElementById("step1link").style.color = "var(--paige-blue)";
    var content = settingsComponentsToTable(getComponentsForKeywords(["hostname"]));
    enableStep("What's your name?", content, "Continue");
}

function enablestep2() {
    document.getElementById("step2link").style.color = "var(--paige-blue)";
    var content = settingsComponentsToTable(getComponentsForKeywords(["wi-fi", "wifi"]));
    enableStep("I need a Wi-Fi connection to work. Please enter your details below.", content, "Continue");
}

function enablestep3() {
    document.getElementById("endsteplink").style.color = "var(--paige-blue)";
    enableStep("Nearly there! I am now going to restart.", end_content, "Finish setup");
}

function getComponentsForKeywords(keywords) {
    var components = getSettingsTableComponents(current_setting_filter);
    // Return components where component.label lowercased contains keywords
    return components.filter(function (component) {
        return keywords.some(function (keyword) {
            return component.label.toLowerCase().includes(keyword.toLowerCase());
        });
    });
}

function settingsComponentsToTable(components) {
    var content = "<table>";
    for (var i = 0; i < components.length; i++) {
        content += "<tr>";
        content += "<td style='vertical-align:middle' id='label_" +  components[i].form_idx + "'>";
        content += components[i].label;
        content += "</td>";
        content += components[i].control;
        content += "</tr>\n";
    }
    content += "</table>";
    return content;
}