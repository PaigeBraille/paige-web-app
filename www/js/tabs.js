<<<<<<< HEAD
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
=======
function opentab(evt, tabname, tabcontentid, tablinkid) {
    var i, tabcontent, tablinks;
    tabcontent = classes("tabcontent");
    const activateEvent = new Event("activate");
    const deactivateEvent = new Event("deactivate");

    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].parentNode.id == tabcontentid) {
            tabcontent[i].dispatchEvent(deactivateEvent);
            tabcontent[i].style.display = "none";
        }
    }
    tablinks = classes("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].parentNode.id == tablinkid) {
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }
    }
    id(tabname).dispatchEvent(activateEvent);
    displayBlock(tabname);
    evt.currentTarget.className += " active";
}
>>>>>>> upstream/revamp
