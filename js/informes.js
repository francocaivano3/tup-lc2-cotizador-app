

let ruta;
let selectMoneda = document.getElementById("selectMoneda");
// let tablaInformes = document.getElementById("tabla-informes");

const links = ["https://dolarapi.com/v1/dolares/oficial", "https://dolarapi.com/v1/dolares/blue",
    "https://dolarapi.com/v1/dolares/bolsa", "https://dolarapi.com/v1/dolares/contadoconliqui",
    "https://dolarapi.com/v1/dolares/tarjeta", "https://dolarapi.com/v1/dolares/mayorista",
    "https://dolarapi.com/v1/dolares/cripto", "https://dolarapi.com/v1/cotizaciones/eur",
    "https://dolarapi.com/v1/cotizaciones/brl", "https://dolarapi.com/v1/cotizaciones/clp",
    "https://dolarapi.com/v1/cotizaciones/uyu"
];


selectMoneda.addEventListener("change", function(){
  console.log(selectMoneda.value);
  switch(selectMoneda.value){
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

    fetch(ruta)
    .then(response => response.json())
    .then(data => mostrarData(data));
});



function mostrarData(data){
  console.log(data)

    //ver lo del ls para los 5 dias previos
    let hijo = document.querySelector("tbody");
    // let arrow = data.venta ?   ternario para la flecha en alta o baja
    const opciones = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    };
    
    let fechaFormateada = new Date(data.fechaActualizacion).toLocaleString('es-ES', opciones)
    hijo.innerHTML = `
              <tr>
              <td>${data.nombre}</td>
              <td>${fechaFormateada}</td>
              <td>$${data.compra}</td>
              <td>$${data.venta}</td>
              <td><i class="fa-solid fa-arrow-down"></i></td> 
            </tr>
    `;
}
          