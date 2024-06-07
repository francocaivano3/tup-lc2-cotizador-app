
let ruta;
let selectMoneda = document.getElementById("selectMoneda");
let tablaInformes = document.getElementById("tabla-informes");


let links = ["https://dolarapi.com/v1/dolares/oficial", "https://dolarapi.com/v1/dolares/blue",
    "https://dolarapi.com/v1/dolares/bolsa", "https://dolarapi.com/v1/dolares/contadoconliqui",
    "https://dolarapi.com/v1/dolares/tarjeta", "https://dolarapi.com/v1/dolares/mayorista",
    "https://dolarapi.com/v1/dolares/cripto", "https://dolarapi.com/v1/cotizaciones/eur",
    "https://dolarapi.com/v1/cotizaciones/brl", "https://dolarapi.com/v1/cotizaciones/clp",
    "https://dolarapi.com/v1/cotizaciones/uyu"
];



selectMoneda.addEventListener("change", function(){

  switch(selectMoneda.value){
    case "0": 
    ruta = links[0];
    console.log("hola")
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



// function mostrarData(data){
//   for(let i = 1; i < 5; i++){
//     let hijo = document.querySelector(`#tabla-informes tbody tr:nth-child(${i})`);
//     hijo.innerHTML = data.nombre;

//   }
// }