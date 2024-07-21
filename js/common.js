window.onload = function () {

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
    ];
    const OPINIONES = [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint debitis earum minima at, saepe suscipit cupiditate possimus, et eum tempora, nemo blanditiis? Repellat, sapiente quisquam expedita odit ab sit distinctio.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint debitis earum minima at, saepe suscipit cupiditate possimus, et eum tempora',
        'Muy buena la página!!!',
        'Me gusta el estilo de la página!!!'
    ];

    const intervalo = 3000; 
    let posicionActual = 0;
    let $botonRetroceder = document.querySelector('#retroceder');
    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagen = document.querySelector('#contenedor-cliente');
    let $nombre = document.getElementById("nombre-cliente");
    let $opinion = document.getElementById("opinion-cliente");

    function pasarFoto() {
        if (posicionActual >= IMAGENES.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
    }

    function retrocederFoto() {
        if (posicionActual <= 0) {
            posicionActual = IMAGENES.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
    }

    function renderizarImagen() {
        $imagen.innerHTML = `<img src='${IMAGENES[posicionActual]}' alt="cliente" id="img-cliente">`;
        $nombre.innerText = NOMBRES[posicionActual];
        $opinion.innerText = OPINIONES[posicionActual];
    }

    setInterval(pasarFoto, intervalo);

    $botonAvanzar.addEventListener('click', pasarFoto);
    $botonRetroceder.addEventListener('click', retrocederFoto);

    renderizarImagen();
}
