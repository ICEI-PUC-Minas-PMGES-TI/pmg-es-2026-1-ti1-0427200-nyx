// =============================
// MENU
// =============================

document.addEventListener('DOMContentLoaded', () => {

    const menu = document.getElementById('global-menu');

    const overlay = document.getElementById('menu-overlay');

    const openBtn = document.getElementById('open-menu');

    const closeBtn = document.getElementById('close-menu');

    if (openBtn && menu && overlay) {

        openBtn.addEventListener('click', () => {

            menu.classList.add('open');

            overlay.classList.add('show');

        });

        const closeMenu = () => {

            menu.classList.remove('open');

            overlay.classList.remove('show');

        };

        if (closeBtn){

            closeBtn.addEventListener('click', closeMenu);

        }

        overlay.addEventListener('click', closeMenu);

    }

});


// =============================
// POPUPS PRINCIPAIS
// =============================

const popupSeguranca =
document.getElementById("popup-seguranca");

const popupPrivacidade =
document.getElementById("popup-privacidade");

const popupNotificacao =
document.getElementById("popup-notificacao");

const popupConta =
document.getElementById("popup-conta");


// =============================
// ABRIR POPUPS
// =============================

document.getElementById("btn-seguranca")
.addEventListener("click", () => {

    popupSeguranca.classList.add("active");

});

document.getElementById("btn-privacidade")
.addEventListener("click", () => {

    popupPrivacidade.classList.add("active");

});

document.getElementById("btn-notificacao")
.addEventListener("click", () => {

    popupNotificacao.classList.add("active");

});

document.getElementById("btn-conta")
.addEventListener("click", () => {

    popupConta.classList.add("active");

});


// =============================
// FECHAR TODOS
// =============================

document.querySelectorAll(".fechar")
.forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelectorAll(".popup")
        .forEach(popup => {

            popup.classList.remove("active");

        });

    });

});


// =============================
// FECHAR AO CLICAR FORA
// =============================

document.querySelectorAll(".popup")
.forEach(popup => {

    popup.addEventListener("click", (e) => {

        if(e.target === popup){

            popup.classList.remove("active");

        }

    });

});


// =============================
// CARREGAR JSON
// =============================

let dadosGlobais;

async function carregarDados() {

    const response =
    await fetch("users.json");

    dadosGlobais =
    await response.json();

    carregarPerfil();

}

carregarDados();


// =============================
// PEGAR USUÁRIO
// =============================

function pegarUsuario(){

    if(!dadosGlobais){

        return null;

    }

    const currentId =
    dadosGlobais.current_user_id;

    return dadosGlobais.users.find(
        user => user.id === currentId
    );

}


// =============================
// PERFIL
// =============================

function carregarPerfil(){

    const usuario = pegarUsuario();

    const perfil =
    document.getElementById("perfil");

    perfil.innerHTML = `

        <div class="card-user">

            <img src="${usuario.avatar}" class="avatar">

            <h2>${usuario.username}</h2>

            <p>${usuario.bio}</p>

            <p>
                Online:
                ${usuario.is_online
                    ? "🟢 Sim"
                    : "🔴 Não"}
            </p>

            <h3>Jogos Favoritos</h3>

            <ul>

                ${usuario.jogos_favoritos.map(jogo =>

                    `<li>${jogo}</li>`

                ).join("")}

            </ul>

        </div>

    `;

}


// =============================
// POPUP INFO
// =============================

const popupInfo =
document.getElementById("popup-info");

const tituloInfo =
document.getElementById("titulo-info");

const conteudoInfo =
document.getElementById("conteudo-info");

const fecharInfo =
document.getElementById("fechar-info");


fecharInfo.addEventListener("click", () => {

    popupInfo.classList.remove("active");

});


function abrirInfo(titulo, conteudo){

    tituloInfo.innerHTML = titulo;

    conteudoInfo.innerHTML = conteudo;

    popupInfo.classList.add("active");

}


// =============================
// SENHA
// =============================

document.getElementById("btn-senha")
.addEventListener("click", () => {

    abrirInfo(

        "Alterar Senha",

        `
        <div class="info-card">

            <input
                type="password"
                id="nova-senha"
                placeholder="Digite a nova senha"
                class="input-popup"
            >

            <button
                class="acao-popup"
                onclick="alterarSenha()"
            >
                Salvar Nova Senha
            </button>

            <p id="status-senha"></p>

        </div>
        `
    );

});

function alterarSenha(){

    const senha =
    document.getElementById("nova-senha").value;

    const status =
    document.getElementById("status-senha");

    if(senha.length < 4){

        status.innerHTML =
        "Senha muito curta.";

        return;

    }

    status.innerHTML =
    "Senha alterada com sucesso.";

}



// =============================
// 2 FATORES
// =============================

let verificacao2f = true;

document.getElementById("btn-2fa")
.addEventListener("click", () => {

    abrirInfo(

        "Verificação em 2 Etapas",

        `
        <div class="info-card">

            <p id="status-2fa">

                ${
                    verificacao2f
                    ? "2FA Ativado"
                    : "2FA Desativado"
                }

            </p>

            <button
                class="acao-popup"
                onclick="toggle2FA()"
            >

                ${
                    verificacao2f
                    ? "Desativar"
                    : "Ativar"
                }

            </button>

        </div>
        `
    );

});

