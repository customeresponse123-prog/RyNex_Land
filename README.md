# RyNex_Land

Static marketing site in **`web/`** (HTML + CSS + JavaScript). Express API in **`server/`**.

## Run the website locally

From the **repository root** (not inside `web/`):

```bash
npm install
npm run dev
```

Open **http://127.0.0.1:5173/** in your browser.

Do **not** rely on double‑clicking `web/index.html` — some features need a real HTTP server, and scripts may be blocked on `file://`.

## Run the API (for lead forms)

In a **second** terminal:

```bash
cd server
npm install
npm run dev
```

The site uses `http://localhost:5000` for forms unless you set `data-api-url` on `<body>` in `web/index.html`.

## GitHub Pages

Workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the **`web/`** folder on push to `main`.

1. **Settings → Pages → Source:** **GitHub Actions**
2. Site: `https://<user>.github.io/RyNex_Land/`

For production forms, set `data-api-url` to your deployed API and enable **CORS** for your Pages origin.
