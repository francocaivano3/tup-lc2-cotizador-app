let botonEnviar = document.getElementById("boton-enviar");

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    mandarEmail();
});

function mandarEmail(){
        let parametros = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    }
    const serviceId = "service_i4fujln";
    
    const templateId = "template_82f86sw";
    
    emailjs.send(serviceId, templateId, parametros)
    .then(
        res =>{
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            msg(true);
        })
    
    .catch((err) => msg(false));
}

function msg(bool) {
    if(bool == false){
        Swal.fire({
      title: "Error!",
      text: "Error al enviar el mensaje",
      icon: "error",
      iconColor: "#ec3545",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#27a545",
      background: "#111111",
      color: "white",
    });
    } else {
        Swal.fire({
            title: "Enviado!",
            text: "El mensaje se ha enviado correctamente",
            icon: "success",
            iconColor: "green",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#27a545",
            background: "#111111",
            color: "white",
          });
    }
    
  }
  