function checarLogin() {
    const usuarioEstaLogado = false; 
    
    if (!usuarioEstaLogado) {
        document.getElementById('modal-login').classList.add('show');
        return false;
    }
    return true;
}

const botaoFecharLogin = document.getElementById('fechar-modal-login');
if (botaoFecharLogin) {
    botaoFecharLogin.addEventListener('click', () => {
        document.getElementById('modal-login').classList.remove('show');
    });
}

const overlay = document.getElementById('menu-overlay');
const menu = document.getElementById('global-menu');
document.getElementById('open-menu').addEventListener('click', () => { menu.classList.add('open'); overlay.classList.add('show'); });
document.getElementById('close-menu').addEventListener('click', fecharMenu);
overlay.addEventListener('click', fecharMenu);
function fecharMenu() { menu.classList.remove('open'); overlay.classList.remove('show'); }

async function carregarDados() {
    try {
        const resNoticias = await fetch('http://localhost:3000/noticias');
        const noticias = await resNoticias.json();
        renderizarNoticias(noticias);

        const resDiscussoes = await fetch('http://localhost:3000/discussoes');
        const discussoes = await resDiscussoes.json();
        renderizarDiscussoes(discussoes);
    } catch (error) {
        console.error("Erro ao conectar no JSON Server", error);
    }
}

function renderizarNoticias(noticias) {
    const container = document.getElementById('container-noticias');
    container.innerHTML = noticias.map(n => `
        <div class="card-noticia">
            <img src="${n.imagem}" class="img-noticia" alt="${n.titulo}">
            <div class="texto-noticia">
                <h3>${n.titulo}</h3><p>${n.resumo}</p>
            </div>
        </div>
    `).join('');
}

function renderizarDiscussoes(discussoes) {
    const container = document.getElementById('container-discussoes');
    container.innerHTML = discussoes.map(d => `
        <div class="card-discussao" onclick="clicarTopico()">
            <div class="cabecalho-discussao">
                <div class="avatar-mini"></div>
                <div class="info-usuario">
                    <span class="nome-user">${d.autor}</span>
                    <span class="data-post">${d.data}</span>
                </div>
            </div>
            <p class="texto-discussao">${d.texto}</p>
        </div>
    `).join('');
}

function clicarTopico() {
    if(checarLogin()) {
        alert("Redirecionando para a página do tópico...");
    }
}

document.getElementById('barra-pesquisa').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.card-noticia, .card-discussao').forEach(cartao => {
        const texto = cartao.innerText.toLowerCase();
        cartao.style.display = texto.includes(termo) ? '' : 'none';
    });
});

const modalNovoTopico = document.getElementById('modal-novo-topico');
document.getElementById('btn-novo-topico').addEventListener('click', () => {
    if (checarLogin()) modalNovoTopico.classList.add('show');
});
document.getElementById('fechar-modal-topico').addEventListener('click', () => modalNovoTopico.classList.remove('show'));

document.getElementById('form-novo-topico').addEventListener('submit', async (e) => {
    e.preventDefault();
    const texto = document.getElementById('texto-topico').value;

    const novaDiscussao = {
        autor: "Visitante",
        data: "Agora mesmo",
        texto: texto
    };

    await fetch('http://localhost:3000/discussoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaDiscussao)
    });

    modalNovoTopico.classList.remove('show');
    carregarDados();
});

carregarDados();