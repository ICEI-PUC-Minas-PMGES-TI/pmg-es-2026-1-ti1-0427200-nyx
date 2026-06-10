document.addEventListener('DOMContentLoaded', () => {
    
    const menu = document.getElementById('global-menu');
    const overlay = document.getElementById('menu-overlay');
    const openBtn = document.getElementById('open-menu');
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

    const urlParams = new URLSearchParams(window.location.search);
    const communityId = parseInt(urlParams.get('id'));

    if (!communityId) {
        const titleEl = document.getElementById('modalTitle');
        if (titleEl) titleEl.textContent = "Comunidade não encontrada";
        return;
    }

    fetch('../db/communities.json')
        .then(response => response.json())
        .then(data => {
            const community = data.communities.find(c => c.id === communityId);

            if (community) {
                document.getElementById('modalTitle').textContent = community.name;
                document.getElementById('modalDesc').textContent = community.description;
                
                const imageEl = document.getElementById('modalImage');
                imageEl.src = community.image_url;
                imageEl.alt = community.name;

                document.getElementById('membersList').innerHTML = `<p>${community.members} Membros ativos</p>`;
                
                const tagsHtml = community.tags.map(tag => `<span style="display: inline-block; background: #333; padding: 5px 10px; margin: 2px; border-radius: 5px; font-size: 0.9em; color: white;">${tag}</span>`).join('');
                document.getElementById('gamesList').innerHTML = tagsHtml;

            } else {
                document.getElementById('modalTitle').textContent = "Erro: Comunidade não existe no banco de dados.";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados da comunidade:", error);
            const titleEl = document.getElementById('modalTitle');
            if (titleEl) titleEl.textContent = "Erro ao carregar dados.";
        });
});