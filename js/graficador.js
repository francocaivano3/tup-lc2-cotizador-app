/*Gráfica con varias líneas*/
//Axis X
const select = document.getElementById("selectMoneda");
const tabla = document.getElementById("tbody");

const rutas = [
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

const fechaActual = new Date();
let fechas = [];

for (let i = 6; i >= 0; i--) {
  let fecha = new Date(fechaActual);
  fecha.setDate(fecha.getDate() - i);
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1; 
  let año = fecha.getFullYear();
  let fechaFormateada = `${año}/${mes.toString().padStart(2, '0')}/${dia.toString().padStart(2, '0')}`;
  fechas.push(fechaFormateada);
}

const casasApi = ["oficial", "blue", "bolsa", "cripto", "mayorista"] // este array es solo para las casas que acepta la api de datos historicos

document.addEventListener("DOMContentLoaded", async function(){



//Datos

async function datosHistoricos(casa, fecha){
  try {
    respuesta = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${casa}/${fecha}`);
    if(respuesta.ok){
      const data = await respuesta.json();
      return data.venta;
    }
  } catch {
    alert("error");
  }
}

async function datosHoy(casa){
  try {
    respuesta = await fetch(`https://dolarapi.com/v1/dolares/${casa}`);
    if(respuesta.ok){
      const data = await respuesta.json();
      return data.venta;
    }
  } catch {
    alert("error datos hoy")
  }
} 

arrayDatosVentas = {"oficial": [], "blue": [], "bolsa": [], "cripto": [], "mayorista": []};


async function cargarDatos(casas){

try {
  for (let i = 0; i < casas.length; i++){
    for (let j = 0; j < 7; j++) {
      let datos;
      if (j < 6){
        datos = await datosHistoricos(casas[i], fechas[j]);
      } else {
        datos = await datosHoy(casas[i]);
      }
      arrayDatosVentas[casas[i]].push(datos);
    } 
  }
  console.log(arrayDatosVentas);
} catch(error){
  console.error("Error al cargar los datos: ", error);
}

}

  cargarDatos(casasApi)
  console.log(arrayDatosVentas);

const ctx = document.getElementById("miGrafica").getContext("2d");

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: fechas,
    datasets: [
      //Porción de código que se repite por cada ítem que se requiere dibujar
      {
        //Ejemplo de gráfica con relleno
        label: "Dolar Oficial",
        data: arrayDatosVentas["oficial"],
        borderColor: "rgba(54, 162, 235, 1)",    
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
        fill: true,
      },
      {
        //Ejemplo de gráfica con relleno
        label: "Dolar Blue",
        data: arrayDatosVentas["blue"],
        borderColor: "rgba(255, 99, 132, 1)",    
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        fill: true,
      },
      {
        //Ejemplo de gráfica con relleno
        label: "Dolar Bolsa",
        data: arrayDatosVentas["bolsa"],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
        fill: true,
      },{
        //Ejemplo de gráfica con relleno
        label: "Dolar Cripto",
        data: arrayDatosVentas["cripto"],
        borderColor: "rgba(255, 206, 86, 1)",    
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderWidth: 1,
        fill: true,
      },
      {
        //Ejemplo de gráfica con relleno
        label: "Dolar Mayorista",
        data: arrayDatosVentas["mayorista"],
        borderColor: "rgba(153, 102, 255, 1)",   
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
        fill: true,
      }
    ],
  },
});

ctx.innerHTML = myChart;

});

function tablaDatosAnteriores(){
  let moneda = parseInt(select.value);
  let posicion;

  switch (moneda){
    case "0":
      posicion = "oficial";
      break;
    case "1":
      posicion = "blue";
      break;
    case "2":
      posicion = "bolsa";
      break;
    case "5":
      posicion = "cripto";
      break;
    case "6":
      posicion = "mayorista";
      break;
  }

  let arrayDatosMoneda = arrayDatosVentas[posicion]
  console.log("AAAAAAAAAA");
  console.log(arrayDatosVentas)
  let datosTabla = "";

  for (let i = 0; i < Object.keys(arrayDatosMoneda).length; i++){
    datosTabla += `
              <tr>
              <td>Dólar ${posicion.toUpperCase}</td>
              <td>${fechas[i]}</td>
              <td>$${arrayDatosVentas[i]}</td>
              <td>$1015</td>
              <td><i class="fa-solid fa-arrow-down"></i></td>
            </tr>
    `;
  }
  console.log(datosTabla)
  return datosTabla;
}

select.addEventListener("change", function(){
  if(select.value == "0" || select.value == "1" || select.value == "2" || select.value == "5" || select.value == "6"){
    tbody.innerHTML += tablaDatosAnteriores();
  } 
})


