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

const directMessages = [
  { id: 'indiwebpros', title: '# Indiwebpros', subtitle: 'Chat with the Indiwebpros team.', placeholder: 'Message Indiwebpros' },
  { id: 'kanishcharan', title: '# Kanishcharan', subtitle: 'Start a conversation with Kanishcharan.', placeholder: 'Message Kanishcharan' },
  { id: 'jainitteesh', title: '# Jainitteesh', subtitle: 'Start a conversation with Jainitteesh.', placeholder: 'Message Jainitteesh' },
  { id: 'jayavarshan', title: '# Jayavarshan', subtitle: 'Start a conversation with Jayavarshan.', placeholder: 'Message Jayavarshan' },
  { id: 'pranaya', title: '# Pranaya', subtitle: 'Start a conversation with Pranaya.', placeholder: 'Message Pranaya' },
];

const AUTH_KEY = 'discordAuthState';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeChannel, setActiveChannel] = useState('general');
  const [activeFriend, setActiveFriend] = useState('indiwebpros');
  const [activeFilter, setActiveFilter] = useState('online');
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');

  useEffect(() => {
    const syncAuth = () => {
      setLoggedIn(localStorage.getItem(AUTH_KEY) === 'true');
    };

    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const currentChannel = channels.find((item) => item.id === activeChannel) || channels[0];
  const currentFriend = directMessages.find((item) => item.id === activeFriend) || directMessages[0];
  const username = loggedIn ? 'Keerthanaa' : 'Guest User';
  const status = loggedIn ? 'Online' : 'Offline';

  const applyAuthState = (nextValue) => {
    localStorage.setItem(AUTH_KEY, String(nextValue));
    setLoggedIn(nextValue);
  };

  return h(
    'div',
    { className: 'container' },
    activeView === 'home'
      ? h(HomeLayout, {
          activeChannel,
          currentChannel,
          loggedIn,
          username,
          status,
          onSwitchView: setActiveView,
          onSelectChannel: setActiveChannel,
          onLogin: () => applyAuthState(true),
          onLogout: () => applyAuthState(false),
        })
      : h(ConnectionsLayout, {
          activeFriend,
          currentFriend,
          activeFilter,
          loggedIn,
          username,
          status,
          onSwitchView: setActiveView,
          onSelectFriend: setActiveFriend,
          onChangeFilter: setActiveFilter,
          onLogin: () => applyAuthState(true),
          onLogout: () => applyAuthState(false),
        })
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
                onClick: props.onLogin,
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
        directMessages.map((friend) =>
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
                onClick: props.onLogin,
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
