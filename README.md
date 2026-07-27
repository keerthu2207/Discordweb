# Discordweb

Discordweb is a lightweight Discord-inspired community web app. It is a static React frontend that runs without a build step and can be deployed directly to Firebase Hosting.

## Features

- Discord-style server/channel layout.
- Channels for general discussion, announcements, HTML resources, CSS resources, and Git resources.
- Login modal with five demo accounts.
- Login state saved in `localStorage`.
- Direct-message view gated behind login.
- Dynamic direct messages: each logged-in account sees the other four accounts, but not itself.
- Firebase Hosting configuration for static deployment.

## Demo Login Accounts

Use the same value for username and password.

| Username | Password | Display name |
| --- | --- | --- |
| `keerthanaa` | `keerthanaa` | Keerthanaa |
| `varshan` | `varshan` | Varshan |
| `jaini` | `jaini` | Jaini |
| `kanish` | `kanish` | Kanish |
| `pranaya` | `pranaya` | Pranaya |

## Direct Messages

When an account logs in, the Direct Messages list automatically shows the other accounts only.

For example:

- `Keerthanaa` sees `Varshan`, `Jaini`, `Kanish`, and `Pranaya`.
- `Varshan` sees `Keerthanaa`, `Jaini`, `Kanish`, and `Pranaya`.
- `Pranaya` sees `Keerthanaa`, `Varshan`, `Jaini`, and `Kanish`.

## Project Structure

```text
.
├── index.html              # Main app entry and React mount point
├── src/main.js             # React UI, demo auth, channels, and DMs
├── assets/css/             # App styling
├── server.js               # Local static server on port 3000
├── package.json            # Project scripts
├── firebase.json           # Firebase Hosting config
├── .firebaserc             # Default Firebase project ID
├── .gitignore              # Ignored local/generated files
└── README.md               # Project documentation
```

## Run Locally

From the project root:

```powershell
cd C:\Users\sjjva\Documents\GitHub\Discordweb
npm start
```

Then open:

```text
http://localhost:3000
```

`npm start` runs `node server.js`.

## Firebase Hosting

The default Firebase project is:

```text
discordweb-d8d8c
```

Login to Firebase:

```powershell
npx firebase-tools login
```

Deploy:

```powershell
npx firebase-tools deploy --only hosting
```

Expected hosted URL:

```text
https://discordweb-d8d8c.web.app
```

## Notes

- The app is a frontend demo. Credentials are stored in client-side JavaScript and are not safe for real authentication.
- Firebase Hosting serves the static root app. There is no backend in the cleaned project.
- React and ReactDOM are loaded from CDN links in `index.html`.
