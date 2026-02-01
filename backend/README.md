# Backend

This folder contains the backend/API for ClearFix.

## Setup

1. Create `backend/.env` (copy from `backend/.env.example`)

- `PORT=5174`
- `FRONTEND_ORIGIN=http://localhost:5173`
- `MONGODB_URI=...` (optional; if not set, the server starts without DB)

2. Install deps

- `npm install`

3. Run

- Dev: `npm run dev`
- Prod: `npm run start`

## Endpoints

- `GET /` basic status
- `GET /api/health` health check (includes MongoDB connection state)
- `GET /api` placeholder

Suggested next steps (optional):

- Initialize a Node/Express server here
- Add routes for auth, complaints, payments, and ragging alerts
- Connect a database (MongoDB) instead of localStorage
