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
            alert("El mail se ha enviado correctamente!")
        })
    
    .catch((err) => console.log(err));
}




