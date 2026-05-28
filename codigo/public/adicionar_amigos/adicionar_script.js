const API_BASE = window.location.protocol === 'file:' ? 'http://localhost:3000' : window.location.origin;
const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=amigo';

// estado da aplicação
const state = {
  currentUserId: null,
  users: []
};

// referências aos elementos do DOM
const elements = {
  menu:          document.getElementById('global-menu'),
  overlay:       document.getElementById('menu-overlay'),
  openMenu:      document.getElementById('open-menu'),
  closeMenu:     document.getElementById('close-menu'),
  topbarAvatar:  document.getElementById('topbar-avatar'),
  topbarUsername:document.getElementById('topbar-username'),
  menuAvatar:    document.getElementById('menu-avatar'),
  menuUsername:  document.getElementById('menu-username'),
  menuBio:       document.getElementById('menu-bio')
};

// requisição genérica para a API
async function request(path, options = {}) {
  const config = {
    method: options.method || 'GET',
    headers: options.headers ? { ...options.headers } : {}
  };

  if (options.body) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE}${path}`, config);

  if (!response.ok) throw new Error(`Erro ${response.status} ao acessar ${path}`);
  if (response.status === 204) return null;

  return response.json();
}

function getUserById(id) {
  return state.users.find(u => String(u.id) === String(id));
}

// preenche topbar e menu lateral com o usuário atual
function populateCurrentUser() {
  const me = getUserById(state.currentUserId);

  if (!me) {
    elements.topbarUsername.textContent = 'Usuário não encontrado';
    elements.menuUsername.textContent = 'Usuário não encontrado';
    return;
  }

  elements.topbarAvatar.src = me.avatar || DEFAULT_AVATAR;
  elements.topbarUsername.textContent = me.username;
  elements.menuAvatar.src = me.avatar || DEFAULT_AVATAR;
  elements.menuUsername.textContent = me.username;
  elements.menuBio.textContent = me.bio || 'Sem bio cadastrada.';
}

// carrega sessão e usuários da API
async function loadData() {
  try {
    const [session, users] = await Promise.all([
      request('/session'),
      request('/users')
    ]);

    state.currentUserId = session.current_user_id;
    state.users = users;

    populateCurrentUser();
  } catch (error) {
    console.error(error);
    elements.topbarUsername.textContent = 'API indisponível';
    elements.menuUsername.textContent = 'API indisponível';
  }
}

// abre o menu lateral
function openMenu() {
  elements.menu.classList.add('open');
  elements.overlay.classList.add('show');
}

// fecha o menu lateral
function closeMenu() {
  elements.menu.classList.remove('open');
  elements.overlay.classList.remove('show');
}

// registra todos os eventos
function initEvents() {
  elements.openMenu.addEventListener('click', openMenu);
  elements.closeMenu.addEventListener('click', closeMenu);
  elements.overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  loadData();
});
