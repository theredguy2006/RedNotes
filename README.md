# RedNotes — Note Taking Site

A small full‑stack note-taking web app: React + Vite frontend and Node/Express + MongoDB backend.

This repository contains two projects in one workspace:
- `frontend/` — React app (Vite, Tailwind)
- `backend/` — Express API (ESM) with Mongoose for MongoDB

---

## Key features
- Create, read, update, delete notes
- Export notes (PDF) from the frontend
- Simple rate limiting middleware on the API

---

## Tech stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js (ES modules), Express, Mongoose
- Database: MongoDB (Atlas or self-hosted)

---

## Repo layout
```
/frontend
  /src        # React app sources (pages, components, utils)
  package.json
/backend
  /src        # server.js, config, models, controllers, routes
  .env        # local secrets (DO NOT COMMIT)
  package.json
README.md
```

---

## Quick start
Requirements: Node.js (recommended LTS 18 or 20), npm, a MongoDB connection string.

1. Backend

```powershell
cd "D:\Project\Note Taking Site\backend"
npm install
# create .env (see below)
npm start
```

2. Frontend (in separate terminal)

```powershell
cd "D:\Project\Note Taking Site\frontend"
npm install
npm run dev
```
Open the URL shown by Vite (commonly `http://localhost:5173`).

---

## Environment variables (backend/.env)
Create `backend/.env` with:

```
MONGO_URI=your_mongo_connection_string
PORT=5001
```

Important: Save the `.env` file as UTF‑8 (no BOM). If you see `MONGO_URI: undefined` on startup it is likely the file encoding is UTF‑16 with a BOM — re-save as UTF‑8.

`backend/.env` is in `.gitignore`. Commit `backend/.env.example` instead (contains placeholders).

---

## Backend notes
- Entry: `backend/src/server.js` — loads env, connects to MongoDB, mounts routes, starts server.
- DB: `backend/src/config/db.js` exposes `connectDB()` which calls `mongoose.connect(process.env.MONGO_URI)`.
- Routes: `backend/src/routes/notesRoutes.js` mounted at `/api/notes`.
- Models: `backend/src/models/Note.js` (Mongoose schema).

Example API endpoints:
- `GET /api/notes` — list notes
- `POST /api/notes` — create note (body: `{ title, content, tags? }`)
- `GET /api/notes/:id` — get note
- `PUT /api/notes/:id` — update
- `DELETE /api/notes/:id` — delete

---

## Troubleshooting
- `MONGO_URI` undefined: ensure `.env` exists in `backend/` and is UTF‑8 (no BOM). The project had a UTF‑16 BOM issue which prevented `dotenv` parsing.
- Mongo connection errors: ensure your Atlas IP whitelist allows your IP (or use 0.0.0.0/0 for testing) and the connection string is correct.
- CORS errors: dev frontend runs on `http://localhost:5173`. Confirm backend CORS allows this origin (server.js sets this in dev).

---



Which should I do next?
