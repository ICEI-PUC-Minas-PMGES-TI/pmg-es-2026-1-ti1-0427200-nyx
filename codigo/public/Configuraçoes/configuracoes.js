
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

function salvarConfiguracao(idConfig){

    localStorage.setItem(
        "configSelecionada",
        idConfig
    );
}

document.getElementById("btn-seguranca")
.addEventListener("click", () => {

    salvarConfiguracao("seguranca");

});

document.getElementById("btn-privacidade")
.addEventListener("click", () => {

    salvarConfiguracao("privacidade");

    window.location.href = "privacidade.html";
});

document.getElementById("btn-notificacao")
.addEventListener("click", () => {

    salvarConfiguracao("notificacao");

    window.location.href = "notificacao.html";
});

document.getElementById("btn-conta")
.addEventListener("click", () => {

    salvarConfiguracao("conta");

    window.location.href = "conta.html";
});
// BOTÃO SEGURANÇA
const btnSeguranca = document.getElementById("btn-seguranca");

// POPUP
const popup = document.getElementById("popup-seguranca");

const fecharPopup = document.getElementById("fechar-popup");


// ABRIR POPUP
btnSeguranca.addEventListener("click", () => {

    popup.classList.add("active");

});

fecharPopup.addEventListener("click", () => {

    popup.classList.remove("active");

});


popup.addEventListener("click", (e) => {

    if(e.target === popup){

        popup.classList.remove("active");

    }

});
let dadosGlobais; fetch("users.json")

.then(response => response.json())

.then(data => {

    const currentId = data.current_user_id;

    const usuario = data.users.find(user => user.id === currentId);

    const perfil = document.getElementById("perfil");

    perfil.innerHTML = `

        <div class="card-user">

            <img src="${usuario.avatar}" class="avatar">

            <h2>${usuario.username}</h2>

            <p>${usuario.bio}</p>

            <p>
                Online:
                ${usuario.is_online ? "🟢 Sim" : "🔴 Não"}
            </p>

            <h3>Jogos Favoritos</h3>

            <ul>
                ${usuario.jogos_favoritos.map(jogo =>
                    `<li>${jogo}</li>`
                ).join("")}
            </ul>

        </div>

    `;

})

.catch(error => {

    console.log("Erro:", error);

});


// CARREGAR DADOS
async function carregarDados() {

    let dadosSalvos =
    localStorage.getItem("dadosUsuarios");

    if (dadosSalvos) {

        dadosGlobais = JSON.parse(dadosSalvos);

    } else {

        const response = await fetch("users.json");

        dadosGlobais = await response.json();

    }

    console.log(dadosGlobais);

}

carregarDados();
// BOTÃO
const btnDispositivos =
document.getElementById("btn-dispositivos");

// POPUP
const popupDispositivos =
document.getElementById("popup-dispositivos");

// FECHAR
const fecharDispositivos =
document.getElementById("fechar-dispositivos");

// LISTA
const listaDispositivos =
document.getElementById("lista-dispositivos");


// ABRIR POPUP
btnDispositivos.addEventListener("click", () => {

    popupDispositivos.classList.add("active");

    mostrarDispositivos();

});


// FECHAR POPUP
fecharDispositivos.addEventListener("click", () => {

    popupDispositivos.classList.remove("active");

});


function mostrarDispositivos() {

    if (!dadosGlobais) {

        console.log("dados ainda não carregados");

        return;
    }

    const currentId =
    dadosGlobais.current_user_id;

    const usuario =
    dadosGlobais.users.find(
        user => user.id === currentId
    );

    console.log(usuario);

    if (!usuario.dispositivos) {

        listaDispositivos.innerHTML = `
            <p>Nenhum dispositivo encontrado.</p>
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

                        ${device.online
                            ? "🟢 Online"
                            : "⚫ Offline"}

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

    const currentId = dadosGlobais.current_user_id;

    const usuario = dadosGlobais.users.find(
        user => user.id === currentId
    );

    usuario.dispositivos.splice(index, 1);

    localStorage.setItem(
        "dadosUsuarios",
        JSON.stringify(dadosGlobais)
    );

    mostrarDispositivos();

}