function OpenGeneralMessageModal(message) {
    document.querySelector("#pMessageText").innerHTML = message;
    let elem = document.querySelector("#modal-general-message")
    var instance = M.Modal.getInstance(elem);
    instance.open();
}

function OpenDropDownParameters(){
  let elem = document.querySelector("#dropdown1")
  var instance = M.Dropdown.getInstance(elem);
  instance.open();
}
function OpenDropDownCount(){
  let elem = document.querySelector("#dropdown2")
  var instance = M.Dropdown.getInstance(elem);
  instance.open();
}
