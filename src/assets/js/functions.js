function OpenGeneralMessageModal(message) {
    document.querySelector("#pMessageText").innerHTML = message;
    let elem = document.querySelector("#modal-general-message");
    var instance = M.Modal.getInstance(elem);
    instance.open();
}

function OpenDropDownParameters(){
  let elem = document.querySelector("#dropdown1")
  var instance = M.Dropdown.getInstance(elem);
 
}
function OpenDropDownCount(){
  let elem = document.querySelector("#dropdown2")
  var instance = M.Dropdown.getInstance(elem);
  
}


function Carousel(){
  console.log("hola carrusel")
  let elem = document.querySelector("#carousel")
  
}
function initSelect(){
  
  var instance = M.FormSelect.getInstance(elem);
  
}

