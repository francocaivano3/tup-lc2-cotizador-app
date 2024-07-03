    window.onload = function () {
    // Variables
    const IMAGENES = [
        './img/persona.jpg',
        './img/persona2.jpg',
        './img/persona3.jpg',
        './img/persona4.jpg'
    ];
    const NOMBRES = [
        'Roger Medina',
        'Tomás Pérez',
        'Julieta Domínguez',
        'Joel Fernández'
    ]
    const OPINIONES = [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint debitis earum minima at, saepe suscipit cupiditate possimus, et eum tempora, nemo blanditiis? Repellat, sapiente quisquam expedita odit ab sit distinctio.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint debitis earum minima at, saepe suscipit cupiditate possimus, et eum tempora',
        'Muy buena la página!!!',
        'Me gusta el estilo de la página!!!'
    ]

    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;
    let posicionActual = 0;
    let $botonRetroceder = document.querySelector('#retroceder');
    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagen = document.querySelector('#contenedor-cliente');
    let $nombre = document.getElementById("nombre-cliente")
    let $opinion = document.getElementById("opinion-cliente");
    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    function pasarFoto() {
        if(posicionActual >= IMAGENES.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function retrocederFoto() {
        if(posicionActual <= 0) {
            posicionActual = IMAGENES.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen () {
        $imagen.innerHTML = `<img src='${IMAGENES[posicionActual]}' alt="cliente" id="img-cliente"></img>`;
        $nombre.innerText = NOMBRES[posicionActual];
        $opinion.innerText = OPINIONES[posicionActual];
    }

    /**
     * Activa el autoplay de la imagen
     */

    // Eventos
    $botonAvanzar.addEventListener('click', pasarFoto);
    $botonRetroceder.addEventListener('click', retrocederFoto);
    // Iniciar
    renderizarImagen();
}
