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
          tabla.innerHTML += `<tr class="eliminar">
                  <td></td>
                  <td class="${dato.fechaActualizacion}">${dato.nombre}</td>
                  <td class="td-numeros-compra">$${dato.compra}</td>
                  <td class="td-numeros">$${dato.venta}</td>
                  <td class="goma"> <button onclick="eliminar(this)"><i class="fas fa-eraser"></i></button></td>
                  </tr>`
        } else {
          cotizacion = `nv`
          tabla.innerHTML += `<tr id="fecha"> <td class="fecha escrita" colspan="5">${fecha}</td></tr>`
          tabla.innerHTML += `<tr class="eliminar">
                  <td></td>
                  <td class="${dato.fechaActualizacion}">${dato.nombre}</td>
                  <td class="td-numeros-compra">$${dato.compra}</td>
                  <td class="td-numeros">$${dato.venta}</td>
                  <td class="goma"> <button onclick="eliminar(this)"><i class="fas fa-eraser"></i></button></td>
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

function eliminar(btn) {
  let arrayMonedas = []
  let monedaEliminada = btn.parentNode.parentNode
  for (dato of datosLS) { arrayMonedas.push(dato) }
  
  // if (btn.parentNode.parentNode.previousSibling.id == "fecha" && btn.parentNode.parentNode.previousSibling.class == "eliminar") {
  //   btn.parentNode.parentNode.previousSibling.remove();
  //   monedaEliminada.remove();
  //   console.log("sd")
  //   eliminarMoneda(arrayMonedas, btn);}
  if (btn.parentNode.parentNode.nextSibling == null) {
    btn.parentNode.parentNode.previousSibling.remove();
    monedaEliminada.remove();
    eliminarMoneda(arrayMonedas, btn);
  }else if (btn.parentNode.parentNode.previousSibling.id == "fecha" && btn.parentNode.parentNode.nextSibling.id == "fecha") {
    btn.parentNode.parentNode.previousSibling.remove();
    monedaEliminada.remove();
    eliminarMoneda(arrayMonedas, btn);
  }else {
    monedaEliminada.remove();
    eliminarMoneda(arrayMonedas, btn);
  }
}

function eliminarMoneda(arrayMonedas, btn) {
  console.log("a")
  for (let i = 0; i < arrayMonedas.length; i++) {
      if (arrayMonedas[i].fechaActualizacion === btn.parentNode.previousSibling.previousSibling.previousSibling.class) {
        datosLS = datosLS.filter(function (elemento) {
          return !(
            elemento.nombre === arrayMonedas[i].nombre &&
            elemento.compra === arrayMonedas[i].compra &&
            elemento.venta === arrayMonedas[i].venta &&
            elemento.fechaActualizacion === arrObjMonedas[i].fechaActualizacion
          );
        });
        break;
      }
    }
  ls.setItem("favoritos", JSON.stringify(datosLS));
}