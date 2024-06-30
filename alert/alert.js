
  document.addEventListener("DOMContentLoaded", function() {
    let boton = document.getElementById("boton");

    if (boton) {
        boton.addEventListener("click", function() {
            Swal.fire({
                title: 'Error!',
                text: '¿Deseas continuar?',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        });
    }
});

let check = document.getElementById("check")
check.addEventListener("change", function(){
    if(check.checked){
        alert("hola")
    }else{
        alert("chau")
    }
})