/*
 * Loop Lavanderia — JavaScript unificado
 * Cada módulo verifica se os elementos da respectiva página existem antes de executar.
 */

document.addEventListener("DOMContentLoaded", () => {
    iniciarMenu();
    iniciarModalConta();
    iniciarServicos();
    iniciarLocalizacao();
    iniciarAgendamento();
});

/* ==========================================================
   1. MENU RESPONSIVO — TODAS AS PÁGINAS
   ========================================================== */
function iniciarMenu() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const menuPrincipal = document.querySelector("header nav");

    if (!botaoMenu || !menuPrincipal) {
        return;
    }

    function fecharMenu() {
        menuPrincipal.classList.remove("is-open");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");

        const icone = botaoMenu.querySelector("i");
        icone?.classList.remove("fa-xmark");
        icone?.classList.add("fa-bars");
    }

    botaoMenu.addEventListener("click", () => {
        const menuAberto = menuPrincipal.classList.toggle("is-open");
        botaoMenu.setAttribute("aria-expanded", String(menuAberto));
        botaoMenu.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");

        const icone = botaoMenu.querySelector("i");
        icone?.classList.toggle("fa-bars", !menuAberto);
        icone?.classList.toggle("fa-xmark", menuAberto);
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1080) {
            fecharMenu();
        }
    });
}

/* ==========================================================
   2. LOGIN E CADASTRO — TODAS AS PÁGINAS
   ========================================================== */
function iniciarModalConta() {
    const perfil = document.querySelector(".perfil");

    if (!perfil) {
        return;
    }

    let botaoLogin = perfil.querySelector(".login");

    if (!botaoLogin) {
        perfil.innerHTML = `
            <button class="login" type="button" aria-label="Acessar conta" aria-haspopup="dialog">
                <i class="fa-solid fa-user" aria-hidden="true"></i>
            </button>
        `;
        botaoLogin = perfil.querySelector(".login");
    }

    botaoLogin.type = "button";
    botaoLogin.setAttribute("aria-label", "Acessar conta");
    botaoLogin.setAttribute("aria-haspopup", "dialog");

    const estruturaModal = document.createElement("div");
    estruturaModal.innerHTML = `
        <div class="fundo-ml" aria-hidden="true"></div>

        <div class="mod-login" role="dialog" aria-modal="true" aria-labelledby="titulo-login" aria-hidden="true">
            <h2 class="txtac" id="titulo-login">Acesse sua conta</h2>

            <form class="form_login">
                <label>Email:</label>
                <input type="email" placeholder="Seu melhor email">

                <label>Senha:</label>
                <input type="password" placeholder="Sua senha">

                <button type="submit" class="entrar-log">Entrar</button>
                <button type="button" class="registar-log">Registrar-se</button>
            </form>
        </div>

        <div class="form-cadas" role="dialog" aria-modal="true" aria-labelledby="titulo-cadastro" aria-hidden="true">
            <h2 class="txtac" id="titulo-cadastro">Crie sua conta</h2>

            <form class="form_cadastro">
                <label>Nome:</label>
                <input type="text" placeholder="Seu nome completo">

                <label>Email:</label>
                <input type="email" placeholder="Seu melhor email">

                <label>Telefone</label>
                <input type="tel" placeholder="Informe seu telefone">

                <label>Endereço</label>
                <input type="text" placeholder="Seu endereço completo">

                <label>Senha:</label>
                <input type="password" placeholder="Sua senha">

                <label>Confirmar Senha:</label>
                <input type="password" placeholder="Confirme sua senha">

                <button type="submit" class="cadastrar-log">Cadastrar</button>
                <button type="button" class="voltar-log">Voltar</button>
            </form>
        </div>
    `;

    document.body.append(...estruturaModal.children);

    const fundo = document.querySelector(".fundo-ml");
    const modalLogin = document.querySelector(".mod-login");
    const modalCadastro = document.querySelector(".form-cadas");
    const botaoRegistrar = document.querySelector(".registar-log");
    const botaoVoltar = document.querySelector(".voltar-log");

    function ocultarModal(modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }

    function exibirModal(modal) {
        ocultarModal(modalLogin);
        ocultarModal(modalCadastro);
        fundo.style.display = "flex";
        fundo.setAttribute("aria-hidden", "false");
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
    }

    function fecharModais() {
        ocultarModal(modalLogin);
        ocultarModal(modalCadastro);
        fundo.style.display = "none";
        fundo.setAttribute("aria-hidden", "true");
    }

    botaoLogin.addEventListener("click", () => {
        exibirModal(modalLogin);
    });

    botaoRegistrar.addEventListener("click", () => exibirModal(modalCadastro));
    botaoVoltar.addEventListener("click", () => exibirModal(modalLogin));
    fundo.addEventListener("click", fecharModais);

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && fundo.style.display === "flex") {
            fecharModais();
        }
    });

    document.querySelectorAll(".form_login, .form_cadastro").forEach((formulario) => {
        formulario.addEventListener("submit", (evento) => evento.preventDefault());
    });
}

