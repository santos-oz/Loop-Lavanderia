const menuToggle = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("header nav");

if (menuToggle && menuPrincipal) {
    const fecharMenu = () => {
        menuPrincipal.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");

        const icone = menuToggle.querySelector("i");
        if (icone) {
            icone.classList.remove("fa-xmark");
            icone.classList.add("fa-bars");
        }
    };

    menuToggle.addEventListener("click", () => {
        const menuAberto = menuPrincipal.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(menuAberto));
        menuToggle.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");

        const icone = menuToggle.querySelector("i");
        if (icone) {
            icone.classList.toggle("fa-bars", !menuAberto);
            icone.classList.toggle("fa-xmark", menuAberto);
        }
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1080) {
            fecharMenu();
        }
    });
}
