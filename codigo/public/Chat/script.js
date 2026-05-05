async function carregarDadosChat() {
    try {
        const resposta = await fetch('data.json');
        const dados = await resposta.json();
        const recipient = dados.chat_screen.active_conversation.recipient;

        document.getElementById('header-username').innerText = recipient.username;
        document.getElementById('header-avatar').src = recipient.avatar;
        document.getElementById('header-status').innerText = recipient.status;
        
        renderizarMensagens(dados);
        renderizarSidebar(dados.chat_screen.sidebar_history);

    } catch (erro) {
        console.error("Erro ao carregar o topo do chat:", erro);
    }
}

function renderizarMensagens(chatData) {
    const container = document.getElementById('chat-messages');
    const mensagens = chatData.chat_screen.active_conversation.messages;
    const meuId = chatData.chat_screen.current_user.id;

    container.innerHTML = mensagens.map(msg => `
        <div class="message ${msg.sender_id === meuId ? 'message-outbound' : 'message-inbound'}">
            <div class="bubble">${msg.text}</div>
        </div>
    `).join('');
}

function atualizarCabecalho(recipient) {
    const headerAvatarContainer = document.querySelector('.recipient-info .avatar-container');
    const isOnline = recipient.status === "Online";
    const statusClass = isOnline ? 'status-online' : 'status-offline';

    document.getElementById('header-username').innerText = recipient.username;
    document.getElementById('header-avatar').src = recipient.avatar;
    document.getElementById('header-status').innerText = recipient.status;
    
    const indicator = document.querySelector('.chat-header .status-indicator');
    if (indicator) {
        indicator.className = `status-indicator ${statusClass}`;
    }
}

function renderizarMensagens(chatData) {
    const container = document.getElementById('chat-messages');
    const meuId = chatData.chat_screen.current_user.id;
    const meuAvatar = chatData.chat_screen.current_user.avatar;
    const outroAvatar = chatData.chat_screen.active_conversation.recipient.avatar;

    container.innerHTML = chatData.chat_screen.active_conversation.messages.map(msg => {
        const isMe = msg.sender_id === meuId;
        const avatarParaEstaMensagem = isMe ? meuAvatar : outroAvatar;

        return `
            <div class="message ${isMe ? 'message-outbound' : 'message-inbound'}">
                <img src="${avatarParaEstaMensagem}" class="avatar-img">
                <div class="bubble">${msg.text}</div>
            </div>
        `;
    }).join('');
}

function renderizarSidebar(history) {
    const sidebarContainer = document.getElementById('contact-list');
    
    sidebarContainer.innerHTML = history.map(user => {
        const statusClass = user.is_online ? 'status-online' : 'status-offline';

        return `
            <div class="contact-item">
                <div class="avatar-container">
                    <img src="${user.avatar}" class="avatar-img">
                    <div class="status-indicator ${statusClass}"></div>
                </div>
                <div class="contact-info">
                    <strong>${user.username}</strong>
                    <p style="font-size: 11px; color: var(--text-muted)">${user.last_message}</p>
                </div>
            </div>
        `;
    }).join('');
}

carregarDadosChat();
