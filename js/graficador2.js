const select = document.getElementById("selectMoneda");
const tabla = document.getElementById("tbody");
const ctx = document.getElementById("miGrafica").getContext("2d");

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
      ],
    },
  });
  
  ctx.innerHTML = myChart;
  

