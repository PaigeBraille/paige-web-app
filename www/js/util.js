function id(name) {
    return document.getElementById(name);
}
// The return value from class(name) can be use with forEach()
function classes(name) {
    return Array.from(document.getElementsByClassName(name));
}
function setValue(name, val) {
    id(name).value = val;
}
function getValue(name, val) {
    return id(name).value;
}
function intValue(name) {
    return parseInt(getValue(name));
}
function getTextContent(name, val) {
    return id(name).textContent;
}
function setTextContent(name, val) {
    id(name).textContent = val;
}
function setHTML(name, val) {
    id(name).innerHTML = val;
}
function setText(name, val) {
    id(name).innerText = val;
}
function getText(name) {
    return id(name).innerText;
}
function setDisplay(name, val) {
    id(name).style.display = val;
}
function displayNone(name) {
    setDisplay(name, 'none');
}
function displayBlock(name) {
    setDisplay(name, 'block');
}
function displayFlex(name) {
    setDisplay(name, 'flex');
}
function displayTable(name) {
    setDisplay(name, 'table-row');
}
function displayInline(name) {
    setDisplay(name, 'inline');
}
function displayInitial(name) {
    setDisplay(name, 'initial');
}
function displayUndoNone(name) {
    setDisplay(name, '');
}
function setVisible(name) {
    id('SPIFFS_loader').style.visibility = 'visible';
}
function setHidden(name) {
    id('SPIFFS_loader').style.visibility = 'hidden';
}
function setDisabled(name, value) {
    id(name).disabled = value;
}
function selectDisabled(selector, value) {
    document.querySelectorAll(selector).forEach(
        function (element) {
            element.disabled = value;
        }
    )
}
function click(name) {
    id(name).click();
}
function files(name) {
    return id(name).files;
}
function setChecked(name, val) {
    id(name).checked = val;
}
function getChecked(name) {
    return id(name).checked;
}
