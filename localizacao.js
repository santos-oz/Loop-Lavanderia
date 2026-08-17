let paulista = document.getElementById("unpaulista");

let unfaria = document.getElementById("unfaria");
let mapag = document.getElementById("mapag");
let itaimbi = document.getElementById("itaimbi");
;

unfaria.addEventListener("click", function() { 
    mapag.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7472262491206!2d-46.68941682378058!3d-23.577520262187843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce576d1b6136f3%3A0xd07acf864bcd7990!2sAv.%20Brig.%20Faria%20Lima%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1783378312515!5m2!1spt-BR!2sbr" width="800" height="550" style="border:2px solid #ccc; border-radius: 2rem; margin-top: -5rem" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
});

paulista.addEventListener("click", function() {
    mapag.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1557081785854!2d-46.65831887327022!3d-23.562850562669162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1783377736056!5m2!1spt-BR!2sbr" width="800" height="550" style="border:2px solid #ccc; border-radius: 2rem; margin-top: -5rem;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
});



itaimbi.addEventListener("click", function() {
    mapag.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7313.128645730281!2d-46.68625715381512!3d-23.58408603241468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5742bc832a29%3A0xa9323f13433864db!2sItaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1783380425083!5m2!1spt-BR!2sbr" width="800" height="550" style="border:2px solid #ccc; border-radius: 2rem; margin-top: -5rem;;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
});


