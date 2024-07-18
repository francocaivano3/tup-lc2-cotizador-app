const select = document.getElementById("selectMoneda");
const tabla = document.getElementById("tbody");
const ctx = document.getElementById("miGrafica").getContext("2d");
const ls = JSON.parse(localStorage.getItem("favoritos")) || [];
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

const monedas = [
  "Dólar Oficial",
  "Dólar Blue",
  "Dólar Bolsa",
  "Dólar CCL",
  "Dólar Tarjeta",
  "Dólar Mayorista",
  "Dólar Cripto",
  "Euro",
  "Real Brasileño",
  "Peso Chileno",
  "Peso Uruguayo"]

const fechaActual = new Date();
let fechas = [];

for (let i = 6; i >= 0; i--) {
  let fecha = new Date(fechaActual);
  fecha.setDate(fecha.getDate() - i);
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let año = fecha.getFullYear();
  let fechaFormateada = `${año}/${mes.toString().padStart(2, "0")}/${dia.toString().padStart(2, "0")}`;
  fechas.push(fechaFormateada);
}

async function obtenerDatos(casa) {
  try {
    respuesta = await fetch(`https://dolarapi.com/v1/dolares/${casa}`);
    if (respuesta.ok) {
      const data = await respuesta.json();
      return data;
    } else {
      throw new Error(`Error en la API: ${respuesta.status}`);
    }
  } catch (error){
    console.log("Error", error);
  }
}

let valores = {
    "oficial":[950, 955, 960, 965, 970, 975, 980],
    "blue":[952, 955, 966, 968, 979, 988, 993],
    "bolsa":[930, 935, 955, 930, 940, 938, 952],
    "contadoconliqui":[1000, 1010, 1020, 1014, 1043, 1047, 1040],
    "tarjeta":[1200, 1232, 1130, 1150, 1170, 1154, 1300],
    "mayorista":[1235, 1250, 1300, 1350, 1300, 1350, 1355],
    "cripto":[1120, 1290, 1250, 1300, 1355, 1300, 1320],
    "euro":[1500, 1523, 1520, 1515, 1532, 1530, 1531],
    "brl":[150, 160, 167, 190, 194, 200, 220],
    "clp":[90, 92, 93, 94, 95, 96, 97],
    "uyu":[35, 40, 45, 44, 43, 46, 47]
}

let valoresLs = {};

async function cargarValores(){
  for (let dato of ls) {
    const nombre = dato.nombre.toLowerCase();
    const obtenerDatoVenta = await obtenerDatos(dato.nombre.toLowerCase());
    
    if (obtenerDatoVenta) {
      if (!valoresLs[nombre]){
        valoresLs[nombre] = {};
      }

      if (!valoresLs[nombre][obtenerDatoVenta.fechaActulizacion]){
        valoresLs[nombre][obtenerDatoVenta.fechaActulizacion] = obtenerDatoVenta.venta;
      }
    }
  }
  console.log(valoresLs);
}


document.addEventListener("DOMContentLoaded", async function() {
  await cargarValores();
  crearChart();
});



function crearChart(){
  const datasets = completarChart();
  const myChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: fechas,
              datasets: datasets,
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                }
              }
            });
            myChart.update();
          }
          
function completarChart(){
  let arrObj = [];

  for (let dato of datosLs){
    const nombre = dato.nombre.toLowerCase();
    const datosPorMoneda = valoresLs[nombre] || [];

  const data = fechas.map(fecha => datosPorMoneda[fecha] || null);
  arrObj.push({
    label: dato.nombre,
    data: data,
    backgroundColor: colorFondo(arrObj.length), 
    borderColor: colorBorde(arrObj.length),
    borderWidth: 1,
    fill: true,
  });
  
}
console.log(arrObj);
return arrObj;
}


function colorBorde(index) {
    const colors = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ac", "#d95f02"];
    return colors[index % colors.length];
  }
  
  function colorFondo(index) {
    const colors = ["#cce6f4", "#fce6d4", "#f4cccc", "#d6e8f0", "#d4edd6", "#fef3cd", "#e6d7e9", "#ffe3e4", "#f5eee7", "#f0efee", "#f9c8a6"];
    return colors[index % colors.length];
  }