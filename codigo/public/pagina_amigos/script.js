const API_BASE = window.location.protocol === 'file:' ? 'http://localhost:3000' : window.location.origin;
const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=amigo';

const state = {
  currentUserId: null,
  users: [],
  posts: []
};

const elements = {
  menu: document.getElementById('global-menu'),
  overlay: document.getElementById('menu-overlay'),
  openMenu: document.getElementById('open-menu'),
  closeMenu: document.getElementById('close-menu'),
  topbarAvatar: document.getElementById('topbar-avatar'),
  topbarUsername: document.getElementById('topbar-username'),
  menuAvatar: document.getElementById('menu-avatar'),
  menuUsername: document.getElementById('menu-username'),
  menuBio: document.getElementById('menu-bio'),
  searchInput: document.getElementById('search-input'),
  friendsGrid: document.getElementById('friends-grid'),
  friendsStatus: document.getElementById('friends-status'),
  postsList: document.getElementById('posts-list'),
  feedback: document.getElementById('app-feedback'),
  refreshButton: document.getElementById('btn-refresh')
};

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

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar ${path}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function escapeHTML(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getUserById(id) {
  return state.users.find(user => String(user.id) === String(id));
}

function sortPosts(posts) {
  return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function setFeedback(message = '', type = '') {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${type}`.trim();
}

function setFriendsStatus(message = '') {
  elements.friendsStatus.textContent = message;
}

function chatIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>`;
}

function actionIcons(post) {
  const postId = escapeHTML(post.id);
  const likes = Number(post.likes || 0);
  const comments = Number(post.comments || 0);
  const shares = Number(post.shares || 0);

  return `
    <button class="action-btn" type="button" data-post-action="likes" data-post-id="${postId}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      Curtir <span>${likes}</span>
    </button>
    <button class="action-btn" type="button" data-post-action="comments" data-post-id="${postId}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      Comentar <span>${comments}</span>
    </button>
    <button class="action-btn" type="button" data-post-action="shares" data-post-id="${postId}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      Compartilhar <span>${shares}</span>
    </button>`;
}

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

function populateFriends(filter = '') {
  const normalizedFilter = filter.trim().toLowerCase();
  const friends = state.users.filter(user => {
    const isNotCurrentUser = String(user.id) !== String(state.currentUserId);
    const matchesSearch = user.username.toLowerCase().includes(normalizedFilter);
    return isNotCurrentUser && matchesSearch;
  });

  if (friends.length === 0) {
    elements.friendsGrid.innerHTML = '<p class="empty-state">Nenhum amigo encontrado.</p>';
    setFriendsStatus('');
    return;
  }

  setFriendsStatus(`${friends.length} amigo(s) carregado(s) da rota /users.`);

  elements.friendsGrid.innerHTML = `<div class="friends-grid">${friends.map(user => `
    <article class="friend-card" data-id="${escapeHTML(user.id)}">
      <div class="friend-avatar-wrap">
        <img class="friend-avatar-img" src="${escapeHTML(user.avatar || DEFAULT_AVATAR)}" alt="Avatar de ${escapeHTML(user.username)}">
        <span class="friend-status ${user.is_online ? 'online' : 'offline'}" title="${user.is_online ? 'Online' : 'Offline'}"></span>
      </div>
      <p class="friend-name">${escapeHTML(user.username)}</p>
      <p class="friend-id">${user.is_online ? 'online' : 'offline'}</p>
      <span class="friend-chat-icon">${chatIcon()}</span>
    </article>
  `).join('')}</div>`;
}

function populatePosts() {
  const friendIds = state.users
    .filter(user => String(user.id) !== String(state.currentUserId))
    .map(user => String(user.id));

  const friendPosts = sortPosts(state.posts).filter(post => friendIds.includes(String(post.author_id)));

  if (friendPosts.length === 0) {
    elements.postsList.innerHTML = '<p class="empty-state">Nenhum post encontrado na rota /posts.</p>';
    return;
  }

  elements.postsList.innerHTML = friendPosts.map(post => {
    const author = getUserById(post.author_id);

    if (!author) {
      return '';
    }

    const image = post.image_url
      ? `<img class="post-image" src="${escapeHTML(post.image_url)}" alt="Imagem do post de ${escapeHTML(author.username)}">`
      : '';

    return `
      <article class="post-card">
        <header class="post-header">
          <img class="post-avatar-img" src="${escapeHTML(author.avatar || DEFAULT_AVATAR)}" alt="Avatar de ${escapeHTML(author.username)}">
          <div class="post-user-block">
            <span class="post-username">${escapeHTML(author.username)}</span>
            <span class="post-date">${formatDate(post.created_at)}</span>
          </div>
          <button class="post-menu-btn" type="button" aria-label="Opções">···</button>
        </header>
        <p class="post-text">${escapeHTML(post.text)}</p>
        ${image}
        <div class="post-actions">${actionIcons(post)}</div>
      </article>
    `;
  }).join('');
}

function formatDate(dateValue) {
  if (!dateValue) {
    return 'Sem data';
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Sem data';
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

async function loadData() {
  try {
    setFeedback('Carregando dados do JSON Server...', 'loading');
    elements.friendsGrid.innerHTML = '<p class="empty-state">Carregando amigos...</p>';
    elements.postsList.innerHTML = '<p class="empty-state">Carregando posts...</p>';

    const [session, users, posts] = await Promise.all([
      request('/session'),
      request('/users'),
      request('/posts')
    ]);

    state.currentUserId = session.current_user_id;
    state.users = users;
    state.posts = posts;

    populateCurrentUser();
    populateFriends(elements.searchInput.value);
    populatePosts();
    setFeedback('Dados carregados pela API REST do JSON Server.', 'success');
  } catch (error) {
    console.error(error);
    setFeedback('Não foi possível carregar a API. Execute o JSON Server e abra a página pelo servidor.', 'error');
    elements.friendsGrid.innerHTML = '<p class="empty-state">API indisponível.</p>';
    elements.postsList.innerHTML = '<p class="empty-state">API indisponível.</p>';
  }
}

function openMenu() {
  elements.menu.classList.add('open');
  elements.overlay.classList.add('show');
}

function closeMenu() {
  elements.menu.classList.remove('open');
  elements.overlay.classList.remove('show');
}

async function handlePostAction(event) {
  const button = event.target.closest('[data-post-action]');

  if (!button) {
    return;
  }

  const postId = button.dataset.postId;
  const field = button.dataset.postAction;
  const post = state.posts.find(item => String(item.id) === String(postId));

  if (!post || !['likes', 'comments', 'shares'].includes(field)) {
    return;
  }

  const nextValue = Number(post[field] || 0) + 1;

  try {
    button.disabled = true;
    const updatedPost = await request(`/posts/${encodeURIComponent(postId)}`, {
      method: 'PATCH',
      body: { [field]: nextValue }
    });

    Object.assign(post, updatedPost);
    populatePosts();
    setFeedback(`Interação salva com PATCH /posts/${postId}.`, 'success');
  } catch (error) {
    console.error(error);
    setFeedback('Não foi possível atualizar o post pela API REST.', 'error');
    button.disabled = false;
  }
}

function initEvents() {
  elements.openMenu.addEventListener('click', openMenu);
  elements.closeMenu.addEventListener('click', closeMenu);
  elements.overlay.addEventListener('click', closeMenu);
  elements.searchInput.addEventListener('input', () => populateFriends(elements.searchInput.value));
  elements.refreshButton.addEventListener('click', loadData);
  elements.postsList.addEventListener('click', handlePostAction);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  loadData();
});
