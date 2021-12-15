function OpenGeneralMessageModal(message) {
    document.querySelector("#pMessageText").innerHTML = message;
<<<<<<< HEAD
    let elem = document.querySelector("#modal-general-message");
=======
    let elem = document.querySelector("#modal-general-message")
>>>>>>> main
    var instance = M.Modal.getInstance(elem);
    instance.open();
}