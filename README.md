# RyNex_Land

Land acquisition site: **React (Vite)** at the repo root, **Express** API in `server/`.

## Live site (GitHub Pages)

After each push to `main`, [Deploy to GitHub Pages](.github/workflows/deploy-pages.yml) builds the Vite app and publishes `dist/`.

1. Repo **Settings → Pages**: **Source** = **GitHub Actions**.
2. Site URL: `https://<user>.github.io/RyNex_Land/` (match [vite.config.js](vite.config.js) `repoName` to your repository name).

## Run locally — frontend

```bash
npm install
npm run dev
```

Opens Vite at `http://localhost:5173/`.

## Run locally — API

```bash
cd server
npm install
npm run dev
```

Forms call `VITE_API_URL` or `http://localhost:5000` by default ([`src/config.js`](src/config.js)). Copy `.env.example` to `.env` and set `VITE_API_URL` when the API is hosted.

## Production API on GitHub Pages

Add a repository secret **`VITE_API_URL`** (e.g. `https://your-api.onrender.com`) so the workflow build embeds the correct API URL. Your API must allow **CORS** from your GitHub Pages origin.
