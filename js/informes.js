let tablaDatos = document.getElementById("tabla-informes");
let selector = document.getElementById("selectMoneda");
const main = document.getElementById("main");
let datosLs = JSON.parse(localStorage.getItem("favoritos")) || [];
let compartirInfo = document.getElementById("compartir-informacion");
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


selector.addEventListener("change", async function(){
  let moneda = selector.value;

  tablaDatos.innerHTML = `
    <tr>
      <th>Moneda</th>
      <th>Fecha</th>
      <th>Compra</th>
      <th>Venta</th>
      <th>Variación</th>
    </tr>
  `;

  const opciones = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };
  if (moneda === "monedas"){
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
  } else if(moneda !== "monedas"){
    let bandera = false;
    for (let dato of datosLs){
      if(moneda == dato.nombre){
        let fecha = new Date(dato.fechaActualizacion); 
        let fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
        let flecha = await flechaAltaBaja(dato);
        if(moneda === dato.nombre){
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
        bandera = true;
      } 
    }
    if(!bandera){
      Swal.fire({
        title: "Advertencia",
        color:"#cccccc",
       text: `No tienes ${moneda} en favoritos`,
       icon: "warning",
       iconColor:"#eabe3f",
       showCancelButton: false,
       confirmButtonColor: "#27a545",
       background: "#111111",
       confirmButtonText: "Aceptar"
     })
    }
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

compartirInfo.addEventListener("click", function(){
  Swal.fire({
    background: "#111111",
    color: "#eabe3f",
    title: "Ingrese sus datos",
    html: `<form id="formulario">
    <label>Nombre</label><br>
    <input type="text" id="nombre" required><br>
    <label>Tu Email</label><br>
    <input type="email" id="email" required><br>
    <label>Destinatario</label><br>
    <input type="email" id="destinatario" required><br><br>
    <button type="button" onclick="enviarEmail()" style="padding: 5px 10px; color: #000000; background-color: #eabe3f; border: none; border-radius: 5px; cursor: pointer;">Enviar</button>
    </form>`,
    showConfirmButton: false
  });
  
})


function enviarEmail(){
    const tabla = document.getElementById("tabla-informes");
  
    let tablaTexto = "";
    for (let row of tabla.rows) {
        for (let cell of row.cells) {
            tablaTexto += cell.innerText + "\t";
        }
        tablaTexto += "\n";
    }

    let parametros = {
      name: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      destinatario: document.getElementById("destinatario").value,
      message: tablaTexto
    };

    const serviceId = "service_i4fujln";
    const templateId = "template_7oqfvyp";

    emailjs.send(serviceId, templateId, parametros)
      .then(res => {
        document.getElementById("nombre").value = "";
        document.getElementById("destinatario").value = "";
        msg(true);
      })
      .catch(err => msg(false));
    
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

function msg(bool) {
  if(bool === false){
    Swal.fire({
      title: "Error!",
      text: "Error al enviar el mensaje.",
      icon: "error",
      iconColor: "#ec3545",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#27a545",
      background: "#111111",
      color: "white",
    });
  } else if(bool === true){
    Swal.fire({
      title: "Enviado!",
      text: "La información se ha enviado correctamente.",
      icon: "success",
      iconColor: "#008000",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#27a545",
      background: "#111111",
      color: "white",
    });
  }
}





/* <tbody id="tbody">
<tr>
  <td>Dólar Oficial</td>
  <td>27/05/2024</td>
  <td>$995</td>
  <td>$1015</td>
  <td><i class="fa-solid fa-arrow-down"></i></td>
</tr> */