const API_URL = "http://localhost:3000";

const perfilNome = document.getElementById("perfil-nome");
const perfilId = document.getElementById("perfil-id");
const perfilBio = document.getElementById("perfil-bio");
const perfilJogos = document.getElementById("perfil-jogos");
const perfilAvatar = document.getElementById("perfil-avatar");
const avatarPlaceholder = document.getElementById("avatar-placeholder");
const perfilBanner = document.getElementById("perfil-banner");
const btnEditarPerfil = document.getElementById("btn-editar-perfil");

let usuarioLogadoId = "";
let perfilVisualizadoId = "";

async function carregarPerfilVisualizacao() {
    try {
        const responseLogado = await fetch(`${API_URL}/current_user_id`);
        if (responseLogado.ok) {
            const textoLogadoId = await responseLogado.text();
            usuarioLogadoId = textoLogadoId.replace(/"/g, '').trim();
        }
        
        if (!usuarioLogadoId) usuarioLogadoId = "u0";

        const urlParams = new URLSearchParams(window.location.search);
        perfilVisualizadoId = urlParams.get('id') || usuarioLogadoId;

        const responseUser = await fetch(`${API_URL}/users/${perfilVisualizadoId}`);
        
        if (responseUser.ok) {
            const dadosUsuario = await responseUser.json();

            perfilNome.textContent = dadosUsuario.username || "Usuário sem Nome";
            perfilId.textContent = `id: ${dadosUsuario.id || "..."}`;

            if (dadosUsuario.avatar) {
                perfilAvatar.src = dadosUsuario.avatar;
                perfilAvatar.style.display = "block";
                avatarPlaceholder.style.display = "none";
            } else {
                perfilAvatar.style.display = "none";
                avatarPlaceholder.style.display = "flex";
            }

            if (dadosUsuario.banner) {
                perfilBanner.style.backgroundImage = `url('${dadosUsuario.banner}')`;
            } else {
                perfilBanner.style.backgroundImage = "none";
                perfilBanner.style.backgroundColor = "#3a3a3a"; 
            }

            if (dadosUsuario.bio) {
                perfilBio.textContent = dadosUsuario.bio;
                perfilBio.className = "letra_cor_rosa -50 m-0 fs-5";
            } else {
                perfilBio.textContent = "Nenhuma biografia informada ainda.";
            }

            perfilJogos.innerHTML = ""; 
            const favoritos = dadosUsuario.jogos_favoritos || [];
            
            
            if (favoritos.length > 0) {
                favoritos.forEach(jogo => {
                    const badge = document.createElement("span");
                    badge.className = "letra_cor_rosa boda_rosa rounded-5 p-2 m-1 bg_roxo";
                    badge.textContent = jogo;
                    perfilJogos.appendChild(badge);
                });
            } else {
                perfilJogos.innerHTML = '<span class="text-muted">Nenhum jogo selecionado.</span>';
            }

            if (perfilVisualizadoId === usuarioLogadoId) {
                btnEditarPerfil.style.display = "inline-block"; 
            } else {
                btnEditarPerfil.style.display = "none";
            }

        } else {
            alert("Perfil de usuário não encontrado no banco de dados.");
        }

    } catch (error) {
        console.error("Erro ao processar dados do perfil:", error);
        alert("Erro de conexão ao carregar a visualização do perfil.");
    }
}

function inicializarMenuLateral() {
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

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarPerfilVisualizacao();
    inicializarMenuLateral();
});