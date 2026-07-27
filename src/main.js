const { createElement: h, useState, useEffect } = React;

const channels = [
  {
    id: 'general',
    title: '# general',
    subtitle: 'This is the start of general chat!',
    placeholder: 'Message #general',
  },
  {
    id: 'announcements',
    title: '# announcements',
    subtitle: 'Stay updated with all the latest announcements and important notices.',
    placeholder: 'Message #announcements',
  },
  {
    id: 'html-resources',
    title: '# html-resources',
    subtitle: 'Find HTML tutorials, notes, examples, and useful learning resources here.',
    placeholder: 'Message #html-resources',
  },
  {
    id: 'css-resources',
    title: '# css-resources',
    subtitle: 'Explore CSS tutorials, layout techniques, selectors, flexbox, grid, and styling best practices.',
    placeholder: 'Message #css-resources',
  },
  {
    id: 'git-resources',
    title: '# git-resources',
    subtitle: 'Learn Git, GitHub, version control, repositories, branching, and collaboration.',
    placeholder: 'Message #git-resources',
  },
];

const USERS = [
  { username: 'keerthanaa', password: 'keerthanaa', displayName: 'Keerthanaa' },
  { username: 'varshan', password: 'varshan', displayName: 'Varshan' },
  { username: 'jaini', password: 'jaini', displayName: 'Jaini' },
  { username: 'kanish', password: 'kanish', displayName: 'Kanish' },
  { username: 'pranaya', password: 'pranaya', displayName: 'Pranaya' },
];

const AUTH_KEY = 'discordAuthState';
const EMPTY_DIRECT_MESSAGE = {
  id: 'direct-messages',
  title: '# direct-messages',
  subtitle: 'Select a direct message to start chatting.',
  placeholder: 'Message a friend',
};

function createDirectMessage(user) {
  return {
    id: user.username,
    title: `# ${user.displayName}`,
    subtitle: `Start a conversation with ${user.displayName}.`,
    placeholder: `Message ${user.displayName}`,
  };
}

function getDirectMessages(currentUser) {
  if (!currentUser) return [];

  return USERS
    .filter((user) => user.username !== currentUser.username)
    .map(createDirectMessage);
}

function readAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw || raw === 'false') return null;
    if (raw === 'true') return USERS[0];
    const user = JSON.parse(raw);
    return USERS.find((item) => item.username === user.username) || null;
  } catch {
    return null;
  }
}

function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeChannel, setActiveChannel] = useState('general');
  const [activeFriend, setActiveFriend] = useState('indiwebpros');
  const [activeFilter, setActiveFilter] = useState('online');
  const [authUser, setAuthUser] = useState(readAuthUser);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const syncAuth = () => setAuthUser(readAuthUser());

    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  useEffect(() => {
    if (!authUser) return;

    const nextDirectMessages = getDirectMessages(authUser);
    const activeFriendExists = nextDirectMessages.some((friend) => friend.id === activeFriend);

    if (!activeFriendExists) {
      setActiveFriend(nextDirectMessages[0]?.id || EMPTY_DIRECT_MESSAGE.id);
    }
  }, [activeFriend, authUser]);

  const loggedIn = Boolean(authUser);
  const directMessages = getDirectMessages(authUser);
  const currentChannel = channels.find((item) => item.id === activeChannel) || channels[0];
  const currentFriend = directMessages.find((item) => item.id === activeFriend) || directMessages[0] || EMPTY_DIRECT_MESSAGE;
  const username = authUser ? authUser.displayName : 'Guest User';
  const status = loggedIn ? 'Online' : 'Offline';

  const applyAuthState = (user) => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username: user.username, displayName: user.displayName }));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
    setAuthUser(user);
  };

  const handleLogin = (usernameInput, password) => {
    const match = USERS.find(
      (user) => user.username === usernameInput.toLowerCase() && user.password === password
    );

    if (!match) {
      setLoginError('Invalid username or password.');
      return;
    }

    applyAuthState(match);
    setLoginError('');
    setShowLoginModal(false);
  };

  const layoutProps = {
    loggedIn,
    username,
    status,
    onOpenLogin: () => {
      setLoginError('');
      setShowLoginModal(true);
    },
    onLogout: () => applyAuthState(null),
  };

  return h(
    'div',
    { className: 'container' },
    showLoginModal
      ? h(LoginModal, {
          error: loginError,
          onClose: () => setShowLoginModal(false),
          onLogin: handleLogin,
        })
      : null,
    activeView === 'home'
      ? h(HomeLayout, {
          ...layoutProps,
          activeChannel,
          currentChannel,
          onSwitchView: setActiveView,
          onSelectChannel: setActiveChannel,
        })
      : h(ConnectionsLayout, {
          ...layoutProps,
          activeFriend,
          currentFriend,
          directMessages,
          activeFilter,
          onSwitchView: setActiveView,
          onSelectFriend: setActiveFriend,
          onChangeFilter: setActiveFilter,
        })
  );
}

function LoginModal({ error, onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username.trim(), password);
  };

  return h(
    'div',
    { className: 'login-overlay', onClick: onClose },
    h(
      'div',
      { className: 'login-modal', onClick: (event) => event.stopPropagation() },
      h('h2', null, 'Welcome back!'),
      h('p', { className: 'login-subtitle' }, 'Log in to Discord-web'),
      error ? h('p', { className: 'login-error' }, error) : null,
      h(
        'form',
        { onSubmit: handleSubmit },
        h('label', { htmlFor: 'login-username' }, 'Username'),
        h('input', {
          id: 'login-username',
          type: 'text',
          value: username,
          onChange: (event) => setUsername(event.target.value),
          placeholder: 'Enter username',
          autoFocus: true,
        }),
        h('label', { htmlFor: 'login-password' }, 'Password'),
        h('input', {
          id: 'login-password',
          type: 'password',
          value: password,
          onChange: (event) => setPassword(event.target.value),
          placeholder: 'Enter password',
        }),
        h('button', { type: 'submit', className: 'login-submit' }, 'Log In')
      ),
      h('button', { type: 'button', className: 'login-cancel', onClick: onClose }, 'Cancel')
    )
  );
}

