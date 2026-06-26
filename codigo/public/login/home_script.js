// verifica sessão ativa; redireciona para login se não houver
function checkSession() {
  const raw = sessionStorage.getItem('current_user');
  if (!raw) { window.location.href = 'login.html'; return null; }
  return JSON.parse(raw);
}

// preenche a página com os dados do usuário logado
function populateUser(user) {
  document.getElementById('home-avatar').src       = user.avatar || '';
  document.getElementById('home-username').textContent = user.username;
  document.getElementById('home-bio').textContent      = user.bio || 'Sem bio.';
}

// remove a sessão e redireciona para login
function logout() {
  sessionStorage.removeItem('current_user');
  window.location.href = 'login.html';
}

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  const user = checkSession();
  if (!user) return;

  populateUser(user);
  document.getElementById('btn-logout').addEventListener('click', logout);
});
