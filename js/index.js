
let selector = document.querySelector(".selector");
let pizarra = document.getElementById("pizarra");



selector.addEventListener("change", function(){
    
    switch(selector.value){
        case "0":
        pizarra.innerHTML = `
        <article class="moneda"><p class="title-article-moneda">OFICIAL</p><img src="./img/united-states.png" class="bandera">
            <div class="precio">
              <div class="precio-compra">
                <p>COMPRA</p>
              <p>$1000</p>
              </div>
              <div class="precio-venta">
                <p>VENTA</p>
              <p>$1030</p>
              </div>
              </div>
          <input type="checkbox" id="star-checkbox1" class="input-star-checkbox"><label for="star-checkbox1" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
          <article class="moneda"><p class="title-article-moneda">BLUE</p><img src="./img/european-union.png" class="bandera">
            <div class="precio">
              <div class="precio-compra">
                <p>COMPRA</p>
              <p>$1000</p>
              </div>
              <div class="precio-venta">
                <p>VENTA</p>
              <p>$1030</p>
              </div>
              </div>
          <input type="checkbox" id="star-checkbox2" class="input-star-checkbox"><label for="star-checkbox2" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
          <article class="moneda"><p class="title-article-moneda">TARJETA</p><img src="./img/flag.png" class="bandera">
            <div class="precio">
              <div class="precio-compra">
                <p>COMPRA</p>
              <p>$1000</p>
              </div>
              <div class="precio-venta">
                <p>VENTA</p>
              <p>$1030</p>
              </div>
              </div>
          <input type="checkbox" id="star-checkbox3" class="input-star-checkbox"><label for="star-checkbox3" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
          <article class="moneda"><p class="title-article-moneda">MEP</p><img src="./img/chile.png" class="bandera">
            <div class="precio">
              <div class="precio-compra">
                <p>COMPRA</p>
              <p>$1000</p>
              </div>
              <div class="precio-venta">
                <p>VENTA</p>
              <p>$1030</p>
              </div>
              </div>
          <input type="checkbox" id="star-checkbox4" class="input-star-checkbox"><label for="star-checkbox4" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
          <article class="moneda"><p class="title-article-moneda">CCL</p><img src="./img/uruguay.png" class="bandera">
            <div class="precio">
              <div class="precio-compra">
                <p>COMPRA</p>
              <p>$1000</p>
              </div>
              <div class="precio-venta">
                <p>VENTA</p>
              <p>$1030</p>
              </div>
              </div>
          <input type="checkbox" id="star-checkbox5" class="input-star-checkbox"><label for="star-checkbox5" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>
          <article class="moneda"><div class="bandera"><img src=""></div><p class="title-article-moneda">CRIPTO</p>
            <div class="precio">
              <div class="precio-compra">
                <p>COMPRA</p>
              <p>$1000</p>
              </div>
              <div class="precio-venta">
                <p>VENTA</p>
              <p>$1030</p>
              </div>
              </div>
          <input type="checkbox" id="star-checkbox6" class="input-star-checkbox"><label for="star-checkbox6" class="star"><span class="material-symbols-outlined" style="font-size: 28px;">star</span></label></article>          
          
        `;
        break;
        case "1":
            alert("hola");
            break;
    }
});