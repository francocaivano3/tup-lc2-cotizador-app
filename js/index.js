let selector = document.querySelector(".selector");
let pizarra = document.getElementById("pizarra");
let horaActualizacion = document.getElementById("parrafo");

async function obtenerCotizaciones() {
  for (i = 1; i < links.length; i++) {
    try {
      respuesta = await fetch(links[i]);
      if (respuesta.ok) {
        const data = await respuesta.json();
        pizarraInicio(data);
      } else {
        alert("error");
      }
    } catch {
      alert("errorsito");
    }
  }
}
localStorage.setItem("theme", "dark")
console.log(localStorage.getItem("theme"))
const links = [
  "https://dolarapi.com/v1/dolares",
  "https://dolarapi.com/v1/dolares/oficial",
  "https://dolarapi.com/v1/dolares/blue",
  "https://dolarapi.com/v1/dolares/bolsa",
  "https://dolarapi.com/v1/dolares/contadoconliqui",
  "https://dolarapi.com/v1/dolares/tarjeta",
  "https://dolarapi.com/v1/dolares/mayorista",
  "https://dolarapi.com/v1/dolares/cripto",
  "https://dolarapi.com/v1/cotizaciones/eur",
  "https://dolarapi.com/v1/cotizaciones/brl",
  "https://dolarapi.com/v1/cotizaciones/clp",
  "https://dolarapi.com/v1/cotizaciones/uyu",
];
document.addEventListener("DOMContentLoaded", function () {
  obtenerCotizaciones();
});

// fetch(links[i])
//     .then((response) => response.json())
//     .then((data) => pizarraInicio(data))

selector.addEventListener("change", function () {
  switch (selector.value) {
    case "0":
      ruta = links[0];
      break;
    case "1":
      ruta = links[1];
      break;
    case "2":
      ruta = links[2];
      break;
    case "3":
      ruta = links[3];
      break;
    case "4":
      ruta = links[4];
      break;
    case "5":
      ruta = links[5];
      break;
    case "6":
      ruta = links[6];
      break;
    case "7":
      ruta = links[7];
      break;
    case "8":
      ruta = links[8];
      break;
    case "9":
      ruta = links[9];
      break;
    case "10":
      ruta = links[10];
      break;
    case "11":
      ruta = links[11];
      break;
    default:
      ruta = links[0];
      break;
  }
  actualizarPizarra(ruta);
  // fetch(ruta)
  //   .then((response) => response.json())
  //   .then((data) => actualizarPizarra(data));
});

async function actualizarPizarra(ruta) {
  try {
    respuesta = await fetch(ruta);
    if (respuesta.ok) {
      const data = await respuesta.json();
      if (Array.isArray(data)) {
        pizarra.innerHTML = "";
        for (i = 0; i < data.length; i++) {
          horaActualizada(data[i]);
          pizarra.innerHTML += `
      <article class="moneda">
      <p class="title-article-moneda">${data[i].nombre.toUpperCase()}</p>
      <img src="./img/united-states.png" class = "bandera">
            <div class="precio">
              <div class="precio-compra">
                <p>COMPRA</p>
              <p>$${data[i].compra}</p>
              </div>
              <div class="precio-venta">
                <p>VENTA</p>
              <p>$${data[i].venta}</p>
              </div>
              </div>
          <input type="checkbox" id="star-checkbox-${
            data[i].nombre
          }" class="input-star-checkbox"><label for="star-checkbox-${
            data[i].nombre
          }" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
      `;
        }
      } else {
        pizarra.style.maxHeight = "45vh";
        horaActualizada(data);
        pizarra.innerHTML = `
  <article class="moneda">
 <p class="title-article-moneda">${data.nombre.toUpperCase()}</p>
  <img src="${devolverBandera(data)}" class = "bandera">
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
          }" class="input-star-checkbox"><label for="star-checkbox-${
          data.nombre
        }" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
  `;
      }
    } else {
      alert("error");
    }
  } catch {
    alert("error");
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

function pizarraInicio(data) {
  horaActualizada(data);
  pizarra.innerHTML += `
  <article class="moneda">
 <p class="title-article-moneda">${data.nombre.toUpperCase()}</p>
  <img src="${devolverBandera(data)}" class = "bandera">
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
          }" class="input-star-checkbox"><label for="star-checkbox-${
    data.nombre
  }" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
  `;
}

function horaActualizada(data) {
  const opciones = {
    hour: "2-digit",
    minute: "2-digit",
  };

  let hora = new Date(data.fechaActualizacion).toLocaleString(
    "es-ES",
    opciones
  );

  horaActualizacion.innerHTML = `Datos actualizados a las ${hora} hs`;
}
