function opentab(evt, tabname, tabcontentid, tablinkid, activeid) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].parentNode.id == tabcontentid) {
            tabcontent[i].style.display = "none";
        }
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = "tablinks";
    }
    document.getElementById(tabname).style.display = "block";
    if (activeid) {
        document.getElementById(activeid).className += " active";
    } else {
        evt.currentTarget.className += " active";
    }
    setIcons(tabname);
}

function openPaigeTab() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].parentNode.id == "mainuitabscontent") {
            tabcontent[i].style.display = "none";
        }
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = "tablinks";
    }
    document.getElementById("paigetab").style.display = "block";
    document.getElementById("paigetablink").className += " active";
    setIcons("paigetab");
    // Change focus to #paigetab element
    document.getElementById("paigetab").focus();
}

function setIcons(tabName) {
    switch (tabName) {
        case 'paigetab':
            document.getElementById("paige-off-icon").style.display = "none";
            document.getElementById("paige-on-icon").style.display = "flex";

            document.getElementById("files-off-icon").style.display = "flex";
            document.getElementById("files-on-icon").style.display = "none";

            document.getElementById("settings-off-icon").style.display = "flex";
            document.getElementById("settings-on-icon").style.display = "none";
            break;
        case 'maintab':
            files_refreshFiles(files_currentPath);

            document.getElementById("paige-off-icon").style.display = "flex";
            document.getElementById("paige-on-icon").style.display = "none";

            document.getElementById("files-off-icon").style.display = "none";
            document.getElementById("files-on-icon").style.display = "flex";

            document.getElementById("settings-off-icon").style.display = "flex";
            document.getElementById("settings-on-icon").style.display = "none";
            break;
        case 'settingstab':
            refreshSettings(current_setting_filter);
            
            document.getElementById("paige-off-icon").style.display = "flex";
            document.getElementById("paige-on-icon").style.display = "none";

            document.getElementById("files-off-icon").style.display = "flex";
            document.getElementById("files-on-icon").style.display = "none";

            document.getElementById("settings-off-icon").style.display = "none";
            document.getElementById("settings-on-icon").style.display = "flex";
            break;
        default:
            break;
    }
}
