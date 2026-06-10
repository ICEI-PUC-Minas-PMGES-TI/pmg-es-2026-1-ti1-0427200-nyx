// dados locais usados como fallback quando a API não está disponível
const localData = {
  session: {
    current_user_id: "u0",
    friends: ["u1", "u2", "u3"]
  },
  users: [
    {
      id: "u0",
      username: "ShibuyaDesu",
      avatar: "https://i.pinimg.com/736x/7a/f8/54/7af854bdcc9d4fec5b0d50d34506e7c1.jpg",
      is_online: true,
      bio: "Jogadora de FPS nas horas vagas.",
      interesses: ["Gaming", "Music", "Technology", "Art"]
    },
    {
      id: "u1",
      username: "MorganaLover123",
      avatar: "https://i.pinimg.com/736x/00/91/d3/0091d3d01515a9eb769f83dbf918afd1.jpg",
      is_online: true,
      bio: "Suporte mono Morgana.",
      interesses: ["Gaming", "Music", "Art"]
    },
    {
      id: "u2",
      username: "Omae🌾🌾🌾",
      avatar: "https://media1.tenor.com/m/uGbBwhfRcZ4AAAAd/omae.gif",
      is_online: false,
      bio: "Gosto de jogos de simulação e fazendinha.",
      interesses: ["Gaming", "Photography", "Travel", "Cooking"]
    },
    {
      id: "u3",
      username: "PixelMage",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=PixelMage",
      is_online: true,
      bio: "Apaixonada por RPGs e pixel art.",
      interesses: ["Art", "Design", "Photography", "Reading"]
    },
    {
      id: "u4",
      username: "NeonDrifter",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=NeonDrifter",
      is_online: true,
      bio: "Amante de synthwave e jogos retrô.",
      interesses: ["Gaming", "Music", "Art", "Technology", "Photography"]
    },
    {
      id: "u5",
      username: "CosmoCaster",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=CosmoCaster",
      is_online: false,
      bio: "Streamer de FPS e fã de sci-fi.",
      interesses: ["Sports", "Movies", "Cooking", "Travel"]
    },
    {
      id: "u6",
      username: "SakuraPixel",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=SakuraPixel",
      is_online: true,
      bio: "Ilustradora digital e otaku assumida.",
      interesses: ["Reading", "Music", "Photography", "Design"]
    }
  ]
};

const API_BASE = 'http://localhost:3000';
const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=amigo';

// estado da aplicação
const state = {
  currentUserId: null,
  friendIds: [],
  users: [],
  addedIds: []
};

// referências aos elementos do DOM
const elements = {
  menu:           document.getElementById('global-menu'),
  overlay:        document.getElementById('menu-overlay'),
  openMenu:       document.getElementById('open-menu'),
  closeMenu:      document.getElementById('close-menu'),
  topbarAvatar:   document.getElementById('topbar-avatar'),
  topbarUsername: document.getElementById('topbar-username'),
  menuAvatar:     document.getElementById('menu-avatar'),
  menuUsername:   document.getElementById('menu-username'),
  menuBio:        document.getElementById('menu-bio'),
  searchInput:    document.getElementById('search-input'),
  friendsList:    document.getElementById('friends-list'),
  friendsStatus:  document.getElementById('friends-status'),
  recList:        document.getElementById('rec-list'),
  feedback:       document.getElementById('app-feedback')
};

// tenta buscar da API; se falhar, usa os dados locais
async function request(path, options = {}) {
  try {
    const config = { method: options.method || 'GET', headers: {} };

    if (options.body) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_BASE}${path}`, config);
    if (!response.ok) throw new Error(`Erro ${response.status}`);
    if (response.status === 204) return null;
    return response.json();
  } catch {
    if (path === '/session') return localData.session;
    if (path === '/users')   return localData.users;
    return null;
  }
}

// escapa HTML para evitar XSS
function escapeHTML(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getUserById(id) {
  return state.users.find(u => String(u.id) === String(id));
}

// exibe mensagem de feedback
function setFeedback(message = '', type = '') {
  if (!elements.feedback) return;
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${type}`.trim();
}

// SVG do botão adicionar amigo
function addFriendIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="22" y1="11" x2="16" y2="11"/>
  </svg>`;
}

// SVG de check (amigo adicionado)
function checkIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`;
}

// retorna os interesses em comum entre o usuário atual e outro usuário
function getSharedInterests(user) {
  const me = getUserById(state.currentUserId);
  if (!me?.interesses || !user?.interesses) return [];
  return me.interesses.filter(i => user.interesses.includes(i));
}

// preenche topbar e menu lateral com o usuário atual
function populateCurrentUser() {
  const me = getUserById(state.currentUserId);
  if (!me) return;

  elements.topbarAvatar.src           = me.avatar || DEFAULT_AVATAR;
  elements.topbarUsername.textContent = me.username;
  elements.menuAvatar.src             = me.avatar || DEFAULT_AVATAR;
  elements.menuUsername.textContent   = me.username;
  elements.menuBio.textContent        = me.bio || 'Sem bio cadastrada.';
}

