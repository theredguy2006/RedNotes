# Note Taking Site

A full-stack note-taking web app with a Node/Express + MongoDB backend and a React + Vite frontend. This repo contains two main folders: `backend/` (API) and `frontend/` (UI).

---

## Quick summary

- Backend: Node (ESM) + Express + Mongoose (MongoDB)
- Frontend: React, Vite, Tailwind
- Purpose: Create, read, update, delete and export notes

---

## Repository layout

- `backend/` — Express API
  - `.env` — local environment variables (DO NOT COMMIT)
  - `.env.example` — example env file (safe to commit)
  - `.gitignore` — ignores `.env` and `node_modules`
  - `package.json` — backend scripts & deps
  - `src/`
    - `server.js` — entry point (loads env, connects DB, starts server)
    - `config/db.js` — mongoose connection helper
    - `models/Note.js` — Mongoose schema & model
    - `controllers/` — notes business logic
    - `routes/notesRoutes.js` — routes mounted at `/api/notes`
    - `middleware/` — middleware (eg. rate limiter)
- `frontend/` — React + Vite app
  - `package.json`, `vite.config.js`, Tailwind config
  - `src/` — React app sources (pages, components, utils)

---

## Prerequisites

- Node.js (recommend LTS 18.x or 20.x) — tested with modern Node. Use official installer or nvm for Windows.
- npm (comes with Node)
- MongoDB Atlas cluster or MongoDB connection string

---

## Environment variables

Create `backend/.env` (or copy `backend/.env.example`) with the following variables:

```
MONGO_URI=your-mongodb-connection-string
PORT=5001
```

Important notes:
- Save the `.env` file as UTF-8 plain text (no BOM). If `.env` is encoded as UTF-16 with a BOM, `dotenv` will fail to parse it and environment variables will be undefined. If you see `MONGO_URI: undefined` on startup, open the file in your editor and re-save as UTF-8.
- `backend/.env` is already listed in `backend/.gitignore`.

---

## Setup & run (backend)

From the project root or `backend/`:

```powershell
cd "D:\Project\Note Taking Site\backend"
npm install
npm start
```

What `npm start` does:
- Loads environment variables early
- Connects to MongoDB using `MONGO_URI`
- Starts Express on `PORT` (defaults to 5001)

If you need to run only the backend in dev with nodemon, install it globally or as a dev dependency and run your chosen script.

---

## Setup & run (frontend)

From the project root or `frontend/`:

```powershell
cd "D:\Project\Note Taking Site\frontend"
npm install
npm run dev
```

Open the React app (Vite will show the local dev server URL, typically `http://localhost:5173`). Ensure CORS in the backend allows the frontend origin (dev server 5173).

---

## API (overview)

Base path: `/api/notes`

Common endpoints (examples):

- `GET /api/notes` — list notes
- `POST /api/notes` — create note (body: `{ title, content, tags? }`)
- `GET /api/notes/:id` — get a note
- `PUT /api/notes/:id` — update a note
- `DELETE /api/notes/:id` — delete a note

Responses follow conventional HTTP codes (200/201/400/404/500). Check `backend/src/routes/notesRoutes.js` and controllers for exact behavior.

---

## Troubleshooting

1. `MONGO_URI` prints as `undefined` on startup
  - Cause: `.env` not parsed (commonly due to file encoding: UTF-16 with BOM).
  - Fix: Re-save `backend/.env` as UTF-8 without BOM. You can also confirm with the provided `testEnv.js` debug script (was used during debugging).

2. Mongo connection errors
  - Ensure `MONGO_URI` is a valid connection string for Atlas or your MongoDB instance.
  - Check network access rules in Atlas (allow your IP or 0.0.0.0/0 for testing).

3. CORS issues
  - Make sure `server.js` allows requests from the frontend dev origin (default `http://localhost:5173`).

4. Node version compatibility
  - Use a modern stable Node version (18.x or 20.x recommended). Avoid accidental package installs like `npm install 18` — use the Node installer or `nvm-windows`.

---

## Security notes

- Do not commit `.env` or any real credentials.
- Rotate any credentials that were accidentally pushed to a public repo.
- Use environment variables or a secrets manager in production (Heroku config vars, Vercel, AWS Secrets Manager, etc.).

---

## Recommended cleanup & next steps

- Remove any leftover debugging helpers (if present).
- Keep `backend/.env.example` up-to-date and add a short contributor guide.
- Add a startup check to fail fast if required env vars are missing (clear error message and exit).
- Add automated tests for controllers and a small CI workflow.

---

## Contact / contribution

Open issues or PRs in this repo to propose changes. If you want help rotating credentials or creating a `README` tailored to deployment, I can assist.

---

License: no license specified. Add a license file if you plan to open-source this project.