function toggle2FA(){

    verificacao2f = !verificacao2f;

    document.getElementById("status-2fa")
    .innerHTML =

    verificacao2f
    ? "2FA Ativado"
    : "2FA Desativado";

}



// =============================
// HISTÓRICO LOGIN
// =============================

document.getElementById("btn-login")
.addEventListener("click", () => {

    abrirInfo(

        "Histórico de Login",

        `
        <div class="info-card historico-box">

            <div class="login-item">

                <h3>Windows PC</h3>

                <p>Belo Horizonte - MG</p>

                <span>Hoje às 14:20</span>

            </div>

            <div class="login-item">

                <h3>Samsung A54</h3>

                <p>São Paulo - SP</p>

                <span>Ontem às 23:10</span>

            </div>

            <div class="login-item">

                <h3>Notebook Gamer</h3>

                <p>Rio de Janeiro - RJ</p>

                <span>2 dias atrás</span>

            </div>

        </div>
        `
    );

});



// =============================
// PRIVACIDADE
// =============================

document.getElementById("btn-dados")
.addEventListener("click", () => {

    abrirInfo(

        "Controle de Dados",

        `
        <div class="info-card">

            <div class="toggle-item">

                <span>Compartilhar Dados</span>

                <input type="checkbox" checked>

            </div>

            <div class="toggle-item">

                <span>Cookies Personalizados</span>

                <input type="checkbox">

            </div>

            <div class="toggle-item">

                <span>Permitir Rastreamento</span>

                <input type="checkbox">

            </div>

        </div>
        `
    );

});



// =============================
// NOTIFICAÇÕES
// =============================

let notificacoes = {

    disponibilidade: true,

    mensagens: true,

    posts: false

};


// DISPONIBILIDADE

document.getElementById("btn-disponibilidade")
.addEventListener("click", () => {

    abrirInfo(

        "Disponibilidade",

        `
        <div class="info-card">

            <p id="status-disponibilidade">

                ${
                    notificacoes.disponibilidade
                    ? "Ativado"
                    : "Desativado"
                }

            </p>

            <button
                class="acao-popup"
                onclick="toggleDisponibilidade()"
            >

                Ativar / Desativar

            </button>

        </div>
        `
    );

});


function toggleDisponibilidade(){

    notificacoes.disponibilidade =
    !notificacoes.disponibilidade;

    document.getElementById(
        "status-disponibilidade"
    ).innerHTML =

    notificacoes.disponibilidade
    ? "Ativado"
    : "Desativado";

}



// MENSAGENS

document.getElementById("btn-mensagens")
.addEventListener("click", () => {

    abrirInfo(

        "Mensagens",

        `
        <div class="info-card">

            <p id="status-mensagens">

                ${
                    notificacoes.mensagens
                    ? "Ativado"
                    : "Desativado"
                }

            </p>

            <button
                class="acao-popup"
                onclick="toggleMensagens()"
            >

                Ativar / Desativar

            </button>

        </div>
        `
    );

});


function toggleMensagens(){

    notificacoes.mensagens =
    !notificacoes.mensagens;

    document.getElementById(
        "status-mensagens"
    ).innerHTML =

    notificacoes.mensagens
    ? "Ativado"
    : "Desativado";

}



// POSTS

document.getElementById("btn-posts")
.addEventListener("click", () => {

    abrirInfo(

        "Posts",

        `
        <div class="info-card">

            <p id="status-posts">

                ${
                    notificacoes.posts
                    ? "Ativado"
                    : "Desativado"
                }

            </p>

            <button
                class="acao-popup"
                onclick="togglePosts()"
            >

                Ativar / Desativar

            </button>

        </div>
        `
    );

});


function togglePosts(){

    notificacoes.posts =
    !notificacoes.posts;

    document.getElementById(
        "status-posts"
    ).innerHTML =

    notificacoes.posts
    ? "Ativado"
    : "Desativado";

}



// =============================
// DISPOSITIVOS
// =============================

const popupDispositivos =
document.getElementById("popup-dispositivos");

const listaDispositivos =
document.getElementById("lista-dispositivos");

const fecharDispositivos =
document.getElementById("fechar-dispositivos");


// ABRIR

document.getElementById("btn-dispositivos")
.addEventListener("click", () => {

    popupDispositivos.classList.add("active");

    mostrarDispositivos();

});


// FECHAR

fecharDispositivos.addEventListener("click", () => {

    popupDispositivos.classList.remove("active");

});


// MOSTRAR

function mostrarDispositivos() {

    const usuario = pegarUsuario();

    if (!usuario.dispositivos) {

        listaDispositivos.innerHTML = `

            <p>
                Nenhum dispositivo encontrado.
            </p>

        `;

        return;

    }

    listaDispositivos.innerHTML = "";

    usuario.dispositivos.forEach((device, index) => {

        listaDispositivos.innerHTML += `

            <div class="device-card">

                <div>

                    <h3>${device.nome}</h3>

                    <p>

                        ${
                            device.online
                            ? "🟢 Online"
                            : "⚫ Offline"
                        }

                    </p>

                </div>

                <button onclick="removerDispositivo(${index})">

                    Remover

                </button>

            </div>

        `;

    });

}


// REMOVER

function removerDispositivo(index) {

    const usuario = pegarUsuario();

    usuario.dispositivos.splice(index, 1);

    mostrarDispositivos();

}