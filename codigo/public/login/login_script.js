const API_BASE = 'http://localhost:3000';

// requisição genérica para a API
async function request(path, options = {}) {
  const config = { method: options.method || 'GET', headers: {} };

  if (options.body !== undefined) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE}${path}`, config);
  if (!response.ok) throw new Error(`Erro ${response.status} em ${path}`);
  return response.json();
}

// exibe mensagem de feedback
function setFeedback(message, type = 'error') {
  const el = document.getElementById('feedback');
  if (!el) return;
  el.textContent = message;
  el.className = `feedback ${type}`;
}

// marca campo como inválido
function markInvalid(id) {
  document.getElementById(id)?.classList.add('invalid');
}

// remove marcação de inválido
function clearInvalid(id) {
  document.getElementById(id)?.classList.remove('invalid');
}

// salva sessão e redireciona
async function startSession(user) {
  await request('/session', {
    method: 'PATCH',
    body: { current_user_id: user.id }
  });

  sessionStorage.setItem('current_user', JSON.stringify({
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    bio: user.bio
  }));

  window.location.href = '../modulos/tela-forum/forum.html';
}

// guard: redireciona se já estiver logado
function checkAlreadyLoggedIn() {
  if (sessionStorage.getItem('current_user')) window.location.href = '../modulos/tela-forum/forum.html';
}

// mostrar/ocultar senha
function initPasswordToggle() {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;

      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');

      btn.querySelector('.eye-icon').innerHTML = isHidden
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
           <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
           <line x1="1" y1="1" x2="23" y2="23"/>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
    });
  });
}

// lógica de login
function initLogin() {
  const btnLogin  = document.getElementById('btn-login');
  const inputUser = document.getElementById('username');
  const inputPass = document.getElementById('password');

  if (!btnLogin) return;

  inputUser?.addEventListener('input', () => clearInvalid('username'));
  inputPass?.addEventListener('input', () => clearInvalid('password'));

  btnLogin.addEventListener('click', async () => {
    const username = inputUser?.value.trim() || '';
    const password = inputPass?.value || '';

    if (!username) { setFeedback('Preencha o nome de usuário.'); markInvalid('username'); return; }
    if (!password) { setFeedback('Preencha a senha.'); markInvalid('password'); return; }

    btnLogin.disabled = true;
    setFeedback('Verificando...', 'success');

    try {
      const results = await request(`/users?username=${encodeURIComponent(username)}`);

      if (!results?.length) {
        setFeedback('Usuário não encontrado.');
        markInvalid('username');
        btnLogin.disabled = false;
        return;
      }

      if (results[0].password !== password) {
        setFeedback('Senha incorreta.');
        markInvalid('password');
        btnLogin.disabled = false;
        return;
      }

      setFeedback('Entrando...', 'success');
      await startSession(results[0]);

    } catch {
      setFeedback('Não foi possível conectar ao servidor. Verifique se o JSON Server está rodando.');
      btnLogin.disabled = false;
    }
  });

  [inputUser, inputPass].forEach(input =>
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') btnLogin.click(); })
  );
}

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  checkAlreadyLoggedIn();
  initLogin();
  initPasswordToggle();
});
