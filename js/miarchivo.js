const ls = localStorage
let datosLS = JSON.parse(ls.getItem("favoritos")) || [];
const tabla = document.getElementById("table-body");
let fechas = [];
let fechaSinDuplicados = [];
let cotizacion = ``;
const opciones = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
};

window.addEventListener("load", function () {
  if (datosLS.length > 0) {
    cargarDatos();
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
  cargarFecha()
  fechaSinDuplicados = [...new Set(fechas)];
  for (fecha of fechaSinDuplicados) {
    for (dato of datosLS) {
      let fechaDato = new Date(dato.fechaActualizacion);
      let fechaFormateada = fechaDato.toLocaleDateString("es-ES", opciones);
      if (fecha == fechaFormateada) {
        if (cotizacion) {
          tabla.innerHTML += `<tr>
                  <td></td>
                  <td>${dato.nombre}</td>
                  <td class="td-numeros-compra">$${dato.compra}</td>
                  <td class="td-numeros">$${dato.venta}</td>
                  <td class="goma"> <button><i class="fas fa-eraser"></i></button></td>
                  </tr>`
        } else {
          cotizacion = `nv`
          tabla.innerHTML += `<tr> <td class="fecha escrita" colspan="5">${fecha}</td></tr>`
          tabla.innerHTML += `<tr>
                  <td></td>
                  <td>${dato.nombre}</td>
                  <td class="td-numeros-compra">$${dato.compra}</td>
                  <td class="td-numeros">$${dato.venta}</td>
                  <td class="goma"> <button><i class="fas fa-eraser"></i></button></td>
                  </tr>`
      }
      }
    }
    cotizacion = ``
  }
}

function cargarFecha() {
  datosLS.sort((a, b) => {
    if (a.nombre < b.nombre) {
        return -1;
    }
    if (a.nombre > b.nombre) {
        return 1;
    }

    const fechaA = new Date(a.fechaActualizacion);
    const fechaB = new Date(b.fechaActualizacion);

    return fechaB - fechaA; 
  });

  for (dato of datosLS) {
    let fecha = new Date(dato.fechaActualizacion);
    let fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    fechas.push(fechaFormateada);
  
  }
}

