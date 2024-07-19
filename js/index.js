const selector = document.querySelector(".selector");
const pizarra = document.getElementById("pizarra");
const contenedorMainBarra = document.querySelector(".container");
const horaActualizacion = document.getElementById("parrafo");
const ls = localStorage;
let monedas = [];
let favoritos = JSON.parse(ls.getItem("favoritos")) || [];
let arrObjMonedas = [];


const links = {
  oficial: "https://dolarapi.com/v1/dolares/oficial",
  blue: "https://dolarapi.com/v1/dolares/blue",
  bolsa: "https://dolarapi.com/v1/dolares/bolsa",
  ccl: "https://dolarapi.com/v1/dolares/contadoconliqui",
  tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  mayorista: "https://dolarapi.com/v1/dolares/mayorista",
  cripto: "https://dolarapi.com/v1/dolares/cripto",
  euro: "https://dolarapi.com/v1/cotizaciones/eur",
  real: "https://dolarapi.com/v1/cotizaciones/brl",
  chileno: "https://dolarapi.com/v1/cotizaciones/clp",
  uruguayo: "https://dolarapi.com/v1/cotizaciones/uyu",
};

function msgError() {
  Swal.fire({
    title: "Error!",
    text: "Error al cargar la API",
    icon: "error",
    iconColor: "#ec3545",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#27a545",
    background: "#111111",
    color: "white",
  });
}

window.addEventListener("load", function () {
  obtenerCotizaciones(links);
});

async function obtenerCotizaciones(links) {
  for (const link of Object.values(links)) {
    try {
      respuesta = await fetch(link);
      if (respuesta.ok) {
        const data = await respuesta.json();
        monedas.push(data);
        pizarraInicio(data);
      } else {
        msgError();
      }
    } catch (error) {
      msgError();
    }
  }
  validarFavoritos();
}

selector.addEventListener("change", function (event) {
  const monedaSeleccionada = event.target.value;
  pizarra.innerHTML = "";
  if (monedaSeleccionada === "monedas") {
    for (const moneda of monedas) {
      pizarraInicio(moneda);
    }
  } else {
    for (const moneda of monedas) {
      if (moneda.nombre === monedaSeleccionada) {
        pizarraInicio(moneda);
        pizarra.style.height = "45vh";
        pizarra.style.width = "auto";
        break;
      }
    }
  }

  validarFavoritos();
});

function validarFavoritos() {
  if (favoritos.length > 0) {
    for (let i = 0; i < arrObjMonedas.length; i++) {
      for (let favorito of favoritos) {
        if (
          arrObjMonedas[i].nombre === favorito.nombre &&
          arrObjMonedas[i].compra === favorito.compra &&
          arrObjMonedas[i].venta === favorito.venta &&
          arrObjMonedas[i].fechaActualizacion === favorito.fechaActualizacion
        ) {
          const estrellas = document.querySelectorAll(".input-star-checkbox");
          estrellas[i].checked = true;
        }
      }
    }
  }
}

function pizarraInicio(data) {
  horaActualizada();
  pizarra.innerHTML += `
  <article class="moneda" id="moneda-${data.nombre}">
  <p class="title-article-moneda">${data.nombre.toUpperCase()}</p>
  <img src="${devolverBandera(data)}" class="bandera">
  <div class="precio">
  <div class="precio-compra">
  <p>COMPRA</p>
  <p>$${data.compra}</p>
  </div>
  <div class="precio-venta">
  <p>VENTA</p>
  <p>$${data.venta}</p>
  </div>
              </div>
          <input type="checkbox" id="star-checkbox-${
            data.nombre
          }" class="input-star-checkbox" onclick="checkeado(this)"><label for="star-checkbox-${
    data.nombre
  }" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>`;

  arrObjMonedas.push(data);
}

function checkeado(e) {
  if (e.checked) {
    for (let i = 0; i < arrObjMonedas.length; i++) {
      if (arrObjMonedas[i].nombre === e.id.split("-")[2]) {
        const favorito = {
          nombre: arrObjMonedas[i].nombre,
          compra: arrObjMonedas[i].compra,
          venta: arrObjMonedas[i].venta,
          fechaActualizacion: arrObjMonedas[i].fechaActualizacion,
        };
        favoritos.push(favorito);
        ls.setItem("favoritos", JSON.stringify(favoritos));
        break;
      }
    }
  } else {
    for (let i = 0; i < arrObjMonedas.length; i++) {
      if (arrObjMonedas[i].nombre === e.id.split("-")[2]) {
        favoritos = favoritos.filter(function (elemento) {
          return !(
            elemento.nombre === arrObjMonedas[i].nombre &&
            elemento.compra === arrObjMonedas[i].compra &&
            elemento.venta === arrObjMonedas[i].venta &&
            elemento.fechaActualizacion === arrObjMonedas[i].fechaActualizacion
          );
        });
        break;
      }
    }
    ls.setItem("favoritos", JSON.stringify(favoritos));
  }
}



function devolverBandera(data) {
  let bandera;

  switch (data.moneda) {
    case "USD":
      bandera = "./img/united-states.png";
      break;
    case "EUR":
      bandera = "./img/european-union.png";
      break;
    case "BRL":
      bandera = "./img/brasil.png";
      break;
    case "CLP":
      bandera = "./img/chile.png";
      break;
    case "UYU":
      bandera = "./img/uruguay.png";
      break;
    default:
      console.log("error");
      break;
  }

  return bandera;
}

function horaActualizada() {
  const opciones = {
    hour: "2-digit",
    minute: "2-digit",
  };

  let hora = new Date().toLocaleString("es-ES", opciones);

  horaActualizacion.innerHTML = `Datos actualizados a las ${hora} hs`;
}


setInterval(() => {
  pizarra.innerHTML = "";
  obtenerCotizaciones(links);
}, 300000);

