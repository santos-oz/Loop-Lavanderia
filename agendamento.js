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

const selectServico = document.getElementById("servico");

// adiciona as opções automaticamente
listaServicos.forEach(servico => {
    const option = document.createElement("option");

    option.value = servico.nome;
    option.textContent = servico.nome;
    selectServico.appendChild(option);
});

// categorias do form
const campoData = document.getElementById("data");
const campoHorario = document.getElementById("horario");
const campoEndereco = document.getElementById("endereco");
const campoCep = document.getElementById("cep");

// Mantém todo o campo de serviço clicável, incluindo a área do ícone.
const cardServico = selectServico.closest(".input-servico");

if (cardServico) {
    cardServico.addEventListener("click", event => {
        if (event.target === selectServico) {
            return;
        }

        selectServico.focus();

        if (typeof selectServico.showPicker === "function") {
            selectServico.showPicker();
        }
    });
}

// Permite abrir o seletor clicando em qualquer parte dos campos de data e hora.
[campoData, campoHorario].forEach(campo => {
    const abrirSeletor = () => {
        campo.focus();

        if (typeof campo.showPicker === "function") {
            campo.showPicker();
        }
    };

    campo.addEventListener("click", abrirSeletor);

    const cardCampo = campo.closest(".input-data-hora");
    if (cardCampo) {
        cardCampo.addEventListener("click", event => {
            if (event.target !== campo) {
                abrirSeletor();
            }
        });
    }
});

// resumo
const resumoServico = document.getElementById("resumoServico");
const resumoData = document.getElementById("resumoData");
const resumoHorario = document.getElementById("resumoHorario");
const resumoEndereco = document.getElementById("resumoEndereco");
const resumoCep = document.getElementById("resumoCep");
const iconeResumoServico = document.getElementById("iconeResumoServico");

// atualiza o resumo do pedido
function atualizarResumo() {
    resumoServico.textContent =
        selectServico.value || "Não selecionado";

    resumoData.textContent =
        campoData.value || "--";

    resumoHorario.textContent =
        campoHorario.value || "--";

    resumoEndereco.textContent =
        campoEndereco.value || "--";

    resumoCep.textContent =
        campoCep.value || "--";

    const servicoSelecionado = listaServicos.find(
        servico => servico.nome === selectServico.value
    );

    iconeResumoServico.className = servicoSelecionado
        ? servicoSelecionado.icone
        : "bi bi-basket2";
}

selectServico.addEventListener("change", atualizarResumo);
campoData.addEventListener("input", atualizarResumo);
campoHorario.addEventListener("input", atualizarResumo);
campoEndereco.addEventListener("input", atualizarResumo);
campoCep.addEventListener("input", atualizarResumo);

//formulário
const formulario = document.getElementById("formAgendamento");
const mensagemFormulario = document.getElementById("mensagemFormulario");
const btnConfirmar = document.getElementById("btnConfirmar");

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

    const camposObrigatorios = [
        campoData,
        campoHorario,
        selectServico,
        campoEndereco
    ];

    camposObrigatorios.forEach(campo => {

        if (campo.value.trim() === "") {
            mostrarErro(campo);
            formularioValido = false;
        } else {
            removerErro(campo);
        }
    });

    return formularioValido;
}

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    mensagemFormulario.textContent = "";

    if(!validarFormulario()){
        mensagemFormulario.textContent =
        "Preencha todos os campos obrigatórios.";
        mensagemFormulario.style.color = "#d9534f";
        return;
    }

    mensagemFormulario.textContent =
    "Acompanhe o resumo do pedido e Clique em Confirmar Agendamento.";
    mensagemFormulario.style.color = "#198754";
});

const campos = [
    campoData,
    campoHorario,
    campoEndereco,
    campoCep,
    selectServico
];

campos.forEach(campo => {
    campo.addEventListener("input", function(){
        removerErro(campo);
    });

    campo.addEventListener("change", function(){
        removerErro(campo);
    });
});

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

        if (dados.erro) {
            throw new Error("CEP não encontrado.");
        }

       campoEndereco.value = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}`;

atualizarResumo();

// limpa qualquer mensagem do formulário
mensagemFormulario.textContent = "";
    }

    catch (erro) {
        mensagemFormulario.textContent = erro.message;
        mensagemFormulario.style.color = "#d9534f";
    }
}

campoCep.addEventListener("blur", buscarCep);
campoCep.addEventListener("input", function () {
    let valor = campoCep.value.replace(/\D/g, "");

    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    campoCep.value = valor;
});

const modal = document.getElementById("modalConfirmacao");
const fecharModal = document.getElementById("fecharModal");

function salvarAgendamento() {
    const agendamento = {
        servico: selectServico.value,
        data: campoData.value,
        horario: campoHorario.value,
        endereco: campoEndereco.value,
        cep: campoCep.value,
        observacoes: document.getElementById("observacoes").value
    };

    localStorage.setItem(
        "agendamentoLoop",
        JSON.stringify(agendamento)
    );
}

btnConfirmar.addEventListener("click", function () {
    if (!validarFormulario()) {
        mensagemFormulario.textContent =
        "Preencha os campos antes de confirmar.";
        mensagemFormulario.style.color = "#d9534f";
        return;
    }
    
    salvarAgendamento();
    formulario.reset();
    mensagemFormulario.textContent = "";
    campoCep.value = "";
    atualizarResumo();
    modal.classList.remove("oculto");
});

fecharModal.addEventListener("click", function () {
    modal.classList.add("oculto");
});

//JQuery
$(document).ready(function () {
    $(".formulario").hide().fadeIn(800);
    $(".resumo").hide().delay(250).fadeIn(800);
    $(".planta").hide().fadeIn(1200);
});

$(".botao").hover(
    function () {
        $(this).stop().animate({
            opacity: 0.9
        },150);
    },

    function () {
        $(this).stop().animate({
            opacity:1
        },150);
    }
);

$("input, select, textarea").focus(function(){
    $(this).css({
        "box-shadow":"0 0 10px rgba(79,132,171,.4)"
    });
});

$("input, select, textarea").blur(function(){
    $(this).css({
        "box-shadow":""
    });
});

