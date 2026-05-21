// dados
const data = {
  "current_user_id": "u0",
  "users": [
    {
      "id": "u0",
      "username": "ShibuyaDesu",
      "avatar": "https://i.pinimg.com/736x/7a/f8/54/7af854bdcc9d4fec5b0d50d34506e7c1.jpg",
      "is_online": true,
      "bio": "Jogadora de FPS nas horas vagas.",
      "jogos_favoritos": ["Valorant", "CS2"]
    },
    {
      "id": "u1",
      "username": "MorganaLover123",
      "avatar": "https://i.pinimg.com/736x/00/91/d3/0091d3d01515a9eb769f83dbf918afd1.jpg",
      "is_online": true,
      "bio": "Suporte mono Morgana.",
      "jogos_favoritos": ["LoL"]
    },
    {
      "id": "u2",
      "username": "Omae🌾🌾🌾",
      "avatar": "https://media1.tenor.com/m/uGbBwhfRcZ4AAAAd/omae.gif",
      "is_online": false,
      "bio": "Gosto de jogos de simulação e fazendinha.",
      "jogos_favoritos": ["Rocket_League"]
    }
  ]
};

// posts de exemplo vinculados aos usuários por id
const posts = [
  {
    author_id: "u1",
    text: "Ranqueei hoje com Morgana suporte e fui campeã do jogo. Absolutamente dominando as bot lane. 🌹",
    has_image: false
  },
  {
    author_id: "u2",
    text: "Nova fazenda no Stardew Valley ficou incrível! Plantei batatas e cenouras esse ano.",
    has_image: true
  },
  {
    author_id: "u1",
    text: "Alguém mais jogou a nova atualização? Consegui chegar ao Diamante finalmente! 💎",
    has_image: false
  }
];

// funções auxiliares
function getUserById(id) {
  return data.users.find(u => u.id === id);
}

function chatIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`;
}

function actionIcons() {
  return `
    <button class="action-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>Curtir
    </button>
    <button class="action-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>Comentar
    </button>
    <button class="action-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>Compartilhar
    </button>`;
}

// preenche o usuário atual na topbar e no menu lateral
function populateCurrentUser() {
  const me = getUserById(data.current_user_id);
  if (!me) return;

  document.getElementById('topbar-avatar').src = me.avatar;
  document.getElementById('topbar-username').textContent = me.username;

  document.getElementById('menu-avatar').src = me.avatar;
  document.getElementById('menu-username').textContent = me.username;
  document.getElementById('menu-bio').textContent = me.bio;
}

// preenche a grade de amigos, com filtro opcional por nome
function populateFriends(filter = '') {
  const grid = document.getElementById('friends-grid');
  const friends = data.users.filter(u =>
    u.id !== data.current_user_id &&
    u.username.toLowerCase().includes(filter.toLowerCase())
  );

  if (friends.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted);font-size:13px;grid-column:1/-1;text-align:center;padding:20px 0">Nenhum amigo encontrado.</p>`;
    return;
  }

  grid.innerHTML = `<div class="friends-grid">` +
    friends.map(u => `
      <div class="friend-card" data-id="${u.id}">
        <div class="friend-avatar-wrap">
          <img class="friend-avatar-img" src="${u.avatar}" alt="${u.username}">
          <span class="friend-status ${u.is_online ? 'online' : 'offline'}"></span>
        </div>
        <p class="friend-name">${u.username}</p>
        <p class="friend-id">id: ${u.id}</p>
        <span class="friend-chat-icon">${chatIcon()}</span>
      </div>
    `).join('') +
  `</div>`;
}

// preenche o feed com os posts dos amigos
function populatePosts() {
  const list = document.getElementById('posts-list');
  list.innerHTML = posts.map(post => {
    const author = getUserById(post.author_id);
    if (!author) return '';
    return `
      <article class="post-card">
        <header class="post-header">
          <img class="post-avatar-img" src="${author.avatar}" alt="${author.username}">
          <span class="post-username">Nome: ${author.username}</span>
          <button class="post-menu-btn" aria-label="Opções">···</button>
        </header>
        <p class="post-text">${post.text}</p>
        ${post.has_image ? `<div class="post-image-placeholder">imagem</div>` : ''}
        <div class="post-actions">${actionIcons()}</div>
      </article>
    `;
  }).join('');
}

// escuta o campo de busca e filtra os amigos em tempo real
function initSearch() {
  const input = document.getElementById('search-input');
  input.addEventListener('input', () => populateFriends(input.value));
}

// menu global (abrir, fechar, overlay)
document.addEventListener('DOMContentLoaded', () => {
  const menu     = document.getElementById('global-menu');
  const overlay  = document.getElementById('menu-overlay');
  const openBtn  = document.getElementById('open-menu');
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

  // inicialização
  populateCurrentUser();
  populateFriends();
  populatePosts();
  initSearch();
});