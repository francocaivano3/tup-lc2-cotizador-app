const ls = localStorage
let datoLS = JSON.parse(ls.getItem("favoritos")) || [];
const tabla = document.getElementById("table-body");
let fecha = today;
let fechaCotizacion = ``;

window.addEventListener("load", function () {
  if (datoLS.length > 0) {

 
    

  } else {
    Swal.fire({
     title: "Advertencia",
     color:"#cccccc",
    text: "No tienes cotizaciones favoritas",
    icon: "warning",
    iconColor:"#eabe3f",
    showCancelButton: false,
    confirmButtonColor: "#27a545",
    background: "#111111",
    confirmButtonText: "Aceptar"
  })
  }
})

function cargarDatos() {
  for (dato of datosLs) {
      if (dato.fechaActualizacion == fecha) {
        if (fechaCotizacion) {
          fechaCotizacion = `${fecha}`
          tabla.innerHTML = `<tr> <td class="fecha escrita" colspan="5">${fechaCotizacion}</td></tr>
                             <tr>coso</tr> `
        } else {
          //cargar elementos
        }
    }
  }
}

/*  

array acumula objetos de una fecha especifica




*/