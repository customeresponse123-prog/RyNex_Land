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

## Supabase (store form submissions)

1. In the Supabase dashboard, run the SQL in [`supabase/leads.sql`](supabase/leads.sql) (creates `public.leads` and allows **anonymous inserts** for the anon key).
2. Copy **Project URL** and **anon public** key from **Project Settings → API**.
3. In `web/index.html`, set `data-supabase-url` and `data-supabase-anon-key` on `<body>` (empty strings disable Supabase).
4. With Web3Forms also configured, each submit sends **email** and **database row**; with only Supabase, only the database is used.

## GitHub Pages

Workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the **contents** of **`web/`** as the site root (so `web/index.html` is served at `/`). It runs on push to `main` and can be re-run manually under **Actions**.

1. **Settings → Pages → Build and deployment → Source:** **GitHub Actions** (not “Deploy from a branch”). If Source is set to the **`main`** branch and **`/` (root)`**, GitHub serves the repository root—there is no `index.html` there, so you may see **README.md** instead of the marketing site.
2. After the first successful deploy, the site URL appears under **Settings → Pages** and in the workflow run (e.g. `https://<user>.github.io/RyNex_Land/`).

For production forms, set `data-api-url` to your deployed API and enable **CORS** for your Pages origin.
