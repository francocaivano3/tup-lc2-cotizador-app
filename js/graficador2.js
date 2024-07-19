const select = document.getElementById("selectMoneda");
const tabla = document.getElementById("tbody");
const ctx = document.getElementById("miGrafica").getContext("2d");
const ls = JSON.parse(localStorage.getItem("favoritos")) || [];
const rutas = {
  "oficial": "https://dolarapi.com/v1/dolares/oficial",
  "blue": "https://dolarapi.com/v1/dolares/blue",
  "bolsa": "https://dolarapi.com/v1/dolares/bolsa",
  "contadoconliqui": "https://dolarapi.com/v1/dolares/contadoconliqui",
  "tarjeta": "https://dolarapi.com/v1/dolares/tarjeta",
  "mayorista": "https://dolarapi.com/v1/dolares/mayorista",
  "cripto": "https://dolarapi.com/v1/dolares/cripto",
  "eur": "https://dolarapi.com/v1/cotizaciones/eur",
  "brl": "https://dolarapi.com/v1/cotizaciones/brl",
  "clp": "https://dolarapi.com/v1/cotizaciones/clp",
  "uyu": "https://dolarapi.com/v1/cotizaciones/uyu"
};
const infoLs = [
  {nombre: "oficial" },
  {nombre: "blue" },
  {nombre: "bolsa" },
  {nombre: "contadoconliqui" },
  {nombre: "tarjeta" },
  {nombre: "mayorista" },
  {nombre: "cripto" },
  {nombre: "eur" },
  {nombre: "brl" },
  {nombre: "clp" },
  {nombre: "uyu" },
]

const fechaActual = new Date();
let fechas = [];

for (let i = 6; i >= 0; i--) {
  let fecha = new Date(fechaActual);
  fecha.setDate(fecha.getDate() - i);
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let año = fecha.getFullYear();
  let fechaFormateada = `${año}/${mes}/${dia}`;
  fechas.push(fechaFormateada);
}

async function obtenerDatos(casa) {
  try {
   const url = rutas[casa];
    if(!url){
      throw new Error(`URL de ${casa} no encontrada`)
    }
    const respuesta = await fetch(url);
    if(respuesta.ok){
      const data = await respuesta.json();
      console.log(`Datos obtenidos para ${casa}: `, data);
      return data;
    } else {
      throw new Error(`Error en la API para ${casa}: $  {respuesta.status}`);
    } 
  } catch (error) {
    console.log("Error: ", error)
  }
  
}

let valoresLs = {};
let myChart;

async function cargarValores(){
  for (let dato of infoLs) {
    const nombre = dato.nombre;
    const obtenerDatoVenta = await obtenerDatos(nombre);
    
    if (obtenerDatoVenta) {
      if (!valoresLs[nombre]){
        valoresLs[nombre] = {};
      }

      const fechaActualizacion = new Date(obtenerDatoVenta.fechaActualizacion);
      const año = fechaActualizacion.getFullYear();
      const mes = (fechaActualizacion.getMonth() + 1).toString().padStart(2, '0');
      const dia = fechaActualizacion.getDate().toString().padStart(2, '0');
      const fechaFormateada = `${año}/${mes}/${dia}`;

      if (obtenerDatoVenta.venta){
        valoresLs[nombre][fechaFormateada] = obtenerDatoVenta.venta;
      }

      console.log(`Datos guardados para ${nombre}:`, valoresLs[nombre]);
    }
  }
}


document.addEventListener("DOMContentLoaded", async function() {
  cargarDatosDesdeLocalStorage();
  await cargarValores();
  crearChart();
});



function crearChart(){
  const datasets = completarChart();
  myChart = new Chart(ctx, {
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
            setInterval(() => actualizarDatos(), 24 * 60 * 60 * 1000);
          }
          
function completarChart(){
  let arrObj = [];

  for (let dato of infoLs){
    const nombre = dato.nombre.toLowerCase();
    const datosPorMoneda = valoresLs[nombre] || [];

  const data = fechas.map(fecha => datosPorMoneda[fecha] || null);

  console.log(`Datos parra ${nombre}: `, data);

  arrObj.push({
    label: dato.nombre,
    data: data,
    backgroundColor: colorFondo(arrObj.length), 
    borderColor: colorBorde(arrObj.length),
    borderWidth: 1,
    fill: true,
  });

}
console.log(arrObj)
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


  // codigo de prueba para mañana 
  async function actualizarDatos() {
    await cargarValores();
    guardarDatosEnLocalStorage();
    if (myChart) {
      myChart.data.datasets = completarChart(); // Actualiza los datos
      myChart.update(); // Actualiza el gráfico
    }
  }
  //prueba 
  function guardarDatosEnLocalStorage() {
    localStorage.setItem('valoresLs', JSON.stringify(valoresLs));
  }
  
  function cargarDatosDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('valoresLs');
    if (datosGuardados) {
      valoresLs = JSON.parse(datosGuardados);
    }
  }
  
