const iframe = document.getElementById('chatFrame');
const dmItems = document.querySelectorAll('.dm li');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const userStatus = document.getElementById('userStatus');
const filterButtons = document.querySelectorAll('.tabs button');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const authGate = document.getElementById('authGate');
const AUTH_KEY = 'discordAuthState';

function setActiveDm(activeItem) {
    dmItems.forEach((item) => item.classList.remove('selected'));
    activeItem.classList.add('selected');
}

function setActiveFilter(activeButton) {
    filterButtons.forEach((button) => button.classList.remove('active-btn'));
    activeButton.classList.add('active-btn');
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

    if (sidebar) {
        sidebar.classList.toggle('hidden', !loggedIn);
    }

    if (main) {
        main.classList.toggle('hidden', !loggedIn);
    }

    if (authGate) {
        authGate.classList.toggle('active', !loggedIn);
    }
}

function setAuthState(loggedIn) {
    localStorage.setItem(AUTH_KEY, String(loggedIn));
    applyAuthState();
}

dmItems.forEach((item) => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        setActiveDm(item);

        if (iframe) {
            iframe.classList.add('is-transitioning');

            setTimeout(() => {
                iframe.src = page;
                iframe.classList.remove('is-transitioning');
            }, 180);
        }
    });
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setActiveFilter(button);
    });
});

loginBtn?.addEventListener('click', () => setAuthState(true));
logoutBtn?.addEventListener('click', () => setAuthState(false));
window.addEventListener('storage', applyAuthState);
document.addEventListener('DOMContentLoaded', applyAuthState);
