const API_BASE = 'http://localhost:3000';

// gera um id único para novos usuários
function generateId() {
  return 'u_' + Date.now().toString(36);
}

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

// lógica de cadastro
function initCadastro() {
  const btnRegister  = document.getElementById('btn-register');
  const inputUser    = document.getElementById('reg-username');
  const inputBio     = document.getElementById('reg-bio');
  const inputPass    = document.getElementById('reg-password');
  const inputConfirm = document.getElementById('reg-confirm');

  if (!btnRegister) return;

  inputUser?.addEventListener('input',    () => clearInvalid('reg-username'));
  inputPass?.addEventListener('input',    () => clearInvalid('reg-password'));
  inputConfirm?.addEventListener('input', () => clearInvalid('reg-confirm'));

  btnRegister.addEventListener('click', async () => {
    const username = inputUser?.value.trim() || '';
    const bio      = inputBio?.value.trim()  || '';
    const password = inputPass?.value        || '';
    const confirm  = inputConfirm?.value     || '';

    if (!username)          { setFeedback('Escolha um nome de usuário.'); markInvalid('reg-username'); return; }
    if (username.length < 3){ setFeedback('O usuário precisa ter pelo menos 3 caracteres.'); markInvalid('reg-username'); return; }
    if (!password)          { setFeedback('Crie uma senha.'); markInvalid('reg-password'); return; }
    if (password.length < 6){ setFeedback('A senha precisa ter pelo menos 6 caracteres.'); markInvalid('reg-password'); return; }
    if (password !== confirm){ setFeedback('As senhas não coincidem.'); markInvalid('reg-confirm'); return; }

    btnRegister.disabled = true;
    setFeedback('Verificando disponibilidade...', 'success');

    try {
      const existing = await request(`/users?username=${encodeURIComponent(username)}`);

      if (existing?.length > 0) {
        setFeedback('Esse nome de usuário já está em uso.');
        markInvalid('reg-username');
        btnRegister.disabled = false;
        return;
      }

      const newUser = {
        id: generateId(),
        username,
        password,
        bio: bio || 'Sem bio ainda.',
        avatar: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(username)}`,
        is_online: true,
        interesses: [],
        friends: []
      };

      const created = await request('/users', { method: 'POST', body: newUser });

      setFeedback('Conta criada! Entrando...', 'success');
      await startSession(created);

    } catch {
      setFeedback('Não foi possível conectar ao servidor. Verifique se o JSON Server está rodando.');
      btnRegister.disabled = false;
    }
  });

  [inputUser, inputBio, inputPass, inputConfirm].forEach(input =>
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') btnRegister.click(); })
  );
}

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  checkAlreadyLoggedIn();
  initCadastro();
  initPasswordToggle();
});
