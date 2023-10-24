//UIdisabled dialog
function UIdisableddlg(lostcon) {
    var modal = setactiveModal('UIdisableddlg.html');
    if (modal == null) return;
    if (lostcon) {
        id('disconnection_msg').innerHTML = translate_text_item("Connection lost for more than 20s");
    }
    showModal();
}