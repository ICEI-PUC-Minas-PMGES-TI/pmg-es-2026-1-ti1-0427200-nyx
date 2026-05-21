let usersData = {};
let messagesData = [];
let currentUser = null;

const attachBtn = document.getElementById('attach-btn');
const imageInput = document.getElementById('image-input');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPickerContainer = document.getElementById('emoji-picker');
const messageInput = document.getElementById('message-input');

async function init() {
    try {
        const [usersRes, messagesRes] = await Promise.all([
            fetch('../db/users.json'),
            fetch('../db/messages.json')
        ]);
        
        const rawUsers = await usersRes.json();
        const rawMessages = await messagesRes.json();

        rawUsers.users.forEach(u => {
            usersData[u.id] = u;
        });
        
        currentUser = usersData[rawUsers.current_user_id];
        messagesData = rawMessages.conversations;

        renderSidebar();
        initProfessionalEmojiPicker();
        
        if (messagesData.length > 0) {
            selectConversation(messagesData[0].conversation_id);
        }
        
        document.getElementById('my-avatar').src = currentUser.avatar;
        document.getElementById('my-username').innerText = currentUser.username;
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function initProfessionalEmojiPicker() {
    const pickerOptions = { 
        theme: 'dark',
        set: 'native',
        onEmojiSelect: (emoji) => {
            messageInput.value += emoji.native;
            emojiPickerContainer.style.display = 'none';
            messageInput.focus();
        },
        locale: 'pt'
    }
    
    const picker = new EmojiMart.Picker(pickerOptions);
    emojiPickerContainer.innerHTML = ''; 
    emojiPickerContainer.appendChild(picker);
}

function renderSidebar() {
    const list = document.getElementById('contact-list');
    
    list.innerHTML = messagesData.map(conv => {
        const otherUserId = conv.participants.find(id => id !== currentUser.id);
        const otherUser = usersData[otherUserId];
        const lastMsg = conv.messages[conv.messages.length - 1];

        return `
            <div class="contact-item" id="item-${conv.conversation_id}" onclick="selectConversation('${conv.conversation_id}')">
                <div class="avatar-container">
                    <img src="${otherUser.avatar}" class="avatar-img">
                    <div class="status-indicator ${otherUser.is_online ? 'status-online' : 'status-offline'}"></div>
                </div>
                <div class="contact-info">
                    <strong>${otherUser.username}</strong>
                    <p>${lastMsg ? lastMsg.text : ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

function selectConversation(convId) {
    const conv = messagesData.find(c => c.conversation_id === convId);
    const otherUserId = conv.participants.find(id => id !== currentUser.id);
    const otherUser = usersData[otherUserId];

    document.getElementById('header-username').innerText = otherUser.username;
    document.getElementById('header-avatar').src = otherUser.avatar;
    document.getElementById('header-status').innerText = otherUser.is_online ? "Online" : "Offline";

    const msgContainer = document.getElementById('chat-messages');
    
    msgContainer.innerHTML = conv.messages.map(msg => {
        const isMe = msg.sender_id === currentUser.id;
        const senderInfo = usersData[msg.sender_id];
        
        return `
            <div class="message ${isMe ? 'message-outbound' : 'message-inbound'}">
                <img src="${senderInfo.avatar}" class="avatar-img">
                <div class="bubble">${msg.text}</div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.contact-item').forEach(el => el.classList.remove('active-chat'));
    const activeItem = document.getElementById(`item-${convId}`);
    if (activeItem) activeItem.classList.add('active-chat');

    msgContainer.scrollTop = msgContainer.scrollHeight;
}

emojiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = emojiPickerContainer.style.display === 'flex';
    emojiPickerContainer.style.display = isVisible ? 'none' : 'flex';
});

document.addEventListener('click', (e) => {
    if (!emojiPickerContainer.contains(e.target) && e.target !== emojiBtn) {
        emojiPickerContainer.style.display = 'none';
    }
});

attachBtn.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        alert("Imagem selecionada: " + this.files[0].name);
    }
});

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

init();