function HomeLayout(props) {
  return h(
    React.Fragment,
    null,
    h(
      'div',
      { className: 'icons' },
      h('button', { className: 'icon', onClick: () => props.onSwitchView('connections') }, 'F'),
      h('button', { className: 'icon active', onClick: () => props.onSwitchView('home') }, 'I'),
      h('button', { className: 'icon' }, '+')
    ),
    h(
      'aside',
      { className: 'sidebar', id: 'channelSidebar' },
      h('div', { className: 'server-name' }, 'Indiwebpros'),
      h('div', { className: 'menu-title' }, 'START HERE'),
      h(
        'ul',
        null,
        channels.map((channel) =>
          h(
            'li',
            { key: channel.id, className: props.activeChannel === channel.id ? 'selected' : '' },
            h(
              'button',
              {
                type: 'button',
                className: props.activeChannel === channel.id ? 'sidebar-link selected-link' : 'sidebar-link',
                onClick: () => props.onSelectChannel(channel.id),
              },
              channel.title
            )
          )
        )
      ),
      h(
        'div',
        { className: 'user' },
        h('div', { className: 'avatar' }),
        h(
          'div',
          { className: 'user-info' },
          h('h4', null, props.username),
          h('small', null, props.status),
          h(
            'div',
            { className: 'auth-actions' },
            h(
              'button',
              {
                type: 'button',
                className: `auth-btn ${props.loggedIn ? 'hidden' : ''}`,
                onClick: props.onOpenLogin,
              },
              'Login'
            ),
            h(
              'button',
              {
                type: 'button',
                className: `auth-btn ${props.loggedIn ? '' : 'hidden'}`,
                onClick: props.onLogout,
              },
              'Logout'
            )
          )
        )
      )
    ),
    h('main', { className: 'main' }, h(ChatPanel, { channel: props.currentChannel }))
  );
}

function ConnectionsLayout(props) {
  return h(
    React.Fragment,
    null,
    h(
      'div',
      { className: 'icon-bar' },
      h('button', { className: 'icon active', onClick: () => props.onSwitchView('connections') }, 'F'),
      h('button', { className: 'icon', onClick: () => props.onSwitchView('home') }, 'I'),
      h('button', { className: 'icon' }, '+')
    ),
    h('div', { className: `auth-gate ${props.loggedIn ? '' : 'active'}` }, 'Please log in to view your direct messages.'),
    h(
      'aside',
      { className: `sidebar ${props.loggedIn ? '' : 'hidden'}` },
      h('input', { type: 'text', placeholder: 'Find or start a conversation' }),
      h('h4', null, 'Direct Messages'),
      h(
        'ul',
        { className: 'dm' },
        props.directMessages.map((friend) =>
          h(
            'li',
            {
              key: friend.id,
              className: props.activeFriend === friend.id ? 'selected' : '',
              onClick: () => props.onSelectFriend(friend.id),
            },
            friend.title.replace('# ', '')
          )
        )
      ),
      h(
        'div',
        { className: 'profile' },
        h('div', { className: 'avatar' }),
        h(
          'div',
          { className: 'profile-info' },
          h('strong', null, props.username),
          h('small', null, props.status),
          h(
            'div',
            { className: 'auth-actions' },
            h(
              'button',
              {
                type: 'button',
                className: `auth-btn ${props.loggedIn ? 'hidden' : ''}`,
                onClick: props.onOpenLogin,
              },
              'Login'
            ),
            h(
              'button',
              {
                type: 'button',
                className: `auth-btn ${props.loggedIn ? '' : 'hidden'}`,
                onClick: props.onLogout,
              },
              'Logout'
            )
          )
        )
      )
    ),
    h(
      'main',
      { className: `main ${props.loggedIn ? '' : 'hidden'}` },
      h(
        'div',
        { className: 'topbar' },
        h('div', { className: 'tabs' },
          h('span', { className: 'title' }, 'Friends'),
          ['online', 'all', 'pending', 'add-friend'].map((filterText) =>
            h(
              'button',
              {
                key: filterText,
                type: 'button',
                className: props.activeFilter === filterText ? 'active-btn' : '',
                onClick: () => props.onChangeFilter(filterText),
              },
              filterText === 'add-friend' ? 'Add Friend' : filterText.charAt(0).toUpperCase() + filterText.slice(1)
            )
          )
        )
      ),
      h(
        'div',
        { className: 'content' },
        h('div', { className: 'frame-shell' }, h(ChatPanel, { channel: props.currentFriend, compact: true }))
      )
    )
  );
}

function ChatPanel({ channel, compact }) {
  return h(
    'div',
    { className: compact ? 'chat-shell compact' : 'chat-shell' },
    h(
      'div',
      { className: 'header' },
      h('h3', null, channel.title),
      h('input', { type: 'text', placeholder: 'Search' })
    ),
    h(
      'div',
      { className: 'chat' },
      h(
        'div',
        { className: 'message' },
        h('div', { className: 'profile' }),
        h(
          'div',
          null,
          h('h3', null, channel.title),
          h('h6', { style: { color: '#999' } }, channel.subtitle)
        )
      )
    ),
    h(
      'div',
      { className: 'message-box' },
      h('input', { type: 'text', placeholder: channel.placeholder })
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(h(App));
