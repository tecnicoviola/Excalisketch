# 🧩 ExceliDraw — Real-Time Collaborative Whiteboard  

> A **real-time collaborative whiteboard** built with **Next.js**, **WebSockets**, and **Prisma ORM**.  
> Draw, collaborate, and share sketches live — all from your browser.  
> Inspired by Excalidraw, architected for scale.

---

## 🚀 Overview  

**ExceliDraw** is a real-time collaborative drawing app that allows multiple users to draw shapes together on a shared canvas.  
It’s structured as a **monorepo** containing a Next.js frontend, Express.js HTTP backend, and a WebSocket server for real-time synchronization.

This project showcases **end-to-end full-stack engineering** — combining modern frontend development, scalable backend architecture, and real-time networking.

---

## ✨ Features  

✅ Real-time drawing synchronization with WebSockets  
✅ Multiple users in shared drawing rooms  
✅ Tools: Pencil ✏️, Rectangle ▭, Circle ⚪  
✅ JWT-based authentication and room joining  
✅ Built with TypeScript across frontend and backend  
✅ Modular monorepo structure with reusable packages  
✅ Prisma ORM with PostgreSQL database  

> Coming Soon: Undo/Redo, Panning/Zooming, Chat Integration 💬

---

## 🧠 Tech Stack  

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 15, React 19, TypeScript, TailwindCSS |
| **Backend (HTTP)** | Node.js, Express.js, Prisma ORM |
| **Realtime (WS)** | WebSocket (`ws` library) |
| **Database** | PostgreSQL |
| **Auth & Validation** | JWT, Zod |
| **Architecture** | Turborepo + pnpm workspaces |
| **Shared Packages** | Common types, backend configs, UI components |
| **UI Components** | Custom React components + Shadcn/UI |
| **Dev Tools** | Turbo, ESLint, Prettier, pnpm |

---

## 🗂️ Monorepo Structure  

```

week-22-excelidraw/
├── apps/
│   ├── excelidraw-frontend/     # Next.js frontend (Canvas UI + Rooms)
│   ├── http-backend/            # Express.js API (Auth, DB)
│   └── ws-backend/              # WebSocket server (Real-time updates)
│
├── packages/
│   ├── common/                  # Shared Zod schemas & TS types
│   ├── backend-common/          # Shared backend logic (JWT utils)
│   ├── db/                      # Prisma ORM + schema
│   └── ui/                      # Reusable UI components
│
├── turbo.json                   # Turborepo configuration
├── package.json                 # Root workspace dependencies
└── README.md                    # Project documentation

````

---

## ⚙️ Setup Guide  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/100xdevs-cohort-3/week-22-excelidraw.git
cd week-22-excelidraw
````

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Setup Environment Variables

#### `apps/http-backend/.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/excelidraw"
JWT_SECRET="your_jwt_secret"
PORT=3001
```

#### `apps/ws-backend/.env`

```env
JWT_SECRET="your_jwt_secret"
PORT=8080
```

#### `apps/excelidraw-frontend/.env`

```env
NEXT_PUBLIC_HTTP_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

---

## 🧩 Database Setup

Run migrations using Prisma:

```bash
cd packages/db
pnpm prisma migrate dev
```

Open Prisma Studio to view your database:

```bash
pnpm prisma studio
```

---

## 💻 Development

### Run All Apps Together

```bash
pnpm run dev
```

This starts:

* 🖼️ Frontend → [http://localhost:3000](http://localhost:3000)
* ⚙️ HTTP Backend → [http://localhost:3001](http://localhost:3001)
* 🔄 WS Backend → ws://localhost:8080

### Or Run Individually

```bash
# Frontend
cd apps/excelidraw-frontend && pnpm dev

# HTTP Backend
cd apps/http-backend && pnpm dev

# WebSocket Backend
cd apps/ws-backend && pnpm dev
```

---

## 🔁 How It Works

1. User opens `/canvas/:roomId`
2. The frontend connects to the WebSocket server using a JWT token
3. Drawing events (shapes, movements) are serialized and sent as JSON via WebSocket
4. The server broadcasts updates to all connected clients in the same room
5. Each client re-renders the updated canvas in real-time

---

## 🧩 Core Files

| File                        | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `Canvas.tsx`                | Main drawing canvas and UI logic                 |
| `Game.ts`                   | Core drawing engine and synchronization manager  |
| `RoomCanvas.tsx`            | Handles room joining and WebSocket communication |
| `ws-backend/src/index.ts`   | WebSocket message broadcasting logic             |
| `http-backend/src/index.ts` | Express routes for authentication & data         |
| `schema.prisma`             | Database schema (users, rooms, shapes)           |
| `types.ts`                  | Shared TypeScript + Zod types                    |

---

## 🧭 Architecture Diagram

```
 ┌─────────────┐        ┌──────────────────┐       ┌──────────────────┐
 │  Frontend   │ <────> │  WS Backend (ws) │ <───> │   HTTP Backend   │
 │ (Next.js)   │  live  │  (Broadcasts)    │  REST │ (Auth + Prisma)  │
 └─────────────┘        └──────────────────┘       └──────────────────┘
         │                          │
         │                          ▼
         │                   ┌────────────┐
         └──────────────────> │ PostgreSQL │
                              └────────────┘
```

---

## 🔒 Security Notes

* JWT is used for authentication between clients and backend servers.
* Tokens are dynamically generated on login (never hardcoded).
* Use HTTPS and secure cookies in production.
* All validation handled using **Zod**.

---

## 🧠 Future Enhancements

* 🖱️ Panning & Zooming support
* 🧠 Undo / Redo stack
* 💾 Persistent room state (save drawings in DB)
* 🗨️ In-room live chat
* 🧍‍♂️ Collaborative cursors (show other users’ cursors)
* ⚡ WebSocket optimization (message batching, compression)

---

## 💼 Resume Highlights

**1️⃣ Built a full-stack, real-time collaborative whiteboard** using WebSockets and Next.js, enabling multi-user drawing with instant synchronization.
**2️⃣ Designed a scalable monorepo architecture** with modular shared packages (UI, DB, common types) and JWT-based authentication using Prisma ORM.

---

## 🧱 Tech Stack Summary

**Frontend:** Next.js, React, TailwindCSS, TypeScript
**Backend:** Node.js, Express.js, Prisma ORM, WebSocket
**Database:** PostgreSQL
**Architecture:** Turborepo + pnpm workspaces
**Validation & Auth:** Zod, JWT
**UI Framework:** Shadcn UI, Custom React Components


