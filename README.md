# Discordweb React Migration

A Discord-inspired community front-end that has been migrated from a static multi-page HTML setup into a React-driven UI shell.

## Project purpose

This project is a lightweight front-end community layout inspired by Discord. The original implementation relied on separate static HTML pages and iframe-based content switching. It has now been reorganized so the active UI is rendered from a React entry point while the older HTML pages are archived for reference.

## Current repository structure

- [index.html](index.html) — main application entry page and React mount point
- [src/main.js](src/main.js) — React components for the home channel layout, friends/direct-message layout, chat panel, and auth behavior
- [assets/css](assets/css) — shared CSS assets for the main UI, layout, and chat screens
- [assets/js](assets/js) — JavaScript assets used by the static side of the project
- [assets/img](assets/img) — reserved image/media asset folder for future static assets
- [pages/legacy](pages/legacy) — archived legacy HTML pages retained as reference material
- [server.js](server.js) — lightweight local server used for verification in this environment
- [.gitignore](.gitignore) — repository hygiene rules for generated and local files
- [package.json](package.json) — project metadata and script entry

## App behavior

- The UI supports a home community view and a direct-message/friends view.
- Login and logout update the displayed user state using `localStorage`.
- The current front end is intentionally lightweight and avoids depending on a full build pipeline in the current environment.

## Run locally

From the project root, start the local verification server:

```powershell
Set-Location '\GitHub\Discordweb'
```

Then open:

```text
http://localhost:3000
```

## Notes

- The repository now separates active application files from legacy static pages.
- Legacy HTML pages are kept in [pages/legacy](pages/legacy) instead of being used as the main runtime path.
- This setup is suitable for simple UI migration work and easy onboarding into a fuller React/Vite-based production workflow later.
