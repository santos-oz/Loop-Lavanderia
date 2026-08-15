let mod_login = document.querySelector(".mod-login");
let login = document.querySelector(".login");
let fund_md = document.querySelector(".fundo-ml");
let voltar_login = document.querySelector(".voltar-log");
let registar_login = document.querySelector(".registar-log");
let form_cadastro = document.querySelector(".form-cadas");

login.addEventListener("click", function() {
    mod_login.style.display = "flex";
    fund_md.style.display = "flex";
    
});
fund_md.addEventListener("click", function() {
    mod_login.style.display = "none";
    fund_md.style.display = "none";
    form_cadastro.style.display = "none";
});

registar_login.addEventListener("click", function() {
    form_cadastro.style.display = "flex";
    mod_login.style.display = "none";
    fund_md.style.display = "flex";
    
    

});
voltar_login.addEventListener("click", function() {
    form_cadastro.style.display = "none";
    mod_login.style.display = "flex";
    fund_md.style.display = "flex";
});