// renderiza a lista de amigos no painel esquerdo
function populateFriendsList(filter = '') {
  const normalizedFilter = filter.trim().toLowerCase();

  const friends = state.users.filter(u => {
    const isFriend = state.friendIds.includes(String(u.id));
    const matchesSearch =
      u.username.toLowerCase().includes(normalizedFilter) ||
      String(u.id).toLowerCase().includes(normalizedFilter);
    return isFriend && matchesSearch;
  });

  if (friends.length === 0) {
    elements.friendsList.innerHTML = '<p class="empty-state">Nenhum amigo encontrado.</p>';
    if (elements.friendsStatus) elements.friendsStatus.textContent = '';
    return;
  }

  if (elements.friendsStatus)
    elements.friendsStatus.textContent = `${friends.length} amigo(s) carregado(s).`;

  elements.friendsList.innerHTML = friends.map(u => `
    <article class="friend-row" data-id="${escapeHTML(u.id)}">
      <div class="friend-row-avatar-wrap">
        <img class="friend-row-avatar-img"
             src="${escapeHTML(u.avatar || DEFAULT_AVATAR)}"
             alt="Avatar de ${escapeHTML(u.username)}">
        <span class="friend-row-status ${u.is_online ? 'online' : 'offline'}"></span>
      </div>
      <div class="friend-row-info">
        <span class="friend-row-name">Nome: ${escapeHTML(u.username)}</span>
        <span class="friend-row-id">id:......</span>
      </div>
      <button class="btn-add-friend" type="button" aria-label="Adicionar ${escapeHTML(u.username)}">
        ${addFriendIcon()}
      </button>
    </article>
  `).join('');
}

// renderiza recomendações baseadas em interesses em comum,
// ordenadas do maior para o menor número de interesses compartilhados
function populateRecommendations() {
  const candidates = state.users
    .filter(u =>
      String(u.id) !== String(state.currentUserId) &&
      !state.friendIds.includes(String(u.id))
    )
    .map(u => ({ user: u, shared: getSharedInterests(u) }))
    .filter(({ shared }) => shared.length > 0)
    .sort((a, b) => b.shared.length - a.shared.length);

  if (candidates.length === 0) {
    elements.recList.innerHTML = '<p class="empty-state">Nenhuma recomendação com interesses em comum.</p>';
    return;
  }

  elements.recList.innerHTML = candidates.map(({ user: u, shared }) => {
    const isAdded = state.addedIds.includes(String(u.id));
    return `
      <article class="rec-card" data-id="${escapeHTML(u.id)}">
        <div class="rec-card-header">
          <div class="rec-avatar-wrap">
            <img class="rec-avatar-img"
                 src="${escapeHTML(u.avatar || DEFAULT_AVATAR)}"
                 alt="Avatar de ${escapeHTML(u.username)}">
            <span class="rec-status ${u.is_online ? 'online' : 'offline'}"></span>
          </div>
          <div class="rec-info">
            <span class="rec-name">Nome: ${escapeHTML(u.username)}</span>
            <span class="rec-id">id:......</span>
          </div>
          <button class="btn-add-rec ${isAdded ? 'added' : ''}"
                  type="button"
                  data-rec-id="${escapeHTML(u.id)}"
                  aria-label="Adicionar ${escapeHTML(u.username)}"
                  ${isAdded ? 'disabled' : ''}>
            ${isAdded ? checkIcon() : addFriendIcon()}
          </button>
        </div>
        <div class="rec-interests-block">
          <p class="rec-interests-label">interesses em comum:</p>
          <p class="rec-interests-tags">${escapeHTML(shared.join(', '))}</p>
        </div>
      </article>
    `;
  }).join('');
}

// trata o clique no botão de adicionar em um card de recomendação
async function handleAddRecommendation(event) {
  const button = event.target.closest('[data-rec-id]');
  if (!button || button.disabled) return;

  const userId = button.dataset.recId;
  const user = getUserById(userId);
  if (!user) return;

  button.disabled = true;

  const newFriends = [...state.friendIds, String(userId)];

  // tenta persistir na API; se não tiver disponível, atualiza só o estado local
  await request('/session', { method: 'PATCH', body: { friends: newFriends } });

  state.friendIds = newFriends;
  state.addedIds.push(String(userId));

  populateRecommendations();
  populateFriendsList(elements.searchInput?.value || '');
  setFeedback(`${user.username} adicionado!`, 'success');
}

// carrega sessão e usuários
async function loadData() {
  const [session, users] = await Promise.all([
    request('/session'),
    request('/users')
  ]);

  state.currentUserId = session.current_user_id;
  state.friendIds     = (session.friends || []).map(String);
  state.users         = users;

  populateCurrentUser();
  populateFriendsList();
  populateRecommendations();
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

  elements.searchInput?.addEventListener('input', () =>
    populateFriendsList(elements.searchInput.value)
  );

  elements.recList?.addEventListener('click', handleAddRecommendation);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  loadData();
});