const selector = document.querySelector(".selector");
const pizarra = document.getElementById("pizarra");
const horaActualizacion = document.getElementById("parrafo");
const ls = localStorage;
let monedas = [];
let dato;
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

async function api(n) {
  try {
    respuesta = await fetch(links[n]);
    if (respuesta.ok) {
      const data = await respuesta.json();
      return data;
    }
  } catch {
    msgError();
  }
}

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

async function obtenerCotizaciones() {
  for (let i = 1; i < links.length; i++) {
    try {
      respuesta = await fetch(links[i]);
      if (respuesta.ok) {
        const data = await respuesta.json();
        pizarraInicio(data);
      } else {
        msgError();
      }
    } catch (error) {
      msgError();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  obtenerCotizaciones();
  setInterval(() => {
    pizarra.innerHTML = "";
    obtenerCotizaciones();
  }, 300000);
});

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
          }" class="input-star-checkbox"><label for="star-checkbox-${
    data.nombre
  }" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
  `;
  let datos;
  const checkboxes = document.getElementsByClassName("input-star-checkbox");
  Array.from(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("change", async function () {
      if (checkbox.checked) {
        switch (checkbox.id) {
          case "star-checkbox-Oficial":
            datos = await api(1);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Blue":
            datos = await api(2);
            monedas.push(JSON.stringify(datos));
            console.log(monedas);
            console.log(JSON.parse(monedas[0]));
            break;
          case "star-checkbox-Bolsa":
            datos = await api(3);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Contado con liquidación":
            datos = await api(4);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Tarjeta":
            datos = await api(5);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Mayorista":
            datos = await api(6);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Cripto":
            datos = await api(7);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Euro":
            datos = await api(8);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Real Brasileño":
            datos = await api(9);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Peso Chileno":
            datos = await api(10);
            monedas.push(JSON.stringify(datos));
            break;
          case "star-checkbox-Peso Uruguayo":
            datos = await api(11);
            monedas.push(JSON.stringify(datos));
            break;
        }
        ls.setItem("favoritos", monedas);
        // console.log(ls.getItem("favoritos"));
        let fav = ls.getItem("favoritos");
        fav.split(" ")
        console.log(fav)
        console.log(JSON.parse(fav))
      } else {
        // copiaArray = JSON.parse(ls.getItem("favoritos"));

      }
    });
  });
}

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
});

async function actualizarPizarra(ruta) {  
  try {
    respuesta = await fetch(ruta);
    if (respuesta.ok) {
      const data = await respuesta.json();
      if (Array.isArray(data)) {
        pizarra.innerHTML = "";
        for (i = 0; i < data.length; i++) {
          horaActualizada();
          pizarra.innerHTML += `
      <article class="moneda" id="moneda-${data[i].nombre}">
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
          <input type="checkbox" id="star-checkbox-${data[i].nombre}" class="input-star-checkbox"><label for="star-checkbox-${data[i].nombre}" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
      `;
        }
      } else {
        pizarra.style.maxHeight = "45vh";
        horaActualizada();
        pizarra.innerHTML = `
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
          <input type="checkbox" id="star-checkbox-${data.nombre}" class="input-star-checkbox"><label for="star-checkbox-${data.nombre}" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
  `;
      }
    } else {
      msgError();
    }
  } catch {
    msgError();
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

function guardado() {}
