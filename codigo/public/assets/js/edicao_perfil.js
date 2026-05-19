const API_URL = "http://localhost:3000";

const form = document.getElementById("form-perfil");
const nomeInput = document.getElementById("nome");
const displayId = document.getElementById("display-id");
const bioInput = document.getElementById("bio");
const checkboxes = document.querySelectorAll('#interesses-group input[type="checkbox"]');

const inputFoto = document.getElementById("input-foto");
const imgFoto = document.getElementById("img-foto");
const txtFoto = document.getElementById("txt-foto");

const inputBanner = document.getElementById("input-banner");
const imgBanner = document.getElementById("img-banner");
const txtBanner = document.getElementById("txt-banner");

const btnCancelar = document.getElementById("btn-cancelar");
const btnExcluir = document.getElementById("btn-excluir"); 

let currentUserId = "";
let isEditMode = false; 
let fotoBase64 = "";
let bannerBase64 = "";

// 1. CARREGAR DADOS DO SERVIDOR
async function carregarPerfil() {
    try {
        const responseId = await fetch(`${API_URL}/current_user_id`);
        if (!responseId.ok) throw new Error("Erro ao buscar o ID do usuário ativo.");

        const textoId = await responseId.text();
        currentUserId = textoId.replace(/"/g, '').trim();

        if (!currentUserId) currentUserId = "u0";

        const responseUser = await fetch(`${API_URL}/users/${currentUserId}`);
        
        if (responseUser.ok) {
            isEditMode = true;
            const currentUserData = await responseUser.json();

            nomeInput.value = currentUserData.username || "";
            displayId.textContent = currentUserData.id || ".......";
            bioInput.value = currentUserData.bio || "";

            if (currentUserData.avatar) {
                imgFoto.src = currentUserData.avatar;
                imgFoto.style.display = "block";
                txtFoto.style.display = "none";
                fotoBase64 = currentUserData.avatar;
            } else {
                imgFoto.style.display = "none";
                txtFoto.style.display = "block";
                fotoBase64 = "";
            }

            if (currentUserData.banner) {
                imgBanner.src = currentUserData.banner;
                imgBanner.style.display = "block";
                txtBanner.style.display = "none";
                bannerBase64 = currentUserData.banner;
            } else {
                imgBanner.style.display = "none";
                txtBanner.style.display = "block";
                bannerBase64 = "";
            }

            const favoritos = currentUserData.jogos_favoritos || [];
            checkboxes.forEach(checkbox => {
                checkbox.checked = favoritos.includes(checkbox.value);
            });

        } else if (responseUser.status === 404) {
            isEditMode = false;
            displayId.textContent = currentUserId + " (Novo Perfil)";
            limparFormulario();
        }

    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        alert("Não foi possível carregar os dados do perfil. Verifique o JSONServer.");
    }
}

function limparFormulario() {
    nomeInput.value = "";
    bioInput.value = "";
    imgFoto.style.display = "none";
    txtFoto.style.display = "block";
    fotoBase64 = "";
    imgBanner.style.display = "none";
    txtBanner.style.display = "block";
    bannerBase64 = "";
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

function converterParaBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Monitores de upload de imagem
inputFoto.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            fotoBase64 = await converterParaBase64(file);
            imgFoto.src = fotoBase64;
            imgFoto.style.display = "block";
            txtFoto.style.display = "none";
        } catch (err) {
            console.error(err);
        }
    }
});

inputBanner.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            bannerBase64 = await converterParaBase64(file);
            imgBanner.src = bannerBase64;
            imgBanner.style.display = "block";
            txtBanner.style.display = "none";
        } catch (err) {
            console.error(err);
        }
    }
});

// 2. ENVIAR DADOS (CREATE ou UPDATE)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentUserId) return;

    const jogosMarcados = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            jogosMarcados.push(checkbox.value);
        }
    });

    const dadosPerfil = {
        id: currentUserId,
        username: nomeInput.value,
        avatar: fotoBase64,
        is_online: true,
        banner: bannerBase64,
        bio: bioInput.value,
        jogos_favoritos: jogosMarcados
    };

    try {
        let url = `${API_URL}/users`;
        let metodo = "POST"; 

        if (isEditMode) {
            url = `${API_URL}/users/${currentUserId}`;
            metodo = "PUT"; 
        }

        const response = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosPerfil)
        });

        if (response.ok) {
            alert(isEditMode ? "Perfil atualizado com sucesso!" : "Perfil criado com sucesso!");
            carregarPerfil();
        } else {
            throw new Error("Erro na resposta do servidor.");
        }
    } catch (error) {
        console.error("Erro ao salvar dados:", error);
        alert("Erro de conexão ao salvar.");
    }
});

// 3. EXCLUIR DADOS 
btnExcluir.addEventListener("click", async () => {
    if (!isEditMode) {
        alert("Não é possível excluir um perfil que ainda não foi salvo!");
        return;
    }

    if (confirm("Tem certeza absoluta de que deseja excluir o seu perfil? Essa ação não pode ser desfeita!")) {
        try {
            const response = await fetch(`${API_URL}/users/${currentUserId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Perfil excluído com sucesso do banco de dados!");
                limparFormulario();
                carregarPerfil(); 
            } else {
                throw new Error("Erro ao tentar deletar no servidor.");
            }
        } catch (error) {
            console.error("Erro ao excluir perfil:", error);
            alert("Erro de comunicação ao excluir o perfil.");
        }
    }
});

// SISTEMA DE MENU LATERAL

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

btnCancelar.addEventListener("click", () => {
    if (confirm("Quer mesmo cancelar e perder as alterações feitas?")) {
        carregarPerfil();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    carregarPerfil();
    inicializarMenuLateral(); 
});
