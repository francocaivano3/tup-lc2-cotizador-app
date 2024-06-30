/*Gráfica con varias líneas*/
//Axis X
const etiquetas = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Abril",
  "Mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre"
];
//Datos
const datosLinea1 = [100, 150, 120, 200, 10, 20, 100];
const datosLinea2 = [80, 120, 140, 180, 0, 50, 56];
const datosLinea3 = [88, 100, 14, 200, 20, 0, 80];
const ctx = document.getElementById("miGrafica").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: etiquetas2,
    datasets: [
      //Porción de código que se repite por cada ítem que se requiere dibujar
      {
        //Ejemplo de gráfica con relleno
        label: "Dolar Blue",
        data: datosLinea1,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Color de fondo
        borderWidth: 1,
        fill: true,
      },
      {
        label: "Dolar Oficial",
        data: datosLinea2,
        borderColor: "green",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Euro",
        data: datosLinea3,
        borderColor: "red",
        fill: false,
      },
    ],
  },
});
