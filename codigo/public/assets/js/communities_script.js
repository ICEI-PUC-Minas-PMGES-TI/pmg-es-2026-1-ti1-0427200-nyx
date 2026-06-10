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
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const toggleTagsBtn = document.getElementById('toggle-tags-btn');
    const tagsPanel = document.getElementById('tags-panel');
    
    let allCommunities = [];
    let activeTags = new Set(); 

    fetch('../db/communities.json')
        .then(response => response.json())
        .then(data => {
            allCommunities = data.communities;
            setupTags(allCommunities);
            renderCommunities(allCommunities);
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));

    
    function setupTags(communities) {
        const uniqueTags = [...new Set(communities.flatMap(c => c.tags))];
        
        uniqueTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'tag-chip';
            btn.textContent = tag;
            
            btn.addEventListener('click', () => {
                
                if (activeTags.has(tag)) {
                    activeTags.delete(tag);
                    btn.classList.remove('active');
                } else {
                    activeTags.add(tag);
                    btn.classList.add('active');
                }
                filterCommunities();
            });
            
            tagsPanel.appendChild(btn);
        });
    }

    function renderCommunities(communitiesToRender) {
        searchResults.innerHTML = ''; 
        
        if (communitiesToRender.length === 0) {
            searchResults.innerHTML = '<p style="color: white; grid-column: 1 / -1; text-align: center;">Nenhuma comunidade encontrada.</p>';
            return;
        }

        communitiesToRender.forEach(com => {
            const card = document.createElement('div');
            card.className = 'community-card';
            card.innerHTML = `
                <div class="card-image">${com.image_url ? `<img src="${com.image_url}" alt="${com.name}" class="card-image">` : ''}</div>
                <div class="card-info">
                    <div class="card-title">${com.name}</div>
                    <div class="card-desc">${com.description}</div>
                    <button class="card-btn" onclick="window.location.href='perfil_comunidade.html?id=${com.id}'">Entrar</button>
                </div>
            `;
            searchResults.appendChild(card);
        });
    }

   
    function filterCommunities() {
        const searchText = searchInput.value.toLowerCase(); 
        const filtered = allCommunities.filter(com => {
            
            const matchesName = com.name.toLowerCase().includes(searchText);
            
            const matchesTags = activeTags.size === 0 || 
                [...activeTags].every(tag => com.tags.includes(tag));
                
            return matchesName && matchesTags;
        });
        
        renderCommunities(filtered);
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterCommunities);
    }

    if (toggleTagsBtn && tagsPanel) {
        toggleTagsBtn.addEventListener('click', () => {
            tagsPanel.classList.toggle('hidden');
            toggleTagsBtn.style.transform = tagsPanel.classList.contains('hidden') 
                ? 'translateY(-50%) rotate(0deg)' 
                : 'translateY(-50%) rotate(45deg)';
        });
    }
});