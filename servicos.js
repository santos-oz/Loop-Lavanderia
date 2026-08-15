const cards = document.querySelectorAll(".card-servico");
const imagemLateral = document.querySelector(".banner-lateral img");
const botaoAgendar = document.querySelector(".btn-agendar");

window.addEventListener("load", () => {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("aparecer");
        }, index * 110);
    });

    setTimeout(() => {
        imagemLateral.classList.add("mostrar");
    }, 350);
});

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.add("clicado");

        setTimeout(() => {
            card.classList.remove("clicado");
        }, 180);
    });
});
/*
botaoAgendar.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Você será direcionado para o agendamento 😊");
});*/

const fraseBox = document.querySelector(".frase-box");

window.addEventListener("load", () => {
    fraseBox.style.opacity = "1";
    fraseBox.style.transform = "translateY(0)";
});
