# 🧩 ExceliDraw — Collaborative Whiteboard (Week 22 Project)

A real-time collaborative whiteboard app inspired by Excalidraw — built with **Next.js**, **WebSockets**, and **Prisma**.  
Users can draw freehand (pencil), rectangles, and circles on a shared canvas that updates instantly for everyone in the same room.

---

## 🚀 Overview

This project is a monorepo that contains a **frontend**, **HTTP backend**, and **WebSocket backend**, along with shared packages for UI, database, and common types.  
It’s designed to demonstrate full-stack real-time collaboration with authentication and persistent room management.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | **Next.js 15**, **React 19**, **TailwindCSS**, **TypeScript** |
| Real-Time | **WebSocket (ws)** |
| HTTP API | **Express.js** |
| Database | **Prisma + PostgreSQL** |
| Shared Packages | **Turborepo + pnpm workspaces** |
| Auth | **JWT (jsonwebtoken)** |
| UI Components | **@repo/ui** (custom) |
| Validation | **Zod** |

---

## ✨ Features

✅ Real-time collaborative drawing  
✅ Tools: Pencil ✏️, Rectangle ▭, Circle ⚪  
✅ Multi-user rooms with broadcast sync  
✅ User authentication (JWT-based)  
✅ Shared backend and frontend types  
✅ Modular monorepo structure with reusability  
✅ Extensible design for chat or whiteboard extensions  

> **Upcoming:** Panning & Zooming functionality, smoother pencil lines, shape persistence, and undo/redo.

---

## 🗂️ Monorepo Structure