/* ==========================================================
   3. PÁGINA SERVIÇOS
   ========================================================== */
function iniciarServicos() {
    const cards = document.querySelectorAll(".card-servico");

    if (!cards.length) {
        return;
    }

    const imagemLateral = document.querySelector(".banner-lateral img");
    const fraseBox = document.querySelector(".frase-box");

    cards.forEach((card, indice) => {
        window.setTimeout(() => {
            card.classList.add("aparecer");
        }, indice * 110);

        card.addEventListener("click", () => {
            card.classList.add("clicado");
            window.setTimeout(() => card.classList.remove("clicado"), 180);
        });
    });

    if (imagemLateral) {
        window.setTimeout(() => imagemLateral.classList.add("mostrar"), 350);
    }

    if (fraseBox) {
        fraseBox.style.opacity = "1";
        fraseBox.style.transform = "translateY(0)";
    }
}

/* ==========================================================
   4. PÁGINA LAVANDERIAS PRÓXIMAS
   ========================================================== */
function iniciarLocalizacao() {
    const mapa = document.getElementById("mapag");

    if (!mapa) {
        return;
    }

    const unidades = {
        unpaulista: {
            titulo: "Mapa da unidade Avenida Paulista",
            url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1557081785854!2d-46.65831887327022!3d-23.562850562669162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1783377736056!5m2!1spt-BR!2sbr"
        },
        unfaria: {
            titulo: "Mapa da unidade Avenida Faria Lima",
            url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7472262491206!2d-46.68941682378058!3d-23.577520262187843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce576d1b6136f3%3A0xd07acf864bcd7990!2sAv.%20Brig.%20Faria%20Lima%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1783378312515!5m2!1spt-BR!2sbr"
        },
        itaimbi: {
            titulo: "Mapa da unidade Itaim Bibi",
            url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7313.128645730281!2d-46.68625715381512!3d-23.58408603241468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5742bc832a29%3A0xa9323f13433864db!2sItaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1783380425083!5m2!1spt-BR!2sbr"
        }
    };

    function atualizarMapa(unidade) {
        const iframe = document.createElement("iframe");
        iframe.title = unidade.titulo;
        iframe.src = unidade.url;
        iframe.width = "800";
        iframe.height = "550";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        mapa.replaceChildren(iframe);
    }

    Object.entries(unidades).forEach(([id, unidade]) => {
        document.getElementById(id)?.addEventListener("click", () => atualizarMapa(unidade));
    });
}

/* ==========================================================
   5. PÁGINA AGENDAMENTO
   ========================================================== */
