function init_lightBox(){
  renderLightBox();
  declareImgLightBox(); 
  declareCloseLightBox();
}

// דואג לרנדר את כל מה שצריך מבחינת הטמפל לדום
// כדי שיעבוד
function renderLightBox(){
  document.body.innerHTML += `
  <div id="id_lightbox" class="light-box">
  <div class="lightbox-inside">
    <img src="lightbox/images/cake1.jpg" >
    <h2>Good cake</h2>
    <button>close --</button>
  </div>
</div>
  `
}

function declareImgLightBox(){
  let imgs_list = document.querySelectorAll("img[data-lightbox]");
  imgs_list.forEach(function(elem){
    elem.addEventListener("click",function(){
      // alert(elem.src)
      showLightBox(elem.src,elem.alt)
    })
  })
}

function declareCloseLightBox(){
  let lightBox = document.querySelector("#id_lightbox");
  lightBox.addEventListener("click",function(){
    lightBox.style.display = "none";
  })
}

function showLightBox(_src,_alt){
  let lightBox = document.querySelector("#id_lightbox");
  lightBox.style.display = "flex";
  lightBox.querySelector("img").src = _src;
  lightBox.querySelector("h2").innerHTML = _alt;

}


init_lightBox();