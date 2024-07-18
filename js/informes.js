let tablaDatos = document.getElementById("tabla-informes");
let selector = document.getElementById("selectMoneda");
const main = document.getElementById("main");
let datosLs = JSON.parse(localStorage.getItem("favoritos")) || [];
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



window.addEventListener("load", async function() {

datosLs.sort((a, b) => {
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

const opciones = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
};


for(let dato of datosLs){
    let fecha = new Date(dato.fechaActualizacion); 
    
    let fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    
    let flecha = await flechaAltaBaja(dato);
    
    tablaDatos.innerHTML += `
        <tr>
          <td>${dato.nombre}</td>
          <td>${fechaFormateada}</td>
          <td>$${dato.compra}</td>
          <td>$${dato.venta}</td>
          ${flecha}
        </tr>
    `
  }
})

async function datosApi(link){
  try {
    let response = await fetch(link);
    if(response.ok){
      let data = await response.json();
      return data;
    } else {
      msgError();
    }
  } catch (error) {
    console.error("Error:", error);
    msgError();
  }
}

async function flechaAltaBaja(dato){
  let link = switchAltaBaja(dato);
  let valor = await datosApi(link);

  if(valor.venta > dato.venta){
    return `<td><i class="fa-solid fa-arrow-up"></i></td>`;
  } else if(valor.venta < dato.venta){
    return `<td><i class="fa-solid fa-arrow-down"></i></td>`;
  } else {
    return `<td>-</td>`; 
  }
}


function switchAltaBaja(dato) {
  switch(dato.nombre){
    case "Oficial":
      return links["oficial"];

    case "Blue":
      return links["blue"];

    case "Bolsa":
      return links["bolsa"];

    case "Contado con liquidación":
      return links["ccl"];

    case "Tarjeta":
      return links["tarjeta"];

    case "Mayorista":
      return links["mayorista"];

    case "Cripto":
      return links["cripto"];

    case "Euro":
      return links["euro"];

    case "Real Brasileño":
      return links["real"];

    case "Peso Chileno":
      return links["chileno"];

    case "Peso Uruguayo":
      return links["uruguayo"];
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




/* <tbody id="tbody">
<tr>
  <td>Dólar Oficial</td>
  <td>27/05/2024</td>
  <td>$995</td>
  <td>$1015</td>
  <td><i class="fa-solid fa-arrow-down"></i></td>
</tr> */