function iniciarAgendamento() {
    const formulario = document.getElementById("formAgendamento");

    if (!formulario) {
        return;
    }

    const listaServicos = [
        { nome: "Lavagem comum", icone: "bi bi-stars" },
        { nome: "Roupas dobradas", icone: "bi bi-layers" },
        { nome: "Passadoria", icone: "bi bi-badge-cc" },
        { nome: "Peças delicadas", icone: "bi bi-droplet-half" },
        { nome: "Lavagem a seco", icone: "bi bi-circle" },
        { nome: "Planos mensais", icone: "bi bi-calendar3" },
        { nome: "Cama e banho", icone: "fa-solid fa-bed" },
        { nome: "Lavagem de tênis", icone: "fa-solid fa-shoe-prints" }
    ];

    const campoData = document.getElementById("data");
    const campoHorario = document.getElementById("horario");
    const selectServico = document.getElementById("servico");
    const campoCep = document.getElementById("cep");
    const campoEndereco = document.getElementById("endereco");
    const campoObservacoes = document.getElementById("observacoes");
    const mensagemFormulario = document.getElementById("mensagemFormulario");
    const areaAgendamento = formulario.closest(".agendamento");
    const cardResumo = areaAgendamento?.querySelector(".resumo");
    const botaoRevisar = formulario.querySelector(".botao-agendar");
    const botaoConfirmar = document.getElementById("btnConfirmar");
    const modalConfirmacao = document.getElementById("modalConfirmacao");
    const botaoFecharModal = document.getElementById("fecharModal");
    const camposObrigatorios = [campoData, campoHorario, selectServico, campoEndereco];
    let resumoLiberado = false;

    formulario.noValidate = true;

    if (cardResumo) {
        cardResumo.id = "resumoPedido";
        cardResumo.setAttribute("aria-hidden", "true");
        cardResumo.setAttribute("tabindex", "-1");
    }

    if (botaoRevisar) {
        botaoRevisar.setAttribute("aria-controls", "resumoPedido");
        botaoRevisar.setAttribute("aria-expanded", "false");
        botaoRevisar.innerHTML = '<i class="bi bi-arrow-right-circle"></i> Revisar pedido';
    }

    const resumo = {
        servico: document.getElementById("resumoServico"),
        data: document.getElementById("resumoData"),
        horario: document.getElementById("resumoHorario"),
        endereco: document.getElementById("resumoEndereco"),
        cep: document.getElementById("resumoCep"),
        icone: document.getElementById("iconeResumoServico")
    };

    listaServicos.forEach((servico) => {
        const opcao = document.createElement("option");
        opcao.value = servico.nome;
        opcao.textContent = servico.nome;
        selectServico.appendChild(opcao);
    });

    function abrirSeletor(campo) {
        campo.focus();

        if (typeof campo.showPicker === "function") {
            try {
                campo.showPicker();
            } catch (_) {
                // Alguns navegadores não permitem showPicker fora de um gesto direto.
            }
        }
    }

    selectServico.closest(".input-servico")?.addEventListener("click", (evento) => {
        if (evento.target !== selectServico) {
            abrirSeletor(selectServico);
        }
    });

    [campoData, campoHorario].forEach((campo) => {
        campo.closest(".input-data-hora")?.addEventListener("click", (evento) => {
            if (evento.target !== campo) {
                abrirSeletor(campo);
            }
        });
    });

    function atualizarResumo() {
        resumo.servico.textContent = selectServico.value || "Não selecionado";
        resumo.data.textContent = campoData.value || "--";
        resumo.horario.textContent = campoHorario.value || "--";
        resumo.endereco.textContent = campoEndereco.value || "--";
        resumo.cep.textContent = campoCep.value || "--";

        const servicoSelecionado = listaServicos.find((servico) => servico.nome === selectServico.value);
        resumo.icone.className = servicoSelecionado?.icone || "bi bi-basket2";
    }

    function mostrarErro(campo) {
        campo.style.border = "2px solid #d9534f";
        campo.style.backgroundColor = "#fff4f4";
    }

    function removerErro(campo) {
        campo.style.border = "";
        campo.style.backgroundColor = "";
    }

    function validarFormulario() {
        let formularioValido = true;

        camposObrigatorios.forEach((campo) => {
            if (!campo.value.trim()) {
                mostrarErro(campo);
                formularioValido = false;
            } else {
                removerErro(campo);
            }
        });

        return formularioValido;
    }

    function formularioCompleto() {
        return camposObrigatorios.every((campo) => campo.value.trim());
    }

    function ocultarResumo() {
        resumoLiberado = false;
        areaAgendamento?.classList.remove("resumo-liberado");
        cardResumo?.classList.remove("resumo-visivel");
        cardResumo?.setAttribute("aria-hidden", "true");
        botaoRevisar?.setAttribute("aria-expanded", "false");

        if (botaoRevisar) {
            botaoRevisar.innerHTML = '<i class="bi bi-arrow-right-circle"></i> Revisar pedido';
        }
    }

    function mostrarResumo() {
        atualizarResumo();
        resumoLiberado = true;
        areaAgendamento?.classList.add("resumo-liberado");
        cardResumo?.classList.add("resumo-visivel");
        cardResumo?.setAttribute("aria-hidden", "false");
        botaoRevisar?.setAttribute("aria-expanded", "true");

        if (botaoRevisar) {
            botaoRevisar.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Atualizar resumo';
        }

        requestAnimationFrame(() => {
            if (window.matchMedia("(max-width: 1200px)").matches) {
                cardResumo?.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            cardResumo?.focus({ preventScroll: true });
        });
    }

    function limparCep(cep) {
        return cep.replace(/\D/g, "");
    }

    async function buscarCep() {
        const cep = limparCep(campoCep.value);

        if (cep.length !== 8) {
            return;
        }

        try {
            mensagemFormulario.textContent = "Buscando endereço...";
            mensagemFormulario.style.color = "#356f9d";

            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = await resposta.json();

            if (!resposta.ok || dados.erro) {
                throw new Error("CEP não encontrado.");
            }

            campoEndereco.value = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}`;
            atualizarResumo();
            mensagemFormulario.textContent = "";
        } catch (erro) {
            mensagemFormulario.textContent = erro.message || "Não foi possível consultar o CEP.";
            mensagemFormulario.style.color = "#d9534f";
        }
    }

    function salvarAgendamento() {
        const agendamento = {
            servico: selectServico.value,
            data: campoData.value,
            horario: campoHorario.value,
            endereco: campoEndereco.value,
            cep: campoCep.value,
            observacoes: campoObservacoes.value
        };

        localStorage.setItem("agendamentoLoop", JSON.stringify(agendamento));
    }

    [selectServico, campoData, campoHorario, campoEndereco, campoCep].forEach((campo) => {
        campo.addEventListener("input", () => {
            removerErro(campo);
            atualizarResumo();

            if (resumoLiberado && !formularioCompleto()) {
                ocultarResumo();
            }
        });

        campo.addEventListener("change", () => {
            removerErro(campo);
            atualizarResumo();

            if (resumoLiberado && !formularioCompleto()) {
                ocultarResumo();
            }
        });
    });

    campoCep.addEventListener("input", () => {
        let valor = limparCep(campoCep.value).slice(0, 8);

        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
        }

        campoCep.value = valor;
        atualizarResumo();
    });

    campoCep.addEventListener("blur", buscarCep);

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        mensagemFormulario.textContent = "";

        if (!validarFormulario()) {
            mensagemFormulario.textContent = "Preencha todos os campos obrigatórios.";
            mensagemFormulario.style.color = "#d9534f";
            ocultarResumo();
            return;
        }

        mostrarResumo();
        mensagemFormulario.textContent = "Resumo pronto! Confira os dados antes de confirmar.";
        mensagemFormulario.style.color = "#198754";
    });

    botaoConfirmar.addEventListener("click", () => {
        if (!validarFormulario()) {
            mensagemFormulario.textContent = "Preencha os campos antes de confirmar.";
            mensagemFormulario.style.color = "#d9534f";
            return;
        }

        salvarAgendamento();
        formulario.reset();
        mensagemFormulario.textContent = "";
        atualizarResumo();
        ocultarResumo();
        modalConfirmacao.classList.remove("oculto");
    });

    function fecharConfirmacao() {
        modalConfirmacao.classList.add("oculto");
    }

    botaoFecharModal.addEventListener("click", fecharConfirmacao);
    modalConfirmacao.addEventListener("click", (evento) => {
        if (evento.target === modalConfirmacao) {
            fecharConfirmacao();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && !modalConfirmacao.classList.contains("oculto")) {
            fecharConfirmacao();
        }
    });

    document.querySelectorAll(".formulario, .planta").forEach((elemento, indice) => {
        elemento.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 650 + indice * 120, easing: "ease-out" }
        );
    });

    document.querySelectorAll(".botao").forEach((botao) => {
        botao.addEventListener("pointerenter", () => { botao.style.opacity = "0.9"; });
        botao.addEventListener("pointerleave", () => { botao.style.opacity = "1"; });
    });

    document.querySelectorAll("input, select, textarea").forEach((campo) => {
        campo.addEventListener("focus", () => {
            campo.style.boxShadow = "0 0 10px rgba(79, 132, 171, 0.4)";
        });
        campo.addEventListener("blur", () => {
            campo.style.boxShadow = "";
        });
    });

    atualizarResumo();
}
