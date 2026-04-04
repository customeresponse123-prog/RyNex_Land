# RyNex_Land

Static marketing site (HTML + CSS + JavaScript) in **`web/`** — no React or build step. Express API in **`server/`**.

## GitHub Pages

Workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the **`web/`** folder on every push to `main`.

1. **Settings → Pages → Source:** **GitHub Actions**
2. Live URL: `https://<user>.github.io/RyNex_Land/`

Edit files under **`web/`** only (`index.html`, `styles.css`, `app.js`).

### API URL (lead forms)

In **`web/index.html`**, set the backend origin on `<body>`:

```html
<body data-api-url="https://your-api.example.com">
```

Leave empty or omit for `http://localhost:5000` during local testing. Your API must allow **CORS** from your GitHub Pages origin.

## Preview locally

Open `web/index.html` in a browser, or from the repo root:

```bash
npx --yes serve web -p 3000
```

Then visit `http://localhost:3000`.

## API server (local)

```bash
cd server
npm install
npm run dev
```
