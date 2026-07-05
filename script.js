const iframe = document.getElementById('chatFrame');
const links = document.querySelectorAll('a[target="chatFrame"]');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const userStatus = document.getElementById('userStatus');
const sidebarItems = document.querySelectorAll('.sidebar li');
const channelSidebar = document.getElementById('channelSidebar');
const chatArea = document.getElementById('chatArea');
const AUTH_KEY = 'discordAuthState';
const isConnectionsPage = document.getElementById('sidebar') && document.getElementById('main');

function setActiveChannel(activeLink) {
    document.querySelectorAll('.sidebar a.selected-link').forEach((link) => link.classList.remove('selected-link'));
    activeLink.classList.add('selected-link');
    sidebarItems.forEach((item) => item.classList.remove('selected'));
    activeLink.closest('li')?.classList.add('selected');
}

function readAuthState() {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

function applyAuthState() {
    const loggedIn = readAuthState();

    if (loginBtn) {
        loginBtn.classList.toggle('hidden', loggedIn);
    }

    if (logoutBtn) {
        logoutBtn.classList.toggle('hidden', !loggedIn);
    }

    if (userName) {
        userName.textContent = loggedIn ? 'Keerthanaa' : 'Guest User';
    }

    if (userStatus) {
        userStatus.textContent = loggedIn ? 'Online' : 'Offline';
    }

    if (!isConnectionsPage) {
        if (channelSidebar) {
            channelSidebar.classList.remove('hidden');
        }

        if (chatArea) {
            chatArea.classList.remove('hidden');
        }
    }
}

function setAuthState(loggedIn) {
    localStorage.setItem(AUTH_KEY, String(loggedIn));
    applyAuthState();
}

loginBtn?.addEventListener('click', () => {
    setAuthState(true);
});

logoutBtn?.addEventListener('click', () => {
    setAuthState(false);
});

links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetPage = link.getAttribute('href');

        setActiveChannel(link);
        iframe.classList.add('is-transitioning');

        setTimeout(() => {
            iframe.src = targetPage;
            iframe.classList.remove('is-transitioning');
        }, 180);
    });
});

const initialLink = document.querySelector('a[target="chatFrame"].selected-link') || document.querySelector('a[target="chatFrame"]');
if (initialLink) {
    setActiveChannel(initialLink);
}

loginBtn?.addEventListener('click', () => setAuthState(true));
logoutBtn?.addEventListener('click', () => setAuthState(false));
window.addEventListener('storage', applyAuthState);
document.addEventListener('DOMContentLoaded', applyAuthState);
