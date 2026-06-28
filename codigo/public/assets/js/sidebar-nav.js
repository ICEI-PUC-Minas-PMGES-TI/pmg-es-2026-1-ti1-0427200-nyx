(function () {
  if (window.__nyxSidebarInjected) return;
  window.__nyxSidebarInjected = true;

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '/about.html' },
    { label: 'Posts', href: '/posts.html' },
    { label: 'Amigos', href: '/pagina_amigos/amigos.html' },
    { label: 'Perfil', href: '/perfil_usuario.html' },
    { label: 'Comunidades', href: '/community_search.html' },
    { label: 'Chat', href: '/private_message.html' },
    { label: 'Fórum', href: '/modulos/tela-forum/forum.html' },
    { label: 'Denúncias', href: '/modulos/tela-denuncias/denuncias.html' },
    { label: 'Configurações', href: '/Configuraçoes/my_account.html' },
    { label: 'Hobbies', href: '/hobbys.html' },
    { label: 'Adicionar Amigos', href: '/adicionar_amigos/adicionar.html' }
  ];

  function getScriptRootPrefix() {
    const script = document.currentScript || document.querySelector('script[src$="sidebar-nav.js"]');
    if (!script || !script.src) return '';
    const url = new URL(script.src, window.location.href);
    return url.pathname.replace(/\/assets\/js\/sidebar-nav\.js$/, '').replace(/\/$/, '');
  }

  function normalizePath(path) {
    return path.replace(/\/+$|^\/+/, '');
  }

  function getCurrentPath(rootPrefix) {
    let path = window.location.pathname.replace(/\/+$/, '');
    if (rootPrefix && path.startsWith(rootPrefix)) {
      path = path.slice(rootPrefix.length) || '/';
    }
    if (!path || path === '/index.html') return '/';
    return path;
  }

  function getRelativePath(fromDir, toPath) {
    const fromSegments = normalizePath(fromDir).split('/').filter(Boolean);
    const toSegments = normalizePath(toPath).split('/').filter(Boolean);

    let common = 0;
    while (common < fromSegments.length && common < toSegments.length && fromSegments[common] === toSegments[common]) {
      common += 1;
    }

    const upLevels = fromSegments.length - common;
    const prefix = upLevels === 0 ? '' : '../'.repeat(upLevels);
    const remaining = toSegments.slice(common).join('/');
    return prefix + remaining;
  }

  function closeMenu() {
    const menu = document.getElementById('global-menu');
    const overlay = document.getElementById('menu-overlay');
    if (menu) menu.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
  }

  function openMenu() {
    const menu = document.getElementById('global-menu');
    const overlay = document.getElementById('menu-overlay');
    if (menu) menu.classList.add('open');
    if (overlay) overlay.classList.add('show');
  }

  function initSidebar() {
    const body = document.body;
    if (!body) return;

    // inject sidebar theme stylesheet if not present
    try {
      const rootPrefix = getScriptRootPrefix();
      const href = (rootPrefix + '/assets/css/sidebar-theme.css').replace(/\/\/+/g, '/');
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    } catch (e) { /* fail gracefully */ }

    let button = document.getElementById('open-menu');
    if (!button) {
      button = document.createElement('button');
      button.id = 'open-menu';
      button.className = 'open-menu-btn';
      button.type = 'button';
      button.setAttribute('aria-label', 'Abrir menu');
      button.innerHTML = '☰';
      body.prepend(button);
    }
    button.addEventListener('click', openMenu);

    let menu = document.getElementById('global-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'global-menu';
      menu.className = 'global-menu';
      body.appendChild(menu);
    }

    let closeButton = document.getElementById('close-menu');
    if (!closeButton) {
      closeButton = document.createElement('button');
      closeButton.id = 'close-menu';
      closeButton.className = 'close-btn';
      closeButton.type = 'button';
      closeButton.setAttribute('aria-label', 'Fechar menu');
      closeButton.innerHTML = '&times;';
      menu.appendChild(closeButton);
    }
    closeButton.addEventListener('click', closeMenu);

    let nav = menu.querySelector('.menu-options');
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'menu-options';
      menu.appendChild(nav);
    }

    const rootPrefix = getScriptRootPrefix();
    const currentPageDir = window.location.pathname.replace(/\/[^\/]*$/, '/');
    nav.innerHTML = '';
    const currentPath = getCurrentPath(rootPrefix);
    navItems.forEach((item) => {
      const link = document.createElement('a');
      link.className = 'menu-link';
      const targetPath = `${rootPrefix}${item.href}`;
      link.href = getRelativePath(currentPageDir, targetPath);
      link.textContent = item.label;
      if (currentPath === item.href || (item.href !== '/' && currentPath.endsWith(item.href.replace(/^\//, '')))) {
        link.classList.add('active');
      }
      nav.appendChild(link);
    });

    let overlay = document.getElementById('menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'menu-overlay';
      overlay.className = 'menu-overlay';
      body.appendChild(overlay);
    }
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
