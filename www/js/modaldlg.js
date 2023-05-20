// Create the modal
var listmodal = [];

var focusedElementBeforeModal;

function setactiveModal(html_template, closefunc) {
    if (typeof document.getElementById(html_template) === 'undefined') {
        console.log("Error: no " + html_template);
        return null;
    }
    var modal = new Object;
    modal.element = document.getElementById(html_template);
    modal.id = listmodal.length;
    modal.name = html_template;
    if (typeof closefunc !== 'undefined') modal.closefn = closefunc;
    else modal.closefn = myfnclose;
    listmodal.push(modal)
    //console.log("Creation of modal  " +  modal.name + " with ID " +modal.id);
    return listmodal[listmodal.length - 1];;
}

function getactiveModal() {
    if (listmodal.length > 0) {
        return listmodal[listmodal.length - 1];
    } else return null;
}

// open the modal 
function showModal() {
    var currentmodal = getactiveModal();
    currentmodal.element.style.display = "block";
    focusedElementBeforeModal = document.activeElement;
    document.getElementById(currentmodal.element.id).focus();
}

// When the user clicks on <span> (x), close the modal
function closeModal(response) {
    var currentmodal = getactiveModal();
    if (currentmodal != null) {
        currentmodal.element.style.display = "none";
        var closefn = currentmodal.closefn;
        listmodal.pop();
        delete currentmodal;
        currentmodal = getactiveModal();
        if (focusedElementBeforeModal) {
            focusedElementBeforeModal.focus();
        }
        closefn(response);
    }
}
//default close function
function myfnclose(value) {
    //console.log("modale closed: " + value);
}

function handleCloseKeydown(event) {
    if (event.key === "Enter") {
        closeModal();
    }
}