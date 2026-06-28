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

const caixaUpload = document.getElementById('gatilho-upload');
const inputArquivo = document.getElementById('input-arquivo');   
caixaUpload.addEventListener('click', () => inputArquivo.click());
inputArquivo.addEventListener('change', () => {
    if (inputArquivo.files.length > 0) {
        caixaUpload.querySelector('span').innerText = `📌 ${inputArquivo.files.length} arquivo(s) selecionado(s)!`;
    }
});

const formulario = document.getElementById('form-denuncia');
const toastErro = document.getElementById('toast-erro');
const modalSucesso = document.getElementById('modal-sucesso');

formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault(); 

    if (!checarLogin()) return;

    const tag = document.getElementById('tag').value.trim();
    const local = document.getElementById('local').value.trim();
    const checkboxes = document.querySelectorAll('input[name="causa"]:checked');
    
    if (tag === '' || local === '' || checkboxes.length === 0) {
        toastErro.classList.add('mostrar');
        setTimeout(() => toastErro.classList.remove('mostrar'), 3500);
        return;
    }

    let categorias = [];
    checkboxes.forEach(chk => categorias.push(parseInt(chk.value)));
    const outroEspecificacao = document.getElementById('causa_outro').value;

    const novaDenuncia = {
        tag_denunciado: tag,
        local_ocorrencia: local,
        categoria_ids: categorias,
        especificacao_outro: categorias.includes(5) ? outroEspecificacao : null,
        data_envio: new Date().toISOString().split('T')[0],
        status: "pendente"
    };

    try {
        await fetch('http://localhost:3000/denuncias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaDenuncia)
        });
        
        modalSucesso.classList.add('show'); 
    } catch (error) {
        console.error("Erro ao salvar no JSON Server", error);
        alert("Erro de conexão com o banco de dados.");
    }
});

document.getElementById('fechar-modal').addEventListener('click', () => {
    modalSucesso.classList.remove('show'); 
    formulario.reset();
    caixaUpload.querySelector('span').innerText = "Clique para adicionar imagens / Vídeos";
});