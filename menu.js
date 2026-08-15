let menu = document.querySelector(".btn-mb");
let menuclick = true;
let nav_clicado = document.querySelector(".menuclick")


menu.addEventListener("click", function(){
    if(menuclick){
        nav_clicado.style.display = "none"
        menuclick = false;
        
    }
    else{
        nav_clicado.style.display = "flex"
        menuclick = true;
    }

})