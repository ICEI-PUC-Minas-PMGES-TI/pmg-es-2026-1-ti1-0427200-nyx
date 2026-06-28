const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImage = document.getElementById("modalImage");
const membersList = document.getElementById("membersList");
const gamesList = document.getElementById("gamesList");

document.addEventListener('DOMContentLoaded', () => {

    const menu = document.getElementById('global-menu');
    const overlay = document.getElementById('menu-overlay');
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.getElementById('close-menu');

    if (openBtn && menu && overlay) {
        openBtn.addEventListener('click', () => {
            menu.classList.add('open');
            overlay.classList.add('show');
            openBtn.style.display = 'none';
        });

        const closeMenu = () => {
            menu.classList.remove('open');
            overlay.classList.remove('show');
            openBtn.style.display = 'flex';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
    }

    carregarComunidade();
});
async function carregarComunidade(){

    try{

        const response = await fetch("comunidade.json");
        const comunidade = await response.json();
        renderizarComunidade(comunidade);

    }catch(error){

        console.log("Erro ao carregar JSON:", error);

    }

}

function renderizarComunidade(comunidade){

    modalTitle.textContent = comunidade.nome;
    modalDesc.textContent = comunidade.descricao;
    modalImage.src = comunidade.imagem;
    membersList.innerHTML = "";
    gamesList.innerHTML = "";

    comunidade.membros.forEach(membro => {

        membersList.innerHTML += `

            <div class="item">

                <img src="${membro.foto}">
                <span>${membro.nome}</span>

            </div>

        `;

    });

    comunidade.jogos.forEach(jogo => {

        gamesList.innerHTML += `

            <div class="item">

                <img src="${jogo.foto}">
                <span>${jogo.nome}</span>

            </div>

        `;

    });

}

carregarComunidade();